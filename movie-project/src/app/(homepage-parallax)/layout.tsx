import pluginApi from "@/apis/plugin";
import "@/app/globals.css";
import Footer from "@/components/Layouts/Footer";
import NavberV2 from "@/components/Layouts/Navbar/NavbarV2";
import { Box } from "@chakra-ui/react";

export default async function BannerParallaxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const infors = await pluginApi.infor();
  return (
    <>
      {/* <Navbar logoURL={infors.data["LOGO"]} /> */}
      <NavberV2 logoURL={infors.data["LOGO"]}/>
      <Box minH="90vh">
        {children}
      </Box>
      <Footer data={infors.data} />
    </>
  );
}
