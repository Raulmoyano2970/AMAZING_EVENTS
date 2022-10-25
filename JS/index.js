const container = document.getElementById("main-content");

const containerCheckbox = document.getElementById("containerCheck");

const title = document.getElementById("title");

const searchId = document.getElementById("searchId");

async function getEventsJson() {
  try {
    var eventsJson = await fetch("https://mh-amazing.herokuapp.com/amazing");
    eventsJson = await eventsJson.json();
  } catch (error) {
    console.log(error);
  }
  const date = eventsJson.date;

  const card = eventsJson.events;

  const homeCards = card.filter(() => title.text.includes("Home"));
  const upcomingCards = card
    .filter(() => title.text.includes("Upcoming"))
    .filter((card) => card.date > date);

  const pastEventCards = card
    .filter(() => title.text.includes("Past"))
    .filter((card) => card.date < date);

  let fullEvents = [...homeCards, ...upcomingCards, ...pastEventCards];
  fullEvents.forEach(createCard);

  const categorys = card.reduce(
    (allCategory, event) =>
      Array.from(new Set([...allCategory, event.category])),
    []
  );

  categorys.forEach(createCheckbox);

  let checkId = document.querySelectorAll(".checkId");

  checkId = Array.from(checkId);
  checkId.forEach((checkbox) => checkbox.addEventListener("click", Checks));

  searchId.addEventListener("input", Checks);

  function Checks() {
    let filteredCheck = checkEvents(fullEvents);
    let filteredSearch = filterCardsBySearch(filteredCheck, searchId.value);
    if (filteredSearch.length !== 0) {
      container.innerHTML = ``;
    }
    filteredSearch.forEach(createCard);
  }
  function checkEvents(array) {
    let checkboxChecked = checkId
      .filter((check) => check.checked)
      .map((checkCategory) => checkCategory.value);
    if (checkboxChecked.length > 0) {
      let filteredCheckbox = array.filter((events) =>
        checkboxChecked.includes(events.category)
      );
      return filteredCheckbox;
    }
    return array;
  }

  function filterCardsBySearch(array, texto) {
    let cardFilterForSearch = array.filter((events) =>
      events.name.toLowerCase().includes(texto.toLowerCase())
    );
    if (cardFilterForSearch.length === 0) {
      searchEmpy();
      return [];
    }
    return cardFilterForSearch;
  }
}
getEventsJson();

//filtrar categoria y mapear los checkboks

function createCheckbox(category) {
  containerCheckbox.innerHTML += `
<div class="form-check form-check-inline m-3 id="cajitas">
    <input
     class="form-check-input checkId"
     type="checkbox"
     id="${category}"
     value="${category}"
    />
    <label
      class="form-check-label texto_check fw-semibold"
      for="inlineCheckbox1"
    >${category}</label
    >
 </div>

`;
}

function searchEmpy() {
  container.innerHTML = `
  <div d-flex align-items-center>
<h3 style="
    text-align: center">Result not found</h3>
<img src="https://media.giphy.com/media/9J7tdYltWyXIY/giphy.gif" alt="gifftravolta" class="gif">
</div>
  `;
}

function createCard(arrays) {
  container.innerHTML += `
    <div class="card" id="card"style="margin: 3rem;" >
    <img src="${arrays.image}" class="card-img-top" alt="${arrays.name}">
    <div class="card-body">
      <h4 class="card-title">${arrays.name}</h4>
      <p class="card-text">${arrays.description}
      </p>
      <div class="botonsecu d-flex justify-content-around ">
        <h5>$${arrays.price}</h5>
        <a href="./details.html?id=${arrays.id}" class="btn btn-primary" id="visit">Read More</a>
      </div>
    </div>
  </div>
  
  `;
}

/*

const datos = document.querySelector('.container')

const url = 'https://mind-hub.up.railway.app/amazing'

fetch(url) // nos permite trabajar con la base de datos
.then(rest => rest.json()) // then = nos va a devolver una promesa, con la cual vamos a poder encadenar metodos
.then(data => {
    console.log(data)})
.catch(err => console.log(err)) // una instruccion de respuesta, en caso de una exceepcion (que la base de datos no responda, o se haya caido)

*/
