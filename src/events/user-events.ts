import { JoinWelcomeEmbedBuilder } from "@/embeds/join-welcome.embed";
import { LeaveWelcomeEmbedBuilder } from "@/embeds/leave-welcome.embed";
import { CustomButtonBuilder, CustomButtonStyle } from "@/lib/custom-button-builder";
import { Events } from "discord.js";
import { ArgsOf, Discord, Guild, On } from "discordx";

@Discord()
@Guild('1146911865558028443')
export class UserEvents {
    @On({ event: Events.GuildMemberRemove })
    async onLeave(
        [member]: ArgsOf<Events.GuildMemberRemove>
    ) {
        console.log('leave');

        const embedBuilder = new LeaveWelcomeEmbedBuilder()
        const embeds = embedBuilder.createEmbeds(member)

        const guild = member.guild
        const guildSystemChannel = guild.systemChannel
        if (!guildSystemChannel) { return }

        await guildSystemChannel.send({
            embeds: embeds,
        })
    }

    @On({ event: Events.GuildMemberAdd })
    async onJoin(
        [member]: ArgsOf<Events.GuildMemberAdd>
    ): Promise<void> {
        console.log('join');

        const embedBuilder = new JoinWelcomeEmbedBuilder()
        const embeds = embedBuilder.createEmbeds(member)

        const guild = member.guild
        const guildSystemChannel = guild.systemChannel
        if (!guildSystemChannel) { return }

        const buttonBuilder = new CustomButtonBuilder()
        const buttonsRow = buttonBuilder.createButtonsRow({
            buttons: [
                {
                    labelText: "Перейти до вибору ролі",
                    url: "https://discord.com/channels/1146911865558028443/1174023100392808478",
                    buttonStyle: CustomButtonStyle.LINK
                },
            ]
        })

        await guildSystemChannel.send({
            content: `<@${member.user.id}>`,
            embeds: embeds,
            components: [buttonsRow]
        })
    }


}
