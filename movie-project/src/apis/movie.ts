import fetchC from "@/libs/fetchC";

const moviesApi = {
    latest: () => {
        const url = "/movies/latest";
        return fetchC.get(url);
    }
}

export default moviesApi;