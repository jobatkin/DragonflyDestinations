const country = {
    code: 'ALB',
    iso_code: 'AL',
    name: 'Albania',
    officialName: 'Republic of Albania',            
    latitude: 41,
    longitude: 20,        
    googleMap: 'https://goo.gl/maps/BzN9cTuj68ZA8SyZ8',
    landlocked: false,
    population: 3107100,      
    unMember: true,
    capital: 'Tirana',  
    area: 28748, 
    region: 'Europe', 
    subregion: 'Southeast Europe',
    capital_tz: 'Europe/Tirane',
    geography: 'Southeastern Europe, bordering the Adriatic Sea and Ionian Sea, between Greece to the south and Montenegro and Kosovo to the north',
    geography_note: 'strategic location along Strait of Otranto (links Adriatic Sea to Ionian Sea and Mediterranean Sea)',
    background: 'After declaring independence from the Ottoman Empire in 1912, Albania experienced a period of political upheaval that led to a short-lived monarchy, which ended in 1939 when Italy conquered the country. Germany then occupied Albania in 1943, and communis...',
    comparative_area: 'slightly smaller than Maryland',
    climate: 'mild temperate; cool, cloudy, wet winters; hot, clear, dry summers; interior is cooler and wetter',
    terrain: 'mostly mountains and hills; small plains along coast',
    natural_resources: 'petroleum, natural gas, coal, bauxite, chromite, copper, iron ore, nickel, salt, timber, hydropower, arable land',
    other_languages: 'Albanian 98.8% (official - derived from Tosk dialect), Greek 0.5%, other 0.6% (including Macedonian, Romani, Vlach, Turkish, Italian, and Serbo-Croatian), unspecified 0.1% (2011 est.)',
    religions: 'Muslim 56.7%, Roman Catholic 10%, Orthodox 6.8%, atheist 2.5%, Bektashi (a Sufi order) 2.1%, other 5.7%, unspecified 16.2% (2011 est.)',
    pop_distribution: 'a fairly even distribution, with somewhat higher concentrations of people in the western and central parts of the country',
    industries: 'food; footwear, apparel and clothing; lumber, oil, cement, chemicals, mining, basic metals, hydropower'
}

const flag = {
    svgLink: 'https://flagcdn.com/al.svg',
    pngLink: 'https://flagcdn.com/w320/al.png',
    description: 'The flag of Albania features a silhouetted double-headed black eagle at the center of a red field.',
    width: 700,
    height: 500,
    countryCode: 'ALB'
}

const tourism = {
    reasons: ["Beautiful beaches and coastal landscapes", "Rich cultural heritage and history", "Affordable travel destination"],
    warnings: ["Limited infrastructure in remote areas", "Petty crime in urban areas", "Occasional political unrest"],
    cuisine: ["Albanian cuisine features meat, vegetables, and dairy products.", "Popular dishes include byrek and tavë kosi.", "Fresh and seasonal ingredients are commonly used."],
    bestMonths: 'May to September',
    bestMonthsArray: ["May", "June", "July", "August", "September"],
    topThingsToDo: ["Visit the ancient city of Butrint", "Explore the capital city of Tirana", "Relax on the beaches of the Albanian Riviera"],
    googlePhotos: ["https://lh3.googleusercontent.com/places/ANXAkqEqK-TTt4DP0WJLBBbnGcrUY-fLMeWpyiB8E-59_ZS2xJVsmlEFuxFDBKyhRQn-V4ix77ghbcjmPQNe4XosydtIv6_oR33Yyrk=s4800-w500"],
    countryCode: 'ALB'
}

const error = {
    type: 'object',
    code: '404',
    message: 'Request failed with status code 404'
}

module.exports = { country, flag, tourism, error }