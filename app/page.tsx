'use client';

import React, { useState, useEffect } from 'react';
import flyerImage from '@/public/fsw-hackfest-flyer.png';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Mail, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

export default function App() {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date('2025-10-19T10:30:00').getTime();

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setTimeRemaining({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'Cyber Club Hackfest',
      text: 'Join us for Cyber Club Hackfest on October 19, 2025! Think Like An Adversary, Rise Like A Defender.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (Error: any) {
      if (Error.name !== 'AbortError') {
        console.error('Error sharing:', Error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0"
      >
        <source src="/greentext.mp4" type="video/mp4" />
      </video>

      {/* Overlay to darken video */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0"></div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Flyer Display */}
          <div className="rounded-lg p-4">
            <Image
              src={flyerImage}
              alt="Cyber Club Hackfest - October 19, 2025"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Countdown Timer */}
          <div className="mt-4 bg-gradient-to-r from-cyan-950/50 via-purple-950/50 to-cyan-950/50 rounded-lg p-6 shadow-2xl backdrop-blur-sm border border-cyan-400/30">
            <div className="text-center mb-4">
              <h2 className="text-cyan-400">Event Starts In</h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-slate-900/70 rounded-lg p-4 border border-purple-500/30">
                  <div className="text-cyan-400 mb-1 flex flex-1 justify-center">Days</div>
                  <div className="text-white">{timeRemaining.days}</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-slate-900/70 rounded-lg p-4 border border-purple-500/30">
                  <div className="text-cyan-400 mb-1 flex flex-1 justify-center">Hours</div>
                  <div className="text-white">{timeRemaining.hours}</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-slate-900/70 rounded-lg p-4 border border-purple-500/30">
                  <div className="text-cyan-400 mb-1 flex flex-1 justify-center">Minutes</div>
                  <div className="text-white">{timeRemaining.minutes}</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-slate-900/70 rounded-lg p-4 border border-purple-500/30">
                  <div className="text-cyan-400 mb-1 flex flex-1 justify-center">Seconds</div>
                  <div className="text-white">{timeRemaining.seconds}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Button
              onClick={() => setContactDialogOpen(true)}
              variant="outline"
              className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 h-14"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
            <Button
              onClick={handleShare}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white h-14"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share
            </Button>
          </div>
        </div>
      </main>

      {/* Contact Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="bg-slate-900 border-cyan-400/30">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">Contact Us</DialogTitle>
            <DialogDescription className="text-slate-300">
              Get in touch with the Cyber Club!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <div className="text-white mb-1">Email</div>
              <a
                href="mailto:rushell.hopkins@fsw.edu"
                className="text-cyan-400 hover:underline"
              >
                rushell.hopkins@fsw.edu
              </a>
            </div>
            <div>
              <div className="text-white mb-1">Register Here!</div>
              <a
                href="https://fsw.presence.io/event/2nd-annual-hackfest-2025"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                https://fsw.presence.io/event/2nd-annual-hackfest-2025
              </a>
            </div>
            <div>
              <div className="text-white mb-1">Address</div>
              <a className='hover:underline hover:text-cyan-400' href="https://www.google.com/maps/place/Florida+SouthWestern+State+College/@26.6067576,-81.8655264,15z/data=!4m6!3m5!1s0x88d9068068552849:0x73c8050664368457!8m2!3d26.6067576!4d-81.8655264!16s%2Fg%2F11c488kgzn?entry=ttu&g_ep=EgoyMDI1MTAxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                <p className="text-slate-300">
                  Florida SouthWestern State College<br />
                  Lee Campus, Building K<br />
                  8099 College Parkway<br />
                  Fort Myers, FL 33919
                </p>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

