import { Faker, en } from "@faker-js/faker";

export const getSongs = async function(req, res) {
    const {seed, likes, lang, page} = req.body;

    async function createFaker(lang) {
        const module = await import(`./locales/${lang}music.js`)
        const localeData = module[`${lang}music`]  
        
        return new Faker({
            locale: [{ music: localeData }, en]
        })
    }

    const faker = await createFaker(lang)

    let result = [];

    for (let i = 0; i < 20; i++) {
        faker.seed([...seed, page, i])
        result.push({
            "id": (page - 1) * 20 + i + 1,
            "artist": faker.music.artist(),
            "album": faker.music.album(),
            "genre": faker.music.genre(),
            "songName": faker.music.songName(),
            "likes": weightedInt(likes),
        })
    }

    res.send(result)

    function weightedInt(value) {
        const floor = Math.floor(value)
        const ceil = Math.ceil(value)
        const chanceOfCeil = value - floor

        if (chanceOfCeil === 0) return floor

        return faker.helpers.weightedArrayElement([
            { weight: 1 - chanceOfCeil, value: floor },
            { weight: chanceOfCeil, value: ceil },
        ])
    }
}

