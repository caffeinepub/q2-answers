import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { shareScore } from '../lib/share';

interface LevelUpOverlayProps {
  isOpen: boolean;
  level: number;
  onContinue: () => void;
}

export default function LevelUpOverlay({ isOpen, level, onContinue }: LevelUpOverlayProps) {
  const handleShare = () => {
    shareScore(level);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="bg-[oklch(0.45_0.15_165)] text-white border-0 max-w-sm p-8"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="animate-bounce">
            <Trophy className="w-20 h-20 text-[oklch(0.85_0.15_85)]" />
          </div>
          
          <div>
            <h1 className="text-3xl font-extrabold mb-2">LEVEL UP!</h1>
            <p className="text-lg text-white/90">
              You have reached Level {level}!
            </p>
          </div>

          <div className="flex gap-3 w-full">
            <Button
              onClick={onContinue}
              className="flex-1 bg-[oklch(0.85_0.15_85)] hover:bg-[oklch(0.80_0.15_85)] text-[oklch(0.35_0.15_165)] font-bold py-6 text-base border-0"
            >
              CONTINUE
            </Button>
            <Button
              onClick={handleShare}
              className="flex-1 bg-[oklch(0.60_0.20_220)] hover:bg-[oklch(0.55_0.20_220)] text-white font-bold py-6 text-base border-0"
            >
              SHARE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
