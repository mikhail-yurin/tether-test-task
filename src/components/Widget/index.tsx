import React from 'react';
import { useSelector } from 'react-redux';
import { pairSelector } from '../../store/selectors';
import { ExpandCollapse } from '../ExpandCollapse';
import { Table } from '../Table';
import './styles.css';

export const Widget: React.FC = () => {
    const pair = useSelector(pairSelector);

    return (
        <div className="widget">
            <ExpandCollapse title="ORDER BOOK" subtitle={pair}>
                <Table />
            </ExpandCollapse>
        </div>
    );
};