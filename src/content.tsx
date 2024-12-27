import React from 'react';
import { createRoot } from 'react-dom/client';
import { AIReplyButton } from './components/AIReplyButton';
import './index.css';

function injectAIReplyButton() {
  const replyBoxes = document.querySelectorAll('[data-testid="tweetTextarea_0"]');

  replyBoxes.forEach((replyBox) => {
    // Check if button is already injected
    if (replyBox.parentElement?.querySelector('.ai-reply-button')) {
      return;
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'ai-reply-button';
    replyBox.parentElement?.insertBefore(buttonContainer, replyBox.nextSibling);

    // Get tweet content from the parent tweet
    const tweetContent = getTweetContent();

    createRoot(buttonContainer).render(
      <AIReplyButton
        tweetContent={tweetContent}
        onReplyGenerated={(reply) => {
          // Insert reply into textarea
          const textarea = replyBox as HTMLTextAreaElement;
          textarea.value = reply;
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
        }}
      />
    );
  });
}

function getTweetContent(): string {
  const tweetText = document.querySelector('[data-testid="tweetText"]');
  return tweetText?.textContent || '';
}

// Initial injection
injectAIReplyButton();

// Watch for dynamic content changes
const observer = new MutationObserver(() => {
  injectAIReplyButton();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Cleanup on extension unload
window.addEventListener('unload', () => {
  observer.disconnect();
});