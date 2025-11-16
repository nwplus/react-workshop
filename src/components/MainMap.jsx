import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import './MainMap.css'
import MiniDesc from "./MiniDesc"

const ImageMarker = ({ img, onClick }) => (
    <div className="iconDiv" onClick={onClick}>
      <img 
        className="iconImage"
        src={img}
        alt="marker"
      />
    </div>
  );

function MainMap(props) {
    const [selected, setSelected] = useState(null)

    const defaultProps = {
        center: {
          lat: 49.267535,
          lng: -123.128936
        },
        zoom: 13
      };

    const apiKey = import.meta.env.REACT_APP_API_KEY
    
    return (
        <div className="mainContainer">

        <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCwYKd03IUKc1UwZBuyxDIOR8ldxjrPd9Y" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
        {props.list.map((item) => (
            <ImageMarker lat={item.lat} lng={item.lng} img={item.img}
                onClick={() => setSelected(item)}
            />
        ))}

        {selected && <MiniDesc
            name={selected.name}
            description={selected.description}
            onClose={() => setSelected(null)}
            lat={selected.lat}
            lng={selected.lng}
            img={selected.img}
            categories={selected.categories}
            needs={selected.needs}
            link={selected.link}
    
        />}

          </GoogleMapReact>
        </div>
      );
    }

export default MainMap