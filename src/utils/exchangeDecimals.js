const decimals = {
  btcusdt: {
    BUDA: {
      LocalMin: 0.00002,
      LocalDecimals: 100000,
    },
    BINANCE: {
      ForeignMin: 0.001,
      ForeignDecimals: 1000,
    },
  },
  ethusdt: {
    BUDA: {
      LocalMin: 0.001,
      LocalDecimals: 1000,
    },
    BINANCE: {
      ForeignMin: 0.001,
      ForeignDecimals: 1000,
    },
  },
  ltcusdt: {
    BUDA: {
      LocalMin: 0.01,
      LocalDecimals: 100,
    },
    BINANCE: {
      ForeignMin: 0.001,
      ForeignDecimals: 1000,
    },
  },
  bchusdt: {
    BUDA: {
      LocalMin: 0.001,
      LocalDecimals: 1000,
    },
    BINANCE: {
      ForeignMin: 0.001,
      ForeignDecimals: 1000,
    },
  },
};

export default decimals;
