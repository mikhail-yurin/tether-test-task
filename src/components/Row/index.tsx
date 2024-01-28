import React from 'react';
import './styles.css';

type Props = {
    price: number | string;
    count: number | string;
    amount: number | string;
};

const Component: React.FC<Props> = ({ price, count, amount }) => {
    const amountDisplayValue = typeof amount === 'number' ? amount.toFixed(4).toString().replace('-', '') : amount;
    const priceDisplayValue = typeof price === 'number' ? price.toLocaleString("en-US") : price;

    return (
        <div className='row'>
            <div style={{ rubyAlign: 'center' }}>{count}</div>
            <div>{amountDisplayValue}</div>
            <div>{priceDisplayValue}</div>
        </div>
    );
};

export const Row = React.memo(Component);