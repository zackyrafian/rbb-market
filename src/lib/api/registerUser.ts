export interface RegisterFormData { 
    username: string;
    email: string;
    password: string;
}

export async function registerUser(data:RegisterFormData) {
    const response = await fetch("/api/auth/register", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Register failed");

    return result;
}