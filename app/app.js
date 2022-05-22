import { IpApi } from "./IpApi.js";
import { MapApi } from "./MapApi.js";

class App {
  constructor(formEl, mapEl, ipInfoEl) {
    this.formEl = formEl;
    this.mapEl = mapEl;
    this.ipInfoEl = ipInfoEl;
    this.map = new MapApi(mapEl, "map__element");
    this.map.setView();
    this.map.addTileLayerToMap();

    this.formSubmitHandler();
    this.getIpInfoAndPlotOnMap();
  }

  formSubmitHandler() {
    const textInput = this.formEl.querySelector(".ip__input-text");
    const submitButton = this.formEl.querySelector(".ip__input-btn");

    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      this.getIpInfoAndPlotOnMap(textInput.value);
    });
  }

  getIpInfoAndPlotOnMap(ipAddress = null) {
    IpApi.getLocationFromIpAddress(ipAddress)
      .then((response) => {
        this.markIpLocationOnMap(response.data);
        this.setIpInfoData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  markIpLocationOnMap(data) {
    this.map.setView(data.location);
    this.map.addMarkerToMap(data.location);
  }

  setIpInfoData(data) {
    const ipAddressEl = this.ipInfoEl.querySelector(
      ".ip__info-address .ip__info-data"
    );
    const ipLocationEl = this.ipInfoEl.querySelector(
      ".ip__info-location .ip__info-data"
    );
    const ipTimeZoneEl = this.ipInfoEl.querySelector(
      ".ip__info-timezone .ip__info-data"
    );
    const ipIspEl = this.ipInfoEl.querySelector(".ip__info-isp .ip__info-data");

    ipAddressEl.textContent = data.ip;
    ipLocationEl.textContent = data.location.region;
    ipTimeZoneEl.textContent = data.location.timezone;
    ipIspEl.textContent = data.isp;
  }
}

const app = new App(
  document.querySelector("form"),
  document.querySelector(".map"),
  document.querySelector(".ip__info")
);
