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

    const defaultProps = {
        center: {
          lat: 49.267535,
          lng: -123.128936
        },
        zoom: 13
      };

    const apiKey = import.meta.env.REACT_APP_API_KEY
    const onSelect = typeof props.onSelect === "function" ? props.onSelect : () => {};
    const selected = props.selected || null;

    
    return (
        <div className="mainContainer">

        <GoogleMapReact 
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
        {props.list.map((item) => (
            <ImageMarker lat={item.lat} lng={item.lng} img={item.img}
                onClick={() => props.onSelect(item)}
            />
        ))}

        {props.selected && <MiniDesc
            name={selected.name}
            description={selected.description}
            onClose={() => props.onSelect(null)}
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
