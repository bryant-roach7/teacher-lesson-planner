# Homelab Setup: Portainer + Nginx Proxy Manager

This project uses **Nginx Proxy Manager (NPM)** for TLS termination and reverse proxying,
and **Portainer** for managing the Docker Compose stack. The app's nginx container is not
needed — NPM replaces it.

---

## Architecture on the homelab

```
Internet
    |
    v
Nginx Proxy Manager  (your existing NPM instance, ports 80/443)
    |              \
    v               v
host:8081          host:8082
(FastAPI backend)  (React frontend)
    |
    v
Postgres + Redis  (internal Docker network, no host port exposure)
```

---

## Prerequisites

- Docker installed on the homelab host
- Portainer CE already running
- Nginx Proxy Manager already running with Let's Encrypt working
- A domain/subdomain pointed at your homelab IP

---

## Step 1: Install Portainer (if not already running)

```bash
docker volume create portainer_data

docker run -d \
  -p 9443:9443 \
  --name portainer \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

---

## Step 2: Create the stack in Portainer

1. Portainer -> **Stacks** -> **Add stack**
2. Name: `teacher-lesson-planner`
3. Build method: **Repository**
   - URL: `https://github.com/your-username/teacher-lesson-planner`
   - Reference: `refs/heads/main`
   - Compose path: `docker-compose.yml`
4. Add all environment variables from `.env.example` with real values
5. **Deploy the stack**

Portainer will pull the images from GHCR and start all services. Backend will be
available on host port `8081`, frontend on `8082`.

---

## Step 3: Configure Nginx Proxy Manager

You need two proxy hosts in NPM. No cert management needed — NPM handles Let's Encrypt automatically.

### Proxy host 1 — Frontend

| Field | Value |
|---|---|
| Domain name | `lessonplanner.your-domain.com` |
| Scheme | `http` |
| Forward hostname/IP | `<homelab-host-IP>` |
| Forward port | `8082` |
| SSL -> Let's Encrypt | Enable, check "Force SSL" and "HTTP/2 Support" |

### Proxy host 2 — Backend API

You have two options:

**Option A — Separate subdomain (simpler)**

| Field | Value |
|---|---|
| Domain name | `api.lessonplanner.your-domain.com` |
| Scheme | `http` |
| Forward hostname/IP | `<homelab-host-IP>` |
| Forward port | `8081` |
| SSL -> Let's Encrypt | Enable |

Set `ALLOWED_ORIGINS=https://lessonplanner.your-domain.com` in the stack env vars,
and configure the frontend to call `https://api.lessonplanner.your-domain.com`.

**Option B — Path-based on the same domain (recommended)**

In NPM, on the frontend proxy host, add a custom Nginx config under **Advanced**:

```nginx
location /api/ {
    proxy_pass http://<homelab-host-IP>:8081/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /auth/ {
    proxy_pass http://<homelab-host-IP>:8081/auth/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

One domain, one cert, simpler Google OAuth callback URL.

---

## Step 4: SSL/TLS certificates

**You do not need to manage certs manually.** NPM requests and renews Let's Encrypt certs
for each proxy host automatically. Just enable SSL when creating the proxy host and NPM
handles the rest.

Make sure ports 80 and 443 on your router are forwarded to the NPM host so Let's Encrypt's
HTTP challenge can reach it.

---

## Step 5: Wire the CI/CD pipeline

1. On the Portainer stack detail page, enable **GitOps updates**
2. Copy the webhook URL: `https://<portainer-host>:9443/api/stacks/webhooks/<uuid>`
3. GitHub -> **Settings** -> **Secrets and variables** -> **Actions** -> add:
   - `PORTAINER_WEBHOOK_URL`: the webhook URL above
   - `APP_HEALTH_URL`: `https://lessonplanner.your-domain.com/api/health`

`GITHUB_TOKEN` is automatic — no action needed for GHCR image pushes.

---

## Deployment flow

```
git push main
    -> GitHub Actions: run backend + frontend tests
    -> GitHub Actions: build images, push to ghcr.io/<repo>/{backend,frontend}:latest
    -> GitHub Actions: POST to Portainer webhook
    -> Portainer: docker compose pull + up -d
    -> GitHub Actions: GET https://<domain>/api/health (must return 200)
```

---

## Port reference

| Service | Internal port | Host port | Who accesses it |
|---|---|---|---|
| FastAPI backend | 8000 | 8081 | NPM proxy host |
| React frontend | 80 | 8082 | NPM proxy host |
| Postgres | 5432 | not exposed | backend/celery only |
| Redis | 6379 | not exposed | backend/celery only |
| Portainer | 9443 | 9443 | you, from LAN |
