import { lazy, Suspense, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { AppProvider, useAppContext } from "./context/AppContext";
import { useDeviceCapabilities } from "./hooks/useDeviceCapabilities";
import SystemBoot from "./components/SystemBoot/SystemBoot";
import CustomCursor from "./components/Cursor/Cursor";
import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Hero/Hero";
import SecretGame from "./components/SecretGame/SecretGame";
import TechMarquee from "./components/Transitions/TechMarquee";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./styles/global.css";

const About = lazy(() => import("./components/About/About"));
const Journey = lazy(() => import("./components/Journey/Journey"));
const DeveloperCore = lazy(() => import("./components/DeveloperCore/DeveloperCore"));
const Lab = lazy(() => import("./components/Lab/Lab"));
const TechUniverse = lazy(() => import("./components/TechUniverse/TechUniverse"));
const CodeExperience = lazy(() => import("./components/CodeExperience/CodeExperience"));
const Contact = lazy(() => import("./components/Contact/Contact"));

function SectionFallback() {
  return <div style={{ minHeight: "50vh" }} aria-hidden />;
}

function AppContent() {
  const { secretUnlocked } = useAppContext();
  const { isTouch } = useDeviceCapabilities();

  useEffect(() => {
    document.body.classList.toggle("touch-device", isTouch);
    document.body.classList.toggle("secret-mode", secretUnlocked);
  }, [isTouch, secretUnlocked]);

  return (
    <>
      <div className="grid-overlay" aria-hidden />
      <div className="noise-overlay" aria-hidden />
      <SystemBoot />
      <CustomCursor />
      <Navigation />
      <SecretGame />

      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <ErrorBoundary>
            <About />
            <Journey />
            <DeveloperCore />
            <Lab />
            <TechMarquee />
            <TechUniverse />
            <CodeExperience />
            <Contact />
          </ErrorBoundary>
        </Suspense>
      </main>

      <Analytics />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
