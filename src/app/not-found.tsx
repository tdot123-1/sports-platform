import { Button } from "@/components/ui/button";
import { FrownIcon, HouseIcon } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-full flex-col text-center gap-4 items-center justify-center my-28">
      <h2 className="text-xl font-mono">404 - Not Found</h2>
      <FrownIcon size={48} />
      <p className="text-sm text-muted-foreground mb-10">
        The page you are looking for does not exist
      </p>
      <Link href={"/"}>
        <Button>
          <HouseIcon />
          <span>Return home</span>
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
