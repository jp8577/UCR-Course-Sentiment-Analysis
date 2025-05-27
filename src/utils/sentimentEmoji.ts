// sentimentEmoji.ts


const sentimentEmoji: { [key: number]: string } = {
  [-1]: "☠️🧨🤬",   // Negative
  [0]: "😐🫥🤷",     // Neutral
  [1]: "🌈🛌😎",     // Positive
 };
 
 
 export function getSentimentEmoji(scoreInput: unknown): string {
  // Convert input to a number safely
  const score = typeof scoreInput === "number" ? scoreInput : Number(scoreInput);
 
 
  if (isNaN(score)) {
    console.warn("Warning: Invalid sentiment score:", scoreInput);
    return "❓";  // Unknown or invalid score
  }
 
 
  let label = 0;
  if (score > 0.25) {
    label = 1;
  } else if (score < -0.25) {
    label = -1;
  }
 
 
  return sentimentEmoji[label] || "❓";
 }
 