export interface PartyInfo {
  companyName: string;
  signerName: string;
  signerTitle: string;
  noticeAddress: string;
}

export type MndaTermType = "expires" | "until-terminated";
export type ConfidentialityTermType = "years" | "perpetuity";

export interface NdaFormData {
  partyA: PartyInfo;
  partyB: PartyInfo;
  purpose: string;
  effectiveDate: string; // yyyy-mm-dd
  mndaTermType: MndaTermType;
  mndaTermYears: number;
  confidentialityTermType: ConfidentialityTermType;
  confidentialityYears: number;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
}

const emptyParty: PartyInfo = {
  companyName: "",
  signerName: "",
  signerTitle: "",
  noticeAddress: "",
};

export function createDefaultFormData(): NdaFormData {
  return {
    partyA: { ...emptyParty },
    partyB: { ...emptyParty },
    purpose:
      "Evaluating whether to enter into a business relationship with the other party.",
    effectiveDate: new Date().toISOString().slice(0, 10),
    mndaTermType: "expires",
    mndaTermYears: 1,
    confidentialityTermType: "years",
    confidentialityYears: 1,
    governingLaw: "",
    jurisdiction: "",
    modifications: "",
  };
}

export function formatDisplayDate(iso: string): string {
  if (!iso) return "[Not set]";
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "[Not set]";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatMndaTerm(data: NdaFormData): string {
  if (data.mndaTermType === "expires") {
    return `Expires ${data.mndaTermYears} year(s) from the Effective Date.`;
  }
  return "Continues until terminated in accordance with the terms of the MNDA.";
}

export function formatConfidentialityTerm(data: NdaFormData): string {
  if (data.confidentialityTermType === "years") {
    return `${data.confidentialityYears} year(s) from the Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.`;
  }
  return "In perpetuity.";
}
