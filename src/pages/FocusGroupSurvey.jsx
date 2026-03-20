import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

const serif = { fontFamily: "'Playfair Display', serif" };

const QUESTIONS = [
  {
    id: 'primary_bottleneck',
    label: 'What is your primary bottleneck to scaling revenue right now?',
    type: 'select',
    options: ['Intake qualification', 'Pricing confidence', 'Delivery capacity', 'Lead generation', 'Client retention', 'Other'],
  },
  {
    id: 'highest_price',
    label: 'What is the highest price you have charged for a single engagement?',
    type: 'text',
    placeholder: 'e.g. $5,000',
  },
  {
    id: 'current_format',
    label: 'How do you currently deliver your work?',
    type: 'select',
    options: ['1:1 consulting', 'Group program', 'Retainer', 'Workshop / training', 'Productized service', 'Mixed'],
  },
  {
    id: 'protocol_exists',
    label: 'Do you have a defined, repeatable protocol for how you deliver results?',
    type: 'select',
    options: ['Yes — fully documented', 'Yes — in my head', 'Partially', 'Not yet'],
  },
  {
    id: 'revenue_goal',
    label: 'What is your target annual revenue for the next 12 months?',
    type: 'select',
    options: ['Under $100K', '$100K–$250K', '$250K–$500K', '$500K–$1M', 'Over $1M'],
  },
  {
    id: 'infrastructure_readiness',
    label: 'How ready do you feel to install revenue infrastructure in the next 28 days?',
    type: 'select',
    options: ['Ready now', 'Nearly ready', 'Need 1–2 more pieces in place', 'Not ready yet'],
  },
  {
    id: 'next_step',
    label: 'What would be most useful as a next step?',
    type: 'select',
    options: [
      'A 1:1 strategy session',
      'A detailed proposal for infrastructure installation',
      'More information before deciding',
      'I want to build independently',
    ],
  },
  {
    id: 'open_reflection',
    label: 'What was your single biggest insight from this 3-day study?',
    type: 'textarea',
    placeholder: 'One to three sentences. Honest answer preferred.',
  },
];

export default function FocusGroupSurvey() {
  const [user, setUser] = useState(null);
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await base44.entities.SurveyResponse.create({
      surveyId: 'focus_group_final',
      userEmail: user?.email || 'unknown',
      responses: values,
    });
    if (user?.email) {
      const summary = QUESTIONS.map(q => `${q.label}\n→ ${values[q.id] || '—'}`).join('\n\n');
      await base44.integrations.Core.SendEmail({
        to: user.email,
        subject: 'Your Focus Group Research Submission — Heartset Design Co.',
        body: `Thank you for contributing to the Industry Intelligence Briefing.\n\nHere is a copy of your responses:\n\n${summary}\n\n—\nResponses may inform anonymized industry benchmarking reports.\nYou retain full ownership of your business concepts and proprietary processes.\n\n© Heartset Design Co. 2026`,
      });
    }
    setSaving(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-8 h-px bg-black mx-auto mb-8" />
          <CheckCircle className="w-8 h-8 text-black/30 mx-auto mb-4" />
          <h2 className="text-2xl mb-3" style={serif}>Submission received.</h2>
          <p className="text-sm text-black/40 font-light mb-2">A copy has been emailed to you.</p>
          <p className="text-xs text-black/25 mb-8">Your responses may inform anonymized industry benchmarking reports. You retain full ownership of your business concepts.</p>
          <Link to="/VideoLibrary" className="text-xs tracking-[0.15em] uppercase text-black/40 hover:text-black transition-colors">
            ← Return to Library
          </Link>
          <p className="text-[10px] text-black/20 mt-12">© Heartset Design Co. 2026</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black/10">
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/FocusGroupDay3" className="flex items-center gap-2 text-sm text-black/40 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Day 3
          </Link>
          <p className="text-xs tracking-[0.25em] uppercase text-black/25">Research Survey</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Intro */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-black/25 mb-3">Industry Intelligence Briefing</p>
          <h1 className="text-3xl md:text-4xl mb-4" style={serif}>Research Contributor Survey</h1>
          <p className="text-sm text-black/40 font-light leading-relaxed">
            You are not filling out a form. You are contributing to an anonymized benchmarking study across a cohort of high-performing practitioners.
          </p>
        </div>

        {/* IP Disclosure */}
        <div className="border-l-2 border-black/15 pl-4 mb-10">
          <p className="text-xs text-black/40 leading-relaxed">
            By submitting responses, you retain full ownership of your business concepts and proprietary processes.
            Heartset Design Co. may use anonymized and aggregated insights for research, benchmarking, and product development.
            Responses may inform anonymized industry benchmarking reports.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-7">
          {QUESTIONS.map((q, i) => (
            <div key={q.id}>
              <label className="block text-xs tracking-[0.12em] uppercase text-black/40 mb-1.5">
                <span className="text-black/20 mr-2">{String(i + 1).padStart(2, '0')}</span>
                {q.label}
              </label>

              {q.type === 'select' && (
                <select
                  value={values[q.id] || ''}
                  onChange={e => setValues(v => ({ ...v, [q.id]: e.target.value }))}
                  className="w-full border border-black/12 focus:border-black/40 outline-none px-3 py-2.5 text-sm text-black bg-white transition-colors"
                >
                  <option value="">Select…</option>
                  {q.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              )}

              {q.type === 'text' && (
                <input
                  type="text"
                  placeholder={q.placeholder}
                  value={values[q.id] || ''}
                  onChange={e => setValues(v => ({ ...v, [q.id]: e.target.value }))}
                  className="w-full border border-black/12 focus:border-black/40 outline-none px-3 py-2.5 text-sm text-black font-light transition-colors"
                />
              )}

              {q.type === 'textarea' && (
                <textarea
                  rows={4}
                  placeholder={q.placeholder}
                  value={values[q.id] || ''}
                  onChange={e => setValues(v => ({ ...v, [q.id]: e.target.value }))}
                  className="w-full border border-black/12 focus:border-black/40 outline-none px-3 py-2.5 text-sm text-black font-light resize-none transition-colors"
                />
              )}
            </div>
          ))}

          {/* Submit */}
          <div className="pt-4 border-t border-black/8 flex items-center justify-between">
            <p className="text-[10px] text-black/20">© Heartset Design Co. 2026</p>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-black text-white text-xs tracking-[0.15em] uppercase hover:bg-black/80 disabled:opacity-40 transition-colors"
            >
              {saving ? 'Submitting…' : 'Submit Research Survey'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}