import { Navigate, useNavigate } from "react-router-dom";
import { auth, provider } from "../../Config/firebase.config";
import { signInWithPopup } from "firebase/auth";
import "./styles.css";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();
  
  const SignIn = async () => {
    const result = await signInWithPopup(auth, provider);

    const authInfo = {
      userID: result.user.uid,
      name: result.user.displayName,
      profilePhoto: result.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="login-page">
      <p>SignIN with Google Authentication</p>
      <button onClick={SignIn} className="login-with-google-btn ">
        SignIn
      </button>
    </div>
  );
};
