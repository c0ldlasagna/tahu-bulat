"use client"
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthContext } from "@/contexts/auth.context";
import { useEffect, useState } from "react";
import { UserMetadata } from "@supabase/supabase-js";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<UserMetadata | null>(null);
  useEffect(() => {
    const userString = localStorage.getItem("sb-cavlonkkogzqhrquwatk-auth-token");
    if (userString) {
      setUser(JSON.parse(userString).user.user_metadata);
    }
  }, []);
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png" />
        <title>Tahu Bulat 25</title>
      </head>
      <body>
        <AuthContext.Provider value={{ user, setUser }}>
        <Navbar />
        {children}
        <Footer/>
        </AuthContext.Provider>
      </body>
    </html>
  );
}
