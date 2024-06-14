// @ts-check

const { QueueRepeatMode } = require("discord-player");
const { player, config } = require("../../ext");
const { Command } = require("../../src/command");

module.exports = new Command({
  name: "loop",
  aliases: ["lp", "döngü"],
  utilisation: "{prefix}loop <queue>",
  voiceChannel: true,
  execute(client, message, args) {
    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing)
      return message.channel.send(
        `${message.author}, Şuanda çalan bir müzik yok!. ❌`,
      );

    if (args.join("").toLowerCase() === "queue") {
      if (queue.repeatMode === 1)
        return message.channel.send(
          `${message.author}, İlk önce mevcut müziğin döngü modunu devre dışı bırakmalısınız. **(${config.px}loop)** ❌`,
        );

      const success = queue.setRepeatMode(
        queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF,
      );

      return message.channel.send(
        success
          ? `Döngü Modu: **${
              queue.repeatMode === 0 ? "Aktif Değil" : "Aktif"
            }**, Tüm sıra durmadan tekrarlanacak 🔁`
          : `${message.author}, Birşeyler yanlış gitti. ❌`,
      );
    } else {
      if (queue.repeatMode === 2)
        return message.channel.send(
          `${message.author}, Döngü modunda önce mevcut kuyruğu devre dışı bırakmalısınız. **(${config.px}loop queue)** ❌`,
        );

      const success = queue.setRepeatMode(
        queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF,
      );

      return message.channel.send(
        success
          ? `Döngü Modu:  **${
              queue.repeatMode === 0 ? "Aktif Değil" : "Aktif"
            }**, Mevcut müzik durmadan tekrarlanacak (listedeki bütün müzikleri **${
              config.px
            }loop queue** seçeneği ile tekrarlata bilirsiniz.) 🔂`
          : `${message.author}, Birşeyler yanlış gitti. ❌`,
      );
    }
  },
});
