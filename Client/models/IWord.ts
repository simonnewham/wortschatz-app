import { WordCategory } from "../constants/WordCategory";
import { WordGender } from "../constants/WordGender";

export class Word {
    constructor() {
        this.nativeWord = '';
        this.nativeWordGender = undefined;
        this.nativeWordCategory = WordCategory.Noun;
        this.translateWord = '';
        this.translateWordGender = '';
        this.tags = '';
        this.usage = '';
    }

    id?: number;
    nativeWord: string;
    nativeWordGender?: WordGender;
    nativeWordCategory: WordCategory;
    translateWord: string;
    translateWordGender: string;
    tags: string;
    usage: string;
}

export class WordListDto extends Word {
    constructor() {
        super();
    }

    createdDate: Date | undefined;
}
