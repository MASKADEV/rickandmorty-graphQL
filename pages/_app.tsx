import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastProvider, useToasts } from "react-toast-notifications";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;
