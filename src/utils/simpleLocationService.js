export const getCountryCode = async () => {
  const SERVICES = [
    // "https://ipapi.co/json/",
    "https://ipwho.is/",
    // "https://freeipapi.com/api/json",
  ];

  const timeout = (ms) =>
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    );

  for (const url of SERVICES) {
    try {
      // console.log("Trying service:", url);

      const response = await Promise.race([fetch(url), timeout(5000)]);

      if (!response.ok) continue;

      const data = await response.json();
      // console.log("Response 69:", data);

      // if (data?.country_code) return data?.country_code; // ipapi
      // if (data?.countryCode) return data?.countryCode; // freeipapi
      if (data?.country_code) return data?.country_code; // ipwho.is
    } catch (error) {
      console.log(`❌ Service failed: ${url}`);
    }
  }

  return "US"; // default
};

export const getCurrencyFromCountryCode = (countryCode) => {
  // Comprehensive country to currency mapping
  const countryToCurrency = {
    // Europe
    AD: "EUR",
    AT: "EUR",
    BE: "EUR",
    CY: "EUR",
    DE: "EUR",
    EE: "EUR",
    ES: "EUR",
    FI: "EUR",
    FR: "EUR",
    GR: "EUR",
    IE: "EUR",
    IT: "EUR",
    LU: "EUR",
    MT: "EUR",
    NL: "EUR",
    PT: "EUR",
    SI: "EUR",
    SK: "EUR",
    VA: "EUR",
    SM: "EUR",
    MC: "EUR",
    ME: "EUR",

    // Other European countries with their own currencies
    AL: "ALL",
    BA: "BAM",
    BG: "BGN",
    BY: "BYN",
    CH: "CHF",
    CZ: "CZK",
    DK: "DKK",
    GB: "GBP",
    HR: "HRK",
    HU: "HUF",
    IS: "ISK",
    MD: "MDL",
    MK: "MKD",
    NO: "NOK",
    PL: "PLN",
    RO: "RON",
    RS: "RSD",
    RU: "RUB",
    SE: "SEK",
    TR: "TRY",
    UA: "UAH",

    // North America
    US: "USD",
    CA: "CAD",
    MX: "MXN",

    // Central America & Caribbean
    CR: "CRC",
    DO: "DOP",
    GT: "GTQ",
    HN: "HNL",
    HT: "HTG",
    JM: "JMD",
    NI: "NIO",
    PA: "PAB",
    SV: "SVC",

    // South America
    AR: "ARS",
    BO: "BOB",
    BR: "BRL",
    CL: "CLP",
    CO: "COP",
    EC: "USD",
    PE: "PEN",
    PY: "PYG",
    UY: "UYU",
    VE: "VES",

    // Asia
    AF: "AFN",
    AM: "AMD",
    AZ: "AZN",
    BD: "BDT",
    BH: "BHD",
    BN: "BND",
    BT: "BTN",
    CN: "CNY",
    GE: "GEL",
    ID: "IDR",
    IL: "ILS",
    IN: "INR",
    IQ: "IQD",
    IR: "IRR",
    JO: "JOD",
    JP: "JPY",
    KG: "KGS",
    KH: "KHR",
    KP: "KPW",
    KR: "KRW",
    KW: "KWD",
    KZ: "KZT",
    LA: "LAK",
    LB: "LBP",
    LK: "LKR",
    MM: "MMK",
    MN: "MNT",
    MV: "MVR",
    MY: "MYR",
    NP: "NPR",
    OM: "OMR",
    PH: "PHP",
    PK: "PKR",
    QA: "QAR",
    SA: "SAR",
    SG: "SGD",
    SY: "SYP",
    TH: "THB",
    TJ: "TJS",
    TM: "TMT",
    TR: "TRY",
    TW: "TWD",
    UZ: "UZS",
    VN: "VND",
    YE: "YER",

    // Africa
    DZ: "DZD",
    AO: "AOA",
    BJ: "XOF",
    BW: "BWP",
    BI: "BIF",
    CV: "CVE",
    CM: "XAF",
    CF: "XAF",
    TD: "XAF",
    KM: "KMF",
    CG: "XAF",
    CD: "CDF",
    DJ: "DJF",
    EG: "EGP",
    GQ: "XAF",
    ER: "ERN",
    ET: "ETB",
    GA: "XAF",
    GM: "GMD",
    GH: "GHS",
    GN: "GNF",
    GW: "XOF",
    KE: "KES",
    LS: "LSL",
    LR: "LRD",
    LY: "LYD",
    MG: "MGA",
    MW: "MWK",
    ML: "XOF",
    MR: "MRU",
    MU: "MUR",
    MA: "MAD",
    MZ: "MZN",
    NA: "NAD",
    NE: "XOF",
    NG: "NGN",
    RW: "RWF",
    ST: "STN",
    SN: "XOF",
    SC: "SCR",
    SL: "SLL",
    SO: "SOS",
    ZA: "ZAR",
    SS: "SSP",
    SD: "SDG",
    SZ: "SZL",
    TZ: "TZS",
    TG: "XOF",
    TN: "TND",
    UG: "UGX",
    ZM: "ZMW",
    ZW: "ZWL",

    // Oceania
    AU: "AUD",
    FJ: "FJD",
    KI: "AUD",
    MH: "USD",
    FM: "USD",
    NR: "AUD",
    NZ: "NZD",
    PW: "USD",
    PG: "PGK",
    WS: "WST",
    SB: "SBD",
    TO: "TOP",
    TV: "AUD",
    VU: "VUV",
  };

  const normalizedCode = countryCode.toUpperCase();
  return countryToCurrency[normalizedCode] || "USD";
};
