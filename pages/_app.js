import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      window.scrollTo(0, 0);
    });
  });

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <PageHeader></PageHeader>
      <Component {...pageProps} />
      <PageFooter></PageFooter>
    </div>
  );
}

export default MyApp;
