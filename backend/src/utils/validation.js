export function validateTweet(tweet) {
  if (!tweet || typeof tweet !== 'string') {
    return false;
  }
  
  // Tweet should not be empty and should be reasonable length
  return tweet.trim().length > 0 && tweet.length <= 1000;
}