// @ts-check

const { QueryType } = require("discord-player");
const { Queue } = require("discord-player/src/index.js");
const { VoiceConnectionStatus } = require("@discordjs/voice");
const { player } = require("../../ext");
const { Command } = require("../../src/command");

module.exports = new Command({
  name: "play",
  aliases: ["p", "başlat"],
  utilisation: "{prefix}play [song name/URL]",
  voiceChannel: true,
  async execute(client, message, args) {
    if (!args[0])
      return message.channel.send(
        `${message.author}, Aramak istediğin müziğin ismi yaz. ❌`,
      );

    const res = await player.search(args.join(" "), {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length)
      return message.channel.send(`${message.author}, Sonuç bulunamadı! ❌`);

    /**
     * @type {Queue}
     */
    const queue = player.createQueue(message.guild, {
      metadata: message.channel,
    });

    try {
      if (!queue.connection)
        await queue.connect(message.member?.voice.channel ?? "");
    } catch {
      player.deleteQueue(message.guild.id);
      return message.channel.send(
        `${message.author}, Ses kanalına katılamıyorum. ❌`,
      );
    }

    await message.channel.send(
      `Sizin ${res.playlist ? "Çalmalisteniz" : "Parçanız"} Yükleniyor... 🎧`,
    );

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();

    const connection = queue.connection.voiceConnection;

    /**
     * @param {import("@discordjs/voice").VoiceConnectionState} oldState
     * @param {import("@discordjs/voice").VoiceConnectionState} newState
     */
    const stateFunction = (oldState, newState) => {
      if (
        oldState.status === VoiceConnectionStatus.Ready &&
        newState.status === VoiceConnectionStatus.Connecting
      ) {
        connection.configureNetworking();
      }
    };

    connection.on("stateChange", stateFunction);
    queue.connection.once("finish", () => {
      connection.removeListener("stateChange", stateFunction);
    });
  },
});
