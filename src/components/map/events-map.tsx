"use client";

import { mapStartCoords } from "@/lib/constants";
import { MapEvent } from "@/lib/types";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapCameraChangedEvent,
  Pin,
} from "@vis.gl/react-google-maps";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SelectedPinEvents from "../events/map/selected-pin-events";

interface EventsMapProps {
  mapId: string;
  apiKey: string;
  events: MapEvent[];
}

const EventsMap = ({ mapId, apiKey, events }: EventsMapProps) => {
  // states for pin dialog -> open state and selected city
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPin, setSelectedPin] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // open/close dialog after clicking pin
  const handleOpenChange = () => {
    setIsDialogOpen((prev) => !prev);
  };

  // handle state when pin is clicked -> set correct city, open dialog
  const handleSelectPin = (address_city: string) => {
    setSelectedPin(address_city);

    setIsDialogOpen(true);
  };

  // on center changed -> set new coords in params -> trigger new fetch
  const handleCenterChanged = useDebouncedCallback(
    (e: MapCameraChangedEvent) => {
      // create new search params
      const params = new URLSearchParams(searchParams);

      // get new map coords
      const { lat, lng } = e.detail.center;
      const { south, west, north, east } = e.detail.bounds;

      // set new coords in params
      // center
      params.set("lt", lat.toFixed(5));
      params.set("lg", lng.toFixed(5));

      // map bounds
      params.set("s", south.toFixed(5));
      params.set("w", west.toFixed(5));
      params.set("n", north.toFixed(5));
      params.set("e", east.toFixed(5));

      // set batch to 1
      params.set("batch", "1");

      // update url
      replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  return (
    <>
      <APIProvider apiKey={apiKey}>
        <Map
          mapId={mapId}
          defaultCenter={mapStartCoords.center}
          defaultZoom={6}
          disableDefaultUI
          onCenterChanged={handleCenterChanged}
        >
          {events.length &&
            events.map((e) => (
              <AdvancedMarker
                key={e.id}
                title={e.event_name}
                position={{ lat: e.lat, lng: e.lng }}
                onClick={() => handleSelectPin(e.address_city)}
              >
                <Pin
                  background={"hsl(var(--basket))"}
                  // glyph={createSvgGlyph()}
                />
              </AdvancedMarker>
            ))}
        </Map>
      </APIProvider>
      <SelectedPinEvents
        selectedPin={selectedPin}
        isDialogOpen={isDialogOpen}
        handleOpenChange={handleOpenChange}
      />
    </>
  );
};

export default EventsMap;
