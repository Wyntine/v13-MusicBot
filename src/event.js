// @ts-check

/**
 * @template {keyof import("discord.js").ClientEvents} Category
 */
class Event {
  category;
  execute;
  /**
   * @param {{
   * category: Category
   * execute(...args: import("discord.js").ClientEvents[Category]): any
   * }} options
   */
  constructor({ category, execute }) {
    this.category = category;
    this.execute = execute;
  }
}

module.exports = {
  Event,
};
