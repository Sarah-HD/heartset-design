import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Sparkles, Plus } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function AddTaskDialog({ onTaskCreated }) {
  const [open, setOpen] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setTaskText(prev => prev + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleAIOrganize = async () => {
    if (!taskText.trim()) return;
    
    setIsProcessing(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Take this raw task input and organize it into a clear, concise task description (one sentence, action-oriented): "${taskText}"`,
      });
      setTaskText(result);
    } catch (error) {
      alert('Failed to organize with AI: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateTask = async () => {
    if (!taskText.trim()) return;

    try {
      const user = await base44.auth.me();
      await base44.entities.AdminTask.create({
        text: taskText.trim(),
        done: false,
        adminEmail: user.email
      });
      
      setTaskText("");
      setOpen(false);
      if (onTaskCreated) onTaskCreated();
    } catch (error) {
      alert('Failed to create task: ' + error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Textarea
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Type or speak your task..."
              className="h-32"
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={toggleListening}
              className={isListening ? "bg-red-50 border-red-200" : ""}
            >
              {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
              {isListening ? "Stop" : "Speak"}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAIOrganize}
              disabled={!taskText.trim() || isProcessing}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isProcessing ? "Organizing..." : "AI Organize"}
            </Button>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateTask}
              disabled={!taskText.trim()}
              className="bg-black hover:bg-black/80"
            >
              Create Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}