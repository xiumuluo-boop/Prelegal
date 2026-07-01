import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
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

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 10, fontFamily: "Helvetica", color: "#111" },
  title: { fontSize: 16, fontWeight: 700, marginBottom: 8 },
  sectionTitle: { fontSize: 11, fontWeight: 700, marginTop: 12, marginBottom: 4 },
  paragraph: { marginBottom: 6, lineHeight: 1.4 },
  bold: { fontWeight: 700 },
  link: { textDecoration: "underline" },
  table: { marginTop: 8, marginBottom: 8 },
  row: { flexDirection: "row" },
  cellLabel: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 4,
    fontWeight: 700,
  },
  cell: {
    width: "40%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 4,
  },
  footer: { marginTop: 16, fontSize: 8, color: "#666" },
});

function RichText({ text }: { text: string }) {
  const segments = parseSegments(text);
  return (
    <Text style={styles.paragraph}>
      {segments.map((segment, i) => (
        <Text
          key={i}
          style={segment.bold ? styles.bold : segment.link ? styles.link : undefined}
        >
          {segment.text}
        </Text>
      ))}
    </Text>
  );
}

function PdfSection({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{heading}</Text>
      {paragraphs.map((p, i) => (
        <RichText key={i} text={p} />
      ))}
    </View>
  );
}

export function NdaPdfDocument({ data }: { data: NdaFormData }) {
  const coverSections = getCoverPageSections(data);
  const standardSections = getStandardTermsSections();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Mutual Non-Disclosure Agreement</Text>
        <RichText text={getCoverPageIntro()} />

        {coverSections.map((section) => (
          <PdfSection key={section.heading} {...section} />
        ))}

        <Text style={styles.paragraph}>
          By signing this Cover Page, each party agrees to enter into this MNDA
          as of the Effective Date.
        </Text>
        <View style={styles.table}>
          {signatureLabels.map((label, i) => (
            <View key={label} style={styles.row}>
              <Text style={styles.cellLabel}>{label}</Text>
              <Text style={styles.cell}>{getSignatureRow(data, "partyA")[i]}</Text>
              <Text style={styles.cell}>{getSignatureRow(data, "partyB")[i]}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.title, { fontSize: 13, marginTop: 12 }]}>
          Standard Terms
        </Text>
        {standardSections.map((section) => (
          <PdfSection key={section.heading} {...section} />
        ))}

        <Text style={styles.footer}>{standardTermsFooter}</Text>
      </Page>
    </Document>
  );
}
