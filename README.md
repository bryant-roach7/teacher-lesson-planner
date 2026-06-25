# Teacher Lesson Planner
 
A personal full-stack web application that lets a teacher link Google Drive documents to a school year calendar, plan lessons by unit and subject, and use AI to generate lesson plans, surface pacing gaps, and answer questions about uploaded materials.
 
Built as a portfolio project to demonstrate modern full-stack development, third-party API integration, and AI feature development. Actively used by a real user (kindergarten teacher) day-to-day.
 
---
 
## Purpose
 
### User problem
Planning a school year means juggling Drive docs, curriculum standards, and a calendar across disconnected tools. This app brings them together: attach a Drive doc to a calendar date, tag it by subject and unit, and browse the school year visually. AI features layer on top to reduce prep time.
 
### Developer goals
- Learn and demonstrate React + TypeScript, Python FastAPI, Google OAuth, LLM API integration, and RAG patterns
- Build something deployable on a home server now and migratable to AWS later
- Produce a portfolio piece with a real user and real usage
---
 
## Tech stack
 
| Layer | Technology | Why |
|---|---|---|
| Frontend | React + TypeScript + Vite | Industry standard; pairs well with existing .NET type-system familiarity |
| Backend | Python + FastAPI | Extends existing Python ETL experience; async-native; strong job market presence |
| Auth | Google OAuth 2.0 | Required for Drive API access; OAuth is a key resume talking point |
| External APIs | Google Drive API, Anthropic API | Core product features |
| Primary DB | PostgreSQL | Reliable, AWS RDS-compatible, supports pgvector extension |
| Vector search | pgvector (Postgres extension) | RAG capability without a separate vector DB service |
| Background jobs | Celery + Redis | Async doc embedding, weekly digest generation, Drive sync |
| Containerization | Docker + Docker Compose | Local dev and home server deployment; maps 1:1 to ECS Fargate on AWS |
| Reverse proxy | nginx | Home server ingress; swapped for ALB on AWS |
 
---
 
## Architecture overview
 
```
┌─────────────────────────────────────────────┐
│  Frontend (React + TypeScript)               │
│  Calendar view · Drive link manager          │
│  AI sidebar · Auth flow                      │
└──────────────┬──────────────────────────────┘
               │ REST / JSON
┌──────────────▼──────────────────────────────┐
│  Backend (Python + FastAPI)                  │
│  OAuth service · Lesson API                  │
│  Drive service · AI service                  │
│                                              │
│  Celery worker                               │
│  Doc embedding · Digest generation           │
│  Drive sync (Redis queue)                    │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│  Data layer                                  │
│  PostgreSQL (users, lessons, drive links)    │
│  pgvector (doc embeddings for RAG)           │
│  Redis (cache + task queue)                  │
└─────────────────────────────────────────────┘
```
 
**Home server deployment:** Docker Compose — one compose file runs all services (FastAPI, Celery, Postgres, Redis, nginx). Managed via Portainer.
 
**AWS migration path (later):** Each compose service maps directly — FastAPI/Celery → ECS Fargate tasks, Postgres → RDS, Redis → ElastiCache, nginx → ALB. Migration is config changes, not code rewrites.
 
---
 
## AI features
 
### Phase 2 — LLM with structured output
- **Lesson plan generator:** user selects a standard and date range; AI returns a structured lesson plan (JSON) that is saved and editable
- **Weekly digest:** AI-generated summary of the upcoming week's lessons; flags pacing gaps (e.g. "no phonics scheduled Wednesday–Friday")
### Phase 3 — RAG / document Q&A
- **Document Q&A:** upload a worksheet or unit plan PDF and ask questions about it ("what standards does this cover?", "is there a fractions section?")
- Pipeline: Drive doc → chunked → embedded via Anthropic API → stored in pgvector → retrieved at query time → sent to LLM with context
- **Differentiation suggestions:** given a lesson plan, AI suggests modifications for different learning levels
---
 
## Development phases
 
### Phase 1 — Core (no AI)
- [ ] Google OAuth login
- [ ] Google Drive API integration (browse, search, fetch file metadata)
- [ ] Lesson CRUD (create, edit, delete lessons with date, subject, unit tags)
- [ ] Calendar UI (monthly/weekly views, drag-drop to reschedule)
- [ ] Drive doc attachment to lessons
- [ ] Docker Compose local setup
### Phase 2 — AI generation
- [ ] Anthropic API integration (structured output / JSON mode)
- [ ] Lesson plan generator (standard + date range → structured plan)
- [ ] AI sidebar in UI
- [ ] Weekly digest endpoint + scheduled Celery task
- [ ] Basic prompt engineering and output validation
### Phase 3 — RAG / document Q&A
- [ ] pgvector setup and embedding pipeline
- [ ] Celery worker for async doc embedding on save
- [ ] Document Q&A endpoint (retrieval + generation)
- [ ] Differentiation suggestions feature
- [ ] Streaming responses in UI
### Phase 4 — Production hardening (optional)
- [ ] AWS migration (ECS, RDS, ElastiCache, ALB)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Monitoring and error tracking
- [ ] Multi-user support (if needed beyond household use)
---
 
## Data model (high level)
 
```
users
  id, email, google_id, name, created_at
 
lessons
  id, user_id, title, date, subject, unit, notes, created_at
 
drive_links
  id, lesson_id, drive_file_id, file_name, mime_type, url, synced_at
 
doc_chunks
  id, drive_file_id, chunk_index, content, embedding (vector), created_at
 
celery_tasks
  id, task_type, status, payload, created_at, completed_at
```
 
---
 
## Key learning outcomes (resume-facing)
 
- **React + TypeScript** SPA with component architecture, hooks, and API integration
- **Python FastAPI** async REST API with dependency injection and Pydantic models
- **Google OAuth 2.0** — full token flow including refresh token handling
- **Google Drive API** — file listing, metadata fetch, content download
- **LLM API integration** — structured output (JSON mode), prompt engineering, streaming
- **RAG pipeline** — chunking, embedding, pgvector similarity search, retrieval-augmented generation
- **Celery + Redis** — background task queue pattern (mirrors real production ETL/pipeline patterns)
- **Docker Compose** — multi-service containerized deployment
- **AWS-ready architecture** — ECS / RDS / ElastiCache / ALB pattern
---
 
## Project context (for AI assistant)
 
This is a personal development project by a Lead Software Engineer with 6+ years of experience in .NET, Python, ServiceNow, and Azure/Terraform at M&T Bank. The developer is actively job searching and targeting Senior Software Engineer / Senior Platform Engineer roles. The project is intended to demonstrate modern full-stack skills and AI integration that differ from day-job enterprise tooling.
 
The primary end user is a kindergarten teacher. Features should be designed around her actual workflow: planning out a school year in advance, referencing past lesson materials quickly, and reducing manual lesson prep time.
 
When helping with this project, prioritize:
- Patterns that are transferable and resume-worthy over quick hacks
- Code that is production-minded even at small scale (error handling, type safety, async where appropriate)
- Explanations that connect implementation choices to real-world production context
- Honest tradeoff discussion when multiple approaches exist
