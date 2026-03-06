import { BaseEmbedBuilder } from "@/lib/base-embed";
import { ColorResolvable } from "discord.js";

export class WhoAreYouEmbedBuilder extends BaseEmbedBuilder {
    createEmbeds() {
        return this.createEmbedsByTemplate({
            logo: false,
            color: "Green" as ColorResolvable,
            embeds: [
                {
                    title: `Хто ти, воїн?`,
                    footer: true,
                    timestamp: true,
                }
            ]
        });
    }
}