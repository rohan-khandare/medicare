import { createContext,useEffect,useReducer } from "react";

// const intialState ={
//     user:localStorage.getItem('user')!==undefined ? JSON.parse(localStorage.getItem('user')):null,
//     role:localStorage.getItem('role') || null,
//     token:localStorage.getItem('token') || null
// }

// export const authContext = createContext(intialState);

// const authReducer = (state,action)=>{

//     switch(action.type){
//            case 'LOGIN_START' :
//                 return {
//                         user:null,
//                         role:null,
//                         token:null
//                     };
//             case "LOGIN_SUCCESS":
//                 return{
//                     user: action.payload.user,
//                     token: action.payload.token,
//                     role:action.payload.role
//                 };
//             case 'LOGOUT' :
//                 return {
//                     user:null,
//                     role:null,
//                     token:null
//                 };                   
//             default:
//                 return state;
//     }
// };

// // provider
// export const AuthContextProvider = ({children})=>{
//     const [state,dispatch]=useReducer(authReducer,intialState)

//     useEffect(()=>{
//         localStorage.setItem('user',JSON.stringify(state.user))
//         localStorage.setItem('token',JSON.stringify(state.token))
//         localStorage.setItem('role',JSON.stringify(state.role))


//     },[state]);
  
//   return <authContext.Provider value={{user:state.user, token:state.token, role:state.role, dispatch}}>
//         {children}
//     </authContext.Provider>
// }



const intialState ={
    user: sessionStorage.getItem('user') !== null ? JSON.parse(sessionStorage.getItem('user')) : null,
    role: sessionStorage.getItem('role') || null,
    token: sessionStorage.getItem('token') || null
}

export const authContext = createContext(intialState);

const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                role: null,
                token: null
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role
            };
        case 'LOGOUT':
            return {
                user: null,
                role: null,
                token: null
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, intialState);

    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(state.user));
        sessionStorage.setItem('token', state.token);
        sessionStorage.setItem('role', state.role);
    }, [state]);
  
    return (
        <authContext.Provider value={{ user: state.user, token: state.token, role: state.role, dispatch }}>
            {children}  
        </authContext.Provider>
    );
};










// const initialState = {
//     user: null,
//     role: sessionStorage.getItem('role') || null,
//     token: sessionStorage.getItem('token') || null
// };

// export const authContext = createContext(initialState);

// const authReducer = (state, action) => {
//     switch (action.type) {
//         case 'LOGIN_START':
//             return {
//                 user: null,
//                 role: null,
//                 token: null
//             };
//         case 'LOGIN_SUCCESS':
//             return {
//                 user: action.payload.user,
//                 token: action.payload.token,
//                 role: action.payload.role
//             };
//         case 'LOGOUT':
//             return {
//                 user: null,
//                 role: null,
//                 token: null
//             };
//         default:
//             return state;
//     }
// };

// export const AuthContextProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(authReducer, initialState);

//     useEffect(() => {
//         sessionStorage.setItem('user', JSON.stringify(state.user));
//         sessionStorage.setItem('token', state.token);
//         sessionStorage.setItem('role', state.role);
//     }, [state]);
  
//     return (
//         <authContext.Provider value={{ user: state.user, token: state.token, role: state.role, dispatch }}>
//             {children}  
//         </authContext.Provider>
//     );
// };






// AuthContext.jsx

// const initialState = {
//     user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
//     role: sessionStorage.getItem('role'),
//     token: sessionStorage.getItem('token')
// };

// const authReducer = (state, action) => {
//     switch (action.type) {
//         case 'LOGIN_START':
//             return {
//                 user: null,
//                 role: null,
//                 token: null
//             };
//         case 'LOGIN_SUCCESS':
//             return {
//                 user: action.payload.user,
//                 token: action.payload.token,
//                 role: action.payload.role
//             };
//         case 'LOGOUT':
//             return {
//                 user: null,
//                 role: null,
//                 token: null
//             };
//         default:
//             return state;
//     }
// };

// export const authContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(authReducer, initialState);

//     useEffect(() => {
//         sessionStorage.setItem('user', JSON.stringify(state.user));
//         sessionStorage.setItem('role', state.role);
//         sessionStorage.setItem('token', state.token);
//     }, [state]);

//     return (
//         <authContext.Provider value={{ state, dispatch }}>
//             {children}
//         </authContext.Provider>
//     );
// };
