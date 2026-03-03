/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AMLLoading } from "@/pagesComponents/AMLLoading/AMLLoading";
import { AMLResult } from "@/pagesComponents/AMLResaults/AMLResaults";
import { ChooseNet } from "@/pagesComponents/ChooseNet/ChooseNet";
import { Home } from "@/pagesComponents/Home/Home";
import { setCurrentStep } from "@/Redux/Slice/MainSlice";
import { RootState } from "@/Redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Page() {

  const { currentStep } = useSelector((store: RootState) => store.main);
  const dispatch = useDispatch();


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
      {currentStep == 0 && <Home />}
      {currentStep == 1 && <ChooseNet />}
      {currentStep == 2 && <AMLLoading />}
      {currentStep == 3 && (
        <AMLResult onRepeat={() => dispatch(setCurrentStep(0))} />
      )}
    </>
  );
}
