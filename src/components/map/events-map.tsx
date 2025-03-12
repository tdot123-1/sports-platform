"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";

const mapStyle = {
  width: "100%",
  height: "100%",
};

const markerStyle = {
  background: "blue",
};

const center = {
  lat: 50.8477,
  lng: 4.3572,
};

const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

const EventsMap = ({ mapId }: { mapId: string }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  if (!API_KEY) {
    return (
      <div className="w-fit">
        <p>Missing API key!</p>
      </div>
    );
  }

  return (
    <>
      <APIProvider apiKey={API_KEY} onLoad={() => setMapLoaded(true)}>
        {mapLoaded ? (
          <Map
            mapId={mapId}
            defaultCenter={center}
            defaultZoom={6}
            style={mapStyle}
          >
            <AdvancedMarker
              style={markerStyle}
              title={`Some event`}
              position={center}
            />
          </Map>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4 py-28">
            <LoaderIcon
              className="animate-spin"
              color="hsl(var(--primary))"
              size={45}
            />
            <p className="font-mono text-lg">Loading map...</p>
          </div>
        )}
      </APIProvider>
    </>
  );
};

export default EventsMap;
