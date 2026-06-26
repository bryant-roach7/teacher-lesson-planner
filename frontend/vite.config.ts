import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const backendUrl = env.BACKEND_URL || "http://localhost:8000";

    return {
        plugins: [react()],
        server: {
            proxy: {
                "/api": {
                    target: backendUrl,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                    changeOrigin: true,
                },
            },
        },
        test: {
            // jsdom environment added here when component tests are written
        },
    };
});
