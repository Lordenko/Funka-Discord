import { ButtonInteraction, CommandInteraction, MessageFlags, ModalSubmitInteraction } from "discord.js";

interface SendSuccessInterface {
    interaction: CommandInteraction | ButtonInteraction | ModalSubmitInteraction,
    messageText?: string
    cooldown?: number
}

export const sendEphemeralMessage = async (params: SendSuccessInterface) => {
    const {
        interaction,
        messageText = 'Success',
        cooldown = 5000
    } = params

    const message = await interaction.reply({
        content: messageText,
        flags: MessageFlags.Ephemeral
    })

    setTimeout(() => {
        message?.delete().catch(() => { })
    }, cooldown)
}