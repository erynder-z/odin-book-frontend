export const fetchTenorApiKey = async (
    token: string | null,
    setApiKey?: (key: string) => void
) => {
    try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${serverURL}/api/v1/key/tenor`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setApiKey?.(data.key);
        } else {
            console.error(
                `Server returned ${response.status} ${response.statusText}`
            );
        }
    } catch (error) {
        console.error('Could not get API key');
    }
};
