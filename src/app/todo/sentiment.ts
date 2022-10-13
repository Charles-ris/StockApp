export interface Sentiment {
  data: SentimentData[],
  symbol: string
}

export interface SentimentData  {
  symbol: string,
  year: number,
  month: number,
  change: number
  mspr: number
}
