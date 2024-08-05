import { IFormInput } from "@/components/Global/Form/FormBase";
import { IDetail2P } from "../base.type";

export interface PluginResponse {
    id: number,
    name: string,
    status: "ON" | "OFF",
    form_public: Array<IFormInput>,
    created_at: string,
    plugin_key: string,
    data_public: IDetail2P[];
}