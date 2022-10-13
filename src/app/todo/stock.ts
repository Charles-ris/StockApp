export interface StockQuote {
  c: string,
  d: string,
  dp: string,
  h: string,
  l: string,
  o: string,
  pc: string,
  t: string,
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



