from fastapi import FastAPI

app = FastAPI(title="Teacher Lesson Planner API")


@app.get("/health")
def health():
    return {"status": "ok"}
