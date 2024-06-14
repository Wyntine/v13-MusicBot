// @ts-check

const { Message } = require("discord.js");
const { Client } = require("discord.js");

class Command {
  name;
  aliases = [];
  utilisation;
  voiceChannel = false;
  showHelp = true;
  execute;

  /**
   * @param {{
   * name: string
   * aliases?: string[]
   * utilisation: string
   * voiceChannel?: boolean
   * showHelp?: boolean
   * execute(client: Client<true>, message: Message<true>, args: string[]): any
   * }} options
   */
  constructor({ name, aliases, utilisation, voiceChannel, showHelp, execute }) {
    this.name = name;
    if (aliases) this.aliases = aliases;
    this.utilisation = utilisation;
    if (voiceChannel) this.voiceChannel = voiceChannel;
    if (showHelp) this.showHelp = showHelp;
    this.execute = execute;
  }
}

module.exports = {
  Command,
};
