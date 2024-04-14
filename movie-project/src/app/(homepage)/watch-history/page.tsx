import Header from "@/components/Global/Header";
import { MovieItemV2 } from "@/components/Global/MovieItem";
import HomeLayout from "@/components/Layouts/HomeLayout";

export default function WatchHistoryPage() {
  return (
    <>
      <Header>LỊCH SỬ PHIM ĐÃ XEM</Header>
      <HomeLayout mt={5}>
        {new Array(15).fill(0).map((_, index) => (
          <MovieItemV2 key={index} watched="Đã xem tập 18" />
        ))}
      </HomeLayout>
    </>
  );
}
