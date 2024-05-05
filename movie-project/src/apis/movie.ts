import { IEpisodeHistory } from "@/components/Global/Episode";
import fetchC from "@/libs/fetchC";
import { IBaseResponse, IBaseResponseDetail } from "@/types/base.type";
import { IEpisodeResponse, IMovieResponse } from "@/types/response/movies.type";

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
    detail: async (slug: string) => {
        const url = "/movies/detail/" + slug;
        const res: IBaseResponseDetail<IMovieResponse> = await fetchC.get(url, {
            cache: "no-store"
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
        const res: IBaseResponse<IMovieResponse> = await fetchC.get(url,  {
            cache: "no-store",
        });
        return res;
    }
}

export default moviesApi;