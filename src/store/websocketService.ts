import { Dispatch } from '@reduxjs/toolkit';
import store from '.';
import { PrecType, setConnection, setData, setPair, updateData } from './slice';

export type ConnectionType = 'Connecting' | 'Connected' | 'Disconnecting' | 'Disconnected';

let socket: WebSocket;

let dispatch: Dispatch = store.dispatch;

let hbTimeout: any;

const resetTimer = () => {
    if (hbTimeout) {
        clearTimeout(hbTimeout);
    }
    hbTimeout = setTimeout(() => {
        dispatch(setConnection('Disconnected'));
    }, 15100);
};

export const connect = async (prec: PrecType) => {
    dispatch(setConnection('Connecting'));

    socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);

        if (dispatch && data[1] === 'hb') {
            resetTimer();
            dispatch(setConnection('Connected'));
        }

        if (dispatch && data.event === 'subscribed') {
            dispatch(setPair(data.pair));
        }

        if (dispatch && !data.event && data) {
            const [channelId, channelData] = data;

            if (typeof channelData[0] === 'object') {
                // got snapshot
                dispatch(setData(channelData));
            } else if (typeof channelData[0] === 'number') {
                // got update
                dispatch(updateData(channelData));
            }
        }
    });

    socket.addEventListener('open', () => {
        dispatch(setConnection('Connected'));

        socket.send(JSON.stringify({
            event: 'subscribe',
            channel: 'book',
            symbol: 'tBTCUSD',
            prec,
        }));

        resetTimer();
    });

    socket.addEventListener('error', (event) => {
        dispatch(setConnection('Disconnected'));
    });

    socket.addEventListener('close', (event) => {
        dispatch(setConnection('Disconnected'));
    });
};

export const disconnect = async () => {
    if (hbTimeout) {
        clearTimeout(hbTimeout);
    }
    dispatch(setConnection('Disconnecting'));
    if (socket) {
        await socket.close();
    }
    dispatch(setConnection('Disconnected'));
};
