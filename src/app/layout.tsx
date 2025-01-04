import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provide";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--poppins", // Make it a CSS variable
});

export const metadata: Metadata = {
  title: "A Form Builder",
  description:
    "Generate desired forms for your personal or professional surveys!",
  creator: "Karan Kumar",
  applicationName: "Form Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`} // Apply the font using the variable created
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
