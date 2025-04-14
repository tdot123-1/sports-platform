"use client";

import { mapStartCoords } from "@/lib/constants";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const EventsMap = ({ mapId, apiKey }: { mapId: string; apiKey: string }) => {
  return (
    <>
      <APIProvider apiKey={apiKey}>
        <Map
          mapId={mapId}
          defaultCenter={mapStartCoords.center}
          defaultZoom={6}
          disableDefaultUI
        />
      </APIProvider>
    </>
  );
};

export default EventsMap;
