import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "パーフェクトマンガランキング",
  description: "人気の無料マンガをランキングで紹介するサイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header className="bg-primary text-white p-4 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">パーフェクトマンガランキング</h1>
          </div>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-100 p-4 mt-8">
          <div className="container mx-auto text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} パーフェクトマンガランキング All
            Rights Reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
