// @ts-check

const { player } = require("../ext");
const { Event } = require("../src/event");

module.exports = new Event({
  category: "interactionCreate",
  execute(int) {
    if (!int.isButton() || !int.guild || !int.member) return;

    const queue = player.getQueue(int.guild.id);

    switch (int.customId) {
      case "saveTrack": {
        if (!queue || !queue.playing)
          return int.reply({
            content: `Şu anda çalan müzik yok. ❌`,
            ephemeral: true,
            components: [],
          });

        int.member
          .send(
            `**Parça Kaydedildi: \`${queue.current.title}\` | Yayınlayan: \`${queue.current.author}\`, Kaydedilen Sunucu: \`${int.guild.name}\` ✅**`,
          )
          .then(() => {
            return int.reply({
              content: `Müziğin adını özel mesajla sana gönderdim ✅`,
              ephemeral: true,
              components: [],
            });
          })
          .catch(() => {
            return int.reply({
              content: `Size özel mesaj gönderemiyorum. ❌`,
              ephemeral: true,
              components: [],
            });
          });
      }
    }
  },
});
