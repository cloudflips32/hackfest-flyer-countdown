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
    <div className="h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
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
      <main className="container mx-auto px-4 py-8 relative z-10 h-full flex items-center justify-center">
        <div className="max-w-4xl">
          {/* Flyer Display */}
          <div className="rounded-lg p-4 scale-120 md:scale-90 lg:scale-65">
            <Image
              src={flyerImage}
              alt="Cyber Club Hackfest - October 19, 2025"
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

