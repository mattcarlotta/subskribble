import * as types from '../types';

const AuthReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case types.NO_SIGNEDIN_USER:
      return { ...state, loggedinUser: null };
    case types.SET_CURRENT_AVATAR:
      return { ...state, avatarURL: payload };
    case types.SET_NAVBAR_STATE:
      return { ...state, collapseSideNav: payload };
    case types.SET_SIGNEDIN_USER:
      return {
        ...state,
        avatarURL: payload.avatarurl,
        company: payload.company,
        loggedinUser: payload.email,
        firstName: payload.firstname,
        lastName: payload.lastname,
        collapseSideNav: payload.collapsesidenav,
        isGod: payload.isgod,
      };
    case types.USER_WAS_VERIFIED:
      return { ...state, userVerified: payload };
    default:
      return state;
  }
};

export default AuthReducer;
