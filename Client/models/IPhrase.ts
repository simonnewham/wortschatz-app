import { IBase } from "./IBase";

export class Phrase extends IBase {
    constructor() {
        super();
        this.id = undefined;
        this.nativePhrase = undefined;
        this.translatePhrase = undefined;
        this.usage = undefined;
        this.tags = undefined;
        this.enhanceResult = undefined;
    }
    id?: string;
    nativePhrase?: string;
    translatePhrase?: string;
    usage?: string;
    tags?: string[];
    enhanceResult?: string;
}