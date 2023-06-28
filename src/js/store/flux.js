const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            people: [],
            characters: [],
            planets: [],
            planetsProperties: [],
            starShips: [],
            starShipsProperties: [],
            favoriteCharacters: [],
            favoritePlanets: [],
            favoriteStarShips: [],
            favorites: ["No favorites, add one"],
        },
        actions: {
            getPeople: async () => {
                try {
                    const result = await fetch("https://www.swapi.tech/api/people")
                    if (!result.ok) {
                        throw new Error("Charging error")
                    }
                    const data = await result.json()
                    console.log("Cargamos primer lista:", data)
                    const store = getStore()
                    setStore({ ...store, people: data.results });
                    const { getLinksAndCharacters } = getActions()
                    await getLinksAndCharacters()
                } catch (error) {
                    console.log("Charging people error", error)
                }
            },

            getLinksAndCharacters: async () => {
                const store = getStore()
                const urlList = store.people.map(character => character.url)
                console.log(urlList)
                const { handlerGetCharactersProperties } = getActions()
                await handlerGetCharactersProperties(urlList)
            },

            handlerGetCharactersProperties: async (urlList) => {
                const { getCharactersProperties } = getActions()
                const pedidos = await urlList.map((url) => getCharactersProperties(url))
                await Promise.all(pedidos)
            },

            getCharactersProperties: async (url) => {
                try {
                    const result = await fetch(url)
                    if (!result.ok) {
                        throw new Error("Charging error")
                    }
                    const data = await result.json()
                    console.log(data)
                    const store = getStore()
                    setStore({ ...store, characters: [...store.characters, data] });
                    console.log("Los archivos son", store.characters)
                } catch (error) {
                    console.log("Charging characters error", error)
                }
            },

            getPlanets: async () => {
                try {
                    const result = await fetch("https://www.swapi.tech/api/planets")
                    if (!result.ok) {
                        throw new Error("Charging error")
                    }
                    const data = await result.json()
                    console.log("Cargamos primer lista:", data)
                    const store = getStore()
                    setStore({ ...store, planets: data.results });
                    const { getLinksAndPlanets } = getActions()
                    await getLinksAndPlanets()
                } catch (error) {
                    console.log("Charging planets error", error)
                }
            },

            getLinksAndPlanets: async () => {
                const store = getStore()
                const urlList = store.planets.map(planet => planet.url)
                console.log(urlList)
                const { handlerGetPlanetsProperties } = getActions()
                await handlerGetPlanetsProperties(urlList)
            },

            handlerGetPlanetsProperties: async (urlList) => {
                const { getPlanetsProperties } = getActions()
                const pedidos = await urlList.map((url) => getPlanetsProperties(url))
                await Promise.all(pedidos)
            },

            getPlanetsProperties: async (url) => {
                try {
                    const result = await fetch(url)
                    if (!result.ok) {
                        throw new Error("Charging error")
                    }
                    const data = await result.json()
                    console.log(data)
                    const store = getStore()
                    setStore({ ...store, planetsProperties: [...store.planetsProperties, data] });
                    console.log("Los archivos son", store.planets)
                } catch (error) {
                    console.log("Charging planets error", error)
                }
            },

            getStarShips: async () => {
                try {
                    const result = await fetch("https://www.swapi.tech/api/starships")
                    if (!result.ok) {
                        throw new Error("Charging error")
                    }
                    const data = await result.json()
                    console.log("Cargamos primer lista:", data)
                    const store = getStore()
                    setStore({ ...store, starShips: data.results });
                    const { getLinksAndStarShips } = getActions()
                    await getLinksAndStarShips()
                } catch (error) {
                    console.log("Charging starShips error", error)
                }
            },

            getLinksAndStarShips: async () => {
                const store = getStore()
                const urlList = store.starShips.map(character => character.url)
                console.log(urlList)
                const { handlerGetStarShipsProperties } = getActions()
                await handlerGetStarShipsProperties(urlList)
            },

            handlerGetStarShipsProperties: async (urlList) => {
                const { getStarShipsProperties } = getActions()
                const pedidos = await urlList.map((url) => getStarShipsProperties(url))
                await Promise.all(pedidos)
            },

            getStarShipsProperties: async (url) => {
                try {
                    const result = await fetch(url)
                    if (!result.ok) {
                        throw new Error("Charging error")
                    }
                    const data = await result.json()
                    console.log(data)
                    const store = getStore()
                    setStore({ ...store, starShipsProperties: [...store.starShipsProperties, data] });
                    console.log("Los archivos son", store.starShipsProperties)
                } catch (error) {
                    console.log("Charging starShipsProperties error", error)
                }
            },

            addFavorite: async (name) => {
                const store = getStore()
                if (store.favorites[0] == "No favorites, add one") {
                    await setStore({ ...store, favorites: [...store.favorites.shift()] });
                    await setStore({ ...store, favorites: [...store.favorites, name] });
                }else{
                    await setStore({ ...store, favorites: [...store.favorites, name] });
                }
            },

            deleteFavorite: async (index) => {
                const store = getStore()
                await setStore({ ...store, favorites: [store.favorites.filter((_, i) => i !== index)] })
                // if (store.favorites.length == 0) {
                //     await setStore({ ...store, favorites: ["No favorites, add one"] })
                //   }
            },
            setFavoriteArray: () => {
                const store = getStore()
                setStore({ ...store, favorites: ["No favorites, add one"] })
            }

        }
    };
};

export default getState;
