import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";

const serif = { fontFamily: "'Playfair Display', serif" };

const REFLECTION_QUESTIONS = [
  {
    id: 'structural_weakness',
    label: 'What structural weakness became most visible during this session?',
    type: 'textarea',
    placeholder: 'Be specific.',
  },
  {
    id: 'protocol_gap',
    label: 'What part of your protocol requires the most reinforcement?',
    type: 'textarea',
    placeholder: 'Diagnosis, delivery, pricing, retention — where is the gap?',
  },
  {
    id: 'revenue_rhythm',
    label: 'What revenue rhythm did your conservative model produce?',
    type: 'text',
    placeholder: 'e.g. $208,500 annualized at 10% floor',
  },
  {
    id: 'thirty_day_change',
    label: 'What would implementing this within 30 days change for you?',
    type: 'textarea',
    placeholder: 'Operationally. Financially. Specifically.',
  },
];

const DECISION_OPTIONS = [
  {
    value: 'ready',
    label: 'A',
    text: 'I am ready to install the infrastructure now.',
  },
  {
    value: 'independent',
    label: 'B',
    text: 'I intend to implement independently.',
  },
  {
    value: 'not_now',
    label: 'C',
    text: 'I am not implementing at this time.',
  },
];

export default function FocusGroupSurvey() {
  const [user, setUser] = useState(null);
  const [values, setValues] = useState({});
  const [decision, setDecision] = useState('');
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!decision) return;
    setSaving(true);

    await base44.entities.SurveyResponse.create({
      surveyId: 'focus_group_final',
      userEmail: user?.email || 'unknown',
      responses: { ...values, decision },
    });

    if (user?.email) {
      const summary = REFLECTION_QUESTIONS.map(q => `${q.label}\n→ ${values[q.id] || '—'}`).join('\n\n');
      const decisionLabel = DECISION_OPTIONS.find(o => o.value === decision)?.text || decision;
      await base44.integrations.Core.SendEmail({
        to: user.email,
        subject: 'Your Research Submission — Heartset Design Co.',
        body: `Thank you for completing the Industry Intelligence Briefing.\n\nYour responses:\n\n${summary}\n\nDecision:\n→ ${decisionLabel}\n\n—\nYou retain full ownership of your business concepts and proprietary processes.\nHeartset Design Co. may use anonymized, aggregated insights for research and benchmarking.\n\n© Heartset Design Co. 2026`,
      });
    }

    setSaving(false);
    setSubmitted(true);

    // Route based on decision
    if (decision === 'ready') {
      setTimeout(() => {
        window.location.href = '/SprintEnrollment';
      }, 2500);
    }
  };

  // Confirmation screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-8 h-px bg-black mx-auto mb-10" />

          {decision === 'ready' && (
            <>
              <p className="text-xs tracking-[0.3em] uppercase text-black/25 mb-4">Next Step</p>
              <h2 className="text-2xl mb-4" style={serif}>Redirecting to enrollment.</h2>
              <p className="text-sm text-black/40 font-light">You'll be redirected momentarily.</p>
            </>
          )}

          {decision === 'independent' && (
            <>
              <p className="text-xs tracking-[0.3em] uppercase text-black/25 mb-4">Noted</p>
              <h2 className="text-2xl mb-4" style={serif}>Submission received.</h2>
              <p className="text-sm text-black/40 font-light leading-relaxed">
                You'll hear from us with case breakdowns, refinement insights, and infrastructure education — no pressure, no friction.
              </p>
            </>
          )}

          {decision === 'not_now' && (
            <>
              <p className="text-xs tracking-[0.3em] uppercase text-black/25 mb-4">Noted</p>
              <h2 className="text-2xl mb-4" style={serif}>Submission received.</h2>
              <p className="text-sm text-black/40 font-light">
                We'll stay in light touch. No pressure.
              </p>
            </>
          )}

          <div className="w-8 h-px bg-black mx-auto mt-10 mb-6" />
          <Link to="/VideoLibrary" className="text-xs tracking-[0.15em] uppercase text-black/30 hover:text-black transition-colors">
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

      <div className="max-w-2xl mx-auto px-6 py-12 pb-20">
        {/* Intro */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-black/25 mb-3">Industry Intelligence Briefing</p>
          <h1 className="text-3xl md:text-4xl mb-4" style={serif}>Strategic Reflection & Decision</h1>
          <p className="text-sm text-black/40 font-light leading-relaxed">
            Four questions. One decision. That's it.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1 — Reflection */}
          <div className="mb-12">
            <p className="text-xs tracking-[0.25em] uppercase text-black/25 mb-6 pb-2 border-b border-black/8">
              Section 1 — Strategic Reflection
            </p>
            <div className="space-y-7">
              {REFLECTION_QUESTIONS.map((q, i) => (
                <div key={q.id}>
                  <label className="block text-xs tracking-[0.12em] uppercase text-black/40 mb-1.5">
                    <span className="text-black/20 mr-2">{String(i + 1).padStart(2, '0')}</span>
                    {q.label}
                  </label>
                  {q.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      placeholder={q.placeholder}
                      value={values[q.id] || ''}
                      onChange={e => setValues(v => ({ ...v, [q.id]: e.target.value }))}
                      className="w-full border border-black/12 focus:border-black/40 outline-none px-3 py-2.5 text-sm text-black font-light resize-none transition-colors"
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder={q.placeholder}
                      value={values[q.id] || ''}
                      onChange={e => setValues(v => ({ ...v, [q.id]: e.target.value }))}
                      className="w-full border border-black/12 focus:border-black/40 outline-none px-3 py-2.5 text-sm text-black font-light transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 — Decision */}
          <div className="mb-10">
            <p className="text-xs tracking-[0.25em] uppercase text-black/25 mb-6 pb-2 border-b border-black/8">
              Section 2 — Decision
            </p>
            <p className="text-sm text-black/60 font-light mb-5" style={serif}>
              Based on this working session, which statement best reflects your position?
            </p>
            <div className="space-y-3">
              {DECISION_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDecision(opt.value)}
                  className={`w-full text-left flex items-start gap-4 px-5 py-4 border transition-colors ${
                    decision === opt.value
                      ? 'border-black bg-black text-white'
                      : 'border-black/12 hover:border-black/30 text-black'
                  }`}
                >
                  <span className={`text-xs tracking-[0.15em] font-medium mt-0.5 flex-shrink-0 ${decision === opt.value ? 'text-white/60' : 'text-black/30'}`}>
                    {opt.label}
                  </span>
                  <span className="text-sm font-light">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* IP note */}
          <div className="border-l-2 border-black/10 pl-4 mb-8">
            <p className="text-[11px] text-black/30 leading-relaxed">
              You retain full ownership of your business concepts and proprietary processes. Heartset Design Co. may use anonymized, aggregated insights for research and benchmarking.
            </p>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-black/20">© Heartset Design Co. 2026</p>
            <button
              type="submit"
              disabled={saving || !decision}
              className="px-6 py-2.5 bg-black text-white text-xs tracking-[0.15em] uppercase hover:bg-black/80 disabled:opacity-30 transition-colors"
            >
              {saving ? 'Submitting…' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}