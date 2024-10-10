import type { Metadata, Viewport } from "next";
import { ChakraUIProviders } from "@/providers/Chakra";
import { SessionProvider } from "next-auth/react";
import TanstackProvider from "@/providers/Tanstack";
import SmoothScrollbarProvider from "@/providers/SmoothScrollbar";

export const metadata: Metadata = {
  title: "ANIMEFU | Streaming Anime Dual Subtitles | CHINH.DEV",
  description: "ANIMEFU NƠI VỪA ĐỂ GIẢI TRÍ VÀ LÀ NỀN TẢNG HỌC TẬP TIẾNG ANH",
  keywords: "chinhdev,chinh.dev,animefu,anime dual sub, learn english with anime"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollbarProvider>
          <SessionProvider>
            <TanstackProvider>
              <ChakraUIProviders>{children}</ChakraUIProviders>
            </TanstackProvider>
          </SessionProvider>
        </SmoothScrollbarProvider>
      </body>
    </html>
  );
}
