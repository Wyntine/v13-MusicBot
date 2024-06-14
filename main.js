// @ts-check

const { client, player } = require("./ext");

require("dotenv").config();

require("./src/loader");
require("./src/events");

if (process.env.PROJECT_DOMAIN) {
  const express = require("express");
  const app = express();
  const http = require("http");

  app.get("/", (request, response) => {
    console.log(`Bot başarıyla uyandırıldı!`);
    response.sendStatus(200);
  });
  app.listen(process.env.PORT);
  setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  }, 60000);
}

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

player.on("debug", (_, message) => console.log(message));
