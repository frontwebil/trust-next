"use client";

import { Home } from "@/pagesComponents/Home/Home";
import { RootState } from "@/Redux/store";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

// const DOMAIN = "https://usdtcheckaml.com";

export default function Page() {
  const { currentStep } = useSelector((store: RootState) => store.main);

  useEffect(() => {
    fetch("/api/log", {
      method: "POST",
    });
  }, []);

  if (!currentStep) {
    return <Home />;
  }
  return (
    <>
      <Home />
      {/* {currentStep == 1 && <ChooseNet />}
      {currentStep == 2 && <AMLLoading />} */}
      {/* {currentStep == 3 && (
        <AMLResult onRepeat={() => dispatch(setCurrentStep(0))} />
      )} */}
    </>
  );
}
