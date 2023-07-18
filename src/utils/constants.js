export const LUNA = "tLUNC"
export const UST = "UST"

export const ULUNA = "uluna"
export const UUSD = "uusd"


export const TX_STATE = {
  INIT: 'init',
  START: 'start',
  PENDING: 'pending',
  COMPLETE: 'complete',
  ERROR: 'error'
}

export const TX_TYPE = {
  NONE: 0,
  BUY: 1,
  SELL: 2,
  CANCEL: 3,
}

export const tokenInfos = new Map([
  [
    ULUNA,
    {
      contract_addr: ULUNA,
      symbol: LUNA,
      name: ULUNA,
      decimals: 6,
      asset: "assets/icons/lunc.png",
    },
  ],
  [
    UUSD,
    {
      contract_addr: UUSD,
      symbol: UST,
      name: UUSD,
      decimals: 6,
      asset: "assets/icons/UST.png",
    },
  ]
])

export const SORT_TYPE = {
  NONE: 'none',
  ASC: 'asc',
  DESC: 'desc'
}

export const ORDER_TYPE = {
  ALL: 0,
  LIMIT: 1,
  MARKET: 2,
}

export const ORDER_SIDE = {
  ALL: 'all',
  BUY: 'buy',
  SELL: 'sell'
}

export const STATUS_TYPE = {
  ALL: 0,
  OPEN: 1,
  COMPLETED: 2,
  CANCELED: 3
}

export const TOKEN_LIST = {
  CLSM: {
    symbol: 'CLSM',
    contract_addr: 'terra1asdfavet',
    decimals: 6,
    asset: "/img/icon/clsm.png",
  }
}

export const PAIR_LIST = [
  {
    from: TOKEN_LIST.CLSM,
    to: TOKEN_LIST.LUNC,
  }
]

export const RETURN_STATUS = {
  SUCCESS: 100,
  ADD: 101,
  UPDATE: 102,
  REMOVE: 103,
  ADD_REMOVE: 104,
  UPDATE_REMOVE: 105,
  ERROR: 200,
}
