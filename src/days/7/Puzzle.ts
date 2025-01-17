enum Operation {
  MUL = '*',
  ADD = '+',
  CON = '||'
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
    switch (op) {
      case Operation.MUL:
        res *= eq[i];
        break;
      case Operation.ADD:
        res += eq[i];
        break;
      case Operation.CON:
        res = parseInt(res.toString() + eq[i].toString(), 10);
        break;
    }
  }

  return res;
}

function backtrack(eq: Eq, eqRes: number, ops: Operation[], avalOps: Operation[]): Operation[] | null {
  for (const op of avalOps) {
    ops.push(op);
    if (ops.length >= eq.length) {
      return null;
    }

    const res = evalEq(eq, ops);
    if (ops.length === eq.length - 1) {
      // console.log(`res: ${res}; eqRes: ${eqRes}; ops: ${ops}`);
      if (res === eqRes) {
        return ops;
      }

      ops.pop();
      continue;
    }

    const btOpos = backtrack(eq, eqRes, ops, avalOps);
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
    const ops = backtrack(numbers, eqRes, [], [Operation.MUL, Operation.ADD]);
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
  const map = parseInput(input);

  let sum = 0;
  const i = map.keys();
  let key = i.next().value;
  while (key !== undefined) {
    const numbers = map.get(key);
    const eqRes = key as number;

    // construct ops
    const ops = backtrack(numbers, eqRes, [], [Operation.MUL, Operation.ADD, Operation.CON]);
    if (!ops) {
      key = i.next().value;
      continue;
    }

    sum += evalEq(numbers, ops);
    key = i.next().value;
  }

  return sum;
};

const expectedSecondSolution = 11387;

export { first, expectedFirstSolution, second, expectedSecondSolution };
