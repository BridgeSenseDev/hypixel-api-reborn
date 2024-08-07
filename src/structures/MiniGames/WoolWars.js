const { divide } = require('../../utils');

/**
 * Wool Wars Class
 */
class WoolWars {
  /**
   * Constructor
   * @param {Record<string,unknown>} data Data from API
   */
  constructor(data) {
    /**
     * Sheep layers, similar to prestige
     * @type {number}
     */
    this.layers = data.progression?.available_layers || 0;
    /**
     * Wool Wars XP
     * @type {number}
     */
    this.xp = data.progression?.experience || 0;
    /**
     * Wool Wars Decimal Level
     * @type {number}
     */
    this.exactLevel = WoolWars.convertXPToLevel(this.xp);
    /**
     * Wool wars level (as shown in game)
     * @type {number}
     */
    this.level = Math.floor(this.exactLevel);
    /**
     * Coins
     * @type {number}
     */
    this.coins = data.coins || 0;
    /**
     * Wins
     * @type {number}
     */
    this.wins = data.wins || 0;
    /**
     * gamesPlayed
     * @type {number}
     */
    this.gamesPlayed = data.games_played || 0;
    /**
     * woolsPlaced
     * @type {number}
     */
    this.woolsPlaced = data.wool_placed || 0;
    /**
     * blocksBroken
     * @type {number}
     */
    this.blocksBroken = data.blocks_broken || 0;
    /**
     * placeBreakRatio
     * @type {number}
     */
    this.placeBreakRatio = divide(this.woolsPlaced, this.blocksBroken);
    /**
     * kills
     * @type {number}
     */
    this.kills = data.kills || 0;
    /**
     * deaths
     * @type {number}
     */
    this.deaths = data.deaths || 0;
    /**
     * KDRatio
     * @type {number}
     */
    this.KDRatio = divide(this.kills, this.deaths);
    /**
     * assists
     * @type {number}
     */
    this.assists = data.assists || 0;
    /**
     * powerups
     * @type {number}
     */
    this.powerups = data.powerups_gotten || 0;
    /**
     * Selected class, or NONE if field isn't present in API for some reason
     * @type {'ASSAULT'|'TANK'|'GOLEM'|'SWORDSMAN'|'ENGINEER'|'ARCHER'|'NONE'}
     */
    this.selectedClass = data.wool_wars?.selected_class || 'NONE';
    this.stats = {
      assault: WoolWars.generateStatsFor(data.wool_wars?.stats, 'assault'),
      tank: WoolWars.generateStatsFor(data.wool_wars?.stats, 'tank'),
      golem: WoolWars.generateStatsFor(data.wool_wars?.stats, 'golem'),
      swordsman: WoolWars.generateStatsFor(data.wool_wars?.stats, 'swordsman'),
      engineer: WoolWars.generateStatsFor(data.wool_wars?.stats, 'engineer'),
      archer: WoolWars.generateStatsFor(data.wool_wars?.stats, 'archer')
    };
    /**
     * Owned Cosmetics
     * @type {string[]}
     */
    this.ownedCosmetics = data.packages || [];
    /**
     * Private Games config
     * @type {PrivateGamesConfig}
     */
    this.privateGamesConfig = data.privategames || {};
  }
  /**
   * Converts XP to Level
   * @param {number} exp xp
   * @return {number}
   */
  static convertXPToLevel(exp) {
    const minimalExp = [0, 1e3, 3e3, 6e3, 1e4, 15e3];
    const baseLevel = minimalExp.length;
    const baseExp = minimalExp[minimalExp.length - 1];
    const expToLevel100 = 49e4;
    if (exp < baseExp) return minimalExp.findIndex((x) => exp < x);
    const theoreticalLevel = (exp - baseExp) / 5e3 + baseLevel;
    if (100 < theoreticalLevel) return 100 + this.convertXPToLevel(exp - expToLevel100);
    return theoreticalLevel;
  }
  /**
   * Generates stats per class/overall
   * @param {Record<string, any>} data data
   * @param {string} [_class=''] Class
   * @return {WoolWarsStats}
   */
  static generateStatsFor(data, _class) {
    // N.B i called it _class instead of class because reserved keyword

    // eslint-disable-next-line no-underscore-dangle
    const workingData = (_class ? data?.classes?.[_class] : data) || {};
    return {
      wins: workingData.wins || 0,
      gamesPlayed: workingData.games_played || 0,
      woolsPlaced: workingData.wool_placed || 0,
      blocksBroken: workingData.blocks_broken || 0,
      placeBreakRatio: divide(workingData.wool_placed || 0, workingData.blocks_broken || 0),
      kills: workingData.kills || 0,
      deaths: workingData.deaths || 0,
      KDRatio: divide(workingData.kills, workingData.deaths),
      assists: workingData.assists || 0,
      powerups: workingData.powerups_gotten || 0
    };
  }
}
/**
 * @typedef {Object} PrivateGamesConfig NB. There could be more fields
 * @property {boolean} one_hit_one_kill One hit one kill
 * @property {'Enabled'|'Disabled'} rainbow_wool Rainbow wool
 * @property {string} health_buff Health Buff
 * @property {string} game_speed Game speed
 * @property {string} speed Player speed
 * @property {'Enabled'|'Disabled'} no_class No class
 * @property {boolean} respawn_enable Respawning enabled
 */
/**
 * @typedef {Object} WoolWarsStats
 * @property {number} wins wins
 * @property {number} gamesPlayed games played
 * @property {number} woolsPlaced wools placed
 * @property {number} blocksBroken blocks broken
 * @property {number} placeBreakRatio broken blocks to placed wool ratio
 * @property {number} kills kills
 * @property {number} deaths deaths
 * @property {number} KDRatio KDR
 * @property {number} assists assists (not included in KDR)
 * @property {number} powerups number of powerups picked up
 */
module.exports = WoolWars;
