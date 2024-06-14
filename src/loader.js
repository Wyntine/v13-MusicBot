// @ts-check

const { readdirSync } = require("fs");
const { client, commands } = require("../ext");

const events = readdirSync("./events/").filter((file) => file.endsWith(".js"));

console.log(`Eventler yükleniyor...`);

for (const file of events) {
  const event = require(`../events/${file}`);
  console.log(`-> Event dosyası ${file} yüklendi. (${event.category})`);
  client.on(event.category, event.execute);
  delete require.cache[require.resolve(`../events/${file}`)];
}

console.log(`Komutlar yükleniyor...`);

readdirSync("./commands/").forEach((dirs) => {
  const commandList = readdirSync(`./commands/${dirs}`).filter((files) =>
    files.endsWith(".js"),
  );

  for (const file of commandList) {
    const command = require(`../commands/${dirs}/${file}`);
    console.log(
      `-> Komut dosyası ${file} yüklendi. (${command.name.toLowerCase()})`,
    );
    commands.set(command.name.toLowerCase(), command);
    delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
  }
});
