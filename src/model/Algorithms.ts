export const AlgorithmsOption = [
  'Shelf',
  'Skyline',
  'MaxRects',
  'Guillotine',
] as const;

export type Algorithms = typeof AlgorithmsOption[number];

export const BooleanOptions = [true, false];

export const ShelfSetting = {
  __name: ['ShelfSetting'],
  UseWasteMap: BooleanOptions,
  Heuristic: [
    'ShelfNextFit',
    'ShelfFirstFit',
    'ShelfBestAreaFit',
    'ShelfWorstAreaFit',
    'ShelfBestHeightFit',
    'ShelfBestWidthFit',
    'ShelfWorstWidthFit',
  ],
};

export const GuillotineSetting = {
  __name: ['GuillotineSetting'],
  UseRectangleMerge: BooleanOptions,
  FreeRectChoiceHeuristic: [
    'RectBestAreaFit',
    'RectBestShortSideFit',
    'RectBestLongSideFit',
    'RectWorstAreaFit',
    'RectWorstShortSideFit',
    'RectWorstLongSideFit',
  ],
  GuillotineSplitHeuristic: [
    'SplitShorterLeftoverAxis',
    'SplitLongerLeftoverAxis',
    'SplitMinimizeArea',
    'SplitMaximizeArea',
    'SplitShorterAxis',
    'SplitLongerAxis',
  ],
};

export const MaxRectsSetting = {
  __name: ['MaxRectsSetting'],
  AllowFlip: BooleanOptions,
  FreeRectChoiceHeuristic: [
    'RectBestShortSideFit',
    'RectBestLongSideFit',
    'RectBestAreaFit',
    'RectBottomLeftRule',
    'RectContactPointRule',
  ],
};

export const SkylineSetting = {
  __name: ['SkylineSetting'],
  UseWasteMap: BooleanOptions,
  LevelChoiceHeuristic: ['LevelBottomLeft', 'LevelMinWasteFit'],
};

export const AlgorithmsSetting: Record<
  Algorithms,
  Record<string, Array<string | boolean>>
> = {
  Shelf: ShelfSetting,
  Skyline: SkylineSetting,
  MaxRects: MaxRectsSetting,
  Guillotine: GuillotineSetting,
} as const;
