// @ts-check

const { config } = require("../ext");
const { Event } = require("../src/event");

module.exports = new Event({
  category: "ready",
  execute(client) {
    console.log(`${client.user.username} - Giriş yapıldı!`);
    client.user.setActivity(config.playing);
  },
});
