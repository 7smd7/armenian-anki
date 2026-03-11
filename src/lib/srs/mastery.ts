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
 * Mark a direction learned only on Easy (grade === 3); revert on anything below.
 */
export function updateMasteryState(
  currentState: MasteryState,
  direction: 'forward' | 'reverse',
  grade: number
): MasteryState {
  const isSuccess = grade >= 3;

  const isForwardLearned =
    direction === 'forward' ? isSuccess : currentState.isForwardLearned;
  const isReverseLearned =
    direction === 'reverse' ? isSuccess : currentState.isReverseLearned;

  return {
    isForwardLearned,
    isReverseLearned,
    isMastered: isForwardLearned && isReverseLearned,
  };
}

/**
 * Determine if a card should continue to appear in study queue.
 * Mastered cards (learned in both directions) do not appear,
 * but can be resumed if user opts to keep practicing.
 */
export function shouldCardBeInQueue(isMastered: boolean): boolean {
  return !isMastered;
}

/**
 * Decide which direction to show in Mix mode (weak-link priority).
 * - Neither learned → Forward (build recognition before production)
 * - Forward learned, reverse not → Reverse (fill the gap)
 * - Reverse learned, forward not → Forward (fill the gap)
 * - Both learned → isMastered, filtered out of queue — unreachable here
 * Returns true for reverse, false for forward (matches the `reverse` boolean convention).
 */
export function decideMixDirection(state: {
  isForwardLearned: boolean;
  isReverseLearned: boolean;
}): boolean {
  return state.isForwardLearned && !state.isReverseLearned;
}
