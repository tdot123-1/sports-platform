"use client";

import { mapStartCoords } from "@/lib/constants";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const EventsMap = ({ mapId, apiKey }: { mapId: string; apiKey: string }) => {
  // on center changed -> set new coords in params -> trigger new fetch

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleCenterChanged = useDebouncedCallback(
    (e: MapCameraChangedEvent) => {
      // create new search params
      const params = new URLSearchParams(searchParams);

      // get new map coords
      const { lat, lng } = e.detail.center;
      const { south, west, north, east } = e.detail.bounds;

      // set new coords in params
      // center
      params.set("lt", lat.toFixed(4));
      params.set("lg", lng.toFixed(4));

      // map bounds
      params.set("s", south.toFixed(4));
      params.set("w", west.toFixed(4));
      params.set("n", north.toFixed(4));
      params.set("e", east.toFixed(4));

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
        />
      </APIProvider>
    </>
  );
};

export default EventsMap;
