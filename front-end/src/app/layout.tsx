import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Box, ThemeProvider } from "@mui/material";
import theme from "@/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code Commerce",
  description: "Uma loja virtual desenvolvida com microsserviços",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AppRouterCacheProvider
          options={{enableCssLayer: true}}
        >
          <ThemeProvider theme={theme}>
            <Box component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "Background.default",
              mt: ["122px", "135px", "146px"],
              p: 3
            }}
            >{children}</Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
    </html>
  );
}
