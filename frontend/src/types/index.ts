export interface Country {
    code: string,
    name: string,
    capital: string,
    region: string,
    subregion: string,
    population: number,
    area: number, 
}

export interface Flag {
    id: number,
    svgLink: string,
    pngLink: string,
    description: string
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
    languages: Language[],
    currencies: Currency[]
}