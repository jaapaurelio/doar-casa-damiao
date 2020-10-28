import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      window.scrollTo(0, 0);
    });
  });

  return (
    <div>
      <PageHeader></PageHeader>
      <div className="page-container">
        <Elements stripe={stripePromise}>
          <Component {...pageProps} />
        </Elements>
      </div>

      <PageFooter></PageFooter>
    </div>
  );
}

export default MyApp;
