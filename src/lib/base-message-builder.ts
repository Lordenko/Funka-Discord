import { BaseEmbedBuilder } from "./base-embed"
import { CustomButtonBuilder } from "./custom-button-builder"

export abstract class BaseMessageBuilder<
    E extends BaseEmbedBuilder | null,
> {
    protected readonly embedBuilder: E
    protected readonly buttonBuilder: CustomButtonBuilder

    constructor(
        embedBuilder: E,
    ) {
        this.embedBuilder = embedBuilder
        this.buttonBuilder = new CustomButtonBuilder()
    }


    abstract createMessage(
        args: any
    ): Promise<any>

    // AND ANY HANDLERS
}