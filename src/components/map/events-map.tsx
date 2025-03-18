"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import { Suspense, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { ConstructionIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useDebouncedCallback } from "use-debounce";
import { SportsEventMap } from "@/lib/types";
import SelectedPinEvents from "./selected-pin-events";
import { mapStartCoords } from "@/lib/constants";
import {
  fetchEventsInViewAndCount,
  fetchUniqueEventsInView,
} from "@/lib/data/map/data";
import { convertToMapEvent } from "@/lib/utils";
import MapToolbar from "./map-toolbar";

const mapStyle = {
  width: "100%",
  height: "100%",
};

const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

const createSvgGlyph = () => {
  if (typeof document === "undefined") return undefined;

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

export interface MapCenter {
  lat: number;
  lng: number;
}

export interface MapBounds {
  south: number;
  west: number;
  north: number;
  east: number;
}

// total batches + total events

const EventsMap = ({
  mapId,
  eventsInRadius,
  totalEventsInRadius,
  initialMapCenter,
  initialMapBounds,
}: {
  mapId: string;
  eventsInRadius?: SportsEventMap[];
  totalEventsInRadius?: number;
  initialMapCenter: MapCenter;
  initialMapBounds: MapBounds;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPin, setSelectedPin] = useState("");

  const [visiblePins, setVisiblePins] = useState(eventsInRadius || []);

  const [mapCenter, setMapCenter] = useState(initialMapCenter);
  const [mapBounds, setMapBounds] = useState(initialMapBounds);

  const [totalEvents, setTotalEvents] = useState(totalEventsInRadius || 0);

  const handleOpenChange = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleSelectPin = (address_city: string) => {
    setSelectedPin(address_city);
    setIsDialogOpen(true);
  };

  const fetchPinsAndCount = async (
    south: number,
    west: number,
    north: number,
    east: number,
    center_lat: number,
    center_lng: number
  ) => {
    const fetchedEvents = await fetchEventsInViewAndCount(
      south,
      west,
      north,
      east,
      center_lat,
      center_lng
    );

    const events: SportsEventMap[] = await Promise.all(
      fetchedEvents.events.map(convertToMapEvent)
    );

    setVisiblePins(events);
    setTotalEvents(fetchedEvents.totalCount);
    setMapCenter({ lat: center_lat, lng: center_lng });
    setMapBounds({ south, west, north, east });
  };

  const fetchPins = async (
    south: number,
    west: number,
    north: number,
    east: number,
    center_lat: number,
    center_lng: number,
    batch: number
  ) => {
    const fetchedEvents = await fetchUniqueEventsInView(
      south,
      west,
      north,
      east,
      center_lat,
      center_lng,
      batch
    );
    // convert to get public logo url
    const events: SportsEventMap[] = await Promise.all(
      fetchedEvents.map(convertToMapEvent)
    );

    setVisiblePins(events);
  };

  const handleCenterChanged = useDebouncedCallback(
    (e: MapCameraChangedEvent) => {
      console.log("EVENT: ", e);
      console.log(`lat: ${e.detail.center.lat} long: ${e.detail.center.lng}`);
      console.log("zoom: ", e.detail.zoom);

      const { lat, lng } = e.detail.center;

      const { south, west, north, east } = e.detail.bounds;

      fetchPinsAndCount(south, west, north, east, lat, lng);
    },
    300
  );

  if (!API_KEY) {
    return (
      <div className=" flex flex-col justify-center items-center gap-4 py-24">
        <ConstructionIcon size={40} />
        <p className="font-mono text-lg mb-8">Map currently unavailable</p>
        <Link href={"/"}>
          <Button>
            <HomeIcon />
            Return
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <MapToolbar
        totalEvents={totalEvents}
        mapCenter={mapCenter}
        mapBounds={mapBounds}
        fetchPins={fetchPins}
      />
      <Suspense fallback={<Skeleton className="w-full h-full" />}>
        <APIProvider apiKey={API_KEY}>
          <Map
            mapId={mapId}
            defaultCenter={mapStartCoords.center}
            defaultZoom={6}
            style={mapStyle}
            onCenterChanged={handleCenterChanged}
            disableDefaultUI
          >
            {visiblePins &&
              visiblePins.length &&
              visiblePins.map((e) => (
                <AdvancedMarker
                  key={e.id}
                  title={e.event_name}
                  position={{ lat: e.lat, lng: e.lng }}
                  onClick={() => handleSelectPin(e.address_city)}
                >
                  <Pin
                    background={"hsl(var(--primary))"}
                    glyph={createSvgGlyph()}
                  />
                </AdvancedMarker>
              ))}
          </Map>
        </APIProvider>
      </Suspense>
      <SelectedPinEvents
        selectedPin={selectedPin}
        isDialogOpen={isDialogOpen}
        handleOpenChange={handleOpenChange}
      />
    </>
  );
};

export default EventsMap;
