// @ts-check

const { MessageEmbed } = require("discord.js");
const { Command } = require("../../src/command");
const { commands } = require("../../ext");

module.exports = new Command({
  name: "help",
  aliases: ["h", "yardım", "y"],
  showHelp: false,
  utilisation: "{prefix}help",
  execute(client, message, args) {
    const embed = new MessageEmbed();

    embed.setColor("RED");
    embed.setAuthor(
      client.user.username,
      client.user.displayAvatarURL({ size: 1024, dynamic: true }),
    );

    const commandList = commands.filter((x) => x.showHelp !== false);

    embed.setDescription(
      "Bu müzik botuna erişemek ve yardım almak için [sunucumuza](https://discord.gg/altyapilar) gelebilirsin!\nMüzik dünyanı birlikte oluşturmaya ne dersin?",
    );
    embed.addField(
      `Komut sayısı: ${commandList.size}`,
      commandList
        .map(
          (x) =>
            `\`${x.name}${
              x.aliases[0] ? ` (${x.aliases.map((y) => y).join(", ")})\`` : "`"
            }`,
        )
        .join(" | "),
    );

    embed.setTimestamp();
    embed.setFooter(
      "Müzik Botu Komutları - Wyntine ❤️",
      message.author.avatarURL({ dynamic: true }) ?? undefined,
    );

    message.channel.send({ embeds: [embed] });
  },
});
