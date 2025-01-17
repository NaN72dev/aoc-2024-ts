# Advent of Code 2024

My ***really late*** and ***very janky*** attempt to solve [Advent of Code 2024](https://adventofcode.com/2024) using
Typescript.

Install dependencies to run the code.

```sh
pnpm install
```

This repo is generated
with [Advent of Code Typescript Template](https://github.com/edge33/AdventOfCode-typescript-template), day 1 - 4 is
imported from [my own repo](https://github.com/NaN72dev/aoc-2024`).

# [Day 1](https://adventofcode.com/2024/day/1)

*2025-01-09 (~60m)*

```sh
pnpm dev 1
#> 1889772
#> 23228917
```

# [Day 2](https://adventofcode.com/2024/day/2)

*2025-01-10 (~1h30m)*

Brute forcing part 2, I'm not proud of it, but it's not that bad.

```sh
pnpm dev 2
#> 660
#> 689
```

# [Day 3](https://adventofcode.com/2024/day/3)

*2025-01-13 (~30m)*

Well I prompted my AI to generate the regex. Who write their own regex anyway?

```sh
pnpm dev 3
#> 174561379
#> 106921067
```

# [Day 4](https://adventofcode.com/2024/day/4)

*2025-01-14 (~60m)*

The logic might be right, but the comments are probably wrong.

```sh
pnpm dev 4
#> 2567
#> 2029
```

# [Day 5](https://adventofcode.com/2024/day/5)

*2025-01-15 (~2h20m)*

I was tripping on part 2 of this puzzle. It's a shame that I
need [hint](https://www.reddit.com/r/adventofcode/comments/1h71twj/comment/m0hxi6s/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
to solve this one (solved 5m after the hint).

```sh
pnpm dev 5
#> 5129
#> 4077
```

# [Day 6](https://adventofcode.com/2024/day/6)

*2025-01-16 (~ 1h + 30m)*

```sh
pnpm dev 6
#> 5131
#> 1784
```

# [Day 7](https://adventofcode.com/2024/day/7)

*2025-01-16 (~ 1h30m + 30m)*

I was planning to use backtracking and spent an hour working on it but didn't get it to work. Turns out the loop I used
to iterate over the equations was wrong, so I got stuck in an infinite loop, not because of my backtracking algorithm!

Then I misunderstood the calculation, thought it should be normal math, but it's not lol. The same problem goes to part
2, I though I should eliminate the `||` operator, but it's not the case. I just need to add a new case to the switch
statement,but I was overthinking it.

Reading is really important, guys. What a shame of me.

```sh
pnpm dev 7
#> 2437272016585
#> 162987117690649
```
