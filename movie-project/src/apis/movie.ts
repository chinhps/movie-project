import fetchC from "@/libs/fetchC";
import { IBaseResponse, IBaseResponseDetail } from "@/types/base.type";
import { IEpisodeHistory } from "@/types/episode.type";
import { IBookmark, IEpisodeResponse, IMovieHistory, IMovieResponse } from "@/types/response/movies.type";

const moviesApi = {
    latest: async ({ page }: { page?: number }) => {
        const url = "/movies/latest";
        const res: IBaseResponse<IMovieResponse> = await fetchC.get(url, {
            cache: "no-store",
            params: {
                page: (page ?? "1").toString(),
            }
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
    list: async ({ page, params }: { page?: number, params?: object }) => {
        const url = "/movies";
        const res: IBaseResponse<IMovieResponse> = await fetchC.get(url, {
            cache: "no-store",
            params: {
                page: (page ?? "1").toString(),
                ...params
            }
        });
        return res;
    },
    detail: async (slug: string, token?: string) => {
        let url = "/movies/detail/" + slug;
        const res: IBaseResponseDetail<IMovieResponse> = await fetchC.get(url, {
            cache: "no-store",
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
    listByCategory: async (slug: string, page?: number) => {
        const url = "/movies/category/" + slug;
        const res: IBaseResponse<IMovieResponse> = await fetchC.get(url, {
            cache: "no-store",
            params: {
                page: (page ?? "1").toString()
            }
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
    },
}

export default moviesApi;