/* eslint-disable */
import * as Long from 'long'
import { Writer, Reader, util, configure } from 'protobufjs/minimal'


export interface PricingData {
  id: string
  price: number
  time: number
  currency: string
  exchange: string
  changePercent: number
  dayVolume: number
  dayHigh: number
  dayLow: number
  change: number
  shortName: string
  expireDate: number
  openPrice: number
  previousClose: number
  strikePrice: number
  underlyingSymbol: string
  openInterest: number
  miniOption: number
  lastSize: number
  bid: number
  bidSize: number
  ask: number
  askSize: number
  priceHint: number
  vol24hr: number
  volAllCurrencies: number
  fromcurrency: string
  lastMarket: string
  circulatingSupply: number
  marketcap: number
  quoteType: PricingData_QuoteType
  marketHours: PricingData_MarketHours
  optionsType: PricingData_OptionType
}

const basePricingData: object = {
  id: "",
  price: 0,
  time: 0,
  currency: "",
  exchange: "",
  changePercent: 0,
  dayVolume: 0,
  dayHigh: 0,
  dayLow: 0,
  change: 0,
  shortName: "",
  expireDate: 0,
  openPrice: 0,
  previousClose: 0,
  strikePrice: 0,
  underlyingSymbol: "",
  openInterest: 0,
  miniOption: 0,
  lastSize: 0,
  bid: 0,
  bidSize: 0,
  ask: 0,
  askSize: 0,
  priceHint: 0,
  vol24hr: 0,
  volAllCurrencies: 0,
  fromcurrency: "",
  lastMarket: "",
  circulatingSupply: 0,
  marketcap: 0,
  quoteType: 0,
  marketHours: 0,
  optionsType: 0,
}

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER")
  }
  return long.toNumber()
}

export const protobufPackage = ''

export enum PricingData_QuoteType {
  NONE = 0,
  ALTSYMBOL = 5,
  HEARTBEAT = 7,
  EQUITY = 8,
  INDEX = 9,
  MUTUALFUND = 11,
  MONEYMARKET = 12,
  OPTION = 13,
  CURRENCY = 14,
  WARRANT = 15,
  BOND = 17,
  FUTURE = 18,
  ETF = 20,
  COMMODITY = 23,
  ECNQUOTE = 28,
  CRYPTOCURRENCY = 41,
  INDICATOR = 42,
  INDUSTRY = 1000,
  UNRECOGNIZED = -1,
}

export function pricingData_QuoteTypeFromJSON(object: any): PricingData_QuoteType {
  switch (object) {
    case 0:
    case "NONE":
      return PricingData_QuoteType.NONE
    case 5:
    case "ALTSYMBOL":
      return PricingData_QuoteType.ALTSYMBOL
    case 7:
    case "HEARTBEAT":
      return PricingData_QuoteType.HEARTBEAT
    case 8:
    case "EQUITY":
      return PricingData_QuoteType.EQUITY
    case 9:
    case "INDEX":
      return PricingData_QuoteType.INDEX
    case 11:
    case "MUTUALFUND":
      return PricingData_QuoteType.MUTUALFUND
    case 12:
    case "MONEYMARKET":
      return PricingData_QuoteType.MONEYMARKET
    case 13:
    case "OPTION":
      return PricingData_QuoteType.OPTION
    case 14:
    case "CURRENCY":
      return PricingData_QuoteType.CURRENCY
    case 15:
    case "WARRANT":
      return PricingData_QuoteType.WARRANT
    case 17:
    case "BOND":
      return PricingData_QuoteType.BOND
    case 18:
    case "FUTURE":
      return PricingData_QuoteType.FUTURE
    case 20:
    case "ETF":
      return PricingData_QuoteType.ETF
    case 23:
    case "COMMODITY":
      return PricingData_QuoteType.COMMODITY
    case 28:
    case "ECNQUOTE":
      return PricingData_QuoteType.ECNQUOTE
    case 41:
    case "CRYPTOCURRENCY":
      return PricingData_QuoteType.CRYPTOCURRENCY
    case 42:
    case "INDICATOR":
      return PricingData_QuoteType.INDICATOR
    case 1000:
    case "INDUSTRY":
      return PricingData_QuoteType.INDUSTRY
    case -1:
    case "UNRECOGNIZED":
    default:
      return PricingData_QuoteType.UNRECOGNIZED
  }
}

export function pricingData_QuoteTypeToJSON(object: PricingData_QuoteType): string {
  switch (object) {
    case PricingData_QuoteType.NONE:
      return "NONE"
    case PricingData_QuoteType.ALTSYMBOL:
      return "ALTSYMBOL"
    case PricingData_QuoteType.HEARTBEAT:
      return "HEARTBEAT"
    case PricingData_QuoteType.EQUITY:
      return "EQUITY"
    case PricingData_QuoteType.INDEX:
      return "INDEX"
    case PricingData_QuoteType.MUTUALFUND:
      return "MUTUALFUND"
    case PricingData_QuoteType.MONEYMARKET:
      return "MONEYMARKET"
    case PricingData_QuoteType.OPTION:
      return "OPTION"
    case PricingData_QuoteType.CURRENCY:
      return "CURRENCY"
    case PricingData_QuoteType.WARRANT:
      return "WARRANT"
    case PricingData_QuoteType.BOND:
      return "BOND"
    case PricingData_QuoteType.FUTURE:
      return "FUTURE"
    case PricingData_QuoteType.ETF:
      return "ETF"
    case PricingData_QuoteType.COMMODITY:
      return "COMMODITY"
    case PricingData_QuoteType.ECNQUOTE:
      return "ECNQUOTE"
    case PricingData_QuoteType.CRYPTOCURRENCY:
      return "CRYPTOCURRENCY"
    case PricingData_QuoteType.INDICATOR:
      return "INDICATOR"
    case PricingData_QuoteType.INDUSTRY:
      return "INDUSTRY"
    default:
      return "UNKNOWN"
  }
}

export enum PricingData_MarketHours {
  PRE_MARKET = 0,
  REGULAR_MARKET = 1,
  POST_MARKET = 2,
  EXTENDED_HOURS_MARKET = 3,
  UNRECOGNIZED = -1,
}

export function pricingData_MarketHoursFromJSON(object: any): PricingData_MarketHours {
  switch (object) {
    case 0:
    case "PRE_MARKET":
      return PricingData_MarketHours.PRE_MARKET
    case 1:
    case "REGULAR_MARKET":
      return PricingData_MarketHours.REGULAR_MARKET
    case 2:
    case "POST_MARKET":
      return PricingData_MarketHours.POST_MARKET
    case 3:
    case "EXTENDED_HOURS_MARKET":
      return PricingData_MarketHours.EXTENDED_HOURS_MARKET
    case -1:
    case "UNRECOGNIZED":
    default:
      return PricingData_MarketHours.UNRECOGNIZED
  }
}

export function pricingData_MarketHoursToJSON(object: PricingData_MarketHours): string {
  switch (object) {
    case PricingData_MarketHours.PRE_MARKET:
      return "PRE_MARKET"
    case PricingData_MarketHours.REGULAR_MARKET:
      return "REGULAR_MARKET"
    case PricingData_MarketHours.POST_MARKET:
      return "POST_MARKET"
    case PricingData_MarketHours.EXTENDED_HOURS_MARKET:
      return "EXTENDED_HOURS_MARKET"
    default:
      return "UNKNOWN"
  }
}

export enum PricingData_OptionType {
  CALL = 0,
  PUT = 1,
  UNRECOGNIZED = -1,
}

export function pricingData_OptionTypeFromJSON(object: any): PricingData_OptionType {
  switch (object) {
    case 0:
    case "CALL":
      return PricingData_OptionType.CALL
    case 1:
    case "PUT":
      return PricingData_OptionType.PUT
    case -1:
    case "UNRECOGNIZED":
    default:
      return PricingData_OptionType.UNRECOGNIZED
  }
}

export function pricingData_OptionTypeToJSON(object: PricingData_OptionType): string {
  switch (object) {
    case PricingData_OptionType.CALL:
      return "CALL"
    case PricingData_OptionType.PUT:
      return "PUT"
    default:
      return "UNKNOWN"
  }
}

export const PricingData = {
  encode(message: PricingData, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.id)
    writer.uint32(21).float(message.price)
    writer.uint32(24).sint64(message.time)
    writer.uint32(34).string(message.currency)
    writer.uint32(42).string(message.exchange)
    writer.uint32(69).float(message.changePercent)
    writer.uint32(77).float(message.dayVolume)
    writer.uint32(85).float(message.dayHigh)
    writer.uint32(93).float(message.dayLow)
    writer.uint32(101).float(message.change)
    writer.uint32(106).string(message.shortName)
    writer.uint32(112).sint64(message.expireDate)
    writer.uint32(125).float(message.openPrice)
    writer.uint32(133).float(message.previousClose)
    writer.uint32(141).float(message.strikePrice)
    writer.uint32(146).string(message.underlyingSymbol)
    writer.uint32(152).sint64(message.openInterest)
    writer.uint32(168).sint64(message.miniOption)
    writer.uint32(176).sint64(message.lastSize)
    writer.uint32(189).float(message.bid)
    writer.uint32(192).sint64(message.bidSize)
    writer.uint32(205).float(message.ask)
    writer.uint32(208).sint64(message.askSize)
    writer.uint32(216).sint64(message.priceHint)
    writer.uint32(224).sint64(message.vol24hr)
    writer.uint32(232).sint64(message.volAllCurrencies)
    writer.uint32(242).string(message.fromcurrency)
    writer.uint32(250).string(message.lastMarket)
    writer.uint32(257).double(message.circulatingSupply)
    writer.uint32(265).double(message.marketcap)
    writer.uint32(48).int32(message.quoteType)
    writer.uint32(56).int32(message.marketHours)
    writer.uint32(160).int32(message.optionsType)
    return writer
  },
  decode(input: Uint8Array | Reader, length?: number): PricingData {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...basePricingData } as PricingData
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.price = reader.float()
          break
        case 3:
          message.time = longToNumber(reader.sint64() as Long)
          break
        case 4:
          message.currency = reader.string()
          break
        case 5:
          message.exchange = reader.string()
          break
        case 8:
          message.changePercent = reader.float()
          break
        case 9:
          message.dayVolume = reader.float()
          break
        case 10:
          message.dayHigh = reader.float()
          break
        case 11:
          message.dayLow = reader.float()
          break
        case 12:
          message.change = reader.float()
          break
        case 13:
          message.shortName = reader.string()
          break
        case 14:
          message.expireDate = longToNumber(reader.sint64() as Long)
          break
        case 15:
          message.openPrice = reader.float()
          break
        case 16:
          message.previousClose = reader.float()
          break
        case 17:
          message.strikePrice = reader.float()
          break
        case 18:
          message.underlyingSymbol = reader.string()
          break
        case 19:
          message.openInterest = longToNumber(reader.sint64() as Long)
          break
        case 21:
          message.miniOption = longToNumber(reader.sint64() as Long)
          break
        case 22:
          message.lastSize = longToNumber(reader.sint64() as Long)
          break
        case 23:
          message.bid = reader.float()
          break
        case 24:
          message.bidSize = longToNumber(reader.sint64() as Long)
          break
        case 25:
          message.ask = reader.float()
          break
        case 26:
          message.askSize = longToNumber(reader.sint64() as Long)
          break
        case 27:
          message.priceHint = longToNumber(reader.sint64() as Long)
          break
        case 28:
          message.vol24hr = longToNumber(reader.sint64() as Long)
          break
        case 29:
          message.volAllCurrencies = longToNumber(reader.sint64() as Long)
          break
        case 30:
          message.fromcurrency = reader.string()
          break
        case 31:
          message.lastMarket = reader.string()
          break
        case 32:
          message.circulatingSupply = reader.double()
          break
        case 33:
          message.marketcap = reader.double()
          break
        case 6:
          message.quoteType = reader.int32() as any
          break
        case 7:
          message.marketHours = reader.int32() as any
          break
        case 20:
          message.optionsType = reader.int32() as any
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },
  fromJSON(object: any): PricingData {
    const message = { ...basePricingData } as PricingData
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ""
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = Number(object.price)
    } else {
      message.price = 0
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = Number(object.time)
    } else {
      message.time = 0
    }
    if (object.currency !== undefined && object.currency !== null) {
      message.currency = String(object.currency)
    } else {
      message.currency = ""
    }
    if (object.exchange !== undefined && object.exchange !== null) {
      message.exchange = String(object.exchange)
    } else {
      message.exchange = ""
    }
    if (object.changePercent !== undefined && object.changePercent !== null) {
      message.changePercent = Number(object.changePercent)
    } else {
      message.changePercent = 0
    }
    if (object.dayVolume !== undefined && object.dayVolume !== null) {
      message.dayVolume = Number(object.dayVolume)
    } else {
      message.dayVolume = 0
    }
    if (object.dayHigh !== undefined && object.dayHigh !== null) {
      message.dayHigh = Number(object.dayHigh)
    } else {
      message.dayHigh = 0
    }
    if (object.dayLow !== undefined && object.dayLow !== null) {
      message.dayLow = Number(object.dayLow)
    } else {
      message.dayLow = 0
    }
    if (object.change !== undefined && object.change !== null) {
      message.change = Number(object.change)
    } else {
      message.change = 0
    }
    if (object.shortName !== undefined && object.shortName !== null) {
      message.shortName = String(object.shortName)
    } else {
      message.shortName = ""
    }
    if (object.expireDate !== undefined && object.expireDate !== null) {
      message.expireDate = Number(object.expireDate)
    } else {
      message.expireDate = 0
    }
    if (object.openPrice !== undefined && object.openPrice !== null) {
      message.openPrice = Number(object.openPrice)
    } else {
      message.openPrice = 0
    }
    if (object.previousClose !== undefined && object.previousClose !== null) {
      message.previousClose = Number(object.previousClose)
    } else {
      message.previousClose = 0
    }
    if (object.strikePrice !== undefined && object.strikePrice !== null) {
      message.strikePrice = Number(object.strikePrice)
    } else {
      message.strikePrice = 0
    }
    if (object.underlyingSymbol !== undefined && object.underlyingSymbol !== null) {
      message.underlyingSymbol = String(object.underlyingSymbol)
    } else {
      message.underlyingSymbol = ""
    }
    if (object.openInterest !== undefined && object.openInterest !== null) {
      message.openInterest = Number(object.openInterest)
    } else {
      message.openInterest = 0
    }
    if (object.miniOption !== undefined && object.miniOption !== null) {
      message.miniOption = Number(object.miniOption)
    } else {
      message.miniOption = 0
    }
    if (object.lastSize !== undefined && object.lastSize !== null) {
      message.lastSize = Number(object.lastSize)
    } else {
      message.lastSize = 0
    }
    if (object.bid !== undefined && object.bid !== null) {
      message.bid = Number(object.bid)
    } else {
      message.bid = 0
    }
    if (object.bidSize !== undefined && object.bidSize !== null) {
      message.bidSize = Number(object.bidSize)
    } else {
      message.bidSize = 0
    }
    if (object.ask !== undefined && object.ask !== null) {
      message.ask = Number(object.ask)
    } else {
      message.ask = 0
    }
    if (object.askSize !== undefined && object.askSize !== null) {
      message.askSize = Number(object.askSize)
    } else {
      message.askSize = 0
    }
    if (object.priceHint !== undefined && object.priceHint !== null) {
      message.priceHint = Number(object.priceHint)
    } else {
      message.priceHint = 0
    }
    if (object.vol24hr !== undefined && object.vol24hr !== null) {
      message.vol24hr = Number(object.vol24hr)
    } else {
      message.vol24hr = 0
    }
    if (object.volAllCurrencies !== undefined && object.volAllCurrencies !== null) {
      message.volAllCurrencies = Number(object.volAllCurrencies)
    } else {
      message.volAllCurrencies = 0
    }
    if (object.fromcurrency !== undefined && object.fromcurrency !== null) {
      message.fromcurrency = String(object.fromcurrency)
    } else {
      message.fromcurrency = ""
    }
    if (object.lastMarket !== undefined && object.lastMarket !== null) {
      message.lastMarket = String(object.lastMarket)
    } else {
      message.lastMarket = ""
    }
    if (object.circulatingSupply !== undefined && object.circulatingSupply !== null) {
      message.circulatingSupply = Number(object.circulatingSupply)
    } else {
      message.circulatingSupply = 0
    }
    if (object.marketcap !== undefined && object.marketcap !== null) {
      message.marketcap = Number(object.marketcap)
    } else {
      message.marketcap = 0
    }
    if (object.quoteType !== undefined && object.quoteType !== null) {
      message.quoteType = pricingData_QuoteTypeFromJSON(object.quoteType)
    } else {
      message.quoteType = 0
    }
    if (object.marketHours !== undefined && object.marketHours !== null) {
      message.marketHours = pricingData_MarketHoursFromJSON(object.marketHours)
    } else {
      message.marketHours = 0
    }
    if (object.optionsType !== undefined && object.optionsType !== null) {
      message.optionsType = pricingData_OptionTypeFromJSON(object.optionsType)
    } else {
      message.optionsType = 0
    }
    return message
  },
  fromPartial(object: DeepPartial<PricingData>): PricingData {
    const message = { ...basePricingData } as PricingData
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ""
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price
    } else {
      message.price = 0
    }
    if (object.time !== undefined && object.time !== null) {
      message.time = object.time
    } else {
      message.time = 0
    }
    if (object.currency !== undefined && object.currency !== null) {
      message.currency = object.currency
    } else {
      message.currency = ""
    }
    if (object.exchange !== undefined && object.exchange !== null) {
      message.exchange = object.exchange
    } else {
      message.exchange = ""
    }
    if (object.changePercent !== undefined && object.changePercent !== null) {
      message.changePercent = object.changePercent
    } else {
      message.changePercent = 0
    }
    if (object.dayVolume !== undefined && object.dayVolume !== null) {
      message.dayVolume = object.dayVolume
    } else {
      message.dayVolume = 0
    }
    if (object.dayHigh !== undefined && object.dayHigh !== null) {
      message.dayHigh = object.dayHigh
    } else {
      message.dayHigh = 0
    }
    if (object.dayLow !== undefined && object.dayLow !== null) {
      message.dayLow = object.dayLow
    } else {
      message.dayLow = 0
    }
    if (object.change !== undefined && object.change !== null) {
      message.change = object.change
    } else {
      message.change = 0
    }
    if (object.shortName !== undefined && object.shortName !== null) {
      message.shortName = object.shortName
    } else {
      message.shortName = ""
    }
    if (object.expireDate !== undefined && object.expireDate !== null) {
      message.expireDate = object.expireDate
    } else {
      message.expireDate = 0
    }
    if (object.openPrice !== undefined && object.openPrice !== null) {
      message.openPrice = object.openPrice
    } else {
      message.openPrice = 0
    }
    if (object.previousClose !== undefined && object.previousClose !== null) {
      message.previousClose = object.previousClose
    } else {
      message.previousClose = 0
    }
    if (object.strikePrice !== undefined && object.strikePrice !== null) {
      message.strikePrice = object.strikePrice
    } else {
      message.strikePrice = 0
    }
    if (object.underlyingSymbol !== undefined && object.underlyingSymbol !== null) {
      message.underlyingSymbol = object.underlyingSymbol
    } else {
      message.underlyingSymbol = ""
    }
    if (object.openInterest !== undefined && object.openInterest !== null) {
      message.openInterest = object.openInterest
    } else {
      message.openInterest = 0
    }
    if (object.miniOption !== undefined && object.miniOption !== null) {
      message.miniOption = object.miniOption
    } else {
      message.miniOption = 0
    }
    if (object.lastSize !== undefined && object.lastSize !== null) {
      message.lastSize = object.lastSize
    } else {
      message.lastSize = 0
    }
    if (object.bid !== undefined && object.bid !== null) {
      message.bid = object.bid
    } else {
      message.bid = 0
    }
    if (object.bidSize !== undefined && object.bidSize !== null) {
      message.bidSize = object.bidSize
    } else {
      message.bidSize = 0
    }
    if (object.ask !== undefined && object.ask !== null) {
      message.ask = object.ask
    } else {
      message.ask = 0
    }
    if (object.askSize !== undefined && object.askSize !== null) {
      message.askSize = object.askSize
    } else {
      message.askSize = 0
    }
    if (object.priceHint !== undefined && object.priceHint !== null) {
      message.priceHint = object.priceHint
    } else {
      message.priceHint = 0
    }
    if (object.vol24hr !== undefined && object.vol24hr !== null) {
      message.vol24hr = object.vol24hr
    } else {
      message.vol24hr = 0
    }
    if (object.volAllCurrencies !== undefined && object.volAllCurrencies !== null) {
      message.volAllCurrencies = object.volAllCurrencies
    } else {
      message.volAllCurrencies = 0
    }
    if (object.fromcurrency !== undefined && object.fromcurrency !== null) {
      message.fromcurrency = object.fromcurrency
    } else {
      message.fromcurrency = ""
    }
    if (object.lastMarket !== undefined && object.lastMarket !== null) {
      message.lastMarket = object.lastMarket
    } else {
      message.lastMarket = ""
    }
    if (object.circulatingSupply !== undefined && object.circulatingSupply !== null) {
      message.circulatingSupply = object.circulatingSupply
    } else {
      message.circulatingSupply = 0
    }
    if (object.marketcap !== undefined && object.marketcap !== null) {
      message.marketcap = object.marketcap
    } else {
      message.marketcap = 0
    }
    if (object.quoteType !== undefined && object.quoteType !== null) {
      message.quoteType = object.quoteType
    } else {
      message.quoteType = 0
    }
    if (object.marketHours !== undefined && object.marketHours !== null) {
      message.marketHours = object.marketHours
    } else {
      message.marketHours = 0
    }
    if (object.optionsType !== undefined && object.optionsType !== null) {
      message.optionsType = object.optionsType
    } else {
      message.optionsType = 0
    }
    return message
  },
  toJSON(message: PricingData): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.price !== undefined && (obj.price = message.price)
    message.time !== undefined && (obj.time = message.time)
    message.currency !== undefined && (obj.currency = message.currency)
    message.exchange !== undefined && (obj.exchange = message.exchange)
    message.changePercent !== undefined && (obj.changePercent = message.changePercent)
    message.dayVolume !== undefined && (obj.dayVolume = message.dayVolume)
    message.dayHigh !== undefined && (obj.dayHigh = message.dayHigh)
    message.dayLow !== undefined && (obj.dayLow = message.dayLow)
    message.change !== undefined && (obj.change = message.change)
    message.shortName !== undefined && (obj.shortName = message.shortName)
    message.expireDate !== undefined && (obj.expireDate = message.expireDate)
    message.openPrice !== undefined && (obj.openPrice = message.openPrice)
    message.previousClose !== undefined && (obj.previousClose = message.previousClose)
    message.strikePrice !== undefined && (obj.strikePrice = message.strikePrice)
    message.underlyingSymbol !== undefined && (obj.underlyingSymbol = message.underlyingSymbol)
    message.openInterest !== undefined && (obj.openInterest = message.openInterest)
    message.miniOption !== undefined && (obj.miniOption = message.miniOption)
    message.lastSize !== undefined && (obj.lastSize = message.lastSize)
    message.bid !== undefined && (obj.bid = message.bid)
    message.bidSize !== undefined && (obj.bidSize = message.bidSize)
    message.ask !== undefined && (obj.ask = message.ask)
    message.askSize !== undefined && (obj.askSize = message.askSize)
    message.priceHint !== undefined && (obj.priceHint = message.priceHint)
    message.vol24hr !== undefined && (obj.vol24hr = message.vol24hr)
    message.volAllCurrencies !== undefined && (obj.volAllCurrencies = message.volAllCurrencies)
    message.fromcurrency !== undefined && (obj.fromcurrency = message.fromcurrency)
    message.lastMarket !== undefined && (obj.lastMarket = message.lastMarket)
    message.circulatingSupply !== undefined && (obj.circulatingSupply = message.circulatingSupply)
    message.marketcap !== undefined && (obj.marketcap = message.marketcap)
    message.quoteType !== undefined && (obj.quoteType = pricingData_QuoteTypeToJSON(message.quoteType))
    message.marketHours !== undefined && (obj.marketHours = pricingData_MarketHoursToJSON(message.marketHours))
    message.optionsType !== undefined && (obj.optionsType = pricingData_OptionTypeToJSON(message.optionsType))
    return obj
  },
}

if (util.Long !== Long as any) {
  util.Long = Long as any
  configure()
}

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>