enum Operation {
  MUL = '*',
  ADD = '+',
}

type Eq = number[];
type OP = Map<number, Eq>;

function parseInput(input: string): OP {
  const map = new Map<number, number[]>();

  input.split('\n')
    .filter(s => s !== '')
    .map(l => l.split(': '))
    .forEach(([k, v]) => {
      // l = '190: 10 19'
      const nums = v.split(' ')
        .map(x => parseInt(x, 10));

      map.set(parseInt(k, 10), nums);
    });

  return map;
}

function evalEq(eq: Eq, ops: Operation[]): number {
  let res = eq[0];
  for (let i = 0; i < eq.length; i++) {
    if (i === 0) {
      continue;
    }
    const op = ops[i - 1];
    if (op === Operation.MUL) {
      res *= eq[i];
    } else {
      res += eq[i];
    }
  }

  return res;
}

function backtrack(eq: Eq, eqRes: number, ops: Operation[]): Operation[] | null {
  for (const op of [Operation.MUL, Operation.ADD]) {
    ops.push(op);
    if (ops.length >= eq.length) {
      return null;
    }

    const res = evalEq(eq, ops);
    if (ops.length === eq.length - 1) {
      if (res === eqRes) {
        return ops;
      }

      ops.pop();
      continue;
    }

    const btOpos = backtrack(eq, eqRes, ops);
    if (!btOpos) {
      ops.pop();
      continue;
    }

    return btOpos;
  }

  return null;
}

const first = (input: string) => {
  const map = parseInput(input);

  let sum = 0;
  const i = map.keys();
  let key = i.next().value;
  while (key !== undefined) {
    const numbers = map.get(key);
    const eqRes = key as number;

    // construct ops
    const ops = backtrack(numbers, eqRes, []);
    if (!ops) {
      key = i.next().value;
      continue;
    }

    const res = evalEq(numbers, ops);
    if (res === eqRes) {
      sum += res;
    }

    key = i.next().value;
  }

  return sum;
};

const expectedFirstSolution = 3749;

const second = (input: string) => {
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
