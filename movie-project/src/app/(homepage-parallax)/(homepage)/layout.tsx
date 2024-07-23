import { Container } from "@chakra-ui/react";
import infoApi from "@/apis/info";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const infos = await infoApi.infos();

  return (
    <>
      <Container size="md" mt="5rem" minH="90vh">
        {children}
      </Container>
    </>
  );
}
