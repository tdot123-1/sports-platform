import { Skeleton } from "../ui/skeleton";

const ToolbarSkeleton = () => {
  return (
    <>
      <div className="flex justify-evenly p-4 bg-muted shadow-md">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="w-12 md:w-24 h-8 rounded-md" />
        ))}
      </div>
    </>
  );
};

export default ToolbarSkeleton;
