const characterList = document.querySelector('.character-list')
const btnLeft = document.querySelector('.left-btn')
const btnRight = document.querySelector('.right-btn')
const currentPage = document.querySelector(".current-page")

let index = 1;
currentPage.innerText = index;

async function getCharacters() {
  let data = await fetch('https://swapi.dev/api/people/?page=' + index)
  let characters = await data.json()
  return characters
}

function renderCharDetails(char) {
  const charLoader = document.querySelector('.loader-grey')
  charLoader.classList.add('loader-visible')
  const name = document.querySelector(".character-name")
  name.innerText = char.name;
  const height = document.querySelector(".height")
  height.innerText = "Height: " + char.height;
  const eyes = document.querySelector(".eyes")
  eyes.innerText = "Eye color: " + char.eye_color;
  const mass = document.querySelector(".mass")
  mass.innerText = "Mass: " + char.mass;
  const hair = document.querySelector(".hair")
  hair.innerText = "Hair color: " + char.hair_color;
  const skin = document.querySelector(".skin")
  skin.innerText = "Skin color: " + char.skin_color;
  const birthYear = document.querySelector(".birth-year")
  birthYear.innerText = "Birth year: " + char.birth_year;  
  const gender = document.querySelector(".gender")
  gender.innerText = "Gender: " + char.gender;
  charLoader.classList.remove('loader-visible')
}

async function renderPlanetDetails(char) {
  const charLoader = document.querySelector('.loader-white')
  charLoader.classList.add('loader-visible')
  let homeworldLink = char.homeworld
  let homeworld = await fetch(homeworldLink)
  let homeworldData = await homeworld.json()
  
  const name = document.querySelector(".planet-name")
  name.innerText = homeworldData.name
  const rp = document.querySelector(".rp")
  rp.innerText = "Rotation period: " + homeworldData.rotation_period
  const orb = document.querySelector(".orb")
  orb.innerText = "Orbital period: " + homeworldData.orbital_period
  const diameter = document.querySelector(".diameter")
  diameter.innerText = "Diameter: " + homeworldData.diameter
  const climate = document.querySelector(".climate")
  climate.innerText = "Climate: " + homeworldData.climate
  const gravity = document.querySelector(".gravity")
  gravity.innerText = "Gravity: " + homeworldData.gravity
  const terrain = document.querySelector(".terrain")
  terrain.innerText = "Terrain: " + homeworldData.gravity
  charLoader.classList.remove('loader-visible')
}

async function renderCharList() {
  const charLoader = document.querySelector('.loader-grey-characters')
  charLoader.classList.add('loader-visible')
  characterList.innerHTML = "";
  let data = await getCharacters()
  let characters = data.results
  
  for (let char of characters) {
    let li = document.createElement('li')
    li.innerHTML = `${char.name} <span class="focus-arrow">&#9656</span>`
    characterList.appendChild(li)
    li.addEventListener("click", () => {
      renderCharDetails(char)
      renderPlanetDetails(char)
    })
    li.addEventListener("mouseover", () => {
      const focusArrow = li.querySelector(".focus-arrow")
      focusArrow.classList.add("visible")
      })
      li.addEventListener("mouseout", () => {
        const focusArrow = li.querySelector(".focus-arrow")
        focusArrow.classList.remove("visible")
        })
  }
  charLoader.classList.remove('loader-visible')
 }

renderCharList()

btnRight.addEventListener('click', () => {
  if (index === 9) {
    index = 1;
  } else {
    index++;
  }
  currentPage.innerText = index;

  renderCharList()
})

btnLeft.addEventListener('click', () => {
  if (index === 1) {
    index = 9;
  } else {
    index--;
  }
  currentPage.innerText = index;
  renderCharList()
})


// OLD CODE
// const characterList = document.querySelector('.character-list')
// const btnLeft = document.querySelector('.left-btn')
// const btnRight = document.querySelector('.right-btn')

// async function getCharacters() {
//   let data = await fetch('https://swapi.dev/api/people/')
//   let characters = await data.json()
//   console.log(characters)
//   return characters
// }

// async function renderCharList() {
//   let data = await getCharacters()
//   let characters = data.results

//   for (let char of characters) {
//     let li = document.createElement('li')
//     li.innerHTML = `${char.name} <span class="focus-arrow">&#9656</span>`
//     characterList.appendChild(li)
    // li.addEventListener("mouseover", () => {
    // const focusArrow = li.querySelector(".focus-arrow")
    // focusArrow.classList.add("visible")
    // })
    // li.addEventListener("mouseout", () => {
    //   const focusArrow = li.querySelector(".focus-arrow")
    //   focusArrow.classList.remove("visible")
    //   })
//   }
// }

// renderCharList()

// btnRight.addEventListener('click', async () => {
//   let characters = await getCharacters()
//   let next10 = characters.next
//   console.log(next10)
// })