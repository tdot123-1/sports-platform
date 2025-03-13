"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { ConstructionIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const mapStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 50.8477,
  lng: 4.3572,
};

const API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;

const svgGlyph = (() => {
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
})();

// TEST use trophy svg for map Pin (?)

const EventsMap = ({ mapId }: { mapId: string }) => {
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
      <Suspense fallback={<Skeleton className="w-full h-full" />}>
        <APIProvider apiKey={API_KEY}>
          <Map
            mapId={mapId}
            defaultCenter={center}
            defaultZoom={6}
            style={mapStyle}
          >
            <AdvancedMarker title={`Some event`} position={center}>
              <Pin background={"hsl(var(--primary))"} glyph={svgGlyph} />
            </AdvancedMarker>
          </Map>
        </APIProvider>
      </Suspense>
    </>
  );
};

export default EventsMap;
