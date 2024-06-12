const initialProps = {
  isAuthed: false,
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authReducer = (state = initialProps, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        loading: false,
        userInfo: action.payload.userInfo,
        userToken: action.payload.userToken,
        error: null,
        success: true,
        isAuthed: true,
      };

    case "FETCH_DATA":
      return {
        loading: true,
      };
    case "LOG_OUT":
      return {
        loading: false,
        userInfo: {},
        userToken: null,
        error: null,
        success: false,
        isAuthed: false,
      };
    default:
      return state;
  }
};
export default authReducer;
