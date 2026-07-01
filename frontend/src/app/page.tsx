"use client";

import { useState } from "react";
import { DocumentPreview } from "@/components/DocumentPreview";
import { DownloadButton } from "@/components/DownloadButton";
import { NdaForm } from "@/components/NdaForm";
import { createDefaultFormData, NdaFormData } from "@/utils/nda-types";

export default function Home() {
  const [data, setData] = useState<NdaFormData>(createDefaultFormData);

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-lg font-bold text-gray-900">
          Mutual NDA Creator
        </h1>
        <p className="text-sm text-gray-500">
          Fill in the details below to generate a Mutual Non-Disclosure
          Agreement.
        </p>
      </header>
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-2">
        <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <NdaForm data={data} onChange={setData} />
        </section>
        <section className="space-y-4">
          <div className="flex justify-end">
            <DownloadButton data={data} />
          </div>
          <DocumentPreview data={data} />
        </section>
      </main>
    </div>
  );
}
