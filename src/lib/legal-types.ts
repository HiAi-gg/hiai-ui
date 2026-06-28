// Legal content type definitions — shared models for privacy, terms, and cookies pages

export type LegalSectionBlock = {
  heading?: string;
  body?: string;
  lead?: string;
  bullets?: string[];
};

export type LegalSection = {
  title?: string;
  intro?: string;
  blocks?: LegalSectionBlock[];
  contactEmail?: boolean;
  contactTitle?: string;
  contactText?: string;
};

export type LegalMeta = {
  title?: string;
  descriptionTemplate?: string;
  lastUpdatedLabel?: string;
  lastUpdated?: string;
  backToLegalLabel?: string;
  underReviewTemplate?: string;
};

export type LegalContentModel = {
  meta?: LegalMeta;
  anchors?: Array<{ id: string; label: string }>;
  sections?: Record<string, LegalSection>;
};

export type LegalPageType = 'privacy' | 'terms' | 'cookies';

export type LegalTab = {
  id: LegalPageType;
  label: string;
};
