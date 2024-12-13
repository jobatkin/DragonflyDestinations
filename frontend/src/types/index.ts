export interface Country {
    code: string,
    name: string,
    capital: string,
    region: string,
    subregion: string,
    population: number,
    area: number, 
    favouriteCount?: number
}

export interface CountryAnswer {
    code: string,
    name: string,
    capital: string,
    region: string,
    flag: Flag,
    correct: boolean,
    displayWrongRegion: string
}

export interface Flag {
    id: number,
    svgLink: string,
    pngLink: string,
    description: string,
    width: number,
    height: number
}

export interface Language {
    code: string,
    language: string
}

export interface Currency {
    code: string,
    name: string,
    symbol?: string
}

export interface CountryWithFlag extends Country {
    flag: Flag
}

export interface CountryDetails extends CountryWithFlag {
    officialName: string,
    latitude: number,
    longitude: number,
    googleMap: string,
    landlocked: boolean, 
    unMember: boolean,
    capital: string,
    capital_tz: string,
    geography?: string,
    geography_note?: string,
    background?: string,
    comparative_area?: string,
    climate?: string,
    terrain?: string,
    natural_resources?: string,
    other_languages?: string,
    religions?: string,
    pop_distribution?: string,
    industries?: string,    
    borders: CountryWithFlag[],
    languages: Language[],
    currencies: Currency[]
}

export interface TourismInfo {
    countryCode: string,
    reasons: string[],
    warnings: string[],
    cuisine: string[],
    bestMonths: string,
    bestMonthsArray: string[],
    topThingsToDo: string[],
    googlePhotos?: string[],
    safety_rating: number
}

export const questionTypes = ['flag', 'capital', 'region'] as const;
export const validCurrencies = ['USD', 'JPY', 'BGN', 'CZK', 'DKK', 'EUR', 'GBP', 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'TRY', 'AUD', 'BRL', 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD', 'THB', 'ZAR'] as const;

export interface UserScores {
    question_type: typeof questionTypes[number]
    correct: number
    total: number
}

export interface FavouriteList {
    id: number
    name: string
    favourites: UserFavourite[]
}

export interface UserFavourite {
    id: number
    countryCode: string
    countryName: string
    countryFlag: string
}