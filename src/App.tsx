import "./App.css";
import { Header } from "./Components/Header";
import HomePage from "./Pages/HomePage";
import PropertyPage from "./Pages/PropertyPage";
import PlotDetailsPage from "./Pages/PlotDetails";
import LocationPage from "./Pages/LocationPage";
import StandardsPage from "./Pages/StandardsPage";
import LifestylePage from "./Pages/Lifestyle";
import Footer from "./Components/Footer";
import EnquiryModal from "./Components/EnquiryModal";
import ReactGA from "react-ga4";
import { useLeadTracking } from "./hooks/useLeadTracking";

import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToSectionWrapper from "./Components/ScrollToSectionWrapper";

// Define types for lead source tracking
export interface LeadSource {
  source: string;
  propertyType?: string | null;
}

const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID;

function App() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [leadSource, setLeadSource] = useState<LeadSource | null>(null);
  const { trackFormOpen } = useLeadTracking();

  const gaInitialized = useRef(false);
  
  useEffect(() => {
    if (gaInitialized.current) return;
    gaInitialized.current = true;

    ReactGA.initialize(trackingId!, {
      gtagOptions: {
        send_page_view: false // Disable automatic pageview
      }
    });
    
    // Get UTM parameters
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");

    // Manually send pageview with UTM parameters included
    ReactGA.gtag('event', 'page_view', {
      page_path: window.location.pathname,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign
    });
  }, []);

  // Enhanced modal opening function with lead source tracking
  const openModal = (source: string, propertyType: string | null = null) => {
    setLeadSource({ source, propertyType });
    trackFormOpen(source, 'contact_form', propertyType);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    // Optionally clear lead source when closing
    // setLeadSource(null);
  };

  const layoutProps = { openModal };

  const FullLayout = () => (
    <>
      <HomePage {...layoutProps} />
      <PropertyPage {...layoutProps} />
      <PlotDetailsPage {...layoutProps} />
      <LocationPage />
      <StandardsPage />
      <LifestylePage />
    </>
  );

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ScrollToSectionWrapper>
              <FullLayout />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/home"
          element={
            <ScrollToSectionWrapper scrollTo="home">
              <FullLayout />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/overview"
          element={
            <ScrollToSectionWrapper scrollTo="overview">
              <FullLayout />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/location"
          element={
            <ScrollToSectionWrapper scrollTo="location">
              <FullLayout />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/amenities"
          element={
            <ScrollToSectionWrapper scrollTo="amenities">
              <FullLayout />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/gallery"
          element={
            <ScrollToSectionWrapper scrollTo="gallery">
              <FullLayout />
            </ScrollToSectionWrapper>
          }
        />
        <Route
          path="/floorplan"
          element={
            <ScrollToSectionWrapper scrollTo="floorplan">
              <FullLayout />
            </ScrollToSectionWrapper>
          }
        />
      </Routes>

      <Footer {...layoutProps} />
      <EnquiryModal 
        isOpen={isModalOpen} 
        closeModal={closeModal}
        leadSource={leadSource!}
      />
    </>
  );
}

export default App;