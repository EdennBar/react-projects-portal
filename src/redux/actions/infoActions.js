
import { ActionTypes } from "../contants/action-types"
export const setToken=(token)=>{
    return {
    type:ActionTypes.SET_TOKEN,
    payload:token,
    };
};

export const setProjects=(projects)=>{
    return {
    type:ActionTypes.SET_PROJECTS,
    payload:projects,
    }
}