import pluginApi from "@/apis/plugin";
import "@/app/globals.css";
import Footer from "@/components/Layouts/Footer";
import Navbar from "@/components/Layouts/Navbar/Navbar";
import { Box } from "@chakra-ui/react";

export default async function BannerParallaxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const infors = await pluginApi.infor();
  return (
    <>
      <Navbar logoURL={infors.data["LOGO"]} />
      <Box mt="4rem" minH="90vh">
        {children}
      </Box>
      <Footer data={infors.data} />
    </>
  );
}
