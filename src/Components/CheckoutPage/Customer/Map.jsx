import React, { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import styled from "styled-components";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

const Loc = styled.img`
  height: 20px;
  width: 20px;
`;

const MAPBOX_TOKEN = `${process.env.REACT_APP_MAPBOX_KEY}`;

const Map = () => {
  const [customerCoords, setCustomerCoords] = useState({});
  const [placeName, setPlaceName] = useState("");
  const data = JSON.parse(localStorage.getItem("Coordinates")); // Area Search Coordinates

  const [viewPort, setViewPort] = useState({
    width: "inherit",
    height: "inherit",
    latitude: data.lat, // 18.634363666666665  initially showing  Area Search Coordinates
    longitude: data.long, // 73.78761533333333
    zoom: 10,
  });

  const geolocateStyle = {
    position: "absolute",
    right: -3,
    bottom: 30,
    margin: 10,
  };

  const navStyle = {
    position: "absolute",
    right: 25,
    bottom: 170,
    margin: 10,
  };
  // console.log(customerCoords);

  useEffect(() => {
    Geolocation(customerCoords);
  }, [customerCoords]);

  const Geolocation = (data) => {
    var config = {
      method: "get",
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.long},${data.lat}.json?country=IN&access_token=${MAPBOX_TOKEN}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log("Geolocation", response.data);
        getLocation(response.data.features);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getLocation = (data) => {
    data.map((item, i) => {
      if (i === 0) {
        var long = item.center[0];
        var lat = item.center[1];
        var place_name = item.place_name;
        setPlaceName(place_name);

        const Coordinates = {
          lat,
          long,
          place_name,
        };
        console.log("getLocation", Coordinates);
        localStorage.setItem("CustomerCurrentLoc", JSON.stringify(Coordinates));
      }
    });
  };

  return (
    <>
      <ReactMapGL
        {...viewPort}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewPort(viewport);
        }}
        mapStyle="mapbox://styles/mapbox/light-v10"
      >
        <Marker
          key={data.lat}
          latitude={data.lat}
          longitude={data.long}
        ></Marker>
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserLocation={true}
          onGeolocate={(e) => {
            console.log("onGeolocate", e);
            setCustomerCoords({
              lat: data.lat,
              long: data.long,
            });
          }}
          auto={true}
        />

        <div style={navStyle}>
          <NavigationControl />
        </div>
      </ReactMapGL>
      <div
        className="col mb-5"
        style={{
          padding: "0px",
        }}
      >
        <TextField
          label="Address"
          placeholder=""
          fullWidth
          variant="outlined"
          style={{
            marginLeft: "0px",
            marginTop: "5px",
            borderRadius: "0px",
          }}
          value={placeName}
        />
      </div>
    </>
  );
};

export default Map;
