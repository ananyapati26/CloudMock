import Navbar from "@/components/navbar/Navbar";
// import SessionWrapper from "@/components/SessionWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      <div className="flex flex-col p-6">{children}</div>
    </main>
  );
}

//ek project mein ek hi body tag and html tag allowed
