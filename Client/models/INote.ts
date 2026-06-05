import { IBase } from "./IBase";

export class INote extends IBase {

    constructor() {
        super();

        this.id = undefined;
        this.title = undefined;
        this.description = undefined;
        this.notes = undefined;
        this.createdDate = undefined;
    }

    id?: string;
    title?: string;
    description?: string;
    notes?: string;
}
