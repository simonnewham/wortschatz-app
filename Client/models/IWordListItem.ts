import { WordCategory } from "../constants/WordCategory";

export interface IWordListItem {
    id?: string;
    nativeWord: string;
    nativeWordGender: string;
    nativeWordCategory: WordCategory;
    tags: string;
    translateWord: string;
    translateWordGender: string;
    createdDate: Date;
}