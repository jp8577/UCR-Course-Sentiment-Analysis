const emojiMap: { [key: number]: string } = {
    1: "😴",  // asleep – effortless
    2: "😌",  // relieved – super chill
    3: "🙂",  // slightly focused
    4: "😐",  // neutral – manageable
    5: "😬",  // uneasy – getting tough
    6: "😕",  // confused
    7: "😰",  // anxious
    8: "😫",  // exhausted
    9: "😵",  // overwhelmed
    10: "💀", // dead – extreme
  };
   export function getDifficultyEmoji(score: number): string {
    const rounded = Math.round(score);
    return emojiMap[rounded] || "❓";
  } 