import Disasters from './Disasters.js';
import { expect, expectTypeOf, test } from 'vitest';

test('Disasters', () => {
  const data = new Disasters({
    stats: {
      deaths: { hypixel_says: 1, flood: 1, withers: 1, sinkhole: 1 },
      games_played: 5,
      losses: 4,
      survived: { swappage: 1, purge: 1, anvil_rain: 1, grounded: 1, tnt_rain: 1, tornado: 1, withers: 1 },
      time_survived: 808,
      wins: 1
    }
  });
  expect(data).toBeDefined();
  expect(data).toBeInstanceOf(Disasters);
  expectTypeOf(data).toEqualTypeOf<Disasters>();
  expect(data.stats).toBeDefined();
  expect(data.stats.deaths).toBeDefined();
  expect(data.stats.deaths.hypixel_says).toBe(1);
  expect(data.stats.deaths.flood).toBe(1);
  expect(data.stats.deaths.withers).toBe(1);
  expect(data.stats.deaths.sinkhole).toBe(1);
  expect(data.stats.games_played).toBe(5);
  expect(data.stats.losses).toBe(4);
  expect(data.stats.survived).toBeDefined();
  expect(data.stats.survived.swappage).toBe(1);
  expect(data.stats.survived.purge).toBe(1);
  expect(data.stats.survived.anvil_rain).toBe(1);
  expect(data.stats.survived.grounded).toBe(1);
  expect(data.stats.survived.tnt_rain).toBe(1);
  expect(data.stats.survived.tornado).toBe(1);
  expect(data.stats.survived.withers).toBe(1);
  expect(data.stats.time_survived).toBe(808);
  expect(data.stats.wins).toBe(1);
});

test('Disasters with empty data', () => {
  const data = new Disasters({});
  expect(data).toBeDefined();
  expect(data).toBeInstanceOf(Disasters);
  expect(data.stats.deaths.hypixel_says).toBe(0);
  expect(data.stats.deaths.flood).toBe(0);
  expect(data.stats.deaths.withers).toBe(0);
  expect(data.stats.deaths.sinkhole).toBe(0);
  expect(data.stats.games_played).toBe(0);
  expect(data.stats.losses).toBe(0);
  expect(data.stats.survived.swappage).toBe(0);
  expect(data.stats.survived.purge).toBe(0);
  expect(data.stats.survived.anvil_rain).toBe(0);
  expect(data.stats.survived.grounded).toBe(0);
  expect(data.stats.survived.tnt_rain).toBe(0);
  expect(data.stats.survived.tornado).toBe(0);
  expect(data.stats.survived.withers).toBe(0);
  expect(data.stats.time_survived).toBe(0);
  expect(data.stats.wins).toBe(0);
});
