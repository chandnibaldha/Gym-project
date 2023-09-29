export const useGetUserInfo = () => {
  const authInfo = JSON.parse(localStorage.getItem("auth"));

  if (authInfo) {
    const { name, profilePhoto, userID, isAuth } = authInfo;
    return { name, profilePhoto, userID, isAuth };
  } else {
    // Handle the case when authInfo is null or undefined
    return { name: null, profilePhoto: null, userID: null, isAuth: false };
  }
};
