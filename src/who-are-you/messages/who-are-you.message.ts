import { BaseMessageBuilder } from "@/lib/base-message-builder";
import { CustomButtonStyle } from "@/lib/custom-button-builder";
import { ButtonComponent, Discord, Guard, Guild as DiscordXGuild, Slash } from "discordx";
import { WhoAreYouEmbedBuilder } from "../embeds/who-are-you.embed";
import { ButtonInteraction, CommandInteraction, GuildMember, GuildTextBasedChannel, PermissionFlagsBits, Role, TextBasedChannel } from "discord.js";

import { Guild } from "discord.js"

import { PermissionGuard } from "@discordx/utilities";
import { sendEphemeralMessage } from "@/lib/utils/sendEphemeralMessage.util";

@Discord()
@DiscordXGuild('1146911865558028443')
export class WhoAreYouMessage extends BaseMessageBuilder<
    WhoAreYouEmbedBuilder
> {
    constructor() {
        super(
            new WhoAreYouEmbedBuilder
        )
    }

    @Slash({
        name: "who-are-you-message",
        description: "Creating message for disciplinary"
    })
    @Guard(
        PermissionGuard(["Administrator"])
    )
    async createMessage(interaction: CommandInteraction): Promise<void> {
        const channel = interaction.channel as GuildTextBasedChannel

        const buttonsRow = this.buttonBuilder.createButtonsRow({
            buttons: [
                {
                    customId: "ztu-who-are-you-button",
                    labelText: "ztu",
                    buttonStyle: CustomButtonStyle.GREEN
                },
                {
                    customId: "guest-who-are-you-button",
                    labelText: "guest",
                    buttonStyle: CustomButtonStyle.GREEN
                }
            ]
        })

        const embeds = this.embedBuilder.createEmbeds()

        await channel.send({
            embeds: embeds,
            components: [buttonsRow]
        })

        await sendEphemeralMessage({ interaction })
    }

    private getReplyMessage(
        isRoleFound: boolean,
        roleName: string
    ) {
        return `> Роль з назвою **${roleName}** була успішно ${isRoleFound ? "**прибрана** з" : "**додана** до"} списку ваших ролей`
    }

    @ButtonComponent({ id: /ztu-who-are-you-button/ })
    async handleZtu(
        interaction: ButtonInteraction
    ): Promise<void> {
        if (!interaction.inCachedGuild()) {
            await interaction.reply("Ця команда працює лише на серверах!")
            return
        }

        const { member, guild } = interaction
        const triggerRole = await guild.roles.fetch('1479478624125063209') as Role

        const memberRoles = member.roles
        const isRoleFound = memberRoles.cache.find(role => role.id === triggerRole.id) ? true : false

        isRoleFound ? await member.roles.remove(triggerRole) : await member.roles.add(triggerRole)

        await sendEphemeralMessage({
            interaction,
            messageText: this.getReplyMessage(isRoleFound, triggerRole.name),
            cooldown: 10000
        })
    }

    @ButtonComponent({ id: /guest-who-are-you-button/ })
    async handleGuest(
        interaction: ButtonInteraction
    ): Promise<void> {
        if (!interaction.inCachedGuild()) {
            await interaction.reply("Ця команда працює лише на серверах!")
            return
        }

        const { member, guild } = interaction
        const triggerRole = await guild.roles.fetch('1191230591581028373') as Role

        const memberRoles = member.roles
        const isRoleFound = memberRoles.cache.find(role => role.id === triggerRole.id) ? true : false

        isRoleFound ? await member.roles.remove(triggerRole) : await member.roles.add(triggerRole)

        await sendEphemeralMessage({
            interaction,
            messageText: this.getReplyMessage(isRoleFound, triggerRole.name),
            cooldown: 10000
        })
    }
}

