import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function OfficeHours() {
  const [user, setUser] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booked, setBooked] = useState(false);
  
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        window.location.href = '/';
      }
    };
    loadUser();
  }, []);

  const { data: slotsData, isLoading } = useQuery({
    queryKey: ['officeHourSlots'],
    queryFn: async () => {
      const response = await base44.functions.invoke('officeHours', {
        action: 'getAvailableSlots'
      });
      return response.data;
    },
    enabled: !!user,
  });

  const bookMutation = useMutation({
    mutationFn: async (slot) => {
      const response = await base44.functions.invoke('officeHours', {
        action: 'bookSlot',
        eventData: {
          startTime: slot.start,
          endTime: slot.end
        }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['officeHourSlots'] });
      setBooked(true);
      setSelectedSlot(null);
      setTimeout(() => setBooked(false), 5000);
    },
  });

  const handleBook = async () => {
    if (!selectedSlot) return;
    await bookMutation.mutateAsync(selectedSlot);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black/40">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 
              className="text-4xl md:text-5xl mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Office Hours
            </h1>
            <div className="bg-neutral-50 border-l-2 border-black/20 p-6">
              <p className="text-base text-black/70 font-light leading-relaxed">
                Office hours are reserved for clarification, execution review, and decision support 
                related to program material. Sessions are 20 minutes and conducted via video call.
              </p>
            </div>
          </motion.div>

          {booked && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center gap-3 text-green-600 bg-green-50 p-4 rounded border border-green-200"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Session booked successfully. Check your email for confirmation and meeting link.</span>
            </motion.div>
          )}

          <div className="mb-8">
            <h2 
              className="text-2xl mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Available Sessions
            </h2>
            
            {isLoading ? (
              <p className="text-black/40">Loading available times...</p>
            ) : !slotsData?.slots || slotsData.slots.length === 0 ? (
              <Card className="border-black/10">
                <CardContent className="p-8 text-center">
                  <p className="text-black/60">No available sessions at this time. Check back later.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {slotsData.slots.map((slot, idx) => (
                  <Card
                    key={idx}
                    className={`border-black/10 cursor-pointer transition-all ${
                      selectedSlot?.start === slot.start
                        ? 'border-black bg-black/5'
                        : 'hover:border-black/30'
                    }`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-black/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{slot.display}</p>
                        <p className="text-xs text-black/40">20 minutes</p>
                      </div>
                      {selectedSlot?.start === slot.start && (
                        <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {selectedSlot && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-black/10">
                <CardHeader>
                  <CardTitle>Confirm Booking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded">
                      <Calendar className="w-5 h-5 text-black/60" />
                      <div>
                        <p className="font-medium">{selectedSlot.display}</p>
                        <p className="text-sm text-black/60">20-minute session</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={handleBook}
                        disabled={bookMutation.isPending}
                        className="flex-1 bg-black hover:bg-black/80"
                      >
                        {bookMutation.isPending ? 'Booking...' : 'Confirm Booking'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedSlot(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}