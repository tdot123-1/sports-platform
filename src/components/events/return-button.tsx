import Link from "next/link";
import { Button } from "../ui/button";
import { Undo2Icon } from "lucide-react";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

interface ReturnButtonProps {
  returnUrl: string
}

const ReturnButton = ({ returnUrl }: ReturnButtonProps) => {
  // const router = useRouter();

  // const [isInternalReferrer, setIsInternalReferrer] = useState(false);

  // useEffect(() => {
  //   console.log("WINDOW: ",window.se)
  //   console.log("REFERRER: ", document.referrer)
  //   if (typeof document !== "undefined") {

  //     const referrerOrigin = document.referrer
  //       ? new URL(document.referrer).origin
  //       : "";
  //     setIsInternalReferrer(referrerOrigin === window.location.origin);
  //   }
  // }, []);

  // const handleClick = () => {
  //   console.log("RETURN");
  //   console.log("INTERNAL REFERRER: ", isInternalReferrer);
  //   if (window.history.length > 1 && isInternalReferrer) {
  //     console.log("REFERRER");
  //     return router.back();
  //   } else {
  //     return userId
  //       ? router.push(`/profile/events`)
  //       : router.push(`/events/grid`);
  //   }
  // };

  return (
    <>
      <Link href={returnUrl}>
        <Button variant={`secondary`}>
          <div className="flex justify-start items-start gap-1">
            <Undo2Icon />
            <span className="hidden md:block">Return</span>
          </div>
        </Button>
      </Link>
    </>
  );
};

export default ReturnButton;
