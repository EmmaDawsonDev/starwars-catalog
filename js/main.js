async function getCharacters() {
  let data = await fetch('https://swapi.dev/api/people/')
  let characters = await data.json()
  console.log(characters.results[0].homeworld)
}

getCharacters()
