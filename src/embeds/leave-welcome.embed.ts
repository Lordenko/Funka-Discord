import { BaseEmbedBuilder } from "@/lib/base-embed";
import { GuildMember, ColorResolvable, PartialGuildMember } from "discord.js";

export class LeaveWelcomeEmbedBuilder extends BaseEmbedBuilder {
    createEmbeds(member: GuildMember | PartialGuildMember) {
        return this.createEmbedsByTemplate({
            logo: false,
            color: "Red" as ColorResolvable,
            embeds: [
                {
                    title: `Бувай, ${member.user.username}!`,
                    description: `**${member.user.tag}** покинув нас. Сподіваємось, ще побачимось!`,
                    footer: true,
                    timestamp: true,
                }
            ]
        });
    }
}