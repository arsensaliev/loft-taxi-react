import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { mapboxToken as token } from "../../constants/Tokens";
import Header from "../Shared/Header/Header";
import { OrderPanel } from "./OrderPanel";
import { drawRoute } from "./DrawRoute";
import { useSelector } from "react-redux";

const Map = () => {
    let mapContainer;
    const route = useSelector(state => state.route);
    useEffect(() => {
        mapboxgl.accessToken = token;
        const map = new mapboxgl.Map({
            container: mapContainer,
            style: "mapbox://styles/mapbox/light-v10",
            center: [30.2656504, 59.8029126],
            zoom: 15
        });

        setTimeout(() => {
            if (route.status) drawRoute(map, route.coordinates);
        }, 500);

        return () => {
            map.remove();
        };
    }, [mapContainer, route]);

    return (
        <>
            <Header />
            <OrderPanel />
            <div className="map" ref={el => (mapContainer = el)} />
        </>
    );
};

export default Map;
