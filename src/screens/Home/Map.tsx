import React, { useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps"
import { scaleLinear } from "d3-scale";
import { inject } from "mobx-react";
import { mapZoomable, continentsData, geographiesMap } from "../../interfaces/index";
import "./Map.css"

const colorScale = scaleLinear<string, string>()
  .domain([0, 176])
  .range(["#ffedea", "#ff5233"]);

const Map = ({
  mapSelected,
  continent
} : {
  mapSelected: (countryName: string) => void;
  continent: continentsData
}) => {
  const [position, setPosition] = useState<mapZoomable>({ coordinates: [0, 0], zoom: 1 });
  const [geometry] = useState<string>("https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json")

  function handleMoveEnd(position: mapZoomable) {
    setPosition(position);
  }

  const tellClick = (evt: geographiesMap) => {
    mapSelected(evt.properties.ISO_A2)
  }

  return (
    <div className="background">
      <ComposableMap  
        width={2500}
        height={1510}
        projectionConfig={{
          rotate: [0, 0, 0],
          scale: 500
        }}>
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geometry}>
            {({geographies}) => 
            geographies.filter((d: geographiesMap) => continent.value !== "" ? d.properties.REGION_UN === continent.mapName : d.properties.REGION_UN ).map((geo: geographiesMap) => 
              {
                return(
                  <Geography 
                    key={geo.rsmKey} 
                    geography={geo} 
                    fill={
                      colorScale(parseInt(geo.rsmKey.split("geo-")[1]))
                    }
                    onClick={() => tellClick(geo)}
                  />
                )
              }
            )}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

export default inject("CovidResultsStore")(Map);