// @ts-check

/**
 * @type {import("discord-player/src/index.js").PlayerInitOptions}
 */
const playerOptions = {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
};

const options = {
  px: "+",
  playing: "Liliy prefix +",

  opt: {
    DJ: {
      enabled: false, //sadece rol le yapılcaksa.
      roleName: "DJ", //dj rol yerine başka isim
      commands: [
        "back",
        "clear",
        "filter",
        "loop",
        "pause",
        "resume",
        "skip",
        "stop",
        "volume",
      ], //DOKUNMA
    },
    maxVol: 250, //maximum ses seviyesi kaç olacak belirle
    loopMessage: false,
    discordPlayer: playerOptions,
  },
};

module.exports = options;
