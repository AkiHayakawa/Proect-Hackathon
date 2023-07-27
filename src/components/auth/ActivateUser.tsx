import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { activateUser, registerUser } from "../../store/AuthReducer";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/useDebounce";

const ActivateUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const checkPass = () => {
    if (password !== confirmPass || password.length < 5) {
      alert("пароли не совпадают или менее символов");
      return false;
    } else {
      alert("succes");
      return true;
    }
  };
  const [exchange, setExchange] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("count");
    let interval: NodeJS.Timeout | null = null;
    if (count > 0) {
      interval = setTimeout(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearTimeout(interval);
      }
    };
  }, [count]);
  const sendPass = () => {
    if (checkPass()) {
      setCount(30);
      setExchange((v) => !v);
      dispatch(activateUser(password));
      setTimeout(() => {
        setExchange((v) => !v);
      }, 30000);
    }
  };
  return (
    <div className="auth-container">
      <div className="registr-block">
        <h1 className="auth-block__title">Активируйте почту</h1>
        <p className="auth-block__text_dim">
          Вам на почту отправлено письмо с ссылкой. Пройдите по этой ссылке и
          активируйте почту
        </p>
        <div className="auth-block__text_dim">пароль</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="auth-block__text_dim">подтвердить пароль</div>
        <input
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        {exchange ? (
          <div>
            <button onClick={() => checkPass()} className="auth-button_gray">
              <div className="auth-button_gray__text">Продолжить</div>
            </button>
            <p></p>{" "}
            <p className="auth-block__text_dim">
              Отправить еще раз ссылку на почту:{count}
              <div className="auth-block__text_circs "></div>
            </p>
            <button className="auth-button_gray">
              <div className="auth-button_gray__text">Отправить</div>
            </button>
          </div>
        ) : (
          <div>
            <button onClick={() => checkPass()} className="auth-button_blue">
              <div className="auth-button_blue__text">Продолжить</div>
            </button>
            <p></p>
            <button
              onClick={() => {
                sendPass();
              }}
              className="auth-button_blue"
            >
              <div className="auth-button_blue__text">Отправить</div>
            </button>
          </div>
        )}
        временная кнопка
        <button onClick={() => navigate("/questionnaire-user")}>next</button>
      </div>
    </div>
  );
};
export default ActivateUser;
