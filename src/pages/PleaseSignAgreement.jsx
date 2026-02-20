import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";

export default function PleaseSignAgreement() {
  const [user, setUser] = useState(null);
  const [agreementDoc, setAgreementDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);

        const legalDocs = await base44.entities.LegalDocument.filter({
          userEmail: currentUser.email,
          documentType: 'pro_bono_contract'
        });

        if (legalDocs.length > 0) {
          setAgreementDoc(legalDocs[0]);
        }
      } catch (error) {
        console.error('Error loading agreement:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black/40">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <Card className="border-black/10">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <FileText className="w-6 h-6" />
                Agreement Signature Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-black/70 leading-relaxed">
                Before you can access the full program materials, you need to review and sign your Pro Bono Pilot Agreement.
              </p>

              {agreementDoc ? (
                <>
                  {agreementDoc.status === 'sent' && (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded">
                      <p className="text-sm text-amber-900">
                        <strong>Action Required:</strong> Your agreement has been sent to your email. Please check your inbox and sign the document.
                      </p>
                    </div>
                  )}

                  {agreementDoc.status === 'generating' && (
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded">
                      <p className="text-sm text-blue-900">
                        Your agreement is being prepared. You should receive it via email shortly.
                      </p>
                    </div>
                  )}

                  {agreementDoc.status === 'failed' && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded">
                      <p className="text-sm text-red-900">
                        There was an issue preparing your agreement. Please contact support.
                      </p>
                    </div>
                  )}

                  <div className="pt-4">
                    <p className="text-sm text-black/60 mb-4">
                      Once you've signed the agreement, refresh this page to access the program.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                        className="border-black/20"
                      >
                        Refresh Page
                      </Button>
                      <Button
                        onClick={() => window.location.href = createPageUrl("Onboarding6500")}
                        className="bg-black text-white hover:bg-black/90"
                      >
                        Go to Sprint Onboarding
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-neutral-100 border border-black/10 p-4 rounded">
                  <p className="text-sm text-black/60">
                    No agreement found for your account. Please contact support if you believe this is an error.
                  </p>
                </div>
              )}

              <div className="pt-6 border-t border-black/10">
                <h3 className="font-medium mb-2">What you can access now:</h3>
                <ul className="text-sm text-black/60 space-y-1">
                  <li>• Sprint Onboarding Form</li>
                  <li>• Account Settings</li>
                </ul>
                <h3 className="font-medium mb-2 mt-4">What unlocks after signing:</h3>
                <ul className="text-sm text-black/60 space-y-1">
                  <li>• Video Library</li>
                  <li>• Assignments</li>
                  <li>• Office Hours</li>
                  <li>• All program materials</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}