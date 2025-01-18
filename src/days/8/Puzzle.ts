import { Vector } from 'vecti';

const EMPTY = '.';
const ANTI_NODE = '#';

function parseInput(input: string): string[][] {
  return input.split('\n')
    .filter(s => s !== '')
    .map(l => l.split(''));
}

function parseAntennas(map: string[][]): Map<string, Vector[]> {
  const result = new Map<string, Vector[]>();

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const char = map[y][x];
      if (char === EMPTY || char === ANTI_NODE) {
        continue;
      }

      if (!result.has(char)) {
        result.set(char, []);
      }

      result.get(char)!.push(new Vector(x, y));
    }
  }

  return result;
}

function isOutOfMap(map: string[][], coord: Vector) {
  return coord.x < 0 || coord.x >= map[0].length || coord.y < 0 || coord.y >= map.length;
}

function getAntiNodes(map: string[][], isInfinite: boolean): Set<string> {
  const antennaMap = parseAntennas(map);

  const unqAntiNodes = new Set<string>();
  for (const antenna of Array.from(antennaMap.keys())) {
    const antennaVectors = antennaMap.get(antenna)!;

    for (const ant1Index in antennaVectors) {
      for (const ant2Index in antennaVectors) {
        if (ant2Index <= ant1Index) {
          continue;
        }


        let coord1 = antennaVectors[ant1Index];
        let coord2 = antennaVectors[ant2Index];

        if (isInfinite) {
          unqAntiNodes.add(JSON.stringify(coord1));
          unqAntiNodes.add(JSON.stringify(coord2));
        }
        const directVec = coord1.subtract(coord2);
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const antiNode1 = coord1.add(directVec);
          if (!isOutOfMap(map, antiNode1)) {
            unqAntiNodes.add(JSON.stringify(antiNode1));
            if (isInfinite) {
              coord1 = antiNode1;
            }
          }

          const antiNode2 = coord2.add(directVec.multiply(-1));
          if (!isOutOfMap(map, antiNode2)) {
            unqAntiNodes.add(JSON.stringify(antiNode2));
            if (isInfinite) {
              coord2 = antiNode2;
            }
          }

          if (!isInfinite) {
            break;
          }

          if (isInfinite && isOutOfMap(map, antiNode1) && isOutOfMap(map, antiNode2)) {
            break;
          }
        }
      }
    }
  }

  return unqAntiNodes;
}

const first = (input: string) => {
  const map = parseInput(input);
  const antiNodes = getAntiNodes(map, false);
  return antiNodes.size;
};

const expectedFirstSolution = 14;

const second = (input: string) => {
  const map = parseInput(input);
  const antiNodes = getAntiNodes(map, true);
  return antiNodes.size;
};

const expectedSecondSolution = 34;

export { first, expectedFirstSolution, second, expectedSecondSolution };
