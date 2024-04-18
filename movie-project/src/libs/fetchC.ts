interface IInitialFetch {
    BaseURL?: string,
    headers?: object,
    paramsSerializer?: (params: object) => void;
}

const initialFetch: IInitialFetch = {
    BaseURL: "http://localhost:8081/api",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "content-type": "application/json",
    },
    paramsSerializer: (params: object) => JSON.stringify(params),
}

const fetchC = {
    get: async (url: string, params?: { [key: string]: string }, init?: RequestInit) => {
        const queryString = params ? new URLSearchParams(params).toString() : "";
        const data = await fetch(initialFetch.BaseURL + url + queryString, {
            headers: {
                ...initialFetch.headers
            },
            ...init
        });
        const res = await data.json();
        return res;
    },
    post: async (url: string, params?: object, init?: RequestInit) => {
        const data = await fetch(initialFetch.BaseURL + url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                ...initialFetch.headers
            },
            ...init
        });
        const res = await data.json();
        return res;
    },
    put: async (url: string, params?: object, init?: RequestInit) => {
        const data = await fetch(initialFetch.BaseURL + url, {
            method: "PUT",
            body: JSON.stringify(params),
            headers: {
                ...initialFetch.headers
            },
            ...init
        });
        const res = await data.json();
        return res;
    },
    delete: async (url: string, params?: { [key: string]: string }, init?: RequestInit) => {
        const queryString = params ? new URLSearchParams(params).toString() : "";
        const data = await fetch(initialFetch.BaseURL + url + queryString, {
            method: "DETELE",
            headers: {
                ...initialFetch.headers
            },
            ...init
        });
        const res = await data.json();
        return res;
    }
}

export default fetchC;