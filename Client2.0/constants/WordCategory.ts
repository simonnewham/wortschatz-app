export enum WordCategory {
    Noun = 1,
    Verb = 2
}

export namespace WordCategory {
    export function GetDescription(wordCategory: WordCategory) {
        return wordCategory == WordCategory.Noun ? 'Noun' : 'Verb';
    }
}
