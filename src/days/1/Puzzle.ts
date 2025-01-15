// sort the arrays in ascending order
const sortFn = (a: number, b: number) => a - b;

function distance(first: number[], second: number[]) {
  first = first.sort(sortFn);
  second = second.sort(sortFn);

  // find the difference between the two arrays
  return first.reduce(
    (acc, curr, index) => acc + Math.abs(curr - second[index]),
    0
  );
}

function similarity(first: number[], second: number[]) {
  const countMap = second.reduce((acc, curr) => {
    const count = acc.get(curr);
    if (count) {
 acc.set(curr, count + 1); 
} else {
 acc.set(curr, 1); 
}

    return acc;
  }, new Map<number, number>());

  return first.reduce((acc, curr) => {
    const count = countMap.get(curr);
    if (!count) {
 return acc; 
}

    return acc + curr * count;
  }, 0);
}

function parseInput(input: string) {
  return input.split('\n').filter(s=>s!=='')
    .reduce((acc, line) => {
      const [firstStr, secondStr] = line.split('   ');

      acc.first.push(parseInt(firstStr, 10));
      acc.second.push(parseInt(secondStr, 10));

      return acc;
    }, { first: [] as number[], second: [] as number[] });
}

const first = (input: string) => {
  const { first, second } = parseInput(input);
  return distance(first, second);
};

const expectedFirstSolution = 11;

const second = (input: string) => {
  const { first, second } = parseInput(input);
  return similarity(first, second);
};

const expectedSecondSolution = 31;

export { first, expectedFirstSolution, second, expectedSecondSolution };
