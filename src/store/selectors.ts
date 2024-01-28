import { RootState } from ".";

const selfSelector = (state: RootState) => state.bookOrderReducer;

export const pairSelector = (state: RootState) => selfSelector(state).pair;

export const bidsSelector = (state: RootState) => selfSelector(state).bids;

export const asksSelector = (state: RootState) => selfSelector(state).asks;

export const connectionSelector = (state: RootState) => selfSelector(state).connection;

export const precSelector = (state: RootState) => selfSelector(state).prec;
