export class MapApi {
  DEFAULT_TILE =
    "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=qY1R9dfdU2mFpeaQbx1q";
  DEFAULT_ATTR =
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

  constructor(mapEl, mapDivId) {
    this.mapEl = mapEl;
    this.myMap = L.map(mapDivId);
  }

  addTileLayerToMap(tile = null, attribution = null) {
    if (tile == null && attribution == null) {
      L.tileLayer(this.DEFAULT_TILE, {
        attribution: this.DEFAULT_ATTR,
      }).addTo(this.myMap);
    } else {
      L.tileLayer(tile, {
        attribution: attribution,
      }).addTo(this.myMap);
    }
  }

  addMarkerToMap(location) {
    L.marker([location.lat, location.lng]).addTo(this.myMap);
  }

  setView(
    location = {
      lat: 51.505,
      lng: -0.09,
    }
  ) {
    this.myMap.setView([location.lat, location.lng], 15);
  }
}
