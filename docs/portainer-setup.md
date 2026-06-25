# Portainer Homelab Setup

Steps to wire up the CI/CD pipeline to your homelab Portainer instance.

---

## Prerequisites

- Docker installed on the homelab host
- Portainer CE running (or install via `docker run` below)
- A domain pointing to your homelab IP (Cloudflare, DuckDNS, etc.)
- Port 80 and 443 forwarded to the homelab host on your router

### Install Portainer (if not already running)

```bash
docker volume create portainer_data

docker run -d \
  -p 8000:8000 \
  -p 9443:9443 \
  --name portainer \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

Access at `https://<homelab-ip>:9443`.

---

## 1. Create the Portainer stack

1. In Portainer → **Stacks** → **Add stack**
2. Name: `teacher-lesson-planner`
3. Build method: **Repository**
   - Repository URL: `https://github.com/<your-username>/teacher-lesson-planner`
   - Repository reference: `refs/heads/main`
   - Compose path: `docker-compose.yml`
4. Under **Environment variables**, add every key from `.env.example` with real values
5. Click **Deploy the stack**

---

## 2. Enable automatic updates via webhook

1. On the stack detail page, enable **GitOps updates**
2. Copy the **webhook URL** — it looks like:
   `https://<portainer-host>:9443/api/stacks/webhooks/<uuid>`
3. In GitHub → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:
   - Name: `PORTAINER_WEBHOOK_URL`
   - Value: the webhook URL from step 2

When the GitHub Actions `deploy` job POSTs to this URL, Portainer pulls the latest
`docker-compose.yml` from the repo and re-pulls all images tagged `latest`.

---

## 3. Add remaining GitHub Actions secrets

Go to **GitHub → Settings → Secrets and variables → Actions** and add:

| Secret | Value |
|---|---|
| `PORTAINER_WEBHOOK_URL` | Portainer stack webhook URL (step 2) |
| `APP_HEALTH_URL` | `https://<your-domain>/api/health` |

The `GITHUB_TOKEN` secret is automatic — no action needed for GHCR image pushes.

---

## 4. TLS certificates

Place your certs in `nginx/certs/` on the homelab host:

```
nginx/certs/fullchain.pem
nginx/certs/privkey.pem
```

**Option A — Cloudflare origin cert (recommended for homelab):**
Cloudflare Dashboard → SSL/TLS → Origin Server → Create certificate.
Download `fullchain.pem` and `privkey.pem` and copy them to the path above.

**Option B — Let's Encrypt via certbot:**
```bash
certbot certonly --standalone -d your-domain.com
# then symlink or copy from /etc/letsencrypt/live/your-domain.com/
```

---

## 5. Set GITHUB_REPOSITORY in your .env on the homelab

The compose file references `$GITHUB_REPOSITORY` to construct GHCR image paths.
Set this in Portainer's environment variables for the stack:

```
GITHUB_REPOSITORY=your-github-username/teacher-lesson-planner
```

---

## Deployment flow summary

```
git push main
    → GitHub Actions: run tests
    → GitHub Actions: build backend + frontend images
    → GitHub Actions: push images to ghcr.io/<repo>/backend:latest and frontend:latest
    → GitHub Actions: POST to Portainer webhook
    → Portainer: docker compose pull + up -d
    → GitHub Actions: health check https://<domain>/api/health
```
