import {createSlice} from "@reduxjs/toolkit";
const loadUserFromLoacalStorage = () => {
    const local = localStorage.getItem("userLockId");
    const session = sessionStorage.getItem("userLockId");
    const userHaseInfo = local || session;
    try {
        if (!userHaseInfo) {
            return { userLockId: null, role: null };
        }
        return {
            userLockId: JSON.parse(userHaseInfo),
            role: null,
        };
    } catch (error) {
        return { userLockId: null, role: null };
    }
};
const initialState = loadUserFromLoacalStorage()
const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userLockId = action.payload.userLockId;
            if (action.payload.rememberMe) {
                localStorage.setItem("userLockId", JSON.stringify(state.userLockId));
            } else {
                sessionStorage.setItem("userLockId", JSON.stringify(state.userLockId));
            }
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        Logout: (state) => {
            state.userLockId = null;
            state.role = null;
            localStorage.removeItem("userLockId");
            sessionStorage.removeItem("userLockId");
        }
    }
})
export const {setUser,setRole, Logout} = AuthSlice.actions;
export default AuthSlice.reducer;