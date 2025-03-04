"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

const AgeSelect = () => {
  const [allAges, setAllAges] = useState(false);
  const [youth, setYouth] = useState(false);
  const [adults, setAdults] = useState(true);
  const [veterans, setVeterans] = useState(false);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // all ages -> 'all',
  // set all other btns to disabled,
  // set values string to 'all' (remove all others)

  //   const handleAllAgesClick = () => {
  //     setAllAges((currentValue) => !currentValue);
  //   };

  const handleValuesChange = () => {
    if (allAges === true) {
      setSelectedValues(["all ages"]);
      setAdults(false);
      setVeterans(false);
      // set all youth age groups (birthyears) to false
      return;
    }

    if (adults) {
      setSelectedValues((prev) => [...prev, "adults"]);
    } else {
      setSelectedValues((prev) => prev.filter((v) => v !== "adults"));
    }

    if (veterans) {
      setSelectedValues((prev) => [...prev, "veterans"]);
    } else {
      setSelectedValues((prev) => prev.filter((v) => v !== "veterans"));
    }
  };

  // set all other values to false if all ages is set to 'true'
  useEffect(() => {
    handleValuesChange();
  }, [allAges, adults, veterans]);

  // adults -> 'adu',
  // remove 'all' from value string

  // veterans -> 'vet',
  // remove 'all' from value string

  // youth -> birthyear

  /**
    {
        all: "all ages",
        adu: "adults",
        vet: "veterans",
        youth: {
            "'18": "2018",
            "'17": "2017",
            "'16": "2016",
            "'15": "2015",
            "'14": "2014",
            "'13": "2013",
            "'12": "2012",
            "'11": "2011",
            "'10": "2010",
            "'09": "2009",
            "'08": "2008",
            "'07": "2007",
            "'06": "2006",
            "'05": "2005",
            "'04": "2004",
            "'03": "2003",
            "'02": "2002",
            "'01": "2001",
        }
    }
     */

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button
          type="button"
          className={cn(allAges && "bg-muted")}
          variant={`outline`}
          onClick={() => setAllAges((prev) => !prev)}
        >
          {allAges && <CheckIcon />}
          <span>All ages</span>
        </Button>
        <Button
          type="button"
          className={cn(youth && "bg-muted")}
          variant={`outline`}
        >
          {youth && <CheckIcon />}
          <span>Youth</span>
        </Button>
        <Button
          type="button"
          className={cn(adults && "bg-muted")}
          variant={`outline`}
          onClick={() => setAdults((prev) => !prev)}
        >
          {adults && <CheckIcon />}
          <span>Adults</span>
        </Button>
        <Button
          type="button"
          className={cn(veterans && "bg-muted")}
          variant={`outline`}
          onClick={() => setVeterans((prev) => !prev)}
        >
          {veterans && <CheckIcon />}
          <span>Veterans</span>
        </Button>
      </div>
    </>
  );
};

export default AgeSelect;
