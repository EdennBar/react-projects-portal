import { ActionTypes } from "../contants/action-types";

const initialState={
    projects:[
        {
            id:1,
            title:"Dipesh",
            category:"programmer",
        }
    ],
    token:[]
    
}
export const projectReducer=(state=initialState,{type,payload})=>{
switch (type) {
    case ActionTypes.SET_TOKEN:
        return {...state,token:payload};
   
   case ActionTypes.SET_PROJECTS:
        return {...state,projects:payload };
   
        default:
        return state;
}
}