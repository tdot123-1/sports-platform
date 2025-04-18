import { verifyEventReport } from "@/lib/actions/flag/actions";
import jwt from "jsonwebtoken";
import { FrownIcon, HouseIcon, SmileIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

// define token payload type
type ReportTokenPayload = {
  report_id: string;
};

const VerifyReport = async ({ token }: { token: string }) => {
  // generate JWT
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("Missing JWT secret");
    throw new Error("Missing JWT secret");
  }

  let reportId;
  try {
    const decoded = jwt.verify(token, secret) as ReportTokenPayload;

    console.log(decoded.report_id);
    reportId = decoded.report_id;
  } catch (error) {
    console.error("JWT error: ", error);
  }

  if (!reportId) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
        <FrownIcon size={48} />
        <p className="font-mono text-center">Invalid or expired token!</p>
        <Link className="mt-4" href={"/"}>
          <Button>
            <HouseIcon />
            <span>Return home</span>
          </Button>
        </Link>
      </div>
    );
  }

  const verifySuccess = await verifyEventReport(reportId);

  return (
    <>
      <div className="flex flex-col gap-2 justify-center items-center">
        {verifySuccess ? (
          <>
            <SmileIcon size={48} />
            <p className="font-mono text-lg">Thank you for verifying!</p>
            <p className="text-sm text-muted-foreground">
              We will review your report and take appropriate action.
            </p>
          </>
        ) : (
          <>
            <FrownIcon size={48} />
            <p className="font-mono text-lg">Something went wrong!</p>
            <p className="text-sm text-muted-foreground">
              We failed to verify your report.
            </p>
          </>
        )}
        <Link className="mt-4" href={"/"}>
          <Button>
            <HouseIcon />
            <span>Return home</span>
          </Button>
        </Link>
      </div>
    </>
  );
};

export default VerifyReport;
