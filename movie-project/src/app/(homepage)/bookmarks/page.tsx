import Header from "@/components/Global/Header";
import { MovieItemV2 } from "@/components/Global/MovieItem";
import HomeLayout from "@/components/Layouts/HomeLayout";
import { Button } from "@chakra-ui/react";

export default function BookmarkPage() {
  return (
    <>
      <Header>BOOKMARK Ở TRÌNH DUYỆT</Header>
      {/* <HomeLayout mt={5}>
        {new Array(15).fill(0).map((_, index) => (
          <MovieItemV2 key={index} />
        ))}
      </HomeLayout> */}
    </>
  );
}
