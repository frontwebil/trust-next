import "./Back.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import { IoIosArrowBack } from "react-icons/io";
import { setCurrentStep } from "../Redux/Slice/MainSlice";

export function Back() {
  const { currentStep } = useSelector((store: RootState) => store.main);
  const dispatch = useDispatch();

  const goBackPage = () => {
    if (currentStep == 0) return;

    dispatch(setCurrentStep(currentStep - 1));
  };

  return (
    <div className="Back-component" onClick={goBackPage}>
      <IoIosArrowBack className="Back-component-icon" />
      <p className="Back-component-text">Назад</p>
    </div>
  );
}
