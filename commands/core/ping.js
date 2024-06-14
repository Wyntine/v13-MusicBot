// @ts-check

const { Command } = require("../../src/command");

module.exports = new Command({
  name: "ping",
  aliases: [],
  utilisation: "{prefix}ping",
  execute(client, message) {
    message.channel.send(`**${client.ws.ping}ms** 🛰️`);
  },
});
