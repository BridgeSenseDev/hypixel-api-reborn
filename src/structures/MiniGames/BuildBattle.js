const divide = require('../../utils/divide');
/**
 * BuildBattle class
 */
class BuildBattle {
  /**
   * @param {object} data BuildBattle data
   */
  constructor(data) {
    /**
     * Score
     * @type {number}
     */
    this.score = data.score || 0;
    /**
     * Total wins
     * @type {number}
     */
    this.totalWins = data.wins || 0;
    /**
     * Played games
     * @type {number}
     */
    this.games = data.games_played || 0;
    /**
     * Win Loss ratio
     * @type {number}
     */
    this.WLRatio = divide(this.totalWins, this.games);
    /**
     * Amount of super votes the player has
     * @type {number}
     */
    this.superVotes = data.super_votes || 0;
    /**
     * Coins
     * @type {number}
     */
    this.coins = data.coins || 0;
    /**
     * Total votes
     * @type {number}
     */
    this.totalVotes = data.total_votes || 0;
    /**
     * Wins for each mode
     * @type {BuildBattleWins}
     */
    this.wins = {
      solo: data.wins_solo_normal || 0,
      teams: data.wins_teams_normal || 0,
      pro: data.wins_solo_pro || 0,
      gtb: data.wins_guess_the_build || 0
    };
  }
}
/**
 * @typedef {object} BuildBattleWins
 * @property {number} solo BuildBattle Solo wins
 * @property {number} teams BuildBattle Team wins
 * @property {number} pro BuildBattle Pro wins
 * @property {number} gtb BuildBattle Guess The Build wins
 */
module.exports = BuildBattle;
