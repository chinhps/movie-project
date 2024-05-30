import hlsApi from "@/apis/hls";
import VideoPlayer from "@/components/Global/VideoPlayer";
import { notFound } from "next/navigation";

export default async function StreamPage({
  params: { key },
}: {
  params: { key: string };
}) {

  const m3u8 = await hlsApi.detail(key);
  if (typeof m3u8.data === "undefined") {
    return notFound();
  }
  
  return (
    <>
      <VideoPlayer src={m3u8.data.link_m3u8} />
    </>
  );
}
