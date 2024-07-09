//* HTML Elements
const row = document.querySelector(".my-row");
const mmorpg = document.querySelector(".mmorpg");
const shooter = document.querySelector(".shooter");
const sailing = document.querySelector(".sailing");
const permadeath = document.querySelector(".permadeath");
const superhero = document.querySelector(".superhero");
const pixel = document.querySelector(".pixel");
var myModal = document.querySelector(".my-modal");
var loading = document.querySelector(".loading");
var navbarBrand = document.querySelector(".navbar-brand");

//* App variable
let allData;
let gameDetails;
//* Functions

async function getGames(category) {
  loading.classList.remove("d-none");
  if (typeof category === "undefined") {
    let response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "e49c4851cdmsh694b6b0895167cep160e7djsn8430a4d6d9d5",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    let data = await response.json();

    allData = data;

    console.log(data);
  } else {
    let response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "e49c4851cdmsh694b6b0895167cep160e7djsn8430a4d6d9d5",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      }
    );
    let data = await response.json();

    allData = data;

    console.log(data);
  }
}
async function disblayGames(x) {
  row.innerHTML = "";
  await getGames(x);
  loading.classList.add("d-none");
  for (let i = 0; i < allData.length; i++) {
    let gameCard = `
    <div class="col-sm-6 col-md-4 col-lg-4 col-xl-3" id="test">
  <div class="inner h-100">
    <div
    class="card text-center content h-100"
    onclick="getGameDetails(${allData[i].id})"
  >
    
      <img
        src="${allData[i].thumbnail}"
        class="card-img-top w-100 mx-auto"
        alt="..."
      />
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <span class="card-title test-center">${allData[i].title}</span>
          <span class="btn btn-primary">free</span>
        </div>

        <p class="text-center lead mt-2">${allData[i].short_description}</p>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-between">
          <span class="bg-secondary-subtle badge text-black"
            >${allData[i].genre}</span
          >
          <span class="bg-secondary-subtle badge text-black"
            >${allData[i].platform}</span
          >
        </div>
      </div>
    
  </div>
    </div>

</div>`;

    row.innerHTML += gameCard;
  }
}
async function getGameDetails(id) {
  let response = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "e49c4851cdmsh694b6b0895167cep160e7djsn8430a4d6d9d5",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    }
  );

  let data = await response.json();

  gameDetails = data;

  console.log(gameDetails);
  displayModal();
}
function hideModal() {
  myModal.classList.add("d-none");
  row.classList.remove("d-none");
}

function displayModal() {
  myModal.classList.remove("d-none");
  row.classList.add("d-none");
  myModal.innerHTML = `<div class="container">
        <header class="d-flex justify-content-between align-items-center">
          <h1 class="text-center h3 py-4">Details Game</h1>
          <button class="btn border-0" id="closeBtn" onclick="hideModal()">
            <i class="fa-solid fa-xmark fs-3 text-white"></i>
          </button>
        </header>
        <div class="row g-4">
          <div class="col-md-4">
            <img
              src="${gameDetails.thumbnail}"
              class="w-100"
              alt="image details"
            />
          </div>
          <div class="col-md-8">
            <h3>Title: ${gameDetails.title}</h3>
            <p>Category: <span class="badge text-bg-info"> ${gameDetails.genre}</span></p>
            <p>Platform: <span class="badge text-bg-info"> ${gameDetails.platform}</span></p>
            <p>Status: <span class="badge text-bg-info"> ${gameDetails.status}</span></p>
            <p class="small">
              ${gameDetails.description}
            </p>
            <a
              class="btn btn-outline-warning"
              target="_blank"
              href="${gameDetails.game_url}"
              >Show Game</a
            >
          </div>
        </div>
      </div>`;
}
disblayGames();
//* Events
mmorpg.addEventListener("click", function () {
  disblayGames("mmorpg");
});
shooter.addEventListener("click", function () {
  disblayGames("shooter");
});
sailing.addEventListener("click", function () {
  disblayGames("sailing");
});
permadeath.addEventListener("click", function () {
  disblayGames("permadeath");
});
superhero.addEventListener("click", function () {
  disblayGames("superhero");
});
pixel.addEventListener("click", function () {
  disblayGames("pixel");
});
navbarBrand.addEventListener("click", function () {
  disblayGames();
});
document.addEventListener("keydown", function (e) {
  if (e.code == "Escape") {
    hideModal();
  }
});
window.addEventListener("load", function () {
  loading.classList.remove("d-none");
});
