import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getTicket } from "../services/aviasales-services";
import { sortByPrise } from "../helpers/vars/sort-vars";
import TypeTicket from "../types-data/type-ticket";
import TypeFiltersTransplants from "../types-data/type-filter-transplants";
interface ticketsState {
  tickets: [] | [TypeTicket];
  filterTransplants: TypeFiltersTransplants;
  serverErrorCounter: number;
  StopLoadingTickets: boolean;
  amountTickets: number;
  sortParameter: string;
}

const initialState: ticketsState = {
  tickets: [],
  filterTransplants: {
    noTransplants: true,
    oneTransplant: true,
    twoTransplants: false,
    threeTransplants: false,
    allFilterTransplants: false,
  },
  serverErrorCounter: 0,
  StopLoadingTickets: false,
  amountTickets: 5,
  sortParameter: sortByPrise,
};

export const getTicketFromApi = createAsyncThunk(
  "tickets",
  async (searchId: string) => {
    return await getTicket(searchId);
  }
);

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addVisibleTickets: (state, action: PayloadAction<number>) => {
      state.amountTickets = state.amountTickets + action.payload;
    },
    chooseFilterTransplants: (
      state,
      action: PayloadAction<keyof TypeFiltersTransplants>
    ) => {
      const {
        filterTransplants,
      }: { filterTransplants: TypeFiltersTransplants } = state;
      const newFilter = !filterTransplants[action.payload];
      state.filterTransplants = {
        ...filterTransplants,
        [action.payload]: newFilter,
        allFilterTransplants: !Object.values({
          ...filterTransplants,
          [action.payload]: newFilter,
        })
          .slice(0, 4)
          .includes(false),
      };
    },
    chooseAllFilterTransplants: (state) => {
      const filters = !state.filterTransplants.allFilterTransplants;
      state.filterTransplants = {
        noTransplants: filters,
        oneTransplant: filters,
        twoTransplants: filters,
        threeTransplants: filters,
        allFilterTransplants: filters,
      };
    },
    ticketsSorted: (state, action) => {
      state.sortParameter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketFromApi.fulfilled, (state, action) => {
        state.StopLoadingTickets = action.payload.stop;
        state.serverErrorCounter = 0;
        //@ts-ignore
        state.tickets = [...state.tickets, ...action.payload.tickets];
      })
      .addCase(getTicketFromApi.rejected, (state: ticketsState) => {
        state.serverErrorCounter = state.serverErrorCounter + 1;
      });
  },
});

export const {
  addVisibleTickets,
  chooseFilterTransplants,
  chooseAllFilterTransplants,
  ticketsSorted,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
