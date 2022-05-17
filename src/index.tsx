import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';
import './styles.css'
import mapboxgl from 'mapbox-gl';


// mapboxgl.accessToken = 'pk.eyJ1IjoiZmVyZGVvbGF6YWJhbCIsImEiOiJja3o5Y2toZXYwaXcwMzBwNHczcGh4Yzd5In0.2pZRAM8hi5BQ6tjx5keY_w';
const token = process.env.REACT_APP_MAPBOX_TOKEN || '';
mapboxgl.accessToken = token;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);