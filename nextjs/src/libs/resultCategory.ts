export const resultCategory = (value: number) =>
  value >= 130
    ? 'BAIK SEKALI'
    : value > 115
      ? 'BAIK'
      : value > 100
        ? 'CUKUP BAIK'
        : value > 85
          ? 'CUKUP'
          : value > 71
            ? 'KURANG'
            : 'KURANG SEKALI'
