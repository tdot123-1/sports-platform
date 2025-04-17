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
import SelectedPinEvents from "./selected-pin-events";

interface EventsMapProps {
  mapId: string;
  apiKey: string;
  events: MapEvent[];
}

// (temp) create svg element for pins
const createSvgGlyph = () => {
  if (typeof document === "undefined") return undefined;

  // svg attributes copied from lucide
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", "24");
  svg.setAttribute("height", "24");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  svg.innerHTML = `
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>`;

  return svg;
};

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
                  glyph={createSvgGlyph()}
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
