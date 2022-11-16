import logo from './logo.svg';
import './App.css';
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9objM3OSIsImEiOiJjbGFnbGRlZ2owMThjM3FtcHl1cW83NHU5In0.ftXft95B3h_Dq4UcLa20Vw';

const App = () => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-104.9876, 39.7405],
      zoom: 9.5
    });

    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.on('load', () => {
      map.addSource('national-park', {
        'type': 'geojson',
        'data': "https://python-allpings.herokuapp.com/companies"
      });

      map.addLayer({
        'id': 'park-boundary',
        'type': 'fill',
        'source': 'national-park',
        'paint': {
          'fill-color': '#888888',
          'fill-opacity': 0.4
        },
        'filter': ['==', '$type', 'Polygon']
      });

      map.addLayer({
        'id': 'park-volcanoes',
        'type': 'circle',
        'source': 'national-park',
        'paint': {
          'circle-radius': 6,
          'circle-color': '#B42222'
        },
        'filter': ['==', '$type', 'Point']
      });
    });

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
};

export default App;
