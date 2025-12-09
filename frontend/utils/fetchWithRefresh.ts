const API_URL = '/api';

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: any) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: any = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(null);
        }
    });

    failedQueue = [];
};

export async function fetchWithRefresh(url: string, options: RequestInit = {}): Promise<Response> {
    // Always include credentials
    const fetchOptions = {
        ...options,
        credentials: 'include' as RequestCredentials,
    };

    let response = await fetch(url, fetchOptions);

    // If we get a 401 (Unauthorized), try to refresh the token
    if (response.status === 401 && !url.includes('/auth/refresh')) {
        if (isRefreshing) {
            // If a refresh is already in progress, wait for it
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then(() => {
                // Retry the original request
                return fetch(url, fetchOptions);
            });
        }

        isRefreshing = true;

        try {
            const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
            });

            if (refreshResponse.ok) {
                processQueue();
                // Retry the original request with the new token
                response = await fetch(url, fetchOptions);
            } else {
                processQueue(new Error('Token refresh failed'));
                // Redirect to login or handle logout
                window.location.href = '/login';
            }
        } catch (error) {
            processQueue(error);
            window.location.href = '/login';
        } finally {
            isRefreshing = false;
        }
    }

    return response;
}
