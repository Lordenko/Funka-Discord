import { APIEmbedField, ColorResolvable, EmbedBuilder } from "discord.js"

export enum FieldValueStyleEnum {
    BOLD = 'BOLD',
    ITALIC = 'ITALIC',
    STRIKETHROUGH = 'STRIKETHROUGH',
    UNDERLINE = 'UNDERLINE',
    SPOILER = 'SPOILER',
    INLANE_CODE = 'INLANE CODE',
    CODE_BLOCK = 'CODE BLOCK',
    BLOCKQUOTE = 'BLOCKQUOTE',
    MULTILINE_BLOCKQUOTE = 'MULTILINE BLOCKQUOTE'
}

export interface ExpandedAPIEmbedField extends APIEmbedField {
    spaceUp?: boolean
    spaceDown?: boolean
    style?: FieldValueStyleEnum
}

type CreateEmbedArgs = {
    title: string

    footer: boolean // true - default footer(from defaultData.footerText), false - with out footer
    timestamp: boolean // true - enable standart timestamp, false - with out timestamp

    image?: string
    description?: string

    fields?: ExpandedAPIEmbedField[]
}

interface CreateEmbedsByTemplateArgs {
    logo: boolean // true - enable additional embed with logo(from defaultData.imageUrl or logoImageUrl), false - with out additional embed
    logoImageUrl?: string

    color?: ColorResolvable

    embeds: CreateEmbedArgs[]
}

export abstract class BaseEmbedBuilder {
    private readonly defaultData = {
        imageUrl: `https://cdn.discordapp.com/attachments/1148313905249124455/1464974972912144436/image3.png?ex=69776bc3&is=69761a43&hm=550a026a8c21335dfad545014ed52dc9b5fe128e1d1c09ae62205a6f3a3311f6&`,
        footerText: `powered by Funka`
    }

    abstract createEmbeds(dto?: any): EmbedBuilder[]

    protected createEmbedsByTemplate(
        args: CreateEmbedsByTemplateArgs
    ): EmbedBuilder[] {
        const {
            logo, logoImageUrl, color, embeds
        } = args

        const embedArray: EmbedBuilder[] = []
        this.formatAdditionalLogoEmbed(embedArray, logo, logoImageUrl, color)

        embeds.map((embedData) => {
            const {
                title, description, image,
                timestamp, footer, fields,
            } = embedData

            const embed = new EmbedBuilder()
            this.formatTitle(embed, title)
            this.formatDescription(embed, description)
            this.formatColor(embed, color)
            this.formatImage(embed, image)
            this.formatTimestamp(embed, timestamp)
            this.formatFooter(embed, footer)
            this.formatFields(embed, fields)

            embedArray.push(embed)

        })

        return embedArray
    }

    private formatAdditionalLogoEmbed(
        embedArray: EmbedBuilder[],
        logo: boolean | null | undefined,
        logoImageUrl: string | null | undefined,
        color: ColorResolvable | null | undefined,
    ) {
        if (logo) {
            const imageEmbed = new EmbedBuilder()
            this.formatImage(imageEmbed, logoImageUrl ?? this.defaultData.imageUrl)
            this.formatColor(imageEmbed, color)
            embedArray.push(imageEmbed)
        }
    }

    private formatTitle(
        embed: EmbedBuilder,
        title: string | null | undefined
    ) {
        if (title) { embed.setTitle(title) }
    }

    private formatDescription(
        embed: EmbedBuilder,
        description: string | null | undefined
    ) {
        if (description) { embed.setDescription(description) }
    }

    private formatColor(
        embed: EmbedBuilder,
        color: ColorResolvable | null | undefined
    ) {
        if (color) { embed.setColor(color) }
    }

    private formatImage(
        embed: EmbedBuilder,
        imageUrl: string | null | undefined
    ) {
        if (imageUrl) { embed.setImage(imageUrl) }
    }

    private formatTimestamp(
        embed: EmbedBuilder,
        timestamp: boolean | null | undefined
    ) {
        if (timestamp) { embed.setTimestamp() }
    }

    private formatFooter(
        embed: EmbedBuilder,
        footer: boolean | null | undefined
    ) {
        if (footer) { embed.setFooter({ text: this.defaultData.footerText }) }
    }

    private formatFields(
        embed: EmbedBuilder,
        fields: ExpandedAPIEmbedField[] | null | undefined
    ) {
        if (fields && fields.length > 0) {
            embed.setFields(
                fields.flatMap((field: ExpandedAPIEmbedField) => {
                    const value = this.formatFieldValue(field.value, field.style)

                    const pureField: APIEmbedField = {
                        name: field.name,
                        value: value,
                        inline: field.inline ?? false
                    }

                    if (field.spaceUp) {
                        return ([this.getSpaceField(), pureField])
                    }
                    else if (field.spaceDown) {
                        return ([pureField, this.getSpaceField()])
                    }

                    return (pureField)
                })
            )
        }
    }

    private getSpaceField(): APIEmbedField {
        return { name: '', value: '', inline: false }
    }

    private formatFieldValue(
        value: string | null | undefined,
        style: FieldValueStyleEnum | null | undefined,
    ) {
        if (!value) { return '' }
        if (!style) { return value }

        const formats: Record<FieldValueStyleEnum, string> = {
            [FieldValueStyleEnum.ITALIC]: `*${value}*`,
            [FieldValueStyleEnum.BOLD]: `**${value}**`,
            [FieldValueStyleEnum.SPOILER]: `||${value}||`,
            [FieldValueStyleEnum.STRIKETHROUGH]: `~~${value}~~`,
            [FieldValueStyleEnum.UNDERLINE]: `__${value}__`,
            [FieldValueStyleEnum.INLANE_CODE]: `\`${value}\``,
            [FieldValueStyleEnum.CODE_BLOCK]: `\`\`\`${value}\`\`\``,
            [FieldValueStyleEnum.BLOCKQUOTE]: `> ${value}`,
            [FieldValueStyleEnum.MULTILINE_BLOCKQUOTE]: `>>> ${value}`,
        };
        return formats[style] ?? value
    }
}