import { createSlice } from '@reduxjs/toolkit';
import { ConnectionType } from './websocketService';

export type PrecType = 'P0' | 'P1' | 'P2' | 'P3' | 'P4';

export type UpdateDataType = [PRICE: number, COUNT: number, AMOUNT: number];

type StoreType = {
    pair: string | null;
    bids: UpdateDataType[];
    asks: UpdateDataType[];
    connection: ConnectionType;
    prec: PrecType;
}

export const orderBookSlice = createSlice({
    name: 'orderBook',
    initialState: {
        pair: '',
        bids: [],
        asks: [],
        connection: 'Disconnected',
        prec: 'P0',
    } as StoreType,
    reducers: {
        setPair: (state, action) => {
            state.pair = action.payload;
        },
        setData: (state, action: { payload: UpdateDataType[] }) => {
            const bids: UpdateDataType[] = [];
            const asks: UpdateDataType[] = [];
            action.payload.forEach((data) => {
                // todo: simplify for snapshot. Looks like first 25 are always bids and the rest are asks
                const [price, count, amount] = data;
                if (amount > 0) {
                    bids.push(data);
                }
                if (amount < 0) {
                    asks.push(data);
                }
            });

            state.bids = bids;
            state.asks = asks;
        },
        updateData: (state, action: { payload: UpdateDataType }) => {
            const [price, count, amount] = action.payload;
            // count > 0 then you have to add or update the price level
            if (count > 0) {
                // if amount > 0 then add/update bids
                if (amount > 0) {
                    const index = state.bids.findIndex((bid) => bid[0] === price);
                    if (index > -1) {
                        state.bids[index] = action.payload;
                    } else {
                        state.bids.push(action.payload);
                    }
                }
                // if amount < 0 then add/update asks
                if (amount < 0) {
                    const index = state.asks.findIndex((ask) => ask[0] === price);
                    if (index > -1) {
                        state.asks[index] = action.payload;
                    } else {
                        state.asks.push(action.payload);
                    }
                }
            }

            // count = 0 then you have to delete the price level.
            if (count === 0) {
                // if amount = 1 then remove from bids
                if (amount === 1) {
                    const index = state.bids.findIndex((bid) => bid[0] === price);
                    if (index > -1) {
                        state.bids.splice(index, 1);
                    }
                }
                // if amount = -1 then remove from asks
                if (amount === -1) {
                    const index = state.asks.findIndex((ask) => ask[0] === price);
                    if (index > -1) {
                        state.asks.splice(index, 1);
                    }
                }
            }

            state.bids = state.bids.sort().reverse();
            state.asks = state.asks.sort().reverse();
        },
        setConnection: (state, action: { payload: ConnectionType }) => {
            state.connection = action.payload;
        },
        increasePrec: (state) => {
            switch (state.prec) {
                case 'P4':
                    state.prec = 'P3';
                    break;
                case 'P3':
                    state.prec = 'P2';
                    break;
                case 'P2':
                    state.prec = 'P1';
                    break;
                case 'P1':
                    state.prec = 'P0';
                    break;

                default:
                    break;
            };
        },
        descreasePrec: (state) => {
            switch (state.prec) {
                case 'P0':
                    state.prec = 'P1';
                    break;
                case 'P1':
                    state.prec = 'P2';
                    break;
                case 'P2':
                    state.prec = 'P3';
                    break;
                case 'P3':
                    state.prec = 'P4';
                    break;

                default:
                    break;
            }
        },
    },
});

export const { setData, setPair, updateData, setConnection, increasePrec, descreasePrec } = orderBookSlice.actions;

export default orderBookSlice.reducer;