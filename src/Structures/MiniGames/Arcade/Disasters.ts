class Disasters {
  stats: {
    deaths: { hypixel_says: number; flood: number; withers: number; sinkhole: number };
    games_played: number;
    losses: number;
    survived: {
      swappage: number;
      purge: number;
      anvil_rain: number;
      grounded: number;
      tnt_rain: number;
      tornado: number;
      withers: number;
    };
    time_survived: number;
    wins: number;
  };
  constructor(data: Record<string, any>) {
    const stats = data?.stats || {};
    this.stats = {
      deaths: {
        hypixel_says: stats?.deaths?.hypixel_says || 0,
        flood: stats?.deaths?.flood || 0,
        withers: stats?.deaths?.withers || 0,
        sinkhole: stats?.deaths?.sinkhole || 0
      },
      games_played: stats?.games_played || 0,
      losses: stats?.losses || 0,
      survived: {
        swappage: stats?.survived?.swappage || 0,
        purge: stats?.survived?.purge || 0,
        anvil_rain: stats?.survived?.anvil_rain || 0,
        grounded: stats?.survived?.grounded || 0,
        tnt_rain: stats?.survived?.tnt_rain || 0,
        tornado: stats?.survived?.tornado || 0,
        withers: stats?.survived?.withers || 0
      },
      time_survived: stats?.time_survived || 0,
      wins: stats?.wins || 0
    };
  }
}

export default Disasters;
