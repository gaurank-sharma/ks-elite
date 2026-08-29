import Cursor from "./Cursor";
import DisclaimerGate from "./DisclaimerGate";
import TrustMarquee from "./TrustMarquee";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <div className="grain" />
      <Cursor />
      <DisclaimerGate />
      <TrustMarquee />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
