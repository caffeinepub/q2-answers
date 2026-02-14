import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, Volume2, VolumeX } from 'lucide-react';
import { shareScore } from '../lib/share';
import { useState } from 'react';

interface GameHeaderProps {
  level: number;
  isMuted: boolean;
  onToggleMusic: () => void;
}

export default function GameHeader({ level, isMuted, onToggleMusic }: GameHeaderProps) {
  const [logoError, setLogoError] = useState(false);

  const handleShare = () => {
    shareScore(level);
  };

  return (
    <header className="bg-[oklch(0.45_0.15_165)] text-white px-4 py-3 flex items-center justify-between gap-3 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center font-black text-[oklch(0.45_0.15_165)] text-lg shadow-sm overflow-hidden">
          {!logoError ? (
            <img
              src="/assets/generated/q2-answers-logo.dim_256x256.png"
              alt="Q2"
              className="w-full h-full object-cover"
              onError={() => setLogoError(true)}
            />
          ) : (
            'Q2'
          )}
        </div>
        <div className="font-extrabold text-base tracking-tight">ANSWERS</div>
      </div>

      <Badge variant="secondary" className="bg-[oklch(0.85_0.15_85)] text-[oklch(0.35_0.15_165)] font-extrabold px-3 py-1 text-sm border-0">
        LV {level}
      </Badge>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="h-8 px-3 bg-white/20 hover:bg-white/30 text-white border-0"
        >
          <Share2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleMusic}
          className="h-8 px-3 bg-white/20 hover:bg-white/30 text-white border-0"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}
