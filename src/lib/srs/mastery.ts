// Mastery logic for bidirectional learning
// A card is considered mastered when user successfully recalls it in both directions:
// - Forward: Armenian Script → English Meaning
// - Reverse: English Meaning → Armenian Script

export interface MasteryState {
  isForwardLearned: boolean;
  isReverseLearned: boolean;
  isMastered: boolean;
}

/**
 * Update mastery state based on review performance.
 * A direction is "learned" when user demonstrates they can reliably recall it.
 * Simplified: mark learned after first successful review (grade >= 2); revert on lapse (grade < 2).
 */
export function updateMasteryState(
  currentState: MasteryState,
  direction: 'forward' | 'reverse',
  grade: number
): MasteryState {
  const isSuccess = grade >= 2;

  if (direction === 'forward') {
    return {
      isForwardLearned: isSuccess ? true : false,
      isReverseLearned: currentState.isReverseLearned,
      isMastered: isSuccess && currentState.isReverseLearned,
    };
  } else {
    return {
      isForwardLearned: currentState.isForwardLearned,
      isReverseLearned: isSuccess ? true : false,
      isMastered: currentState.isForwardLearned && isSuccess,
    };
  }
}

/**
 * Determine if a card should continue to appear in study queue.
 * Mastered cards (learned in both directions) do not appear,
 * but can be resumed if user opts to keep practicing.
 */
export function shouldCardBeInQueue(isMastered: boolean): boolean {
  return !isMastered;
}
