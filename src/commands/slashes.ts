import { MessageFlags, type CommandInteraction } from "discord.js";
import { Discord, Guild, Slash } from "discordx";

@Discord()
@Guild("1146911865558028443")
export class Example {
    @Slash({ description: "ping" })
    async ping(interaction: CommandInteraction): Promise<void> {
        const guild = interaction.guild!

        await interaction.reply({
            content: guild.systemChannelId!,
            flags: MessageFlags.Ephemeral
        })
    }

    // @Slash({ description: "3" })
    // async roles(
    //     interaction: CommandInteraction
    // ): Promise<void> {
    //     await interaction.deferReply();

    //     const guild = interaction.guild!
    //     await guild.members.fetch()

    //     const guildRoles = await guild.roles.fetch()
    //     const newRole = await guild.roles.fetch('1479478624125063209') as Role

    //     const clearGuildRoles = guildRoles?.filter((role: Role) => {
    //         const pattern = /^[А-ЯІЄЇҐ]{2,}-\d+-\d$/;
    //         return pattern.test(role.name)
    //     })

    //     for (const guildRole of clearGuildRoles.values()) {
    //         console.log(guildRole.name)
    //         await guildRole.delete()
    //     }

    //     // const replyString = []
    //     // for (const guildRole of clearGuildRoles.values()) {
    //     //     const memberList = guildRole.members
    //     //     for (const member of memberList.values()) {
    //     //         try {
    //     //             console.log(member.user.globalName);
    //     //             const memberRoles = member.roles.cache.values()
    //     //             if (memberRoles.find(role => role.name === newRole.name)) { continue; }
    //     //             await member.roles.add(newRole)
    //     //         } catch (err) {
    //     //             console.log(err);
    //     //         }
    //     //         replyString.push(member.nickname)
    //     //     }
    //     // }

    //     await interaction.followUp({
    //         content: 'success',
    //         flags: MessageFlags.Ephemeral
    //     })
    // }
}
