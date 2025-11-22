import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';

interface AICompanionProps {
  studentName: string;
  studentPhoto?: string;
  context: string;
  type: 'encouragement' | 'correction' | 'celebration' | 'focus';
  show: boolean;
  onClose?: () => void;
}

const AICompanion = ({ studentName, studentPhoto, context, type, show, onClose }: AICompanionProps) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMouthOpen, setIsMouthOpen] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (show && context) {
      fetchMessage();
    }

    // Cleanup speech on unmount
    return () => {
      if (speechSynthRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [show, context, type]);

  const fetchMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://ethio-stem-pre-k-math.vercel.app/api/companion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentName,
          context,
          type
        })
      });

      const data = await response.json();
      setMessage(data.message);
      
      // Speak the message
      speakMessage(data.message);
    } catch (error) {
      console.error('AI Companion error:', error);
      const fallbackMsg = `Keep going, ${studentName}!`;
      setMessage(fallbackMsg);
      speakMessage(fallbackMsg);
    } finally {
      setLoading(false);
    }
  };

  const speakMessage = (text: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthRef.current = utterance;

    // Configure voice
    utterance.rate = 0.9; // Slightly slower for kids
    utterance.pitch = 1.1; // Slightly higher pitch for friendly tone
    utterance.volume = 1;

    // Animate mouth while speaking
    utterance.onstart = () => {
      setIsSpeaking(true);
      startMouthAnimation();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      stopMouthAnimation();
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      stopMouthAnimation();
    };

    window.speechSynthesis.speak(utterance);
  };

  const startMouthAnimation = () => {
    // Simple mouth animation - open/close every 200ms
    const interval = setInterval(() => {
      setIsMouthOpen(prev => !prev);
    }, 200);

    // Store interval to clear later
    (window as any).mouthAnimationInterval = interval;
  };

  const stopMouthAnimation = () => {
    if ((window as any).mouthAnimationInterval) {
      clearInterval((window as any).mouthAnimationInterval);
      (window as any).mouthAnimationInterval = null;
    }
    setIsMouthOpen(false);
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      stopMouthAnimation();
    } else {
      speakMessage(message);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4">
      <Card className="max-w-sm border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5 shadow-xl">
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Avatar with mouth animation */}
            <div className="flex-shrink-0 relative">
              {studentPhoto ? (
                <div className="relative">
                  <img 
                    src={studentPhoto} 
                    alt={studentName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                  />
                  {/* Simple mouth overlay */}
                  {isSpeaking && (
                    <div 
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black rounded-full transition-all duration-100"
                      style={{
                        width: isMouthOpen ? '12px' : '8px',
                        height: isMouthOpen ? '8px' : '4px'
                      }}
                    />
                  )}
                  {/* Speaking indicator */}
                  {isSpeaking && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                  )}
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative">
                  <Sparkles className="w-8 h-8 text-primary" />
                  {isSpeaking && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                  )}
                </div>
              )}
            </div>

            {/* Message */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-primary">Your Study Buddy</span>
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                
                {/* Sound toggle button */}
                {!loading && message && (
                  <button
                    onClick={toggleSpeech}
                    className="p-1 hover:bg-primary/10 rounded transition-colors"
                    title={isSpeaking ? "Stop speaking" : "Play message"}
                  >
                    {isSpeaking ? (
                      <VolumeX className="w-4 h-4 text-primary" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-primary" />
                    )}
                  </button>
                )}
              </div>
              
              {loading ? (
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              ) : (
                <div className="relative">
                  <p className="text-sm text-foreground">{message}</p>
                  {/* Speech bubble tail */}
                  <div className="absolute -left-6 top-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-card" />
                </div>
              )}
            </div>

            {/* Close button */}
            {onClose && (
              <button 
                onClick={() => {
                  window.speechSynthesis.cancel();
                  onClose();
                }}
                className="text-muted-foreground hover:text-foreground text-xl leading-none"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AICompanion;
