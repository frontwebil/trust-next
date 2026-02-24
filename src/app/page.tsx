"use client";

import { ChooseNet } from "@/Pages/ChooseNet/ChooseNet";
import { Home } from "@/Pages/Home/Home";
import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";

export default function Page() {
  const { currentStep } = useSelector((store: RootState) => store.main);
  if (!currentStep) {
    return <Home />;
  }
  return (
    <>
      {currentStep == 0 && <Home />}
      {currentStep == 1 && <ChooseNet />}
    </>
  );
}
