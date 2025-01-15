type Rule = {
  first: number;
  second: number;
}

const first = (input: string) => {
  const splits = input.split('\n\n');
  const rules = splits[0]
    .split('\n')
    .map(s => {
      const splits = s.split('|');
      return {
        first: parseInt(splits[0]),
        second: parseInt(splits[1])
      } as Rule;
    });

  const updates = splits[1].split('\n')
    .map(s=> s.split(',')
      .map(n=>parseInt(n))
    );

  let result = 0;
  for (const update of updates) {
    let isUpdateOk = true;
    for (const rule of rules) {
      const firstIndex = update.indexOf(rule.first);
      const secondIndex = update.indexOf(rule.second);

      if (firstIndex === -1 || secondIndex === -1) {
        continue;
      }

      if (secondIndex >= firstIndex) {
        continue;
      }

      isUpdateOk = false;
    }

    if (!isUpdateOk) {
      continue;
    }

    result += update[Math.floor(update.length / 2)];
  }

  return result;
};

const expectedFirstSolution = 143;

const second = (input: string) => {
  input;
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
