import { IBase } from "./IBase";

export class DiaryEntry extends IBase {
    constructor() {
        super();
        this.id = undefined;
        this.title = '';
        this.entry = '';
    }

    id?: string;
    title: string;
    entry: string;
}

export class DiaryEntryListDto extends DiaryEntry {
    constructor() {
        super();
    }
}
