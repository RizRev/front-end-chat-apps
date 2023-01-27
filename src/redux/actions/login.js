import axios from "axios";
import { Next } from "react-bootstrap/esm/PageItem";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
export const loginUser = (data, navigate) => async (dispacth) => {
  try {
    console.log(data);
    dispacth({ type: "USER_LOGIN_PENDING" });
    const result = await axios.post(
        "http://localhost:4000/users/login",
      data
    );
    const users = result.data;
    console.log(users, "user");
    localStorage.setItem("token", users.token);
    localStorage.setItem("user", JSON.stringify(users.data));
    // socket.emit("newUser", { userName, socketID: socket.id });

    // localStorage.setItem("userName", user.username);
    dispacth({ type: "USER_LOGIN_SUCCESS", payload: users });
    Swal.fire("success", "Login Berhasil", "success");
    navigate("/home");
  } catch (err) {
    Swal.fire("Warning", "Email atau password salah", "warning");
    console.log(err);
  }
};
