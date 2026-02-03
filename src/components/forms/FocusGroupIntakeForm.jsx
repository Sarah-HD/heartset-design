import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock } from "lucide-react";

export default function FocusGroupIntakeForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const primaryRole = watch("primaryRole");
  const howDidYouHear = watch("howDidYouHear");
  const currentWork = watch("currentWork") || [];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Here you would send data to your backend or email service
    console.log("Form submission:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-black/10 p-12 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-black/30" />
          </div>
          <h3 
            className="text-2xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Request Received
          </h3>
          <p className="text-black/60 font-light leading-relaxed max-w-md mx-auto mb-6">
            Check your inbox for an email titled <strong>"Confirm Your Focus Group Spot."</strong>
          </p>
          <p className="text-sm text-black/40 font-light">
            Your place is not held until you reply <strong>CONFIRMED</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      {/* SECTION 1: IDENTITY & DELIVERABILITY */}
      <div className="space-y-6">
        <div className="border-b border-black/10 pb-4">
          <h3 
            className="text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Identity & Contact
          </h3>
          <p className="text-sm text-black/40 mt-2 font-light">
            Used solely for focus group communication and materials.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              {...register("firstName", { required: "First name is required" })}
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && (
              <p className="text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              {...register("lastName", { required: "Last name is required" })}
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* SECTION 2: PROFESSIONAL ROLE */}
      <div className="space-y-6">
        <div className="border-b border-black/10 pb-4">
          <h3 
            className="text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Professional Role / Credential
          </h3>
        </div>
        
        <div className="space-y-4">
          <Label>Primary Role or Credential *</Label>
          <RadioGroup>
            {[
              "Licensed Clinician (LCSW, LMSW, LMFT, Psychologist, etc.)",
              "PhD / Doctoral Researcher",
              "Educator / Academic Administrator",
              "Consultant (Independent or Firm-Based)",
              "Coach (Executive, Leadership, Health, or Professional)",
              "Nonprofit / Public Sector Professional",
              "Health / Wellness Practitioner (Credentialed)",
              "Other (please describe)"
            ].map((role) => (
              <div key={role} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={role} 
                  id={role}
                  {...register("primaryRole", { required: "Please select a role" })}
                />
                <Label htmlFor={role} className="font-normal cursor-pointer">
                  {role}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.primaryRole && (
            <p className="text-sm text-red-600">{errors.primaryRole.message}</p>
          )}
        </div>
        
        {primaryRole === "Other (please describe)" && (
          <div className="space-y-2 pl-6 border-l-2 border-black/10">
            <Label htmlFor="roleDescription">Briefly describe your professional background *</Label>
            <Textarea
              id="roleDescription"
              {...register("roleDescription", { 
                required: primaryRole === "Other (please describe)" ? "Please describe your role" : false 
              })}
              className={errors.roleDescription ? "border-red-500" : ""}
              rows={3}
            />
            {errors.roleDescription && (
              <p className="text-sm text-red-600">{errors.roleDescription.message}</p>
            )}
          </div>
        )}
      </div>

      {/* SECTION 3: CURRENT WORK CONTEXT */}
      <div className="space-y-6">
        <div className="border-b border-black/10 pb-4">
          <h3 
            className="text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Current Work Context
          </h3>
        </div>
        
        <div className="space-y-4">
          <Label>Which best describes your current work? * (Select all that apply)</Label>
          <div className="space-y-3">
            {[
              "Client-based services",
              "Coaching or advisory engagements",
              "Program or curriculum delivery",
              "Consulting or strategy work",
              "Research, evaluation, or assessment",
              "Training / workshops",
              "Policy or institutional work",
              "Early-stage concept (forming)",
              "Actively monetized framework or method"
            ].map((work) => (
              <div key={work} className="flex items-center space-x-2">
                <Checkbox 
                  id={work}
                  value={work}
                  {...register("currentWork", { 
                    required: "Please select at least one option"
                  })}
                />
                <Label htmlFor={work} className="font-normal cursor-pointer">
                  {work}
                </Label>
              </div>
            ))}
          </div>
          {errors.currentWork && (
            <p className="text-sm text-red-600">{errors.currentWork.message}</p>
          )}
        </div>
      </div>

      {/* SECTION 4: FRAMEWORK MATURITY */}
      <div className="space-y-6">
        <div className="border-b border-black/10 pb-4">
          <h3 
            className="text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Framework Maturity
          </h3>
        </div>
        
        <div className="space-y-4">
          <Label>Where are you in the lifecycle of your work? *</Label>
          <RadioGroup>
            {[
              "I have deep expertise but no defined framework yet",
              "I have a framework but haven't validated it",
              "I've tested parts of my framework informally",
              "I've delivered this work and want to systematize it",
              "I'm preparing for scale, funding, or institutional adoption"
            ].map((stage) => (
              <div key={stage} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={stage} 
                  id={stage}
                  {...register("frameworkStage", { required: "Please select a stage" })}
                />
                <Label htmlFor={stage} className="font-normal cursor-pointer">
                  {stage}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.frameworkStage && (
            <p className="text-sm text-red-600">{errors.frameworkStage.message}</p>
          )}
        </div>
      </div>

      {/* SECTION 5: INTENT */}
      <div className="space-y-6">
        <div className="border-b border-black/10 pb-4">
          <h3 
            className="text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Intent & Collaboration
          </h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="validationGoals">
            What are you hoping to validate or refine through this focus group? *
          </Label>
          <p className="text-sm text-black/40 font-light mb-3">
            This is a working group. Clear goals help everyone grow — and growth is always better with thoughtful partners in the room.
          </p>
          <Textarea
            id="validationGoals"
            {...register("validationGoals", { required: "Please share your goals" })}
            className={errors.validationGoals ? "border-red-500" : ""}
            rows={4}
          />
          {errors.validationGoals && (
            <p className="text-sm text-red-600">{errors.validationGoals.message}</p>
          )}
        </div>
      </div>

      {/* SECTION 6: CONFIDENTIALITY */}
      <div className="space-y-6">
        <div className="border-b border-black/10 pb-4">
          <h3 
            className="text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Confidentiality & Participation Agreement
          </h3>
        </div>
        
        <div className="bg-neutral-50 border border-black/10 p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="agreement1"
              {...register("confidentialityAgreement", { 
                required: "You must agree to participate" 
              })}
            />
            <Label htmlFor="agreement1" className="font-normal text-sm leading-relaxed cursor-pointer">
              I understand this is a collaborative working focus group and agree to actively participate and receive emails related to sessions and materials.
            </Label>
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="agreement2"
              {...register("privacyAgreement", { 
                required: "You must agree to privacy terms" 
              })}
            />
            <Label htmlFor="agreement2" className="font-normal text-sm leading-relaxed cursor-pointer">
              I understand that information shared will <strong>not</strong> be disclosed to other clients or third parties without written permission.
            </Label>
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="agreement3"
              {...register("attributionAgreement", { 
                required: "You must agree to attribution terms" 
              })}
            />
            <Label htmlFor="agreement3" className="font-normal text-sm leading-relaxed cursor-pointer">
              I understand that general outcomes, success stories, or reviews may be referenced using initials only, unless explicit written permission is given for attribution.
            </Label>
          </div>
          
          <p className="text-xs text-black/40 font-light italic mt-4">
            This protects you, the group, and Heartset Design — without legal heaviness.
          </p>
          
          {(errors.confidentialityAgreement || errors.privacyAgreement || errors.attributionAgreement) && (
            <p className="text-sm text-red-600">Please agree to all terms to continue</p>
          )}
        </div>
      </div>

      {/* SECTION 7: CONFIRMATION ACKNOWLEDGMENT */}
      <div className="space-y-6">
        <div className="bg-amber-50 border-l-2 border-amber-500 p-6">
          <h4 className="font-medium mb-3">Before you submit:</h4>
          <p className="text-sm text-black/60 font-light mb-4">
            Please check your inbox for an email from <strong>Heartset Design</strong> titled: 
            <br />
            <span className="italic">"Confirm Your Focus Group Spot."</span>
          </p>
          <p className="text-sm text-black/60 font-light mb-4">
            Your place is not held until you reply <strong>CONFIRMED</strong>.
          </p>
          
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="confirmAcknowledgment"
              {...register("confirmAcknowledgment", { 
                required: "Please acknowledge confirmation requirement" 
              })}
            />
            <Label htmlFor="confirmAcknowledgment" className="font-normal text-sm cursor-pointer">
              I understand and will confirm my spot via email.
            </Label>
          </div>
          
          {errors.confirmAcknowledgment && (
            <p className="text-sm text-red-600 mt-2">{errors.confirmAcknowledgment.message}</p>
          )}
        </div>
      </div>

      {/* SECTION 8: SOURCE INTELLIGENCE */}
      <div className="space-y-6">
        <div className="border-b border-black/10 pb-4">
          <h3 
            className="text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How Did You Hear About This?
          </h3>
          <p className="text-sm text-black/40 mt-2 font-light">
            This helps us understand the room and ensure the group is aligned.
          </p>
        </div>
        
        <div className="space-y-4">
          <Label>How did you hear about this focus group? *</Label>
          <RadioGroup>
            {[
              "LinkedIn",
              "Referral from a colleague",
              "Previous work with Heartset Design",
              "Online search",
              "Event / talk",
              "Other"
            ].map((source) => (
              <div key={source} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={source} 
                  id={source}
                  {...register("howDidYouHear", { required: "Please select a source" })}
                />
                <Label htmlFor={source} className="font-normal cursor-pointer">
                  {source}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.howDidYouHear && (
            <p className="text-sm text-red-600">{errors.howDidYouHear.message}</p>
          )}
        </div>
        
        {(howDidYouHear === "LinkedIn" || howDidYouHear === "Referral from a colleague") && (
          <div className="space-y-4 pl-6 border-l-2 border-black/10">
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn Profile URL (optional but encouraged)</Label>
              <Input
                id="linkedinUrl"
                type="url"
                placeholder="https://linkedin.com/in/..."
                {...register("linkedinUrl")}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website or professional page (optional)</Label>
              <Input
                id="websiteUrl"
                type="url"
                placeholder="https://..."
                {...register("websiteUrl")}
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 9: PEER REFERRAL */}
      <div className="space-y-6">
        <div className="border-b border-black/10 pb-4">
          <h3 
            className="text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Peer Referral (Optional)
          </h3>
          <p className="text-sm text-black/40 mt-2 font-light">
            We'll reach out respectfully. No spam. No obligation.
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="peerReferrals">
            Do you know 1–2 colleagues who would genuinely benefit from this focus group?
          </Label>
          <Textarea
            id="peerReferrals"
            placeholder="Name, email, and optional relationship (e.g., 'Jane Doe, jane@example.com, former colleague')"
            {...register("peerReferrals")}
            rows={3}
          />
        </div>
      </div>

      {/* SUBMIT */}
      <div className="pt-8 border-t border-black/10">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto bg-black text-white hover:bg-black/90 px-12 py-6 text-base"
        >
          {isSubmitting ? "Submitting..." : "Request Focus Group Placement"}
        </Button>
      </div>
    </form>
  );
}