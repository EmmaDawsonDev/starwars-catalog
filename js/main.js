const characterList = document.querySelector('.character-list')
const btnLeft = document.querySelector('.left-btn')
const btnRight = document.querySelector('.right-btn')

async function getCharacters() {
  let data = await fetch('https://swapi.dev/api/people/')
  let characters = await data.json()
  console.log(characters)
  return characters
}

async function renderCharList() {
  let data = await getCharacters()
  let characters = data.results

  for (let char of characters) {
    let li = document.createElement('li')
    li.innerText = char.name
    characterList.appendChild(li)
  }
}

renderCharList()

btnRight.addEventListener('click', async () => {
  let characters = await getCharacters()
  let next10 = characters.next
  console.log(next10)
})
