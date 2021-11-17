/**
 * Merge types, overriding the property types in {@link BaseType} with the property types in {@link Overrides}, similar to a spread operator in JS
 */
export type CombineTypes<BaseType, Overrides> = {
  [K in keyof BaseType | keyof Overrides]: K extends keyof Overrides
    ? Overrides[K]
    : K extends keyof BaseType
    ? BaseType[K]
    : never;
};
