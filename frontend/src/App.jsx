import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminGuard = lazy(() => import("./pages/admin/AdminGuard"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminPosts = lazy(() => import("./pages/admin/AdminPosts"));
const AdminPostEditor = lazy(() => import("./pages/admin/AdminPostEditor"));
const AdminTeam = lazy(() => import("./pages/admin/AdminTeam"));
const AdminTeamEditor = lazy(() => import("./pages/admin/AdminTeamEditor"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminTestimonialEditor = lazy(() => import("./pages/admin/AdminTestimonialEditor"));

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
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <AdminGuard>
                    <AdminLayout />
                  </AdminGuard>
                }
              >
                <Route index element={<Navigate to="leads" replace />} />
                <Route path="leads" element={<AdminLeads />} />
                <Route path="posts" element={<AdminPosts />} />
                <Route path="posts/new" element={<AdminPostEditor />} />
                <Route path="posts/:id/edit" element={<AdminPostEditor />} />
                <Route path="team" element={<AdminTeam />} />
                <Route path="team/new" element={<AdminTeamEditor />} />
                <Route path="team/:id/edit" element={<AdminTeamEditor />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="testimonials/new" element={<AdminTestimonialEditor />} />
                <Route path="testimonials/:id/edit" element={<AdminTestimonialEditor />} />
              </Route>
            </Routes>
          </Suspense>
        </SmoothScrollProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
