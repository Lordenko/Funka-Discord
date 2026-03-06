import { BaseEmbedBuilder } from "@/lib/base-embed";
import { ColorResolvable, GuildMember } from "discord.js";

export class JoinWelcomeEmbedBuilder extends BaseEmbedBuilder {
    createEmbeds(member: GuildMember) {
        return this.createEmbedsByTemplate({
            logo: false,
            color: "Green" as ColorResolvable,
            embeds: [
                {
                    title: `Ласкаво просимо, ${member.user.username}!`,
                    description: `Раді вітати тебе на сервері, <@${member.id}>!`,
                    footer: true,
                    timestamp: true,
                    fields: [
                        {
                            name: '',
                            value: '> Щоб отримати доступ до каналів, потрібно обрати роль'
                        }
                    ]
                }
            ]
        });
    }
}
