export const normaTotal = (value: number) =>
  value > 170
    ? 171
    : value > 160
      ? 161
      : value > 150
        ? 151
        : value > 140
          ? 141
          : value > 130
            ? 131
            : value > 120
              ? 121
              : value > 110
                ? 111
                : value > 100
                  ? 102
                  : value > 90
                    ? 91
                    : value > 80
                      ? 81
                      : value > 70
                        ? 71
                        : value > 60
                          ? 61
                          : value > 50
                            ? 51
                            : value > 40
                              ? 41
                              : value > 30
                                ? 31
                                : value > 20
                                  ? 21
                                  : value > 10
                                    ? 11
                                    : 1
