import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { base44 } from "@/api/base44Client";
import { format, addDays, isBefore, startOfDay } from "date-fns";

export default function BookSession() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: ""
  });

  const urlParams = new URLSearchParams(window.location.search);
  const sessionType = urlParams.get('type') || 'strategy';

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setLoadingSlots(true);

    try {
      const response = await base44.functions.invoke('getAvailableSlots', {
        date: date.toISOString()
      });
      setAvailableSlots(response.data.availableSlots || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await base44.functions.invoke('createCalendarBooking', {
        name: formData.name,
        email: formData.email,
        date: selectedDate.toISOString(),
        time: selectedTime,
        sessionType: sessionType,
        notes: formData.notes
      });

      if (response.data.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDateDisabled = (date) => {
    const today = startOfDay(new Date());
    return isBefore(date, today);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white text-black font-sans antialiased flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="border border-black/10 bg-white p-12 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 
              className="text-3xl mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Session Confirmed
            </h2>
            <p className="text-black/70 font-light leading-relaxed max-w-md mx-auto mb-6">
              You'll receive a calendar invitation at <strong>{formData.email}</strong> with all the details.
            </p>
            <p className="text-sm text-black/50 font-light mb-8">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
            </p>
            <Link to={createPageUrl("Home")}>
              <Button variant="outline">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      {/* Header */}
      <header className="px-6 md:px-16 lg:px-24 py-8 border-b border-black/5">
        <Link 
          to={createPageUrl("Contact")}
          className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </header>

      <main className="px-6 md:px-16 lg:px-24 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-black/40 mb-6">
              {sessionType === 'legal-referral' ? 'Legal Referral Call' : 'Strategy Session'}
            </p>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {sessionType === 'legal-referral' 
                ? 'Book a Referral Call'
                : 'Book Your Session'
              }
            </h1>
            
            <p className="text-lg text-black/60 font-light leading-relaxed max-w-2xl">
              {sessionType === 'legal-referral'
                ? 'Schedule a 15-minute call to discuss legal service pathways with our team.'
                : 'Schedule a 15-minute strategy session for clarity on frameworks, validation pathways, or legal positioning.'
              }
            </p>
            
            <p className="text-sm text-black/40 font-light mt-4 italic">
              This session is for strategic clarity only. It is not a sales call.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Date & Time Selection */}
              <div className="space-y-8">
                <div className="border border-black/10 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <CalendarIcon className="w-5 h-5 text-black/40" />
                    <h3 
                      className="text-xl"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Select Date
                    </h3>
                  </div>
                  
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={isDateDisabled}
                    className="rounded-md border-0"
                  />
                </div>

                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-black/10 p-8"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Clock className="w-5 h-5 text-black/40" />
                      <h3 
                        className="text-xl"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Select Time
                      </h3>
                    </div>

                    <p className="text-sm text-black/50 font-light mb-4">
                      {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                    </p>

                    {loadingSlots ? (
                      <div className="text-center py-8">
                        <p className="text-sm text-black/40">Loading available times...</p>
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-sm text-black/40">No available slots for this date.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`p-3 border text-sm font-light transition-all duration-300 ${
                              selectedTime === slot
                                ? 'border-black bg-black text-white'
                                : 'border-black/10 hover:border-black/30'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Right: Contact Information */}
              <div className="border border-black/10 p-8">
                <h3 
                  className="text-xl mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Your Information
                </h3>

                <form onSubmit={handleBooking} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">What would you like to discuss? (optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={4}
                      placeholder="Brief context helps us prepare..."
                    />
                  </div>

                  {selectedDate && selectedTime && (
                    <div className="bg-neutral-50 border border-black/10 p-4">
                      <p className="text-sm text-black/70 font-light">
                        <strong>Selected:</strong>
                        <br />
                        {format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={!selectedDate || !selectedTime || !formData.name || !formData.email || isSubmitting}
                    className="w-full bg-black text-white hover:bg-black/90"
                  >
                    {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                  </Button>

                  <p className="text-xs text-black/40 font-light text-center">
                    You'll receive a calendar invitation at the email provided.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-12 border-t border-black/5 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p 
            className="text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Heartset Design
          </p>
          <p className="text-xs text-black/40">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}