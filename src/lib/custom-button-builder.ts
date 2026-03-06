import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder } from "discord.js";

export enum CustomButtonStyle {
    BLUE = ButtonStyle.Primary,
    GRAY = ButtonStyle.Secondary,
    GREEN = ButtonStyle.Success,
    RED = ButtonStyle.Danger,
    LINK = ButtonStyle.Link,
}

type CreateButtonArgs = {
    customId: string,
    labelText: string,
    buttonStyle: CustomButtonStyle.BLUE | CustomButtonStyle.GRAY | CustomButtonStyle.GREEN | CustomButtonStyle.RED
} | {
    labelText: string,
    url: string
    buttonStyle: CustomButtonStyle.LINK
}

interface CreateButtonsArgs {
    buttons: CreateButtonArgs[]
}

export class CustomButtonBuilder {
    public createButtonsRow(
        args: CreateButtonsArgs
    ): ActionRowBuilder<MessageActionRowComponentBuilder> {
        const { buttons } = args

        const rawButtons: ButtonBuilder[] = []

        buttons.map((button: CreateButtonArgs) => {
            rawButtons.push(
                this.createButton(button)
            )
        })

        return this.createButtonRow(rawButtons)
    }

    public createButtonRow = (
        buttons: ButtonBuilder[]
    ): ActionRowBuilder<MessageActionRowComponentBuilder> => {

        const buttonRow = new ActionRowBuilder<MessageActionRowComponentBuilder>()
            .addComponents(buttons);

        return buttonRow
    }

    public createButton = (
        args: CreateButtonArgs
    ): ButtonBuilder => {
        const { labelText, buttonStyle } = args

        if (buttonStyle === CustomButtonStyle.LINK) {
            const { url } = args

            const button = new ButtonBuilder()
                .setLabel(labelText)
                .setStyle(buttonStyle as number)
                .setURL(url)

            return button
        } else {
            const { customId } = args

            const button = new ButtonBuilder()
                .setCustomId(customId)
                .setLabel(labelText)
                .setStyle(buttonStyle as number)

            return button
        }
    }
}