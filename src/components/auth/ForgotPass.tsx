import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { forgotPass, loginUser } from "../../store/AuthReducer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useDebounce";
import { useEffect, useState } from "react";

interface FormValues {
  password: string;
  email: string;
}
const ForgotPass = () => {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");

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
    setTimeout(() => {
      setExchange((v) => !v);
    }, 30000);
    setExchange((v) => !v);
    setCount(30);
    dispatch(forgotPass(email));
  };
  return (
    <div className="auth-container">
      <div className="registr-block">
        <h1 className="auth-block__title">Забыли пароль?</h1>
        <div className="auth-block__text_dim">E-mail</div>
        <input
          type="text"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {exchange ? (
          <div>
            <div className="auth-block__text_dim">
              Отправить еще раз ссылку на почту:
              <div className="auth-block__text_distinct">{count} сек</div>
            </div>
            <button className="auth-button_gray">
              <div className="auth-button_gray__text">Отправить</div>
            </button>
          </div>
        ) : (
          <div>
            <h1 className="auth-block__text_dim">
              Вам на почту будет отправлена ссылка для изменения пароля
            </h1>
            <button className="auth-button_blue" onClick={() => sendPass()}>
              <div className="auth-button_blue__text">Отправить</div>
            </button>
          </div>
        )}
        временная кнопка
        <button onClick={() => navigate("/change-pass")}>next</button>
      </div>
    </div>
  );
};
export default ForgotPass;
