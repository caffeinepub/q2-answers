import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  percent: number;
}

export default function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="mb-8">
      <Progress 
        value={percent} 
        className="h-3 bg-[oklch(0.92_0.01_85)]"
      />
    </div>
  );
}
