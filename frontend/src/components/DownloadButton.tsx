"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { NdaFormData } from "@/utils/nda-types";
import { NdaPdfDocument } from "./NdaPdfDocument";

export function DownloadButton({ data }: { data: NdaFormData }) {
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleDownload() {
    setIsGenerating(true);
    try {
      const blob = await pdf(<NdaPdfDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const partyName = data.partyA.companyName || "Party-1";
      link.download = `Mutual-NDA-${partyName.replace(/\s+/g, "-")}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:opacity-50"
    >
      {isGenerating ? "Generating PDF..." : "Download PDF"}
    </button>
  );
}
