import infoApi from "@/apis/info";
import dynamic from "next/dynamic";
const SlickNext = dynamic(() => import("./SlickNext/SlickNext"), {
  ssr: true,
});

export default async function Banner() {
  const banners = await infoApi.banners();

  return (
    <>
      <SlickNext data={banners} />
    </>
  );
}
