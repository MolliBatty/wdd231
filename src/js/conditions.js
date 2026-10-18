import { getParkData, getAlertData, getVisitorCenterData} from "./parkService.mjs";
import { alertTemplate, vcTemplate, activityTemplate } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import "../css/style.css";
import "../css/conditions.css";

async function main(){
  const parkData = await getParkData();
  setHeaderFooter(parkData);

  const alerts = await getAlertData(parkData.parkCode);
  setAlerts(alerts);

  const visitorcenter = await getVisitorCenterData(parkData.parkCode);
  setVisitorCenters(visitorcenter);

  setActivities(parkData.activities);
}

function setAlerts(alerts){
    const alertsSection = document.querySelector("#alerts");
    alertsSection.insertAdjacentHTML("beforeend", `<ul>${alerts.map(alertTemplate).join("")}</ul>`)
}

function setVisitorCenters(centers){
  const centersSection = document.querySelector(".vs-list");
  centersSection.insertAdjacentHTML("beforeend", centers.map(vcTemplate).join(""));
}

function setActivities(activities){
  const activitiesSection = document.querySelector(".activities-list");
  activitiesSection.insertAdjacentHTML("beforeend", activities.map(activityTemplate).join(""))
}

main();