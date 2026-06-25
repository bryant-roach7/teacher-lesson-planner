const API_URL = "/api";

export interface DriveFile {
    id: string;
    name: string;
    mimeType: string;
    modifiedTime: string;
    webViewLink?: string;
}

export interface User {
    email: string;
    name: string;
    picture: string;
}

export function getToken(): string | null {
    return localStorage.getItem("token");
}

export function setToken(token: string): void {
    localStorage.setItem("token", token);
}

export function clearToken(): void {
    localStorage.removeItem("token");
}

export async function getLoginUrl(): Promise<string> {
    const res = await fetch(`${API_URL}/auth/google/login`);
    if (!res.ok) throw new Error("Failed to get login URL");
    const data = await res.json();
    return data.auth_url;
}

export async function getMe(): Promise<User> {
    const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
}

export async function getDriveFiles(): Promise<DriveFile[]> {
    const res = await fetch(`${API_URL}/drive/files`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Failed to fetch files");
    return res.json();
}
