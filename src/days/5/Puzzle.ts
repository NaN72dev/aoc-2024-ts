type Rule = {
  first: number;
  second: number;
}

function parseInput(input: string) : { rules: Rule[], updates: number[][] } {
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

  return { rules, updates };
}

function isUpdateOk(update: number[], rules: Rule[]) {
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

  return isUpdateOk;
}

// https://www.reddit.com/r/adventofcode/comments/1h71twj/2024_day_5_part_2_love_these_kind_of_days/
function reOrderUpdate(update: number[], rules: Rule[]): number[] | undefined {
  const _update = [...update];
  for (const rule of rules) {
    const firstIndex = _update.indexOf(rule.first);
    const secondIndex = _update.indexOf(rule.second);

    if (firstIndex === -1 || secondIndex === -1) {
      continue;
    }

    if (secondIndex >= firstIndex) {
      continue;
    }

    // swap first and second
    const temp = _update[firstIndex];
    _update[firstIndex] = _update[secondIndex];
    _update[secondIndex] = temp;
    // console.log('swapped', { 'first': _update[firstIndex], 'second': _update[secondIndex], update: _update });
  }

  return _update;
}

const first = (input: string) => {
  const { rules, updates } = parseInput(input);

  let result = 0;
  for (const update of updates) {
    if (!isUpdateOk(update, rules)) {
      continue;
    }

    result += update[Math.floor(update.length / 2)];
  }

  return result;
};

const expectedFirstSolution = 143;

const second = (input: string) => {
  const { rules, updates } = parseInput(input);

  let result = 0;
  for (const update of updates) {
    let updateOk = isUpdateOk(update, rules);
    if (updateOk) {
      continue;
    }

    let reOrdered = [...update];
    while (!updateOk) {
       reOrdered = reOrderUpdate(reOrdered, rules);
      if (!reOrdered) {
        console.error('no re-ordering found', { update });
        continue;
      }

      updateOk = isUpdateOk(reOrdered, rules);
    }

    result += reOrdered[Math.floor(reOrdered.length / 2)];
  }

  return result;
};

const expectedSecondSolution = 123;

export { first, expectedFirstSolution, second, expectedSecondSolution };
