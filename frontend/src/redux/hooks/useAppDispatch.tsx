import {useDispatch} from "react-redux";
import type {store} from "../store.ts";

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
