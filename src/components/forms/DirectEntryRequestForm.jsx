import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function DirectEntryRequestForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      await base44.entities.DirectEntryRequest.create({
        userEmail: data.email,
        fullName: data.fullName,
        linkedinUrl: data.linkedinUrl,
        highestPrice: parseFloat(data.highestPrice),
        methodDescription: data.methodDescription,
        understands: data.understands
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-black/10 bg-white p-12 text-center"
      >
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 
          className="text-2xl mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Request Submitted
        </h3>
        <p className="text-black/70 font-light leading-relaxed max-w-md mx-auto">
          Your request has been received and will be reviewed within 48 hours.
          <br /><br />
          You'll receive an email with next steps.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="border border-black/10 bg-white p-8 md:p-12">
      <div className="mb-8 pb-6 border-b border-black/10">
        <h3 
          className="text-2xl md:text-3xl mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Direct Entry Request
        </h3>
        <p className="text-sm text-black/50 font-light leading-relaxed">
          This form is for experienced operators only. All requests are manually reviewed.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            {...register("fullName", { required: "Name is required" })}
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && (
            <p className="text-sm text-red-600 font-light">{errors.fullName.message}</p>
          )}
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

        <div className="space-y-2">
          <Label htmlFor="linkedinUrl">LinkedIn or Website URL</Label>
          <Input
            id="linkedinUrl"
            type="url"
            placeholder="https://"
            {...register("linkedinUrl")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="highestPrice">Highest Price Point Sold ($)</Label>
          <Input
            id="highestPrice"
            type="number"
            placeholder="10000"
            {...register("highestPrice", { 
              required: "Price point is required",
              min: { value: 0, message: "Must be a positive number" }
            })}
            className={errors.highestPrice ? "border-red-500" : ""}
          />
          {errors.highestPrice && (
            <p className="text-sm text-red-600 font-light">{errors.highestPrice.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="methodDescription">One-sentence description of your method or offer</Label>
          <Textarea
            id="methodDescription"
            {...register("methodDescription", { required: "Description is required" })}
            className={errors.methodDescription ? "border-red-500" : ""}
            rows={3}
          />
          {errors.methodDescription && (
            <p className="text-sm text-red-600 font-light">{errors.methodDescription.message}</p>
          )}
        </div>

        <div className="bg-neutral-50 border border-black/10 p-6">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="understands"
              {...register("understands", { 
                required: "You must acknowledge this requirement" 
              })}
            />
            <Label htmlFor="understands" className="font-light text-sm leading-relaxed cursor-pointer">
              I understand this is a paid sprint and not exploratory consulting.
            </Label>
          </div>
          {errors.understands && (
            <p className="text-sm text-red-600 font-light mt-2">{errors.understands.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white hover:bg-black/90"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </div>
  );
}