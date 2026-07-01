import {
  getCoverPageIntro,
  getCoverPageSections,
  getSignatureRow,
  getStandardTermsSections,
  signatureLabels,
  standardTermsFooter,
} from "@/utils/nda-content";
import { NdaFormData } from "@/utils/nda-types";
import { parseSegments } from "@/utils/segments";

function RichText({ text }: { text: string }) {
  const segments = parseSegments(text);
  return (
    <>
      {segments.map((segment, i) => {
        if (segment.bold) return <strong key={i}>{segment.text}</strong>;
        if (segment.link)
          return (
            <span key={i} className="underline decoration-dotted">
              {segment.text}
            </span>
          );
        return <span key={i}>{segment.text}</span>;
      })}
    </>
  );
}

function Section({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900">{heading}</h3>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-sm leading-relaxed text-gray-800">
          <RichText text={p} />
        </p>
      ))}
    </div>
  );
}

export function DocumentPreview({ data }: { data: NdaFormData }) {
  const coverSections = getCoverPageSections(data);
  const standardSections = getStandardTermsSections();

  return (
    <article className="space-y-8 bg-white p-8 text-gray-900 shadow-sm ring-1 ring-gray-200">
      <header className="space-y-2 border-b border-gray-200 pb-4">
        <h1 className="text-xl font-bold">Mutual Non-Disclosure Agreement</h1>
        <p className="text-sm leading-relaxed text-gray-700">
          <RichText text={getCoverPageIntro()} />
        </p>
      </header>

      <section className="space-y-6">
        {coverSections.map((section) => (
          <Section key={section.heading} {...section} />
        ))}
      </section>

      <section>
        <p className="mb-3 text-sm text-gray-800">
          By signing this Cover Page, each party agrees to enter into this MNDA
          as of the Effective Date.
        </p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left"></th>
              <th className="border border-gray-300 p-2 text-left">Party 1</th>
              <th className="border border-gray-300 p-2 text-left">Party 2</th>
            </tr>
          </thead>
          <tbody>
            {signatureLabels.map((label, i) => (
              <tr key={label}>
                <td className="border border-gray-300 p-2 font-medium">
                  {label}
                </td>
                <td className="border border-gray-300 p-2">
                  {getSignatureRow(data, "partyA")[i]}
                </td>
                <td className="border border-gray-300 p-2">
                  {getSignatureRow(data, "partyB")[i]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="space-y-6 border-t border-gray-200 pt-6">
        <h2 className="text-lg font-bold">Standard Terms</h2>
        {standardSections.map((section) => (
          <Section key={section.heading} {...section} />
        ))}
      </section>

      <footer className="border-t border-gray-200 pt-4 text-xs text-gray-500">
        {standardTermsFooter}
      </footer>
    </article>
  );
}
