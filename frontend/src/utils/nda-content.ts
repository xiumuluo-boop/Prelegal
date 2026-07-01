import {
  NdaFormData,
  formatConfidentialityTerm,
  formatDisplayDate,
  formatMndaTerm,
} from "./nda-types";

export interface DocSection {
  heading: string;
  paragraphs: string[];
}

const orDefault = (value: string, fallback: string) =>
  value.trim() ? value : fallback;

export function getCoverPageIntro(): string {
  return `This Mutual Non-Disclosure Agreement (the **"MNDA"**) consists of: (1) this Cover Page (**"Cover Page"**) and (2) the Common Paper Mutual NDA Standard Terms Version 1.0 (**"Standard Terms"**) identical to those posted at commonpaper.com/standards/mutual-nda/1.0. Any modifications of the Standard Terms should be made on the Cover Page, which will control over conflicts with the Standard Terms.`;
}

export function getCoverPageSections(data: NdaFormData): DocSection[] {
  return [
    {
      heading: "Purpose",
      paragraphs: [orDefault(data.purpose, "[Not specified]")],
    },
    {
      heading: "Effective Date",
      paragraphs: [formatDisplayDate(data.effectiveDate)],
    },
    {
      heading: "MNDA Term",
      paragraphs: [formatMndaTerm(data)],
    },
    {
      heading: "Term of Confidentiality",
      paragraphs: [formatConfidentialityTerm(data)],
    },
    {
      heading: "Governing Law & Jurisdiction",
      paragraphs: [
        `Governing Law: ${orDefault(data.governingLaw, "[Not specified]")}`,
        `Jurisdiction: ${orDefault(data.jurisdiction, "[Not specified]")}`,
      ],
    },
    {
      heading: "MNDA Modifications",
      paragraphs: [orDefault(data.modifications, "None.")],
    },
  ];
}

export const signatureLabels = [
  "Signature",
  "Print Name",
  "Title",
  "Company",
  "Notice Address",
  "Date",
] as const;

export function getSignatureRow(
  data: NdaFormData,
  party: "partyA" | "partyB",
): string[] {
  const p = data[party];
  return ["", p.signerName, p.signerTitle, p.companyName, p.noticeAddress, ""];
}

export function getStandardTermsSections(): DocSection[] {
  return [
    {
      heading: "1. Introduction",
      paragraphs: [
        `This Mutual Non-Disclosure Agreement (which incorporates these Standard Terms and the Cover Page (defined below)) (**"MNDA"**) allows each party (**"Disclosing Party"**) to disclose or make available information in connection with the {{link}}Purpose{{/link}} which (1) the Disclosing Party identifies to the receiving party (**"Receiving Party"**) as "confidential", "proprietary", or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure (**"Confidential Information"**). Each party's Confidential Information also includes the existence and status of the parties' discussions and information on the Cover Page. Confidential Information includes technical or business information, product designs or roadmaps, requirements, pricing, security and compliance documentation, technology, inventions and know-how. To use this MNDA, the parties must complete and sign a cover page incorporating these Standard Terms (**"Cover Page"**). Each party is identified on the Cover Page and capitalized terms have the meanings given herein or on the Cover Page.`,
      ],
    },
    {
      heading: "2. Use and Protection of Confidential Information",
      paragraphs: [
        `The Receiving Party shall: (a) use Confidential Information solely for the {{link}}Purpose{{/link}}; (b) not disclose Confidential Information to third parties without the Disclosing Party's prior written approval, except that the Receiving Party may disclose Confidential Information to its employees, agents, advisors, contractors and other representatives having a reasonable need to know for the {{link}}Purpose{{/link}}, provided these representatives are bound by confidentiality obligations no less protective of the Disclosing Party than the applicable terms in this MNDA and the Receiving Party remains responsible for their compliance with this MNDA; and (c) protect Confidential Information using at least the same protections the Receiving Party uses for its own similar information but no less than a reasonable standard of care.`,
      ],
    },
    {
      heading: "3. Exceptions",
      paragraphs: [
        `The Receiving Party's obligations in this MNDA do not apply to information that it can demonstrate: (a) is or becomes publicly available through no fault of the Receiving Party; (b) it rightfully knew or possessed prior to receipt from the Disclosing Party without confidentiality restrictions; (c) it rightfully obtained from a third party without confidentiality restrictions; or (d) it independently developed without using or referencing the Confidential Information.`,
      ],
    },
    {
      heading: "4. Disclosures Required by Law",
      paragraphs: [
        `The Receiving Party may disclose Confidential Information to the extent required by law, regulation or regulatory authority, subpoena or court order, provided (to the extent legally permitted) it provides the Disclosing Party reasonable advance notice of the required disclosure and reasonably cooperates, at the Disclosing Party's expense, with the Disclosing Party's efforts to obtain confidential treatment for the Confidential Information.`,
      ],
    },
    {
      heading: "5. Term and Termination",
      paragraphs: [
        `This MNDA commences on the {{link}}Effective Date{{/link}} and expires at the end of the {{link}}MNDA Term{{/link}}. Either party may terminate this MNDA for any or no reason upon written notice to the other party. The Receiving Party's obligations relating to Confidential Information will survive for the {{link}}Term of Confidentiality{{/link}}, despite any expiration or termination of this MNDA.`,
      ],
    },
    {
      heading: "6. Return or Destruction of Confidential Information",
      paragraphs: [
        `Upon expiration or termination of this MNDA or upon the Disclosing Party's earlier request, the Receiving Party will: (a) cease using Confidential Information; (b) promptly after the Disclosing Party's written request, destroy all Confidential Information in the Receiving Party's possession or control or return it to the Disclosing Party; and (c) if requested by the Disclosing Party, confirm its compliance with these obligations in writing. As an exception to subsection (b), the Receiving Party may retain Confidential Information in accordance with its standard backup or record retention policies or as required by law, but the terms of this MNDA will continue to apply to the retained Confidential Information.`,
      ],
    },
    {
      heading: "7. Proprietary Rights",
      paragraphs: [
        `The Disclosing Party retains all of its intellectual property and other rights in its Confidential Information and its disclosure to the Receiving Party grants no license under such rights.`,
      ],
    },
    {
      heading: "8. Disclaimer",
      paragraphs: [
        `ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS", WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.`,
      ],
    },
    {
      heading: "9. Governing Law and Jurisdiction",
      paragraphs: [
        `This MNDA and all matters relating hereto are governed by, and construed in accordance with, the laws of the State of {{link}}Governing Law{{/link}}, without regard to the conflict of laws provisions of such {{link}}Governing Law{{/link}}. Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in {{link}}Jurisdiction{{/link}}. Each party irrevocably submits to the exclusive jurisdiction of such {{link}}Jurisdiction{{/link}} in any such suit, action, or proceeding.`,
      ],
    },
    {
      heading: "10. Equitable Relief",
      paragraphs: [
        `A breach of this MNDA may cause irreparable harm for which monetary damages are an insufficient remedy. Upon a breach of this MNDA, the Disclosing Party is entitled to seek appropriate equitable relief, including an injunction, in addition to its other remedies.`,
      ],
    },
    {
      heading: "11. General",
      paragraphs: [
        `Neither party has an obligation under this MNDA to disclose Confidential Information to the other or proceed with any proposed transaction. Neither party may assign this MNDA without the prior written consent of the other party, except that either party may assign this MNDA in connection with a merger, reorganization, acquisition or other transfer of all or substantially all its assets or voting securities. Any assignment in violation of this Section is null and void. This MNDA will bind and inure to the benefit of each party's permitted successors and assigns. Waivers must be signed by the waiving party's authorized representative and cannot be implied from conduct. If any provision of this MNDA is held unenforceable, it will be limited to the minimum extent necessary so the rest of this MNDA remains in effect. This MNDA (including the Cover Page) constitutes the entire agreement of the parties with respect to its subject matter, and supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral, regarding such subject matter. This MNDA may only be amended, modified, waived, or supplemented by an agreement in writing signed by both parties. Notices, requests and approvals under this MNDA must be sent in writing to the email or postal addresses on the Cover Page and are deemed delivered on receipt. This MNDA may be executed in counterparts, including electronic copies, each of which is deemed an original and which together form the same agreement.`,
      ],
    },
  ];
}

export const standardTermsFooter =
  "Common Paper Mutual Non-Disclosure Agreement Version 1.0 (commonpaper.com/standards/mutual-nda/1.0) free to use under CC BY 4.0 (creativecommons.org/licenses/by/4.0).";
