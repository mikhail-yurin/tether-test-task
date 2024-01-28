import React from 'react';
import { useSelector } from 'react-redux';
import { asksSelector, bidsSelector } from '../../store/selectors';
import { Row } from '../Row';
import './styles.css';

export const Table: React.FC = () => {
    const bidsData = useSelector(bidsSelector);
    const asksData = useSelector(asksSelector);

    return (
        <div className='wrapper'>
            <div className='table'>
                <Row price={'Price'} count={'Count'} amount={'Amount'} />

                {bidsData
                    ?.map(([price, count, amount], index) => (
                        <Row price={price} count={count} amount={amount} key={`${price}-${count}-${amount}-${index}`} />
                    ))}
            </div>

            <div className='table'>
                <Row price={'Price'} count={'Count'} amount={'Amount'} />

                {asksData?.map(([price, count, amount], index) => (
                    <Row price={price} count={count} amount={amount} key={`${price}-${count}-${amount}-${index}`} />
                ))}
            </div>
        </div>
    );
};
