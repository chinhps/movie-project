interface IInitialFetch {
    BaseURL?: string,
    headers?: object,
    paramsSerializer?: (params: object) => void;
}

const initialFetch: IInitialFetch = {
    BaseURL: process.env.API_BACKEND_CONTAINER,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "content-type": "application/json",
    },
    paramsSerializer: (params: object) => JSON.stringify(params),
}

interface Option extends RequestInit {
    params?: { [key: string]: string }
    BaseURL?: string
}

const fetchC = {
    get: async (url: string, init?: Option) => {
        console.log(process.env.API_BACKEND_CONTAINER, process.env.NEXT_PUBLIC_API_BACKEND, 'API_BACKEND_CONTAINER');
        
        const queryString = "?" + (init?.params ? new URLSearchParams(init?.params).toString() : "");
        const data = await fetch((init?.BaseURL ?? initialFetch.BaseURL ?? process.env.NEXT_PUBLIC_API_BACKEND) + url + queryString, {
            headers: {
                ...initialFetch.headers
            },
            ...init
        });
        const res = await data.json();
        return res;
    },
    post: async (url: string, params?: object, init?: Option) => {
        const data = await fetch((init?.BaseURL ?? initialFetch.BaseURL) + url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                ...initialFetch.headers
            },
            ...init
        });
        const res = await data.json();
        if (!data.ok) {
            throw new Error(res.data.msg)
        }
        return res;
    },
    postFormData: async (url: string, params: FormData, init?: Option) => {
        const data = await fetch((init?.BaseURL ?? initialFetch.BaseURL) + url, {
            method: "POST",
            body: params,
            headers: {
                ...initialFetch.headers
            },
            ...init
        });
        const res = await data.json();
        if (!data.ok) {
            throw new Error(res.data.msg)
        }
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