export type ExplorePlantData = {
    id: number,
    common_name: string,
    slug: string,
    scientific_name: string,
    year: 1753,
    bibliography: string,
    author: string,
    status: string,
    rank: string,
    family_common_name: string,
    genus_id: number,
    image_url: string,
    synonyms: [],
    genus: string,
    family: string,
    links: {}
}

export type ExplorePlant = {
    data: [
        ExplorePlantData
    ],
    links: {
        self: string,
        first: string,
        last: string
    },
    meta: {
        total: number
    }
}