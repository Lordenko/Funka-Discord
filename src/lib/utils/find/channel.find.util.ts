import { Guild, GuildBasedChannel } from "discord.js"

interface Args {
    guild: Guild,
    channelId: string,
}

export const findChannel = async (
    args: Args
): Promise<GuildBasedChannel | null> => {
    const { guild, channelId } = args

    const cached = guild.channels.cache.get(channelId);
    if (cached) return cached;

    const channel = await guild.channels.fetch(channelId)

    return channel
}