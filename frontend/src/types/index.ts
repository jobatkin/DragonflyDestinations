export interface Country {
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

export interface CountryWithFlag extends Country {
    flag: Flag
}