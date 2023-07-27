import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { loginUser } from "../../store/AuthReducer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useDebounce";

interface FormValues {
  password: string;
  email: string;
}
const Login = () => {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormValues>();
  const submitForm: SubmitHandler<FormValues> = (data) => {
    data.email = data.email.toLowerCase();
    dispatch(loginUser(data));
  };
  return (
    <div className="auth-container">
      <div className="registr-block">
        <h1 className="auth-block__title">Авторизоваться</h1>
        <p className="auth-block__text_dim">
          Ещё не зарегистрированы? <a href="/registr">Создать аккаунт</a>
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          {error && <div>{error}</div>}

          <div className="form-group">
            <label htmlFor="fname">E-mail</label>
            <input
              type="email"
              id="fname"
              // placeholder="sur-name..."
              {...register("email")}
              required
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="fname">пароль</label>
            <input
              type="password"
              id="fname"
              // placeholder="sur-name..."
              {...register("password")}
              required
            ></input>
          </div>
          <a href="/forgot-pass" className="forget-pass">
            {" "}
            Забыли пароль?
          </a>

          <button type="submit" className="auth-button_blue" disabled={loading}>
            <div className="auth-button_blue__text">
              {" "}
              {loading ? <div>Loading...</div> : "Войти"}
            </div>
          </button>
        </form>
        <div className="horizontal-line-block">
          <div className="horizontal-line"></div>
          <div style={{ margin: "10px" }} className="auth-block__text_dim">
            или
          </div>
          <div className="horizontal-line"></div>
        </div>
        <button className="auth-button_white" disabled={loading}>
          <div className="auth-button_white__text">
            {" "}
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <img src="Group 5.png" alt="" /> Войти через Google
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
export default Login;
