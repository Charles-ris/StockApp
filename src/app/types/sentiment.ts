export interface Sentiment {
  data: SentimentData[],
  symbol: string,
  description: string
}

export interface SentimentData  {
  symbol: string,
  date: Date,
  change: number
  mspr: number
}

export interface SentimentResponse {
  data: SentimentDataResponse[],
  symbol: string
}

export interface SentimentDataResponse  {
  symbol: string,
  year: number,
  month: number,
  change?: number
  mspr?: number
}
