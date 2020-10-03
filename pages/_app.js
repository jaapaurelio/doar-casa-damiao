import "../styles/globals.css";
import PageHeader from "../components/PageHeader";

function MyApp({ Component, pageProps }) {
  return (
    <div style={{maxWidth: "900px", margin: '0 auto'}}>
      <PageHeader></PageHeader>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
