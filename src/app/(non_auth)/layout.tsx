import Navbar from "@/components/navbar/Navbar";
// import SessionWrapper from "@/components/SessionWrapper";

//items-center justify-center h-screen
export default function RootLayout({ children }:{children: React.ReactNode}) {
  return (
    <html lang="en">
      {/* <SessionWrapper> */}
        <body>
          <main className="flex flex-col">
            <Navbar />
            {children}
          </main>
        </body>
      {/* </SessionWrapper> */}
    </html>
  );
}
