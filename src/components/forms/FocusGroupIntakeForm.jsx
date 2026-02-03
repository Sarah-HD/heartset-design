import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_STEPS = 8;

export default function FocusGroupIntakeForm() {
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const primaryRole = watch("primaryRole");
  const howDidYouHear = watch("howDidYouHear");

  const nextStep = async () => {
    const fieldsToValidate = getStepFields(currentStep);
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getStepFields = (step) => {
    const fieldMap = {
      1: ["firstName", "lastName", "email"],
      2: ["primaryRole", primaryRole === "Other (please describe)" ? "roleDescription" : null].filter(Boolean),
      3: ["currentWork"],
      4: ["frameworkStage"],
      5: ["validationGoals"],
      6: ["howDidYouHear"],
      7: ["confidentialityAgreement", "privacyAgreement", "attributionAgreement", "confirmAcknowledgment"],
      8: []
    };
    return fieldMap[step] || [];
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    console.log("Form submission:", data);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-black/10 bg-white p-12 text-center"
      >
        <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-black/30" />
        </div>
        <h3 
          className="text-2xl mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Request Received
        </h3>
        <p className="text-black/70 font-light leading-relaxed max-w-md mx-auto mb-6">
          Check your inbox for an email titled <strong>"Confirm Your Focus Group Spot."</strong>
        </p>
        <p className="text-sm text-black/50 font-light">
          Your place is not held until you reply <strong>CONFIRMED</strong>.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-light text-black/50">
            Step {currentStep} of {TOTAL_STEPS}
          </p>
        </div>
        <div className="h-px bg-black/10 relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <StepCard key="step1">
              <CardHeader
                title="Identity & Contact"
                subtitle="Used solely for focus group communication and materials."
              />
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...register("firstName", { required: "First name is required" })}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600 font-light">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...register("lastName", { required: "Last name is required" })}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600 font-light">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
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
                    <p className="text-sm text-red-600 font-light">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </StepCard>
          )}

          {currentStep === 2 && (
            <StepCard key="step2">
              <CardHeader
                title="Professional Context"
                subtitle="Select the role that best describes your professional background."
              />
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Primary Role or Credential</Label>
                  <RadioGroup className="space-y-3">
                    {[
                      "PhD / Doctoral Researcher",
                      "Clinician (licensed)",
                      "Therapist / Social Worker (MSW, LCSW, etc.)",
                      "Educator / Professor",
                      "Consultant",
                      "Coach (high-ticket / executive / niche)",
                      "Nonprofit / Program Director",
                      "Other (please describe)"
                    ].map((role) => (
                      <div key={role} className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={role} 
                          id={role}
                          {...register("primaryRole", { required: "Please select a role" })}
                        />
                        <Label htmlFor={role} className="font-normal cursor-pointer font-light">
                          {role}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.primaryRole && (
                    <p className="text-sm text-red-600 font-light">{errors.primaryRole.message}</p>
                  )}
                </div>
                
                {primaryRole === "Other (please describe)" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 pl-6 border-l-2 border-black/10"
                  >
                    <Label htmlFor="roleDescription">Briefly describe your professional background</Label>
                    <Textarea
                      id="roleDescription"
                      {...register("roleDescription", { 
                        required: primaryRole === "Other (please describe)" ? "Please describe your role" : false 
                      })}
                      className={errors.roleDescription ? "border-red-500" : ""}
                      rows={3}
                    />
                    {errors.roleDescription && (
                      <p className="text-sm text-red-600 font-light">{errors.roleDescription.message}</p>
                    )}
                  </motion.div>
                )}
              </div>
            </StepCard>
          )}

          {currentStep === 3 && (
            <StepCard key="step3">
              <CardHeader
                title="Work Stage"
                subtitle="Select all that apply to your current professional work."
              />
              
              <div className="space-y-4">
                <Label>Which best describes your current work?</Label>
                <div className="space-y-3">
                  {[
                    "Delivering services 1:1",
                    "Running group programs or workshops",
                    "Selling digital products or courses",
                    "Advising organizations or institutions",
                    "Exploring / early-stage concept"
                  ].map((work) => (
                    <div key={work} className="flex items-center space-x-3">
                      <Checkbox 
                        id={work}
                        value={work}
                        {...register("currentWork", { 
                          required: "Please select at least one option"
                        })}
                      />
                      <Label htmlFor={work} className="font-normal cursor-pointer font-light">
                        {work}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.currentWork && (
                  <p className="text-sm text-red-600 font-light">{errors.currentWork.message}</p>
                )}
              </div>
            </StepCard>
          )}

          {currentStep === 4 && (
            <StepCard key="step4">
              <CardHeader
                title="Framework Maturity"
                subtitle="Where are you in the lifecycle of your expertise?"
              />
              
              <div className="space-y-4">
                <RadioGroup className="space-y-3">
                  {[
                    "I have deep expertise but no defined framework yet",
                    "I have a framework but haven't validated it",
                    "I've tested parts of my framework informally",
                    "I've delivered this work and want to systematize it",
                    "I'm preparing for scale, funding, or institutional adoption"
                  ].map((stage) => (
                    <div key={stage} className="flex items-center space-x-3">
                      <RadioGroupItem 
                        value={stage} 
                        id={stage}
                        {...register("frameworkStage", { required: "Please select a stage" })}
                      />
                      <Label htmlFor={stage} className="font-normal cursor-pointer font-light">
                        {stage}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.frameworkStage && (
                  <p className="text-sm text-red-600 font-light">{errors.frameworkStage.message}</p>
                )}
              </div>
            </StepCard>
          )}

          {currentStep === 5 && (
            <StepCard key="step5">
              <CardHeader
                title="Validation Intent"
                subtitle="This is a working group. Clear goals help everyone grow — and growth is always better with thoughtful partners in the room."
              />
              
              <div className="space-y-2">
                <Label htmlFor="validationGoals">
                  What are you hoping to validate or refine through this focus group?
                </Label>
                <Textarea
                  id="validationGoals"
                  {...register("validationGoals", { required: "Please share your goals" })}
                  className={errors.validationGoals ? "border-red-500" : ""}
                  rows={5}
                  placeholder="Language, offer structure, pricing, institutional readiness, framework clarity..."
                />
                {errors.validationGoals && (
                  <p className="text-sm text-red-600 font-light">{errors.validationGoals.message}</p>
                )}
              </div>
            </StepCard>
          )}

          {currentStep === 6 && (
            <StepCard key="step6">
              <CardHeader
                title="Visibility & Source"
                subtitle="This helps us understand the room and ensure the group is aligned."
              />
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>How did you hear about this focus group?</Label>
                  <RadioGroup className="space-y-3">
                    {[
                      "LinkedIn",
                      "Referral from a colleague",
                      "Website",
                      "Email",
                      "Other"
                    ].map((source) => (
                      <div key={source} className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={source} 
                          id={source}
                          {...register("howDidYouHear", { required: "Please select a source" })}
                        />
                        <Label htmlFor={source} className="font-normal cursor-pointer font-light">
                          {source}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.howDidYouHear && (
                    <p className="text-sm text-red-600 font-light">{errors.howDidYouHear.message}</p>
                  )}
                </div>
                
                {(howDidYouHear === "LinkedIn" || howDidYouHear === "Referral from a colleague" || howDidYouHear === "Website") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4 pl-6 border-l-2 border-black/10"
                  >
                    {howDidYouHear === "LinkedIn" && (
                      <div className="space-y-2">
                        <Label htmlFor="linkedinUrl">LinkedIn Profile URL (optional but encouraged)</Label>
                        <Input
                          id="linkedinUrl"
                          type="url"
                          placeholder="https://linkedin.com/in/..."
                          {...register("linkedinUrl")}
                        />
                      </div>
                    )}
                    
                    {howDidYouHear === "Referral from a colleague" && (
                      <div className="space-y-2">
                        <Label htmlFor="referrerName">Who referred you? (optional)</Label>
                        <Input
                          id="referrerName"
                          placeholder="Name or relationship"
                          {...register("referrerName")}
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="websiteUrl">Website or professional page (optional)</Label>
                      <Input
                        id="websiteUrl"
                        type="url"
                        placeholder="https://..."
                        {...register("websiteUrl")}
                      />
                    </div>
                  </motion.div>
                )}

                <div className="pt-6 border-t border-black/10">
                  <Label htmlFor="peerReferrals" className="mb-3 block">
                    Do you know 1–2 colleagues who would genuinely benefit? (optional)
                  </Label>
                  <p className="text-sm text-black/50 font-light mb-4">
                    Growth is always stronger with trusted peers. We'll reach out respectfully — no spam.
                  </p>
                  <Textarea
                    id="peerReferrals"
                    placeholder="Name, email, and optional relationship (e.g., 'Jane Doe, jane@example.com, former colleague')"
                    {...register("peerReferrals")}
                    rows={3}
                  />
                </div>
              </div>
            </StepCard>
          )}

          {currentStep === 7 && (
            <StepCard key="step7">
              <CardHeader
                title="Confidentiality & Participation"
                subtitle="This protects you, the group, and Heartset Design — without legal heaviness."
              />
              
              <div className="space-y-6">
                <div className="bg-neutral-50 border border-black/10 p-6 space-y-5">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="agreement1"
                      {...register("confidentialityAgreement", { 
                        required: "You must agree to participate" 
                      })}
                    />
                    <Label htmlFor="agreement1" className="font-light text-sm leading-relaxed cursor-pointer">
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
                    <Label htmlFor="agreement2" className="font-light text-sm leading-relaxed cursor-pointer">
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
                    <Label htmlFor="agreement3" className="font-light text-sm leading-relaxed cursor-pointer">
                      I understand that general outcomes, success stories, or reviews may be referenced using initials only, unless explicit written permission is given for attribution.
                    </Label>
                  </div>
                  
                  {(errors.confidentialityAgreement || errors.privacyAgreement || errors.attributionAgreement) && (
                    <p className="text-sm text-red-600 font-light">Please agree to all terms to continue</p>
                  )}
                </div>

                <div className="bg-amber-50 border-l-2 border-amber-600 p-6">
                  <h4 className="font-medium mb-3 text-sm">Before you submit:</h4>
                  <p className="text-sm text-black/70 font-light mb-4 leading-relaxed">
                    Please check your inbox for an email from <strong>Heartset Design</strong> titled: 
                    <br />
                    <span className="italic">"Confirm Your Focus Group Spot."</span>
                  </p>
                  <p className="text-sm text-black/70 font-light mb-5 leading-relaxed">
                    Your place is not held until you reply <strong>CONFIRMED</strong>.
                  </p>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="confirmAcknowledgment"
                      {...register("confirmAcknowledgment", { 
                        required: "Please acknowledge confirmation requirement" 
                      })}
                    />
                    <Label htmlFor="confirmAcknowledgment" className="font-light text-sm cursor-pointer">
                      I understand and will confirm my spot via email.
                    </Label>
                  </div>
                  
                  {errors.confirmAcknowledgment && (
                    <p className="text-sm text-red-600 font-light mt-2">{errors.confirmAcknowledgment.message}</p>
                  )}
                </div>
              </div>
            </StepCard>
          )}

          {currentStep === 8 && (
            <StepCard key="step8">
              <CardHeader
                title="Ready to Submit"
                subtitle="Review your information and submit your request."
              />
              
              <div className="space-y-6">
                <div className="bg-neutral-50 border border-black/10 p-8 text-center">
                  <p className="text-black/70 font-light leading-relaxed mb-6">
                    By submitting this form, you're requesting placement in the upcoming focus group.
                  </p>
                  <p className="text-sm text-black/50 font-light">
                    Once submitted, check your email for confirmation instructions.
                  </p>
                </div>
              </div>
            </StepCard>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-black/10">
          {currentStep > 1 ? (
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          ) : (
            <div />
          )}

          {currentStep < TOTAL_STEPS ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-black text-white hover:bg-black/90 gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white hover:bg-black/90 px-8"
            >
              {isSubmitting ? "Submitting..." : "Request Focus Group Placement"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function StepCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-black/10 p-8 md:p-12 min-h-[400px]"
    >
      {children}
    </motion.div>
  );
}

function CardHeader({ title, subtitle }) {
  return (
    <div className="mb-8 pb-6 border-b border-black/10">
      <h3 
        className="text-2xl md:text-3xl mb-3"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm text-black/50 font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}