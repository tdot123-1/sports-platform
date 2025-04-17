import { Skeleton } from "../ui/skeleton";

const MapToolbarSkeleton = () => {
  return (
    <div className="flex justify-between mb-1">
      <div className="flex gap-8">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      <Skeleton className="h-16 w-24" />
    </div>
  );
};

export default MapToolbarSkeleton;
