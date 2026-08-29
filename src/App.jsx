import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./lib/ThemeContext";
import { SmoothScrollProvider } from "./lib/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/Preloader";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const PracticeAreas = lazy(() => import("./pages/PracticeAreas"));
const Attorneys = lazy(() => import("./pages/Attorneys"));
const Internship = lazy(() => import("./pages/Internship"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <ThemeProvider>
      {showIntro && <Preloader onDone={() => setShowIntro(false)} />}
      <BrowserRouter>
        <SmoothScrollProvider>
          <ScrollToTop />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/practice-areas" element={<PracticeAreas />} />
              <Route path="/attorneys" element={<Attorneys />} />
              <Route path="/internship" element={<Internship />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </SmoothScrollProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
