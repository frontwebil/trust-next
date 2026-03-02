"use client";

import { AMLLoading } from "@/pagesComponents/AMLLoading/AMLLoading";
import { AMLResult } from "@/pagesComponents/AMLResaults/AMLResaults";
import { ChooseNet } from "@/pagesComponents/ChooseNet/ChooseNet";
import { Home } from "@/pagesComponents/Home/Home";
import { setCurrentStep } from "@/Redux/Slice/MainSlice";
import { RootState } from "@/Redux/store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// const DOMAIN = "https://usdtcheckaml.com";

export default function Page() {
  const { currentStep } = useSelector((store: RootState) => store.main);
  const dispatch = useDispatch();
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    linkRef.current?.click();
    console.log(linkRef);
  }, [linkRef]);

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
