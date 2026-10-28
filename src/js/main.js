import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";
import "../css/style.css";

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${data.fullName}</h1>
  <p>${data.description}</p>`;
}

function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  const html = data.map(mediaCardTemplate);
  infoEl.insertAdjacentHTML("afterbegin", html.join(""));
}

async function main(){
  const parkData = await getParkData();
  setHeaderFooter(parkData);
  setParkIntro(parkData);

  const infoLinks = getInfoLinks(parkData.images);
  setParkInfoLinks(infoLinks);

}

// event listener
function enableNavigation(){
  const menuButton = document.querySelector("#global-nav-toggle");

  menuButton.addEventListener("click", (ev) => {
    let target = ev.target;

    document.querySelector(".global-nav").classList.toggle("show");

    if (target.tagName != "BUTTON"){
      target = target.closest("button");
    }
    if(document.querySelector(".global-nav").classList.contains("show")){
      target.setAttribute("aria-expanded", true);
    }else {
      target.setAttribute("aria-expanded", false);
    }

    console.log("toggle");
    
  });
}

main();
enableNavigation();

