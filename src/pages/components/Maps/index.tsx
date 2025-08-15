import React from "react";
import "./style.scss";

const GOOGLE_MAMPS_API_KEY = process.env.GOOGLE_MAMPS_API_KEY || "";
const url = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAMPS_API_KEY}&libraries=places&callback=initMap`;
export function GoogleMapsFC(): React.JSX.Element {
    // let map: google.maps.Map | null = null;
    // async function initMap(): Promise<void> {
    //     const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    //     map = new Map(document.getElementById("map") as HTMLElement, {
    //         center: { lat: -34.397, lng: 150.644 },
    //         zoom: 8,
    //     });
    //     }
    return (<>
    <div id="map">
        <div id="infowindow-content">
            
        </div>
    </div>
       
    <script src={url}></script>
    </>);
}
