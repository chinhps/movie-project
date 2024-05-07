import fetchC from "@/libs/fetchC";
import { IBaseResponse, IResponseWithMessage } from "@/types/base.type";

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
    }
}

export default bookmarkApi;