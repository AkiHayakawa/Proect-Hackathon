import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { changePass, loginUser } from "../../store/AuthReducer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useDebounce";
import { useEffect, useState } from "react";

const ChangePass = () => {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const changePassword = () => {
    if (password != confirmPass) {
      alert("пароли не совпадают");
    } else {
      dispatch(changePass(password));
    }
  };
  return (
    <div className="auth-container">
      <div className="registr-block">
        <h1 className="auth-block__title">Изменить пароль</h1>
        <div className="auth-block__text_dim">пароль</div>
        <input
          type="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="auth-block__text_dim">подтвердите пароль</div>
        <input
          type="password"
          placeholder=""
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        <button className="auth-button_blue" onClick={() => changePassword()}>
          <div className="auth-button_blue__text">Сохранить</div>
        </button>
      </div>
    </div>
  );
};
export default ChangePass;
