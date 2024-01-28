import { createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

const selfSelector = (state: RootState) => state.bookOrderReducer;

export const pairSelector = (state: RootState) => createSelector(selfSelector, (state) => state.pair);

export const bidsSelector = (state: RootState) => createSelector(selfSelector, (state) => state.bids);

export const asksSelector = (state: RootState) => createSelector(selfSelector, (state) => state.asks);

export const connectionSelector = createSelector(selfSelector, (state) => state.connection);

export const precSelector = createSelector(selfSelector, (state) => state.prec);
