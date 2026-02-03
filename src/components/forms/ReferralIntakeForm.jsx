import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ReferralIntakeForm() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const referredFor = watch("referredFor");
  const wantsReferralCall = watch("wantsReferralCall");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    console.log("Referral intake submission:", data);
    
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
          Referral Received
        </h3>
        <p className="text-black/70 font-light leading-relaxed max-w-md mx-auto">
          {referredFor === "Legal support" 
            ? "We'll facilitate an introduction to our legal service partner within 48 hours."
            : "We'll review your referral and be in touch within 48 hours."
          }
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white border border-black/10">
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-8">
        {/* Step 1: Referral Context */}
        <div className="space-y-6">
          <h3 
            className="text-xl pb-4 border-b border-black/10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Referral Context
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-600 font-light">{errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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

          <div className="space-y-2">
            <Label htmlFor="referrerName">Who referred you?</Label>
            <Input
              id="referrerName"
              placeholder="Name and email"
              {...register("referrerName", { required: "Referrer information is required" })}
              className={errors.referrerName ? "border-red-500" : ""}
            />
            {errors.referrerName && (
              <p className="text-sm text-red-600 font-light">{errors.referrerName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="referredFor">What were you referred for?</Label>
            <Select 
              onValueChange={(value) => setValue("referredFor", value)}
            >
              <SelectTrigger className={errors.referredFor ? "border-red-500" : ""}>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Web design">Web design</SelectItem>
                <SelectItem value="Systems / automation">Systems / automation</SelectItem>
                <SelectItem value="Legal support">Legal support</SelectItem>
                <SelectItem value="Strategic advisory">Strategic advisory</SelectItem>
                <SelectItem value="Not sure">Not sure</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" {...register("referredFor", { required: "Please select a service" })} />
            {errors.referredFor && (
              <p className="text-sm text-red-600 font-light">{errors.referredFor.message}</p>
            )}
          </div>
        </div>

        {/* Legal Support Pathway */}
        {referredFor === "Legal support" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-6 border-l-2 border-amber-600 pl-6"
          >
            <div className="bg-amber-50 border border-amber-200 p-6 space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-3">
                  <p className="text-sm text-black/80 font-light leading-relaxed">
                    Heartset Design does not provide legal services. Legal matters are handled by our independent legal service partner.
                  </p>
                  <p className="text-sm text-black/80 font-light leading-relaxed">
                    With your permission, we can facilitate an introduction.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-200">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="legalAcknowledgment"
                    {...register("legalAcknowledgment", { 
                      required: referredFor === "Legal support" ? "You must acknowledge to proceed" : false 
                    })}
                  />
                  <Label htmlFor="legalAcknowledgment" className="font-light text-sm leading-relaxed cursor-pointer">
                    I understand Heartset Design is not a law firm and does not provide legal advice. I am requesting an introduction to an independent legal service provider.
                  </Label>
                </div>
                {errors.legalAcknowledgment && (
                  <p className="text-sm text-red-600 font-light mt-2">{errors.legalAcknowledgment.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Would you like to request a 15-minute referral call to discuss next steps?</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="wantsReferralCall-yes"
                    checked={wantsReferralCall === "yes"}
                    onCheckedChange={(checked) => setValue("wantsReferralCall", checked ? "yes" : "")}
                  />
                  <Label htmlFor="wantsReferralCall-yes" className="font-normal cursor-pointer font-light">
                    Yes, I'd like a referral call
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="wantsReferralCall-no"
                    checked={wantsReferralCall === "no"}
                    onCheckedChange={(checked) => setValue("wantsReferralCall", checked ? "no" : "")}
                  />
                  <Label htmlFor="wantsReferralCall-no" className="font-normal cursor-pointer font-light">
                    No, just facilitate the introduction
                  </Label>
                </div>
              </div>
            </div>

            {wantsReferralCall === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-neutral-50 border border-black/10 p-6 text-center"
              >
                <p className="text-sm text-black/70 font-light mb-4">
                  After submission, you'll receive a link to book your 15-minute referral call.
                </p>
                <p className="text-xs text-black/40 font-light italic">
                  15-Minute Referral Call – Legal Pathway
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Standard Referral Fields (for non-legal) */}
        {referredFor && referredFor !== "Legal support" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline for engagement</Label>
              <Input
                id="timeline"
                placeholder="e.g., Q1 2026, ASAP, etc."
                {...register("timeline")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget range (optional)</Label>
              <Input
                id="budget"
                placeholder="e.g., $5k-10k, flexible, etc."
                {...register("budget")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDetails">Tell us about the engagement</Label>
              <Textarea
                id="projectDetails"
                {...register("projectDetails")}
                rows={5}
                placeholder="What are you looking to build or refine?"
              />
            </div>
          </motion.div>
        )}

        {/* Message field for all */}
        {referredFor && (
          <div className="space-y-2">
            <Label htmlFor="additionalContext">Additional context (optional)</Label>
            <Textarea
              id="additionalContext"
              {...register("additionalContext")}
              rows={3}
              placeholder="Anything else we should know?"
            />
          </div>
        )}

        <div className="flex justify-end pt-6 border-t border-black/10">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white hover:bg-black/90 px-8"
          >
            {isSubmitting ? "Submitting..." : "Submit Referral"}
          </Button>
        </div>
      </form>
    </div>
  );
}