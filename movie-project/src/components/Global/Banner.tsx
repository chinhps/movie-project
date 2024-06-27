import inforApi from "@/apis/infor";
import dynamic from "next/dynamic";
const SlickNext = dynamic(() => import("./SlickNext/SlickNext"), {
  ssr: false,
});

export default async function Banner() {
  const banners = await inforApi.banners();

  return (
    <>
      <SlickNext data={banners} />
    </>
  );
}
