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

const icon = "E";

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
              <Pin background={"hsl(var(--primary))"} glyph={icon} />
            </AdvancedMarker>
          </Map>
        </APIProvider>
      </Suspense>
    </>
  );
};

export default EventsMap;
