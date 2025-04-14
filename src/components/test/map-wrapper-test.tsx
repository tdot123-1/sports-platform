import EventsMap from "./map-test";

interface EventsMapWrapperProps {
  mapId: string;
  apiKey: string;
}

const EventsMapWrapperTest = async ({
  mapId,
  apiKey,
}: EventsMapWrapperProps) => {
  // test skeleton
  //   await new Promise((resolve) => setTimeout(resolve, 5000));

  // fetch events

  return (
    <>
      <EventsMap mapId={mapId} apiKey={apiKey} />
    </>
  );
};

export default EventsMapWrapperTest;
