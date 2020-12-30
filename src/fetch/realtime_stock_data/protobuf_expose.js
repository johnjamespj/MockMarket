import protobuf from 'protobufjs'

// map used for transforming the response to match the quote response
var STREAMER_FIELD_MAPPING = {
    id: 'symbol',
    dayVolume: 'volume',
    marketcap: 'marketCap',
    marketHours: 'marketState'
    // TODO: figure out mapping for these fields if any...
    // openPrice,
    // optionsType,
    // miniOption,
    // lastSize,
    // vol_24hr,
    // volAllCurrencies,
    // fromcurrency,
    // lastMarket
};

// A map to categorize quote summary detail field vs price field
var QUOTE_SUMMARY_DETAIL_FIELD = {
    ask: true,
    askSize: true,
    bid: true,
    bidSize: true,
    dayLow: true,
    dayHigh: true,
    expireDate: true
};

// A map to remove unrequired fields in final response
var NON_REQUIRED_FIELDS = {};

// map which would result in price hint formatting
var PRICE_HINT_FORMATTED_FIELDS = {
    change: true,
    changePercent: true,
    previousClose: true,
    price: true
};

/**
 * Helper function to convert a base 64 string into a bytes array
 * @param {String} base64 a string in base 64
 */
function base64ToArray(base64) {
    var binaryString = atob(base64);
    var len = binaryString.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

/**
 * Helper function to trim a float number to a given places (toFixed returns string)
 * @param {Number} val value to be trimmed
 * @param {Number} place how many digits you need after decimal point.
 */
function getFixedNumber(val, place) {
    if (isNaN(val)) {
        return val;
    }
    const pow = Math.pow(10, place);
    return +(Math.round(val * pow) / pow);
}

/**
 * Helper to process stream data into data we want
 * @param {Object} streamedQuoteData streamed object data to process
 * @returns {Object} processed stream data
 */
function getProcessedQuoteData(streamedQuoteData) {
    var price = {};
    var summaryDetail = {};
    var marketHours = streamedQuoteData.marketHours;
    var priceHint = streamedQuoteData.priceHint || 2;
    var marketHoursPrefix = '';
    var marketState;
    switch (marketHours) {
        case 'PRE_MARKET':
            marketHoursPrefix = 'preMarket';
            marketState = 'PRE';
            break;
        case 'REGULAR_MARKET':
            marketHoursPrefix = 'regularMarket';
            marketState = 'REGULAR';
            break;
        case 'POST_MARKET':
            marketHoursPrefix = 'postMarket';
            marketState = 'POST';
            break;
        case 'EXTENDED_HOURS_MARKET':
            marketHoursPrefix = 'extendedMarket';
            marketState = 'EXTENDED';
    }

    for (var field in streamedQuoteData) {
        if (streamedQuoteData.hasOwnProperty(field)) {
            var quotePropKey = STREAMER_FIELD_MAPPING[field] || field;
            var value = streamedQuoteData[field];
            if (value === undefined || value === null || value === '') {
                continue;
            }

            switch (quotePropKey) {
                case 'previousClose':
                case 'price':
                case 'time':
                case 'dayHigh':
                case 'dayLow':
                case 'volume':
                case 'changePercent':
                case 'change':
                    if (PRICE_HINT_FORMATTED_FIELDS[quotePropKey] && !isNaN(value)) {
                        // format the value using the priceHint
                        value = getFixedNumber(value, priceHint);
                    }

                    if (quotePropKey === 'time') {
                        // format time correctly
                        value = value / 1000;
                    }

                    quotePropKey =
                        marketHoursPrefix +
                        quotePropKey[0].toUpperCase() +
                        quotePropKey.substr(1);
                    break;
                case 'marketState':
                    value = marketState;
                    break;
            }

            if (QUOTE_SUMMARY_DETAIL_FIELD[quotePropKey]) {
                // its a summary detail field
                summaryDetail[quotePropKey] = value;
            } else {
                // its a price field
                if (!NON_REQUIRED_FIELDS[quotePropKey]) {
                    price[quotePropKey] = value;
                }
            }
        }
    }

    return {
        price: price,
        summaryDetail: summaryDetail
    };
}

export const decode = (str = "") => {
    var PricingData = protobuf.roots.default.quotefeeder.PricingData;
    var buffer = base64ToArray(str); // decode from base 64
    var data = PricingData.decode(buffer); // Decode using protobuff
    data = PricingData.toObject(data, {
        // Convert to a JS object
        enums: String
    });
    var quoteData = {};

    if (!Array.isArray(data)) {
        data = [data];
    }

    // data.forEach(function (res) {
    //     if (res && res.id) {
    //         // get the quote Data
    //         quoteData[res.id] = getProcessedQuoteData(res);
    //     }
    // });

    return data;
}