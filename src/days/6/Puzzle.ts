enum Type {
  PATH = '.',
  WALL = '#',
  GUARD = '^'
}

enum Direction {
  UP = '^',
  DOWN = 'v',
  LEFT = '<',
  RIGHT = '>'
}

type Coord = { x: number, y: number };

function getNextCoord(curPos: Coord, direction: Direction) {
  switch (direction) {
    case Direction.UP:
      return { x: curPos.x, y: curPos.y - 1 };
    case Direction.DOWN:
      return { x: curPos.x, y: curPos.y + 1 };
    case Direction.LEFT:
      return { x: curPos.x - 1, y: curPos.y };
    case Direction.RIGHT:
      return { x: curPos.x + 1, y: curPos.y };
    default:
      throw new Error('invalid direction');
  }
}

function getDirectionAfterTurn(curDir: Direction) {
  switch (curDir) {
    case Direction.UP:
      return Direction.RIGHT;
    case Direction.DOWN:
      return Direction.LEFT;
    case Direction.LEFT:
      return Direction.UP;
    case Direction.RIGHT:
      return Direction.DOWN;
    default:
      throw new Error('invalid direction');
  }
}

function isWall(map: string[][], coord: Coord) {
  try {
    const type = map[coord.y][coord.x];
    if (!type) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error('invalid type');
    }

    if (type === Type.GUARD) {
      return false;
    }

    return type === Type.WALL;
  } catch (e) {
    return true;
  }
}

function isOutOfMap(map: string[][], coord: Coord) {
  return coord.x < 0 || coord.x >= map[0].length || coord.y < 0 || coord.y >= map.length;
}

const first = (input: string) => {
  const map = input.split('\n')
    .filter(s => s !== '')
    .map(l => l.split(''));

  // find guard coords
  let guard = map.flatMap((row, y) => {
    return row.map((cell, x) => {
      if (cell === Type.GUARD) {
        return { x, y };
      }
      return undefined;
    }).filter(x => x !== undefined);
  })[0];
  let direction = Direction.UP;

  // simulate to route & record the visited coords
  const visited = new Set<string>();
  // includes the starting point
  visited.add(JSON.stringify(guard));

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const nextCoord = getNextCoord(guard, direction);
    const isNextCoordWall = isWall(map, nextCoord);

    if (isNextCoordWall) {
      if (isOutOfMap(map, nextCoord)) {
        break;
      }

      direction = getDirectionAfterTurn(direction);
      continue;
    }

    guard = nextCoord;
    visited.add(JSON.stringify(guard));
  }

  return visited.size;
};

const expectedFirstSolution = 41;

const second = (input: string) => {
  const map = input.split('\n')
    .filter(s => s !== '')
    .map(l => l.split(''));

  // find guard coords
  const originGuard = map.flatMap((row, y) => {
    return row.map((cell, x) => {
      if (cell === Type.GUARD) {
        return { x, y };
      }
      return undefined;
    }).filter(x => x !== undefined);
  })[0];
  let count = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const mapClone = [] as string[][];
      map.forEach(row => mapClone.push([...row]));

      if (isWall(map, { x: j, y: i })) {
        continue;
      }

      if (map[i][j] === Type.GUARD) {
        continue;
      }

      // console.log(`replaced ${i} ${j} with ${Type.WALL}`);
      mapClone[i][j] = Type.WALL;

      // this is ok

      // simulate to route & record the visited coords
      const visited = new Set<string>();
      let guard = originGuard;
      let direction = Direction.UP;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const nextCoord = getNextCoord(guard, direction);
        const isNextCoordWall = isWall(mapClone, nextCoord);

        if (isNextCoordWall) {
          if (isOutOfMap(mapClone, nextCoord)) {
            // console.log('out of map', i, j);
            break;
          }

          direction = getDirectionAfterTurn(direction);
          continue;
        }

        const value = JSON.stringify({ guard, direction });
        if (visited.has(value)) {
          count++;
          break;
        }

        guard = nextCoord;
        visited.add(value);
      }
    }
  }

  return count;
};

const expectedSecondSolution = 6;

export { first, expectedFirstSolution, second, expectedSecondSolution };
