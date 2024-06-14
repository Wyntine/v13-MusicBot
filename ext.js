// @ts-check

const { Player } = require("discord-player");
const { Client, Intents } = require("discord.js");

const config = require("./config");
const { Collection } = require("discord.js");

const commands = new Collection();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  allowedMentions: { parse: [] },
});

const player = new Player(client, config.opt.discordPlayer);

module.exports = {
  client,
  config,
  player,
  commands,
};
