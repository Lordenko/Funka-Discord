import { Guild } from "discord.js"
import { Client } from "discordx";

interface Args {
    client: Client,
    guildId: string,
}

export const findGuild = async (
    args: Args
): Promise<Guild | undefined> => {
    const { client, guildId } = args

    const cached = client.guilds.cache.get(guildId);
    if (cached) return cached;

    const guild = await client.guilds.fetch(guildId)

    return guild
}