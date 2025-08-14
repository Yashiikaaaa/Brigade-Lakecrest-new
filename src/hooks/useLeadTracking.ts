import { useCallback } from "react";
import ReactGA from "react-ga4";

// Types
interface CustomParameters {
  lead_source: string;
  property_type: string | null;
  funnel_stage: string;
}

interface GAEvent {
  category: string;
  action: string;
  label: string;
  custom_parameters: CustomParameters;
}

type FormType = string;
type PropertyType = string | null;

// Hook return type
interface UseLeadTrackingReturn {
  trackButtonClick: (
    source: string,
    action: string,
    label: string,
    propertyType?: PropertyType
  ) => void;
  trackFormSubmission: (
    source: string,
    formType: FormType,
    propertyType?: PropertyType
  ) => void;
  trackFormOpen: (
    source: string,
    formType: FormType,
    propertyType?: PropertyType
  ) => void;
}

export const useLeadTracking = (): UseLeadTrackingReturn => {
  const trackButtonClick = useCallback(
    (
      source: string,
      action: string,
      label: string,
      propertyType: PropertyType = null
    ): void => {
      const event: GAEvent = {
        category: "Button Click",
        action: action,
        label: `${source}${propertyType ? ` - ${propertyType}` : ""}`,
        custom_parameters: {
          lead_source: source,
          property_type: propertyType,
          funnel_stage: "interest",
        },
      };

      ReactGA.event(event);
    },
    []
  );

  const trackFormSubmission = useCallback(
    (
      source: string,
      formType: FormType,
      propertyType: PropertyType = null
    ): void => {
      const event: GAEvent = {
        category: "Form Submission",
        action: `${formType}_submit`,
        label: `${source}${propertyType ? ` - ${propertyType}` : ""}`,
        custom_parameters: {
          lead_source: source,
          property_type: propertyType,
          funnel_stage:
            formType === "contact_form" ? "lead" : "site_visit_request",
        },
      };

      ReactGA.event(event);
    },
    []
  );

  const trackFormOpen = useCallback(
    (
      source: string,
      formType: FormType,
      propertyType: PropertyType = null
    ): void => {
      const normalize = (str: string): string =>
        (str || "")
          .toLowerCase()
          .replace(/[_\s]+/g, "")
          .trim();

      const event: GAEvent = {
        category: "Form Interaction",
        action: `${formType}_opened`,
        label:
          propertyType && !normalize(source).includes(normalize(propertyType))
            ? `${source} - ${propertyType}`
            : source,
        custom_parameters: {
          lead_source: source,
          property_type: propertyType,
          funnel_stage: "consideration",
        },
      };

      ReactGA.event(event);
    },
    []
  );

  return {
    trackButtonClick,
    trackFormSubmission,
    trackFormOpen,
  };
};

// Lead source constants (now just plain strings)
export const LEAD_SOURCES: Record<string, string> = {
  HERO: "hero_banner",
  OVERVIEW: "overview_section",
  PRICING: "pricing_section",
  MASTER_PLAN: "master_plan_section",
  FOOTER: "footer_section",
  CONTACT_FORM_LINK: "contact_form_internal_link",
  UNKNOWN: "unknown_source",
};

// Property types (also plain strings)
export const PROPERTY_TYPES: Record<string, string> = {
  sqft2400: "2400 sq.ft",
  sqft4000: "4000 sq.ft",
};
