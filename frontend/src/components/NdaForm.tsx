"use client";

import { NdaFormData, PartyInfo } from "@/utils/nda-types";

interface NdaFormProps {
  data: NdaFormData;
  onChange: (data: NdaFormData) => void;
}

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";
const fieldsetClass = "space-y-4 border-b border-gray-200 pb-6";
const legendClass = "text-base font-semibold text-gray-900";

function PartyFields({
  title,
  party,
  onChange,
}: {
  title: string;
  party: PartyInfo;
  onChange: (party: PartyInfo) => void;
}) {
  return (
    <fieldset className={fieldsetClass}>
      <legend className={legendClass}>{title}</legend>
      <div>
        <label className={labelClass}>Company Name</label>
        <input
          className={inputClass}
          value={party.companyName}
          onChange={(e) => onChange({ ...party, companyName: e.target.value })}
          placeholder="Acme, Inc."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Signer Name</label>
          <input
            className={inputClass}
            value={party.signerName}
            onChange={(e) => onChange({ ...party, signerName: e.target.value })}
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className={labelClass}>Signer Title</label>
          <input
            className={inputClass}
            value={party.signerTitle}
            onChange={(e) => onChange({ ...party, signerTitle: e.target.value })}
            placeholder="CEO"
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>Notice Address</label>
        <input
          className={inputClass}
          value={party.noticeAddress}
          onChange={(e) =>
            onChange({ ...party, noticeAddress: e.target.value })
          }
          placeholder="Email or postal address"
        />
      </div>
    </fieldset>
  );
}

export function NdaForm({ data, onChange }: NdaFormProps) {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <PartyFields
        title="Party 1"
        party={data.partyA}
        onChange={(partyA) => onChange({ ...data, partyA })}
      />
      <PartyFields
        title="Party 2"
        party={data.partyB}
        onChange={(partyB) => onChange({ ...data, partyB })}
      />

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>Purpose</legend>
        <textarea
          className={inputClass}
          rows={2}
          value={data.purpose}
          onChange={(e) => onChange({ ...data, purpose: e.target.value })}
        />
      </fieldset>

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>Effective Date</legend>
        <input
          type="date"
          className={inputClass}
          value={data.effectiveDate}
          onChange={(e) => onChange({ ...data, effectiveDate: e.target.value })}
        />
      </fieldset>

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>MNDA Term</legend>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={data.mndaTermType === "expires"}
              onChange={() => onChange({ ...data, mndaTermType: "expires" })}
            />
            Expires
            <input
              type="number"
              min={1}
              className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
              value={data.mndaTermYears}
              onChange={(e) =>
                onChange({
                  ...data,
                  mndaTermType: "expires",
                  mndaTermYears: Number(e.target.value) || 1,
                })
              }
            />
            year(s) from Effective Date
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={data.mndaTermType === "until-terminated"}
              onChange={() =>
                onChange({ ...data, mndaTermType: "until-terminated" })
              }
            />
            Continues until terminated
          </label>
        </div>
      </fieldset>

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>Term of Confidentiality</legend>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={data.confidentialityTermType === "years"}
              onChange={() =>
                onChange({ ...data, confidentialityTermType: "years" })
              }
            />
            <input
              type="number"
              min={1}
              className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
              value={data.confidentialityYears}
              onChange={(e) =>
                onChange({
                  ...data,
                  confidentialityTermType: "years",
                  confidentialityYears: Number(e.target.value) || 1,
                })
              }
            />
            year(s) from Effective Date
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={data.confidentialityTermType === "perpetuity"}
              onChange={() =>
                onChange({ ...data, confidentialityTermType: "perpetuity" })
              }
            />
            In perpetuity
          </label>
        </div>
      </fieldset>

      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>Governing Law & Jurisdiction</legend>
        <div>
          <label className={labelClass}>Governing Law (State)</label>
          <input
            className={inputClass}
            value={data.governingLaw}
            onChange={(e) =>
              onChange({ ...data, governingLaw: e.target.value })
            }
            placeholder="Delaware"
          />
        </div>
        <div>
          <label className={labelClass}>Jurisdiction (City/County, State)</label>
          <input
            className={inputClass}
            value={data.jurisdiction}
            onChange={(e) =>
              onChange({ ...data, jurisdiction: e.target.value })
            }
            placeholder="New Castle, DE"
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4 pb-2">
        <legend className={legendClass}>MNDA Modifications</legend>
        <textarea
          className={inputClass}
          rows={2}
          value={data.modifications}
          onChange={(e) =>
            onChange({ ...data, modifications: e.target.value })
          }
          placeholder="List any modifications to the MNDA (optional)"
        />
      </fieldset>
    </form>
  );
}
