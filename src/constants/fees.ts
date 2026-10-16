export const FEE_CATEGORIES = ['행위료', '치료재료대', '제증명수수료'] as const;

export type FeeCategory = (typeof FEE_CATEGORIES)[number];
