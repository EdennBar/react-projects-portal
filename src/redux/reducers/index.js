import { combineReducers } from "redux";
import { projectReducer } from "./projectsReducer";

const reducers=combineReducers({
    allProjects:projectReducer,
});

export default reducers;