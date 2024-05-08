import fetchC from "@/libs/fetchC";
import { IBaseResponse, IBaseResponseDetail } from "@/types/base.type";
import { IEpisodeHistory } from "@/types/episode.type";
import { IEpisodeResponse, IMovieHistory, IMovieResponse } from "@/types/response/movies.type";

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
    },
    detail: async (slug: string, token?: string) => {
        let url = "/movies/detail/" + slug;
        let headers = {};
        if (token) {
            url = "/movies/detail-user/" + slug;
            headers = {
                "Authorization": "Bearer " + token
            }
        }
        const res: IBaseResponseDetail<IMovieResponse> = await fetchC.get(url, {
            cache: "no-store",
            headers: headers
        });
        return res;
    },
    watch: async (slug: string) => {
        const url = "/movies/episode/" + slug;
        const res: IBaseResponseDetail<IEpisodeResponse> = await fetchC.get(url, {
            cache: "no-store"
        });
        return res;
    },
    listByCategory: async (slug: string) => {
        const url = "/movies/category/" + slug;
        const res: IBaseResponse<IMovieResponse> = await fetchC.get(url, {
            cache: "no-store"
        });
        return res;
    },
    historyClient: async (data: Array<IEpisodeHistory>) => {
        const url = "/movies/histories-client/";
        const res: IBaseResponse<IMovieHistory> = await fetchC.post(url, { data });
        return res;
    },
    historyAccount: async (token: string) => {
        const url = "/movies/histories-account/";
        const res: IBaseResponse<IMovieResponse> = await fetchC.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return res;
    }
}

export default moviesApi;