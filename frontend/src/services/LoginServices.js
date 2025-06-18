export const loginService = async (username, password) => {
    try {
        const response = await fetch('http://localhost:8000/series/api/v1/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error en la autenticación');
        }

        return data;
    } catch (error) {
        console.error("Error en loginService:", error);
        throw new Error("Error de conexión o autenticación");
    }
};

