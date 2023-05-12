import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw';
import './App.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import * as turf from '@turf/turf';
import { useEffect, useState , useRef } from 'react';
import { fetchTiles } from './api/karnataka';
const App = () => {
  const [drawnPolygons ,setDrawnPolygons] = useState([]) ;
  const [intersectingTiles, setIntersectingTiles] = useState([]);
  const karnatakaTiles = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      const karnatakaTile = await fetchTiles();
      karnatakaTiles.current = {
        type: 'FeatureCollection',
        features: karnatakaTile[0].features,
      };
    };
    fetch();
  }, []);
  
  useEffect(() => {
    drawnPolygons.forEach((polygon) => {
      const intersectingFeatures = karnatakaTiles.current?.features.filter((feature) => {
        return turf.intersect(polygon, feature);
      });
      // console.log(intersectingFeatures);
      setIntersectingTiles([...intersectingTiles,{
        type: 'FeatureCollection',
        features: intersectingFeatures,
      }]);
    });
  }, [drawnPolygons]);

  const _onEdited = (e) => {
    let intersectingFeatures = [];
    let layers = e.layers;
    // console.log(layers);  
    layers.eachLayer((layer) => {
      let layerGeoJSON = layer.toGeoJSON();
      // console.log(layerGeoJSON);
      karnatakaTiles.current?.features.forEach((feature) => {
        const intersection = turf.intersect(layerGeoJSON, feature);
        if (intersection) {
          intersectingFeatures.push(feature);
        }
    });
});
    // console.log(intersectingFeatures);
    setIntersectingTiles([...intersectingTiles,{
      type: 'FeatureCollection',
      features: intersectingFeatures,
    }]);
  };


  const onDrawCreated = (e) => {
    const drawnAOI = e.layer.toGeoJSON();
    setDrawnPolygons([...drawnPolygons, drawnAOI]);
  };
  return (
    <div className="App">
            <MapContainer center={[15.317277,75.713890]} zoom={8} scrollWheelZoom={true} >
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <FeatureGroup>
    <EditControl position='topright' onCreated={onDrawCreated} onEdited={_onEdited} onEditStart={() => setIntersectingTiles([])} onDeleted={() => setIntersectingTiles([])} draw= {{rectangle: false , circle: false, circlemarker:false, marker:false, polyline:false}}/>
  </FeatureGroup>
    {intersectingTiles && intersectingTiles.map((intersectingTile, index) => (
          <GeoJSON key={index} data={intersectingTile} style={{color:'red'}}/>
        ))}
</MapContainer>
    </div>
  );
}

export default App;
