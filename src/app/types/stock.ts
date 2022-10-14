export interface StockQuote {
  c: number,
  d: number,
  dp: string,
  h: number,
  l: string,
  o: number,
  pc: number,
  t: number,
}

export interface StockSymbol {
  count: number,
  result: stockResult[],
}

export interface stockResult {
  description: string,
  displaySymbol: string,
  symbol: string,
  type: string,
}

export interface Stock {
  stockSymbol: string,
  stockInformation: StockSymbol,
  stockQuote: StockQuote
}



