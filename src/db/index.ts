import { v4 as makeUuidV4 } from "uuid";

let nonceStorage = new Set<string>();

export const createOneOffToken = (resource: string): string => {
    let nonce = makeUuidV4();
    nonceStorage.add(`${resource}:${nonce}`);
    return nonce;
};

export const useOneOffToken = (resource: string, nonce: string): boolean => {
    return nonceStorage.delete(`${resource}:${nonce}`);
};
