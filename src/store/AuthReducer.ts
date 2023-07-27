import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import axios from "axios";
const Api = "http://localhost:8000/users";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
type AuthState = {
  user: User;
  loading: boolean;
  error: string | null;
};
type User = {
  firstName?: string;
  surName?: string;
  email?: string;
  password?: string;
  profession?: string;
  experience?: string;
  img?: string;

  career?: string;
  certificateImg?: string;
  certificateDesc?: string;
};

export const registerUser = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>("auth/registerUser", async (user, { rejectWithValue }) => {
  console.log("registr function");
  const { data } = await axios.post(Api, user);
  localStorage.setItem("registr-id", data.id);
  return data;
  // let formData = new FormData();
  // formData.append("firstName", user.firstName);
  // formData.append("surName", user.surName);
  // formData.append("email", user.email);
  // formData.append("password", user.password);
  // formData.append("confirmPass", user.confirmPass);
  // try {
  //   const { data } = await axios.post(Api, formData, config);
  //   return data;
  // } catch (error: any) {
  //   if (error.response && error.response.data.message) {
  //     return rejectWithValue(error.response.data.message);
  //   } else {
  //     return rejectWithValue(error.message);
  //   }
  // }
});
export const forgotPass = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("auth/forgotPass", async (email, { rejectWithValue }) => {
  const { data } = await axios(Api);
  let user = data.find((user: User) => user.email == email);
  if (data) {
    localStorage.setItem("forgot-pass-id", user.id);
    return user.id;
  } else {
    return rejectWithValue("error!");
  }
});
export const changePass = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("auth/changePass", async (password, { rejectWithValue }) => {
  let userId = localStorage.getItem("forgot-pass-id");
  if (userId) {
    const { data } = await axios.patch(`${Api}/${userId}`, {
      password,
    });
    return data;
  }
});
export const registrDesc = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>("auth/registrDesc", async (user) => {
  const id = localStorage.getItem("registr-id");
  const { data } = await axios.patch(`${Api}/${id}`, user);
  return data;
});
export const activateUser = createAsyncThunk<
  User,
  string | User,
  { rejectValue: string }
>("auth/activateUser", async (password) => {
  const id = localStorage.getItem("registr-id");
  const { data } = await axios.patch(`${Api}/${id}`, { password: password });
  return data;
});
export const loginUser = createAsyncThunk<
  User,
  { password: string; email: string },
  { rejectValue: string }
>("auth/loginUser", async (user, { rejectWithValue }) => {
  const { data } = await axios(Api);
  let login_user = data.find(
    (users: User) =>
      users.password == user.password && users.email == user.email
  );
  if (!login_user) {
    alert("error");
    return rejectWithValue("Server Error!");
  }
  localStorage.setItem("user-info", login_user.id);
  return login_user;
});
const initialState: AuthState = {
  user: {
    firstName: "",
    surName: "",
    img: "https://64.media.tumblr.com/39bb2fa785ac13040df6de6f441b8056/c56f154af6673db3-77/s1280x1920/2e2c66494c5d67b26744a2c926277b093cdea292.png",
    email: "",
    password: "",
    profession: "",
    experience: "",
    career: "",
    certificateImg: "",
    certificateDesc: "",
  },
  loading: false,
  error: null,
};

const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : "Unknown error";
      }),
});

export default AuthReducer.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
