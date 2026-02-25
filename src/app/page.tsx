"use client";

import { AMLLoading } from "@/Pages/AMLLoading/AMLLoading";
import { AMLResult } from "@/Pages/AMLResaults/AMLResaults";
import { ChooseNet } from "@/Pages/ChooseNet/ChooseNet";
import { Home } from "@/Pages/Home/Home";
import { setCurrentStep } from "@/Redux/Slice/MainSlice";
import { RootState } from "@/Redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DOMAIN = "http://192.168.1.109:3000";

export default function Page() {
  const { currentStep } = useSelector((store: RootState) => store.main);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const ua = navigator.userAgent;
  //   const isInsideTrustWallet = /Trust\//.test(ua) || /TrustWallet/.test(ua);

  //   if (!isInsideTrustWallet) {
  //     window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(DOMAIN)}`;
  //   }
  // }, []);

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
        <AMLResult
          address={"3214312412412"}
          riskScore={32}
          onRepeat={() => dispatch(setCurrentStep(0))}
        />
      )}
    </>
  );
}
