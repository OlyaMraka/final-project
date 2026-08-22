import {useSelector} from "react-redux";
import type {store} from "../store.ts";

export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();
