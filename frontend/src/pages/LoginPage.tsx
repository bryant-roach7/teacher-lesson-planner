import { useState } from "react";
import { getLoginUrl } from "../api";

export function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleLogin() {
        setLoading(true);
        setError(null);
        try {
            const url = await getLoginUrl();
            window.location.href = url;
        } catch {
            setError("Failed to start login. Is the backend running?");
            setLoading(false);
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", gap: "1rem" }}>
            <h1>Teacher Lesson Planner</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
                onClick={handleLogin}
                disabled={loading}
                style={{ padding: "0.75rem 1.5rem", fontSize: "1rem", cursor: loading ? "default" : "pointer" }}
            >
                {loading ? "Redirecting to Google..." : "Sign in with Google"}
            </button>
        </div>
    );
}
