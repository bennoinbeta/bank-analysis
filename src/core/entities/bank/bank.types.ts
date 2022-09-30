export type BankFileDataType = {
  dataset: BankDataType[];
  name: string;
  parseTimestamp: number;
  valid: boolean;
};

export type BankDataType = {
  date: Date;
  'receiver/sender'?: string;
  description?: string;
  tags?: Tag[];
  currency: 'EUR';
  amount: number;
  'debit/credit': 'D' | 'C';
};

export type DatasetType = {
  labels: string[];
};

export type TagBasedDatasetType = {
  tagAmounts: { credit: number; debit: number }[];
} & DatasetType;

export type TimeBasedDatasetType = {
  endAmounts: number[];
  creditDebitAmounts: { credit: number; debit: number }[];
} & DatasetType;

export type BankDataPaths<T> = {
  [K in keyof T]: T[K] extends any ? K : never;
}[keyof T] &
  string;

export enum TimeFormat {
  MONTH = 'month',
  DAY = 'day',
  YEAR = 'year',
}

export enum DatasetFormat {
  END_AMOUNTS = 'endAmounts',
  CREDIT_DEBIT_AMOUNTS = 'creditDebitAmounts',
  CATEGORY = 'category',
}

export enum Tag {
  UNCATEGORIZED = 'uncategorized',
  CONSUME = 'consume',
  INVESTMENT = 'investment',
  TRANSPORTATION = 'transportation',
  LEARNING = 'learning',
  TRANSFER = 'transfer',

  CRYPTO = 'crypto',
  STOCK = 'stock',
  DOMAIN = 'domain',
  SHOPPING = 'shopping',
  FITNESS = 'fitness',

  FTX = 'ftx',
  COINBASE = 'coinbase',
  TRADE_REPUBLIC = 'trade-republic',
  AMAZON = 'amazon',
  AMAZON_PRIME = 'prime',
  DISCORD = 'discord',
  ALDI_TALK = 'aldi-talk',
  VAG = 'vag',
  DB = 'db',
  PAYPAL = 'paypal',
  CHECKDOMAIN = 'checkdomain',
  DAN_DOMAIN = 'dan-domain',
  PORKBUN = 'prokbun',
  GODADDY = 'godaddy',
  DATEV = 'datev',
  BABEL = 'babel',
  AMAZON_AUDIBLE = 'audible',
  HARDWARERAT = 'hardwarerat',
  TWITCH = 'twitch',
  GRAMMARLY = 'grammarly',
  NETFLIX = 'netflix',
  BAANGGOOD = 'baanggood',
  EBAY_KLEINANZEIGEN = 'ebay-kleinanzeigen',
  MEDIA_MARKT = 'media-markt',
  ADIDAS = 'adidas',
  KOMOOT = 'komoot',
  UDEMY = 'udemy',
  BUSINESS = 'business',
}

export const tagIdentifiers: TagIdentifierType[] = [
  {
    identifiers: ['AMAZON', 'AMZN'],
    tags: [Tag.CONSUME, Tag.SHOPPING, Tag.AMAZON],
  },
  { identifiers: ['AMZNPrime'], tags: [Tag.CONSUME, Tag.AMAZON_PRIME] },
  { identifiers: ['Discord Inc'], tags: [Tag.CONSUME, Tag.DISCORD] },
  { identifiers: ['DATEV EG'], tags: [Tag.DATEV] },
  {
    identifiers: ['FTX', 'KLARPAY AG'],
    tags: [Tag.CRYPTO, Tag.INVESTMENT, Tag.FTX],
  },
  {
    identifiers: ['Coinbase'],
    tags: [Tag.CRYPTO, Tag.INVESTMENT, Tag.COINBASE],
  },
  {
    identifiers: ['Trade Republic', 'TRADE REPUBLIC BANK', 'TradeRepublic'],
    tags: [Tag.STOCK, Tag.INVESTMENT, Tag.TRADE_REPUBLIC],
  },
  { identifiers: ['ALDI TALK', 'E-Plus Service'], tags: [Tag.ALDI_TALK] },
  { identifiers: ['VAG'], tags: [Tag.TRANSPORTATION, Tag.VAG] },
  { identifiers: ['DB Vertrieb'], tags: [Tag.TRANSPORTATION, Tag.DB] },
  { identifiers: ['PayPal'], tags: [Tag.PAYPAL] },
  {
    identifiers: ['Checkdomain'],
    tags: [Tag.INVESTMENT, Tag.DOMAIN, Tag.CHECKDOMAIN],
  },
  {
    identifiers: ['Dan Domain'],
    tags: [Tag.INVESTMENT, Tag.DOMAIN, Tag.DAN_DOMAIN],
  },
  {
    identifiers: ['Porkbun'],
    tags: [Tag.INVESTMENT, Tag.DOMAIN, Tag.PORKBUN],
  },
  {
    identifiers: ['Go Daddy'],
    tags: [Tag.INVESTMENT, Tag.DOMAIN, Tag.GODADDY],
  },
  {
    identifiers: ['Babbel'],
    tags: [Tag.LEARNING, Tag.BABEL],
  },
  { identifiers: ['AUDIBLE'], tags: [Tag.CONSUME, Tag.AMAZON_AUDIBLE] },
  {
    identifiers: ['HardwareRat'],
    tags: [Tag.CONSUME, Tag.SHOPPING, Tag.HARDWARERAT],
  },
  { identifiers: ['TWITCHINTER'], tags: [Tag.CONSUME, Tag.TWITCH] },
  { identifiers: ['GRAMMARLY'], tags: [Tag.LEARNING, Tag.GRAMMARLY] },
  { identifiers: ['NETFLIX.COM'], tags: [Tag.CONSUME, Tag.NETFLIX] },
  {
    identifiers: ['BAANGGOOD'],
    tags: [Tag.CONSUME, Tag.SHOPPING, Tag.BAANGGOOD],
  },
  { identifiers: ['eBay Kleinanzeigen'], tags: [Tag.EBAY_KLEINANZEIGEN] },
  { identifiers: ['Vivid'], tags: [Tag.TRANSFER] },
  { identifiers: ['Teachable'], tags: [Tag.LEARNING] },
  { identifiers: ['Cali Move'], tags: [Tag.LEARNING, Tag.FITNESS] },
  { identifiers: ['Media Markt'], tags: [Tag.CONSUME, Tag.MEDIA_MARKT] },
  { identifiers: ['Adidas'], tags: [Tag.CONSUME, Tag.ADIDAS] },
  { identifiers: ['Adidas'], tags: [Tag.CONSUME, Tag.KOMOOT] },
  { identifiers: ['Udemy'], tags: [Tag.LEARNING, Tag.UDEMY] },
  { identifiers: ['N26 Business Konto'], tags: [Tag.INVESTMENT, Tag.BUSINESS] },
];

type TagIdentifierType = { identifiers: string[]; tags: Tag[] };
