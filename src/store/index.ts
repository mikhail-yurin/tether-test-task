import { configureStore } from '@reduxjs/toolkit';
import bookOrder from './slice';

const store = configureStore({
    reducer: {
        bookOrderReducer: bookOrder
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
