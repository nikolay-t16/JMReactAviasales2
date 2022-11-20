import { RootState } from "./store";

export const userSearchIdSelector = (state:RootState) => state.user
export const ticketsSelector = (state:RootState) => state.tickets