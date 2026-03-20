import React, { useState } from "react";
import { base44 } from "@/api/base44Client";

const serif = { fontFamily: "'Playfair Display', serif" };

const DAY_FIELDS = {
  1: {
    label: 'Day 1 — Problem–Value Matrix',
    disclosure: 'Your responses are auto-saved and emailed to you. You retain full ownership of your business concepts. Heartset Design Co. may use anonymized, aggregated insights for research and benchmarking.',
    fields: [
      { key: 'problem_statement', label: 'Problem Statement', placeholder: 'One sentence.', type: 'textarea' },
      { key: 'who_experiences', label: 'Who experiences this problem?', placeholder: 'Role, industry, context.', type: 'textarea' },
      { key: 'cost_of_inaction', label: 'Estimated cost of inaction', placeholder: 'e.g. $50,000/year in lost revenue', type: 'text' },
      { key: 'urgency_reason', label: 'Why must this be solved within 90 days?', placeholder: 'What changes if it is not?', type: 'textarea' },
      { key: 'ignored_outcome', label: 'What currently happens when it is ignored?', placeholder: 'Real-world consequence.', type: 'textarea' },
    ]
  },
  2: {
    label: 'Day 2 — Mechanism Blueprint',
    disclosure: 'Your responses are auto-saved and emailed to you. You retain full ownership of your business concepts. Heartset Design Co. may use anonymized, aggregated insights for research and benchmarking.',
    fields: [
      { key: 'protocol_outline', label: '4-Stage Protocol (short outline)', placeholder: 'Diagnosis → Strategy → Installation → Optimization — describe each briefly.', type: 'textarea' },
      { key: 'outcome_90_days', label: '90-Day Outcome', placeholder: 'What tangibly changes for the client?', type: 'textarea' },
      { key: 'installation_price', label: 'Installation Price', placeholder: 'e.g. $6,950', type: 'text' },
      { key: 'scale_bottleneck', label: 'One bottleneck currently preventing scale', placeholder: 'Be specific.', type: 'textarea' },
      { key: 'common_objection', label: 'One objection you commonly encounter', placeholder: 'What do prospects say before they say yes or no?', type: 'textarea' },
    ]
  }
};

export default function HomeworkForm({ day, userEmail }) {
  const config = DAY_FIELDS[day];
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const response = config.fields.map(f => `${f.label}: ${values[f.key] || '—'}`).join('\n\n');
    await base44.entities.HomeworkSubmission.create({
      assignmentName: config.label,
      response,
      userEmail,
    });
    // Auto-email copy
    await base44.integrations.Core.SendEmail({
      to: userEmail,
      subject: `Your ${config.label} — Heartset Design Co.`,
      body: `Here is a copy of your submission:\n\n${response}\n\n—\nResponses may inform anonymized industry benchmarking reports.\n© Heartset Design Co. 2026`
    });
    setSaving(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-black/10 px-6 py-8 text-center mt-8">
        <div className="w-8 h-px bg-black mx-auto mb-4" />
        <p className="text-sm font-medium mb-1" style={serif}>Submission received.</p>
        <p className="text-xs text-black/40">A copy has been sent to {userEmail}.</p>
      </div>
    );
  }

  return (
    <div className="border border-black/15 bg-white mt-8">
      <div className="h-[2px] bg-black" />
      <div className="px-6 py-6">
        <p className="text-xs tracking-[0.25em] uppercase text-black/30 mb-1">Homework</p>
        <h3 className="text-xl mb-2" style={serif}>{config.label}</h3>
        <p className="text-[11px] text-black/30 mb-5 leading-relaxed border-l-2 border-black/10 pl-3">{config.disclosure}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {config.fields.map(field => (
            <div key={field.key}>
              <label className="block text-xs tracking-[0.12em] uppercase text-black/40 mb-1.5">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  rows={3}
                  placeholder={field.placeholder}
                  value={values[field.key] || ''}
                  onChange={e => setValues(v => ({ ...v, [field.key]: e.target.value }))}
                  className="w-full border border-black/12 focus:border-black/40 outline-none px-3 py-2 text-sm text-black font-light resize-none transition-colors"
                />
              ) : (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={values[field.key] || ''}
                  onChange={e => setValues(v => ({ ...v, [field.key]: e.target.value }))}
                  className="w-full border border-black/12 focus:border-black/40 outline-none px-3 py-2 text-sm text-black font-light transition-colors"
                />
              )}
            </div>
          ))}

          <div className="flex items-center justify-between pt-2">
            <p className="text-[10px] text-black/20">© Heartset Design Co. 2026</p>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-black text-white text-xs tracking-[0.15em] uppercase hover:bg-black/80 disabled:opacity-40 transition-colors"
            >
              {saving ? 'Saving…' : 'Submit & Email Copy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}