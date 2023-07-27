import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { registerUser } from "../../store/AuthReducer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useDebounce";

interface FormValues {
  firstName: string;
  surName: string;
  email: string;
}
const RegisterScreen = () => {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormValues>();
  const submitForm: SubmitHandler<FormValues> = (data) => {
    // data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
    navigate("/activate-account");
  };
  return (
    <div className="auth-container">
      <div className="registr-block">
        <div className="auth-block__title">Зарегистрироваться</div>
        <p className="auth-block__text_dim">
          У вас уже есть аккаунт? <a href="/login">Войти</a>
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          {error && <div>{error}</div>}
          <div className="form-group">
            <label htmlFor="fname">Имя</label>
            <input
              type="text"
              id="fname"
              // placeholder="Your name..."
              {...register("firstName")}
              required
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="fname">Фамилия</label>
            <input
              type="text"
              id="fname"
              // placeholder="sur-name..."
              {...register("surName")}
              required
            ></input>
          </div>
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

          <button type="submit" className="auth-button_blue" disabled={loading}>
            <div className="auth-button_blue__text">
              {" "}
              {loading ? <div>Loading...</div> : "Зарегистрироваться"}
            </div>
          </button>
          <div className="horizontal-line-block">
            <div className="horizontal-line"></div>
            <div style={{ margin: "10px" }} className="auth-block__text_dim">
              или
            </div>
            <div className="horizontal-line"></div>
          </div>
          <button type="submit" className="auth-button_white">
            <div className="auth-button_white__text">
              <img src="Group 5.png" alt="" /> Войти через Google
            </div>
          </button>
          <div className="registr-block__conditions-block">
            <div className="registr-block__conditions-block__descript">
              Продолжая, вы соглашаетесь с
            </div>
            <div className="registr-block__conditions-block__circs">
              Условиями обслуживания
            </div>
            <div className="registr-block__conditions-block__link">
              и Политикой конфиденциальности Smart
            </div>
          </div>
        </form>
        временная кнопка
        <button onClick={() => navigate("/activate-account")}>next</button>
      </div>
    </div>
  );
};
export default RegisterScreen;
