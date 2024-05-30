import fetchC from "@/libs/fetchC";
import { IBaseResponseDetail } from "@/types/base.type";
import { HLSResponse } from "@/types/response/hls.type";

const hlsApi = {
    detail: async (slug: string) => {
        const url = "/m3u8/hls/" + slug;
        const res: IBaseResponseDetail<HLSResponse> = await fetchC.get(url, {
            cache: "no-store",
        });
        return res;
    }
}

export default hlsApi;