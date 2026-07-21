import "./globals.css";
import { ClientLayout } from "../components/client-layout";

export const metadata = {
  title: "Anjanie Sukhnandan",
  description: "Anjanie's website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
