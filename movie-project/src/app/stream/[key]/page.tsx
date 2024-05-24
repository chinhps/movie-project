"use client";

import VideoPlayer from "@/components/Global/VideoPlayer";

export default function StreamPage({
  params: { key },
}: {
  params: { key: string };
}) {
  return (
    <>
      <VideoPlayer src="https://animehay.vtut.me/m3u8/hls/61389.m3u8" />
    </>
  );
}
