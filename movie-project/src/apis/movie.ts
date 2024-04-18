import fetchC from "@/libs/fetchC";
import { IBaseResponse } from "@/types/base.type";
import { IMovieResponse } from "@/types/response/movies.type";

const moviesApi = {
    latest: async () => {
        const url = "/movies/latest";
        const res: IBaseResponse<IMovieResponse> = await fetchC.get(url, {
            cache: "no-store"
        });
        return res;
    },
    rankings: async () => {
        const url = "/movies/ranking";
        const res: IBaseResponse<IMovieResponse> = await fetchC.get(url, {
            cache: "no-store"
        });
        return res;
    },
    list: async () => {
        const url = "/movies";
        const res: IBaseResponse<IMovieResponse> = await fetchC.get(url, {
            cache: "no-store"
        });
        return res;
    }
}

export default moviesApi;