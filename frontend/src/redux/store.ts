import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./slices/user-slice.ts";
import {groupSlice} from "./slices/group-slice.ts";

export const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        groupSlice: groupSlice.reducer,
    }
});
