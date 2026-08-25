import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./slices/user-slice.ts";
import {groupSlice} from "./slices/group-slice.ts";
import {applicationSlice} from "./slices/application-slice.ts";
import {applicationStatisticsSlice} from "./slices/application-statistics-slice.ts";

export const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        groupSlice: groupSlice.reducer,
        applicationSlice: applicationSlice.reducer,
        applicationStatisticsSlice: applicationStatisticsSlice.reducer,
    }
});
