const characterList = document.querySelector('.character-list')
const btnLeft = document.querySelector('.left-btn')
const btnRight = document.querySelector('.right-btn')
const currentPage = document.querySelector(".current-page")
const tabs = document.querySelectorAll('.tab')
const planetTab = document.querySelector('.planet-tab')
const speciesTab = document.querySelector('.species-tab')
const vehiclesTab = document.querySelector('.vehicles-tab')
const starshipsTab = document.querySelector('.starships-tab')
const planetsUL = document.querySelector(".planet-details__list")
const cache = {
  people: {},
  planets: {},
  species: {
    homeworlds: {}
  },
  vehicles: {},
  starships: {}
}

let index = 1;
currentPage.innerText = index;

async function getCharacters() {
  if (cache.people[index]) {
    return cache.people[index]
  }
  let data = await fetch('https://swapi.dev/api/people/?page=' + index)
  let characters = await data.json()
  cache.people[index] = characters
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

//Planets
async function renderPlanetDetails(char) {
  const charLoader = document.querySelector('.loader-white')
  charLoader.classList.add('loader-visible')

  let homeworldLink = char.homeworld.split(":").join("s:")
  let homeworldData
  if (cache.planets[homeworldLink]) {
    homeworldData = cache.planets[homeworldLink]
  } else {
    let homeworld = await fetch(homeworldLink)
    homeworldData = await homeworld.json()
  }

  cache.planets[homeworldData.url.split(":").join("s:")] = homeworldData

  planetsUL.innerHTML = ''

  const name = document.createElement("li");
  name.classList.add('details-name')
  name.innerHTML = homeworldData.name
  planetsUL.append(name);

  const rp = document.createElement("li");
  rp.innerHTML = `Rotation period: ${homeworldData.rotation_period}`
  planetsUL.append(rp);

  const orb = document.createElement("li");
  orb.innerHTML = `Orbital period: ${homeworldData.orbital_period}`
  planetsUL.append(orb);

  const diameter = document.createElement("li");
  diameter.innerHTML = `Diameter: ${homeworldData.diameter}`
  planetsUL.append(diameter);

  const climate = document.createElement("li");
  climate.innerHTML = `Climate: ${homeworldData.climate}`
  planetsUL.append(climate);

  const gravity = document.createElement("li");
  gravity.innerHTML = `Gravity: ${homeworldData.gravity}`
  planetsUL.append(gravity)

  const terrain = document.createElement("li");
  terrain.innerHTML = `Terrain: ${homeworldData.gravity}`
  planetsUL.append(terrain)

  charLoader.classList.remove('loader-visible')
}

async function renderSpeciesDetails(char) {
  const charLoader = document.querySelector('.loader-white')
  charLoader.classList.add('loader-visible')
  let speciesLink
  if (char.species.length == 0) {
    speciesLink = "https://swapi.dev/api/species/1/" // human!
  } else {
    speciesLink = char.species[0].split(':').join('s:')
  }

  let speciesData
  if (cache.species[speciesLink]) {
    speciesData = cache.species[speciesLink]
  } else {
    let species = await fetch(speciesLink)
    speciesData = await species.json()
  }

  cache.species[speciesData.url.split(':').join('s:')] = speciesData

  planetsUL.innerHTML = ''
  const name = document.createElement("li");
  name.classList.add('details-name')
  name.innerHTML = speciesData.name
  planetsUL.append(name);

  // classification
  const classification = document.createElement("li");
  classification.innerHTML = `Classification: ${speciesData.classification}`
  planetsUL.append(classification);

  // average_lifespan
  const lifespan = document.createElement("li");
  lifespan.innerHTML = `Average lifespan: ${speciesData.average_lifespan}`
  planetsUL.append(lifespan);

  // homeworld
  const homeworld = document.createElement("li");

  if (speciesData.homeworld) {
    let homeworldLink = speciesData.homeworld.split(':').join('s:')
    if (cache.species.homeworlds[homeworldLink]) {
      homeworld.innerHTML = `Homeworld: ${cache.species.homeworlds[homeworldLink]}`
    } else {
      let data = await fetch(homeworldLink)
      let homeworldData = await data.json()
      homeworld.innerHTML = `Homeworld: ${homeworldData.name}`
      cache.species.homeworlds[homeworldLink] = homeworldData.name
    }
  } else {
    homeworld.innerHTML = "Homeworld: unknown"
  }

  planetsUL.append(homeworld);

  // language
  const language = document.createElement("li");
  language.innerHTML = `Language: ${speciesData.language}`
  planetsUL.append(language);

  charLoader.classList.remove('loader-visible')
}

//Vehicles
async function renderVehicleDetails(char) {
  const charLoader = document.querySelector('.loader-white')
  charLoader.classList.add('loader-visible')
  if (char.vehicles.length === 0) {
    planetsUL.innerHTML = '<li class="details-name">No vehicle</li>'
  }
  if (char.vehicles.length > 0) {
    let vehiclesLink = char.vehicles[0].split(":").join("s:")
    let vehiclesData
    if (cache.vehicles[vehiclesLink]) {
      vehiclesData = cache.vehicles[vehiclesLink]
    } else {
      let vehicles = await fetch(vehiclesLink)
      vehiclesData = await vehicles.json()
    }

    cache.vehicles[vehiclesData.url.split(":").join("s:")] = vehiclesData

    planetsUL.innerHTML = ''
    const name = document.createElement("li");
    name.classList.add('details-name')
    name.innerHTML = vehiclesData.name
    planetsUL.append(name);

    const model = document.createElement("li");
    model.innerHTML = `Model: ${vehiclesData.model}`
    planetsUL.append(model);

    const crew = document.createElement("li");
    crew.innerHTML = `Crew: ${vehiclesData.crew}`
    planetsUL.append(crew);

    const passengers = document.createElement("li");
    passengers.innerHTML = `Passengers: ${vehiclesData.passengers}`
    planetsUL.append(passengers);

    const cargo = document.createElement("li");
    cargo.innerHTML = `Cargo: ${vehiclesData.cargo_capacity}`
    planetsUL.append(cargo);

  }


  charLoader.classList.remove('loader-visible')
}

async function renderStarshipDetails(char) {
  const charLoader = document.querySelector('.loader-white')
  charLoader.classList.add('loader-visible')

  if (char.starships.length === 0) {
    planetsUL.innerHTML = '<li class="details-name">No Ship</li>'
  }
  if (char.starships.length > 0) {
    let starshipsLink = char.starships[0].split(":").join("s:");
    let starshipsData
    if (cache.starships[starshipsLink]) {
      starshipsData = cache.starships[starshipsLink]
    } else {
      let starships = await fetch(starshipsLink)
      starshipsData = await starships.json()
    }

    cache.starships[starshipsData.url.split(":").join("s:")] = starshipsData

    planetsUL.innerHTML = ''
    const name = document.createElement("li");
    name.classList.add('details-name')
    name.innerHTML = starshipsData.name
    planetsUL.append(name);

    const model = document.createElement("li");
    model.innerHTML = `Model: ${starshipsData.model}`
    planetsUL.append(model);

    const cost = document.createElement("li");
    cost.innerHTML = `Cost: ${starshipsData.cost_in_credits}`
    planetsUL.append(cost);

    const length = document.createElement("li");
    length.innerHTML = `Length: ${starshipsData.length}`
    planetsUL.append(length);

    const crew = document.createElement("li");
    crew.innerHTML = `Crew: ${starshipsData.crew}`
    planetsUL.append(crew);

    const hyperdrive = document.createElement("li");
    hyperdrive.innerHTML = `Hyperdrive: ${starshipsData.hyperdrive_rating}`
    planetsUL.append(hyperdrive)

    const starshipClass = document.createElement("li");
    starshipClass.innerHTML = `Starship class: ${starshipsData.starship_class}`
    planetsUL.append(starshipClass)
  }

  charLoader.classList.remove('loader-visible')
}

function clearTabs() {
  tabs.forEach(tab => {
    tab.classList.remove('tab-active')
  })
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
      clearTabs()
      planetTab.classList.add("tab-active")
      renderPlanetDetails(char)
      renderTabs(char)
    })
    li.addEventListener("mouseover", () => {
      const focusArrow = li.querySelector(".focus-arrow")
      focusArrow.classList.add("visible")
    })
    li.addEventListener('click', () => {
      li.focus()
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

function renderTabs(char) {
  function planetTabListener() {
    clearTabs()
    planetTab.classList.add('tab-active')
    renderPlanetDetails(char)
  }

  planetTab.addEventListener('click', planetTabListener)

  function speciesTabListener() {
    clearTabs()
    speciesTab.classList.add('tab-active')
    renderSpeciesDetails(char)
  }

  speciesTab.addEventListener('click', speciesTabListener)

  function vehiclesTabListener() {
    clearTabs()
    vehiclesTab.classList.add('tab-active')
    renderVehicleDetails(char)
  }


  vehiclesTab.addEventListener('click', vehiclesTabListener)


  function starshipsTabListener() {
    clearTabs()
    starshipsTab.classList.add('tab-active')
    renderStarshipDetails(char)
  }
  starshipsTab.addEventListener('click', starshipsTabListener)

  characterList.addEventListener("mousedown", () => {
    planetTab.removeEventListener("click", planetTabListener)
    speciesTab.removeEventListener("click", speciesTabListener)
    vehiclesTab.removeEventListener("click", vehiclesTabListener)
    starshipsTab.removeEventListener("click", starshipsTabListener)
  })
}


