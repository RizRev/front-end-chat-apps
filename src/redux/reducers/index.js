import { combineReducers } from "redux";
import userReducers from "./users";

const rootReducers = combineReducers({
  user: userReducers,
});

export default rootReducers;
