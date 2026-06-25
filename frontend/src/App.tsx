import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "./api";
import { CallbackPage } from "./pages/CallbackPage";
import { FilesPage } from "./pages/FilesPage";
import { LoginPage } from "./pages/LoginPage";

function RequireAuth({ children }: { children: ReactNode }) {
    return getToken() ? <>{children}</> : <Navigate to="/" replace />;
}

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/callback" element={<CallbackPage />} />
                <Route
                    path="/files"
                    element={
                        <RequireAuth>
                            <FilesPage />
                        </RequireAuth>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
