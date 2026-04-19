export enum WordGender {
    Default = 0,
    Der = 1,
    Die = 2,
    Das = 3
}

export namespace WordGender {
    export function GetList() {
        return [
            { value: WordGender.Default, title: 'Artikel' },
            { value: WordGender.Der, title: 'Der (masculine)' },
            { value: WordGender.Die, title: 'Die (feminine)' },
            { value: WordGender.Das, title: 'Das (neuter)' }
        ];
    }
}