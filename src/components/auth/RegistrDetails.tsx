import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../hooks/useDebounce";
import {
  activateUser,
  registerUser,
  registrDesc,
} from "../../store/AuthReducer";

const useInput = (initial: any) => {
  const [value, setValue] = useState(initial);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  const clear = () => setValue("");
  return { bind: { value, onChange }, clear };
};
const RegistrDetails = () => {
  const dispatch = useAppDispatch();
  const img = useInput("");
  const experience = useInput("");
  const career = useInput("");
  const certificateImg = useInput("");
  const certificateDesc = useInput("");
  const [profession, setProfession] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setProfession(event.target.value);
  };
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Обработчик изменения файла
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const sendDetails = () => {
    let user = {
      img: selectedImage,
      experience: experience.bind.value,
      career: career.bind.value,
      certificateImg: certificateImg.bind.value,
      certificateDesc: certificateDesc.bind.value,
    };
    dispatch(registrDesc(user));
  };
  return (
    <div className="auth-container">
      <div className="registr-block">
        <div className="avatar-input">
          <label htmlFor="avatar-upload">
            <div className="avatar-image">
              {selectedImage ? (
                <img src={selectedImage} alt="Avatar" />
              ) : (
                <img
                  src="Group 54.png"
                  alt="Avatar"
                  width="20px"
                  className="avatar-image__default"
                />
              )}
            </div>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="auth-block__text_dim">Профессия</div>
        <FormControl sx={{ m: 1, minWidth: 133 }}>
          <Select
            value={profession}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Выберите Профессию</em>
            </MenuItem>
            <MenuItem value={"Менеджер проектов"}>Менеджер проектов</MenuItem>
            <MenuItem value={"Веб-дизайнер"}>Веб-дизайнер</MenuItem>
            <MenuItem value={"UX-UI-дизайнер"}>UX-UI-дизайнер</MenuItem>
            <MenuItem value={"Бизнес-аналитик"}>Бизнес-аналитик</MenuItem>
          </Select>
        </FormControl>
        <div className="auth-block__text_dim">Стаж работы</div>
        <input type="text" {...experience.bind} multiple />
        <div className="auth-block__text_dim">Краткая информация о карьере</div>
        <textarea name="Text1" cols={40} rows={5} {...career.bind}></textarea>
        {/* <input type="text" placeholder="career" {...career.bind} /> */}
        <p className="auth-block__text_dim">Дипломы и сертификаты </p>{" "}
        <label className="input-file">
          <input type="file" name="file" />
          <span>добавить картинку</span>
        </label>
        <textarea
          name="Text1"
          cols={40}
          rows={5}
          {...certificateDesc.bind}
          placeholder="описание"
        ></textarea>
        {/* <div className="auth-block__text_dim">добавить картинку</div>
        <input type="text" {...certificateImg.bind} /> */}
        {/* <input
          type="text"
          placeholder="certificateDesc"
          {...certificateDesc.bind}
        /> */}
        <p></p>
        <button className="auth-button_blue" onClick={() => sendDetails()}>
          <div className="auth-button_blue__text">Продолжить</div>{" "}
        </button>
      </div>
    </div>
  );
};

export default RegistrDetails;
