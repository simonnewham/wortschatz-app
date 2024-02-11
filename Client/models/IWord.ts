import { WordCategory } from "../constants/WordCategory";

export interface IWord{
    id: number;
    nativeWord: string;
    nativeWordGender?: string;
    nativeWordCategory: WordCategory;
    translateWord: string;
    translateWordGender?: string;
    tags: string;
    usage: string;
    createdDate: Date;
}