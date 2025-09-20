/**
 * src\pages\components\Maps\index.tsx
 */
import React, { Suspense, useEffect, useRef } from 'react';
import './style.scss';
import { NavbarFC } from 'src/components/Navbar';
import { FooterFC } from 'src/components/Footer';
import { OutsideFC } from 'src/components/Outside';
import { TruckStatus } from '@interfeces';
import { RaportFC } from 'src/components/Raport';

const GOOGLE_MAMPS_API_KEY = process.env.GOOGLE_MAMPS_API_KEY || '';
const url = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAMPS_API_KEY}&libraries=places&callback=initMap`;

const truckStatus = {
    truckStatus: [
        TruckStatus.CURRENT,
        TruckStatus.PICKUP,
        TruckStatus.DROPOFF,
        TruckStatus.OffDUTY,
        TruckStatus.SLEEPER_BERTHER,
        TruckStatus.DRIWING,
        TruckStatus.OnDUTY,
    ],
};

declare global {
    interface Window {
        google: typeof google;
        initMap: () => Promise<void>;
    }
}
/***
 * DOTO: My billing profile don't pay, from google Maps. This led to the pop-up of Google Maps API warn's message. Need make first pay.
 * First pay: for authetification the billing profile in Google Maps API!
 * Maps list:
 *  -   Leaflet + OpenStreetMap
 *  -   Google Maps JavaScript API
 *  -   Yandex.Maps (JavaScript API)
 *  -   Mapbox
 */
const GoogleMapsComponent: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<google.maps.Map | null>(null);

    const initMap = async () => {
        if (!mapRef.current) return;

        try {
            // Check if google is available
            if (!window.google) {
                throw new Error('Google Maps API not loaded');
            }

            // Load the maps library with type assertion
            const { Map } = (await window.google.maps.importLibrary('maps')) as google.maps.MapsLibrary;

            mapInstance.current = new Map(mapRef.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
        } catch (error) {
            console.error('Error initializing Google Maps:', error);
        }
    };

    useEffect(() => {
        // Load the Google Maps API script if not already loaded
        if (!window.google) {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.defer = true;
            script.onerror = () => console.error('Google Maps script failed to load');
            document.head.appendChild(script);

            // Assign the init function to window
            window.initMap = initMap;
        } else {
            // If already loaded, initialize directly
            initMap();
        }

        return () => {
            // CleanUp
            if (mapInstance.current) {
                google.maps.event.clearInstanceListeners(mapInstance.current);
            }
        };
    }, []);

    return (
        <section>
            <Suspense
                fallback={
                    <p>
                        Load...<span className="loading loading-spinner text-success"></span>
                    </p>
                }
            >
                <NavbarFC />
                <div className="main">
                    {/* RAPORP BY LOCATION AND DATA & TIME */}
                    <OutsideFC Component={RaportFC} props={truckStatus} />
                    {/* MAP */}
                    <div ref={mapRef} style={{ width: '100%', marginRight: '10px' }}></div>
                </div>
                <FooterFC />
            </Suspense>
        </section>
    );
};

export default GoogleMapsComponent;
