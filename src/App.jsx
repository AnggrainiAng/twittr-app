import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./redux/slices/userSlice";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";
import OtherProfile from "./pages/OtherProfile";
import Profile from "./pages/Profile";

function App() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const keepLogin = () => {
    const data = localStorage.getItem("twitter_app");
    const user = JSON.parse(data);

    if (data) {
      dispatch(loginAction(user));
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  return (
    <>
      <Routes>
        {!user.id ? (
          <>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/profile/:userId" element={<OtherProfile />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
