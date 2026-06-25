import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type DriveFile, clearToken, getDriveFiles, getMe } from "../api";

export function FilesPage() {
    const navigate = useNavigate();
    const [files, setFiles] = useState<DriveFile[]>([]);
    const [user, setUser] = useState<{ name: string; email: string; picture: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const [me, driveFiles] = await Promise.all([getMe(), getDriveFiles()]);
                setUser(me);
                setFiles(driveFiles);
            } catch {
                clearToken();
                navigate("/", { replace: true });
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [navigate]);

    function handleLogout() {
        clearToken();
        navigate("/", { replace: true });
    }

    if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;

    return (
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    {user?.picture && (
                        <img src={user.picture} alt="avatar" style={{ width: 36, height: 36, borderRadius: "50%" }} />
                    )}
                    <span>
                        {user?.name} ({user?.email})
                    </span>
                </div>
                <button onClick={handleLogout} style={{ cursor: "pointer" }}>
                    Sign out
                </button>
            </div>
            <h2>Your Google Drive Files</h2>
            {files.length === 0 ? (
                <p>No files found.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {files.map((file) => (
                        <li key={file.id} style={{ padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
                            {file.webViewLink ? (
                                <a href={file.webViewLink} target="_blank" rel="noopener noreferrer">
                                    {file.name}
                                </a>
                            ) : (
                                <span>{file.name}</span>
                            )}
                            <small style={{ color: "#666", marginLeft: "0.5rem" }}>
                                {file.mimeType.split(".").pop()} — {new Date(file.modifiedTime).toLocaleDateString()}
                            </small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
