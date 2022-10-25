//location en consola para abrir datos
//pathname
//obetener contenedor
const detailContainer = document.getElementById("detailCard");

async function detailsId() {
  let idLocation = location.search.slice(4);
  try {
    var cardJson = await fetch("https://mh-amazing.herokuapp.com/amazing");
    cardJson = await cardJson.json();
  } catch (error) {
    console.log(error);
  }

  const totalEvents = cardJson.events;
  let idLocal = location.search.slice(4);
  let filteredEvent = totalEvents.find((event) => event.id == idLocation);

  cardDetail(filteredEvent);
}

detailsId();

function cardDetail(event) {
  let aOrS = [];
  if (event.assitance !== undefined) {
    aOrS = ["Assitance", event.assitance];
  } else {
    aOrS = ["Estimate", event.estimate];
  }
  date = new Date(event.date).toDateString();
  detailContainer.innerHTML = `
  <section id="cont-detail">
    <div>
      <img src="${event.image}" alt="cine" width="480" height="300" class="carta">
    </div>
    <div class="datosdetail">
    <article>
        <h2>${event.name}</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${event.description}</p>
        <p><strong>
Category:</strong> ${event.category}</p>
        <p><strong>Place:</strong> ${event.place}</p>
        <p><strong>Capacity:</strong> ${event.capacity}</p>
        <p><strong>${aOrS[0]}:</strong><strong> ${aOrS[1]}</strong></p>
        <p><strong>Price : </strong>$${event.price}</p> 
    </article>`;
}

//
// date = new Date(event.date).toDateString()

//<strong>Date:</strong> ${date}
