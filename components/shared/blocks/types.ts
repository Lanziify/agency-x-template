export type GetUniqueBlocks<T> = T extends readonly (infer U)[]
  ? GetUniqueBlocks<U>
  : T extends object
    ? (T extends { blockType: string } ? T : never) | { [K in keyof T]: GetUniqueBlocks<T[K]> }[keyof T]
    : never;

export type ByBlockType<T> = {
  [B in Extract<T, { blockType: PropertyKey }> as B['blockType']]: B;
};
