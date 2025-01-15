const MIN_LEVEL_DIFF = 1;
const MAX_LEVEL_DIFF = 3;

function isSafe(levels: number[]): boolean {
  const diffs = levels.reduce((acc, curr, index) => {
    if (index <= 0) {
      return acc;
    }
    if (acc.hasZero) {
      return acc;
    }

    const prev = levels[index - 1];
    const diff = prev - curr;

    if (diff === 0) {
      acc.hasZero = true;
      return acc;
    }

    acc.maxDiff = Math.max(acc.maxDiff, diff);
    acc.minDiff = Math.min(acc.minDiff, diff);

    return acc;
  }, { maxDiff: -Number.MAX_VALUE, minDiff: Number.MAX_VALUE, hasZero: false });

  // there are no increasing or decreasing diffs
  if (diffs.hasZero) {
    return false;
  }

  // there are increasing diffs and decreasing diffs
  if (diffs.maxDiff * diffs.minDiff <= 0) {
    return false;
  }

  // out of bounds diff
  if (Math.max(Math.abs(diffs.maxDiff), Math.abs(diffs.minDiff)) > MAX_LEVEL_DIFF) {
    return false;
  }

  return Math.min(Math.abs(diffs.maxDiff), Math.abs(diffs.minDiff)) >= MIN_LEVEL_DIFF;
}

const first = (input: string) => {
  return input.split('\n')
    .filter(s => s !== '')
    .reduce((acc, report) => {
      const levels = report.split(' ')
        .map(Number);

      if (isSafe(levels)) {
        return acc + 1;
      }

      return acc;
    }, 0);
};

const expectedFirstSolution = 2;

const second = (input: string) => {
  return input.split('\n')
    .filter(s => s !== '')
    .reduce((acc, report) => {
      const levels = report.split(' ')
        .map(Number);

      if (isSafe(levels)) {
        return acc + 1;
      }

      for (let index = 0; index < levels.length; index++) {
        const spliced = [...levels].slice(0, index)
          .concat([...levels].slice(index + 1));

        if (!isSafe(spliced)) {
          continue;
        }
        return acc + 1;
      }

      return acc;
    }, 0);
};

const expectedSecondSolution = 4;

export { first, expectedFirstSolution, second, expectedSecondSolution };
