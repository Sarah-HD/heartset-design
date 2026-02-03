import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function GeneralInquiryForm({ onClose }) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const reasonForReachingOut = watch("reason");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    console.log("General inquiry submission:", data);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-12 text-center"
      >
        <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-black/30" />
        </div>
        <h3 
          className="text-2xl mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Inquiry Received
        </h3>
        <p className="text-black/70 font-light leading-relaxed max-w-md mx-auto mb-6">
          We'll review your message and respond within 48 hours.
        </p>
        <Button
          onClick={onClose}
          variant="outline"
          className="mt-4"
        >
          Close
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8">
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

      <div className="space-y-2">
        <Label htmlFor="reason">Reason for reaching out</Label>
        <Select 
          onValueChange={(value) => setValue("reason", value)}
          {...register("reason", { required: "Please select a reason" })}
        >
          <SelectTrigger className={errors.reason ? "border-red-500" : ""}>
            <SelectValue placeholder="Select a reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Collaboration">Collaboration</SelectItem>
            <SelectItem value="Referral">Referral</SelectItem>
            <SelectItem value="Press / Speaking">Press / Speaking</SelectItem>
            <SelectItem value="Question about programs">Question about programs</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.reason && (
          <p className="text-sm text-red-600 font-light">{errors.reason.message}</p>
        )}
      </div>

      {reasonForReachingOut === "Referral" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-2 pl-6 border-l-2 border-black/10"
        >
          <Label htmlFor="referrerName">Who referred you?</Label>
          <Input
            id="referrerName"
            placeholder="Name or relationship"
            {...register("referrerName")}
          />
        </motion.div>
      )}

      {reasonForReachingOut === "Question about programs" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-2 pl-6 border-l-2 border-black/10"
        >
          <Label htmlFor="reviewedFramework">Have you reviewed the Framework Pathways?</Label>
          <Select 
            onValueChange={(value) => setValue("reviewedFramework", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select yes or no" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      )}

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          {...register("message", { required: "Please include a message" })}
          className={errors.message ? "border-red-500" : ""}
          rows={5}
          placeholder="Tell us about your inquiry..."
        />
        {errors.message && (
          <p className="text-sm text-red-600 font-light">{errors.message.message}</p>
        )}
      </div>

      <div className="flex justify-between pt-6 border-t border-black/10">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white hover:bg-black/90"
        >
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </Button>
      </div>
    </form>
  );
}