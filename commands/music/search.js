// @ts-check

const { MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");
const { Command } = require("../../src/command");
const { player } = require("../../ext");

module.exports = new Command({
  name: "search",
  aliases: ["ara"],
  utilisation: "{prefix}search [song name]",
  voiceChannel: true,

  async execute(client, message, args) {
    if (!args[0])
      return message.channel.send(
        `${message.author}, Lütfen geçerli bir şarkı ismi yazın. ❌`,
      );

    const res = await player.search(args.join(" "), {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length)
      return message.channel.send(
        `${message.author}, Arama sonucu bulunamadı. ❌`,
      );

    const queue = await player.createQueue(message.guild, {
      metadata: message.channel,
    });

    const embed = new MessageEmbed();

    embed.setColor("RED");
    embed.setAuthor(
      `Aranan Müzik: ${args.join(" ")}`,
      client.user.displayAvatarURL({ size: 1024, dynamic: true }),
    );

    const maxTracks = res.tracks.slice(0, 10);

    embed.setDescription(
      `${maxTracks
        .map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`)
        .join("\n")}\n\nArasından bir şarkı seçin **1** ile **${
        maxTracks.length
      }** arasında seçip yaz gönder veya **cancel** yaz ve seçimi iptal et.⬇️`,
    );

    embed.setTimestamp();
    embed.setFooter(
      "Wyntine ❤️",
      message.author.avatarURL({ dynamic: true }) ?? undefined,
    );

    message.channel.send({ embeds: [embed] });

    const collector = message.channel.createMessageCollector({
      time: 15000,
      filter: (m) => m.author.id === message.author.id,
    });

    collector.on("collect", async (query) => {
      if (query.content.toLowerCase() === "cancel") {
        collector.stop();
        message.channel.send(`Arama iptal edildi. ✅`);
        return;
      }

      const value = parseInt(query.content);

      if (!value || value <= 0 || value > maxTracks.length) {
        message.channel.send(
          `Hata: bir şarkı seçin **1** ile **${maxTracks.length}** arasında seçip yaz gönder veya **cancel** yaz ve seçimi iptal et. ❌`,
        );
        return;
      }

      collector.stop();

      try {
        if (!queue.connection)
          await queue.connect(message.member?.voice.channel ?? "");
      } catch {
        player.deleteQueue(message.guild.id);
        message.channel.send(
          `${message.author}, Ses kanalına katılamıyorum. ❌`,
        );
        return;
      }

      await message.channel.send(`Müzik aramanız yükleniyor. 🎧`);

      queue.addTrack(res.tracks[Number(query.content) - 1]);
      if (!queue.playing) await queue.play();
    });

    collector.on("end", (msg, reason) => {
      if (reason === "time")
        message.channel.send(
          `${message.author}, Şarkı arama süresi sona erdi. ❌`,
        );
    });
  },
});
