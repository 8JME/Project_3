// Google Maps

(g => {
  var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", 
      m = document, b = window; 
  b = b[c] || (b[c] = {}); 
  var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, 
      u = () => h || (h = new Promise(async (f, n) => { 
          await (a = m.createElement("script")); 
          e.set("libraries", [...r] + ""); 
          for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); 
          e.set("callback", c + ".maps." + q); 
          a.src = `https://maps.${c}apis.com/maps/api/js?` + e; 
          d[q] = f; 
          a.onerror = () => h = n(Error(p + " could not load.")); 
          a.nonce = m.querySelector("script[nonce]")?.nonce || ""; 
          m.head.append(a);
      })); 
  d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
})({
  key: "AIzaSyDEQcDy52PmSUHcOmmtZNuk1iGrOWfP4oo",
  v: "weekly",
});

import { MarkerClusterer } from "https://cdn.skypack.dev/@googlemaps/markerclusterer@2.3.1";

async function initMap() {
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

  const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 2,
      center: { lat: 37.7749, lng: -122.4194 },
      mapId: "DEMO_MAP_ID",
  });

  const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
  });

  const labels = [
      "Stanford AI Lab (SAIL)",
      "OpenAI",
      "Deepmind",
      "BAIR Lab",
      "Chinese Academy of Sciences",
      "Oxford ML Research",
      "Anthropic",
      "Deepseek"
  ];

  const locations = [
      { lat: 37.42783, lng: -122.16969 },
      { lat: 37.76236, lng: -122.41423 },
      { lat: 51.53328, lng: -0.12586 },
      { lat: 37.87946, lng: -122.24651 },
      { lat: 39.91079, lng: 116.33630 },
      { lat: 51.76025, lng: -1.25964 },
      { lat: 37.78996, lng: -122.40086 },
      { lat: 30.33634, lng: 120.08483 }
  ];

  const markers = locations.map((position, i) => {
      const label = labels[i % labels.length];
      const pinGlyph = new google.maps.marker.PinElement({
          glyph: label,
          glyphColor: "#f00",
          scale: 1.5,
          background: "#4EC2E5",
          borderColor: "#f00"
      });

      const marker = new google.maps.marker.AdvancedMarkerElement({
          position,
          content: pinGlyph.element,
      });

      marker.addListener("click", () => {
          infoWindow.setContent(label);
          infoWindow.open(map, marker);
      });

      return marker;
  });

  new MarkerClusterer({ markers, map });
}

initMap();