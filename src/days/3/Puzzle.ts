// regex to match mul(X,Y), x, y is a number 1 - 3 digits
const MUL_REGEX = /mul\((\d+),(\d+)\)/g;
// matches do(), don't(), mul(x,y)
const DO_DONT_REGEX = /do\(\)|don't\(\)/g;
const COMBINED_REG = new RegExp(`(${DO_DONT_REGEX.source})|(${MUL_REGEX.source})`, 'g');

function filterDoDont(_matches: RegExpMatchArray): string[] {
  const matches = [..._matches];
  while (true) {
    const dontIndex = matches.findIndex(match => match.startsWith('don\'t()'));
    const doIndex = matches.findIndex(match => match.startsWith('do()'));

    if (doIndex < dontIndex
      || doIndex !== -1 && dontIndex === -1
    ) {
      matches.splice(doIndex, 1);
      continue;
    }
    if (dontIndex === -1) {
      break;
    }

    matches.splice(dontIndex, doIndex - dontIndex + 1);
  }

  return matches;
}

const first = (input: string) => {
  const matches = input.match(MUL_REGEX)
    .map(match => match);

  return matches.reduce((acc, match) => {
    const [x, y] = match
      .replace('mul(', '')
      .replace(')', '')
      .split(',')
      .map(x => parseInt(x, 10));

    return acc + x * y;
  }, 0);
};

const expectedFirstSolution = 161;

const second = (input: string) => {
  const matches = input.match(COMBINED_REG);
  const filteredMatches = filterDoDont(matches);

  return filteredMatches.reduce((acc, match) => {
    const [x, y] = match
      .replace('mul(', '')
      .replace(')', '')
      .split(',')
      .map(x => parseInt(x, 10));

    return acc + x * y;
  }, 0);
};

const expectedSecondSolution = 48;

export { first, expectedFirstSolution, second, expectedSecondSolution };
