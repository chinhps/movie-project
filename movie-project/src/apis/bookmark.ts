import fetchC from "@/libs/fetchC";
import { IBaseResponse, IResponseWithMessage } from "@/types/base.type";
import { IBookmark, IMovieResponse } from "@/types/response/movies.type";

const bookmarkApi = {
    toggleBookmark: async ({ slug, token }: { slug: string, token: string }) => {
        const url = "/movies/bookmarks";
        const res: IResponseWithMessage = await fetchC.put(url, {
            slug,
        }, {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            },
        });
        return res;
    },
    bookmarksClient: async ({ data, page }: { data: Array<IBookmark>, page: number }) => {
        const url = "/movies/bookmarks-client";
        const res: IBaseResponse<IMovieResponse> = await fetchC.put(url, { data, page });
        return res;
    },
    bookmarksUser: async (token: string) => {
        const url = "/movies/bookmarks";
        const res: IBaseResponse<string> = await fetchC.get(url, {
            cache: "no-store",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "content-type": "application/json",
                "Authorization": "Bearer " + token
            },
        });
        return res;
    },
}

export default bookmarkApi;