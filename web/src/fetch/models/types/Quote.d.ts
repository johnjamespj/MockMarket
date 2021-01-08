/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * This includes EQUITY, MUTUALFUND, ETF, CRYPTOCURRENCY, FUTURE, OPTION, CURRENCY, INDEX
 *
 * This interface was referenced by `Quote`'s JSON-Schema
 * via the `definition` "QuoteTypes".
 */
export type QuoteTypes =
  | "EQUITY"
  | "MUTUALFUND"
  | "ETF"
  | "CRYPTOCURRENCY"
  | "FUTURE"
  | "OPTION"
  | "CURRENCY"
  | "INDEX";

export interface Quote {
  symbol: string;
  dividendDate?: FormatedValueLong;
  twoHundredDayAverageChangePercent?: FormatedValue;
  fiftyTwoWeekLowChangePercent?: FormatedValue;
  language: string;
  /**
   * Instrument's Day's Range {EQUITY}
   */
  regularMarketDayRange?: FormatedValue;
  epsForward?: FormatedValue;
  regularMarketDayHigh?: FormatedValue;
  twoHundredDayAverageChange?: FormatedValue;
  twoHundredDayAverage?: FormatedValue;
  /**
   * Instrument's Bid Size (eg: 0.00 x 11) {EQUITY}
   */
  askSize?: FormatedValueLong;
  bookValue?: FormatedValue;
  marketCap?: FormatedValueLong;
  fiftyTwoWeekHighChange?: FormatedValue;
  fiftyTwoWeekRange?: FormatedValue;
  fiftyDayAverageChange?: FormatedValue;
  averageDailyVolume3Month?: FormatedValueLong;
  firstTradeDateMilliseconds: number;
  exchangeDataDelayedBy: number;
  trailingAnnualDividendRate?: FormatedValue;
  fiftyTwoWeekLow?: FormatedValue;
  regularMarketVolume?: FormatedValueLong;
  market: string;
  postMarketPrice?: FormatedValue;
  quoteSourceName?: string;
  messageBoardId?: string;
  priceHint: number;
  exchange: string;
  regularMarketDayLow?: FormatedValue;
  sourceInterval: number;
  shortName?: string;
  region: string;
  fiftyDayAverageChangePercent?: FormatedValue;
  fullExchangeName: string;
  financialCurrency?: string;
  displayName?: string;
  gmtOffSetMilliseconds: number;
  /**
   * Instrument's Open price (Open) {EQUITY}
   */
  regularMarketOpen?: FormatedValue;
  regularMarketTime?: FormatedValue;
  regularMarketChangePercent?: FormatedValue;
  trailingAnnualDividendYield?: FormatedValue;
  quoteType: QuoteTypes;
  fiftyTwoWeekLowChange?: FormatedValue;
  averageDailyVolume10Day?: FormatedValueLong;
  fiftyTwoWeekHighChangePercent?: FormatedValue;
  trailingPE?: FormatedValue;
  tradeable: boolean;
  postMarketTime?: FormatedValue;
  currency?: string;
  sharesOutstanding?: FormatedValueLong;
  /**
   * Instrument price for last day (Previous Close) {EQUITY}
   */
  regularMarketPreviousClose?: FormatedValue;
  fiftyTwoWeekHigh?: FormatedValue;
  postMarketChangePercent?: FormatedValue;
  exchangeTimezoneName: string;
  /**
   * Instrument's Bid size (eg: 0.00 x 8) {EQUITY}
   */
  bidSize?: FormatedValueLong;
  regularMarketChange?: FormatedValue;
  priceEpsCurrentYear?: FormatedValue;
  fiftyDayAverage?: FormatedValue;
  epsCurrentYear?: FormatedValue;
  exchangeTimezoneShortName: string;
  marketState: string;
  regularMarketPrice?: FormatedValue;
  postMarketChange?: FormatedValue;
  forwardPE?: FormatedValue;
  /**
   * Instrument's Ask (eg: 0.00 x 11) {EQUITY}
   */
  ask?: FormatedValue;
  epsTrailingTwelveMonths?: FormatedValue;
  /**
   * Instrument's Bid (eg: 0.00 x 8) {EQUITY}
   */
  bid?: FormatedValue;
  priceToBook?: FormatedValue;
  triggerable: boolean;
  longName?: string;
  circulatingSupply?: FormatedValueLong;
  fromCurrency?: string;
  lastMarket?: string;
  toCurrency?: string;
  startDate?: FormatedValueLong;
  coinImageUrl?: string;
  volume24Hr?: FormatedValueLong;
  volumeAllCurrencies?: FormatedValueLong;
  headSymbol?: boolean;
  expireIsoDate?: FormatedValue;
  underlyingExchangeSymbol?: string;
  openInterest?: FormatedValueLong;
  headSymbolAsString?: string;
  underlyingSymbol?: string;
  contractSymbol?: boolean;
  expireDate?: FormatedValueLong;
  trailingThreeMonthReturns?: FormatedValue;
  ytdReturn?: FormatedValue;
  trailingThreeMonthNavReturns?: FormatedValue;
  strike?: FormatedValue;
  earningsTimestamp?: FormatedValueLong;
  earningsTimestampEnd?: FormatedValueLong;
  earningsTimestampStart?: FormatedValueLong;
}
/**
 * This interface was referenced by `Quote`'s JSON-Schema
 * via the `definition` "FormatedValueLong".
 */
export interface FormatedValueLong {
  raw: number | string;
  fmt: string;
  longFmt: string;
}
/**
 * This interface was referenced by `Quote`'s JSON-Schema
 * via the `definition` "FormatedValue".
 */
export interface FormatedValue {
  raw: number | string;
  fmt: string;
}