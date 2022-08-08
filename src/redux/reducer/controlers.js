export function mapingChars (data) {
    const dataMaped = data.map((char) => {
        let newChar = {
            id: char.id,
            name: char.name,
            image: char.image,
            location: char.location.name,
        }
        return newChar
    })
    return dataMaped
};

export function searchData (data, search) {
    console.log("esto es search desde controlers", search)
    if(search === "" || search === null || search === undefined || search === " ") {
        return data
    }
    const newSearch = data.filter((char) => {
        return char.name.toLowerCase().includes(search.toLowerCase());
      })
      return newSearch
}