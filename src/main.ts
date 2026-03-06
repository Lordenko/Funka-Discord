import { dirname, importx } from "@discordx/importer";
import { IntentsBitField, Partials, type Interaction, type Message } from "discord.js";
import { Client } from "discordx";

import * as dotenv from 'dotenv';

dotenv.config();

export const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildVoiceStates,
    ],
    partials: [
        Partials.GuildMember,
        Partials.User,
    ],
    silent: false,
});

bot.once("ready", async () => {
    await bot.guilds.fetch()

    void bot.initApplicationCommands();

    console.log("Bot started");
});

bot.on("interactionCreate", (interaction: Interaction) => {
    bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
    void bot.executeCommand(message);
});

async function run() {
    await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
    await importx(`${dirname(import.meta.url)}/**/**/*.{ts,js}`);

    if (!process.env.BOT_TOKEN) {
        throw Error("Could not find BOT_TOKEN in your environment");
    }

    await bot.login(process.env.BOT_TOKEN);
}

void run();
