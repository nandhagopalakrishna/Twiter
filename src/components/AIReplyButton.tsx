import React, { useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';

interface AIReplyButtonProps {
  tweetContent: string;
  onReplyGenerated: (reply: string) => void;
}

export function AIReplyButton({ tweetContent, onReplyGenerated }: AIReplyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReply = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tweet: tweetContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate reply');
      }

      const data = await response.json();
      onReplyGenerated(data.reply);
    } catch (err) {
      setError('Error generating reply. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="inline-flex items-center">
      <button
        onClick={generateReply}
        disabled={isLoading}
        className={`
          inline-flex items-center gap-2 px-3 py-1.5 rounded-full
          text-sm font-medium transition-colors
          ${isLoading 
            ? 'bg-blue-100 text-blue-400 cursor-not-allowed' 
            : 'bg-blue-500 text-white hover:bg-blue-600'}
        `}
      >
        <MessageSquarePlus className="w-4 h-4" />
        {isLoading ? 'Generating...' : 'AI Reply'}
      </button>
      {error && (
        <span className="ml-2 text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}