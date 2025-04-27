const handleResponse = async (res: Response) => {
    if (!res.ok) {
      let errorMessage = 'Request failed';
      try {
        const errorBody = await res.json();
        errorMessage = errorBody.message || errorMessage;
      } catch {
      }
      throw new Error(errorMessage);
    }
    return res.json();
  };
  
  const request = async (url: string, options?: RequestInit) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });
  
    return handleResponse(res);
  };
  
  export const api = {
    get: (url: string) => request(url, { method: 'GET' }),
    post: (url: string, body: any) =>
      request(url, {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    put: (url: string, body: any) =>
      request(url, {
        method: 'PUT',
        body: JSON.stringify(body),
      }),
    patch: (url: string, body: any) =>
      request(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
      }),
    delete: (url: string) => request(url, { method: 'DELETE' }),
  };
  