export async function shareScore(level: number): Promise<void> {
  const shareText = `I just reached Level ${level} in Q2 ANSWERS! Can you beat my score?`;
  const shareTitle = 'Q2 ANSWERS';
  const shareUrl = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl
      });
    } catch (error) {
      // User cancelled or share failed
      console.log('Share cancelled or failed');
    }
  } else {
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Score copied to clipboard! Share it with your friends.');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert('Unable to share. Please copy manually.');
    }
  }
}
