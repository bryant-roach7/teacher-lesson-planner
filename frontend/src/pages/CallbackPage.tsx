import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../api";

export function CallbackPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
            setToken(token);
            navigate("/files", { replace: true });
        } else {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    return <p style={{ padding: "2rem" }}>Signing in...</p>;
}
