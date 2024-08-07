module.exports = async function () {
  const WatchdogStats = require('../structures/Watchdog/Stats');
  // eslint-disable-next-line no-underscore-dangle
  const res = await this._makeRequest('/punishmentstats');
  if (res.raw) return res;
  return new WatchdogStats(res);
};
