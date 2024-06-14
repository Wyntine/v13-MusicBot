// @ts-check

const { client, player } = require("./ext");

require("dotenv").config();

require("./src/loader");
require("./src/events");

if (process.env.TOKEN) {
  client.login(process.env.TOKEN).catch(() => {
    console.log(
      "Projenize girdiğiniz token hatalı veya botunuzun intentleri kapalı!",
    );
  });
} else {
  console.log(
    "Projenizdedeki .env dosyasına TOKEN yazısının karşısına bot tokenini yazın!",
  );
}

setInterval(() => {
  player.queues.forEach((queue) =>
    queue.connection.voiceConnection.configureNetworking(),
  );
}, 50000);
