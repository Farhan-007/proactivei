import React from 'react';
import "../src/index.css";
import "../src/App.css";
import { AppContextProvider } from "../src/context/AppContext";
import GlobalLayoutShell from "../src/components/GlobalLayoutShell";

export const metadata = {
  title: "Proactive I Platform",
  description: "Transforming mindsets through systems thinking and innovation engineering.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <GlobalLayoutShell>
            {children}
          </GlobalLayoutShell>
        </AppContextProvider>
      </body>
    </html>
  );
}
