import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { connectionSelector, precSelector } from '../../store/selectors';
import { increasePrec, descreasePrec } from '../../store/slice';
import { connect, disconnect } from '../../store/websocketService';
import { Button } from '../Buttom';
import './styles.css';

type Props = {
    title: string;
    subtitle?: string | null;
    children: ReactNode;
};

export const ExpandCollapse: React.FC<Props> = ({ title, subtitle, children }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [isExpanded, setExpanded] = useState(true);

    const connection = useSelector(connectionSelector);
    const prec = useSelector(precSelector);

    const handleToggle = () => {
        setExpanded(!isExpanded);
    };

    const handleConnectDisconnect = () => {
        if (connection === 'Connected') {
            disconnect();
        } else {
            connect(prec);
        }
    };

    const handlePrecIncrease = () => {
        dispatch(increasePrec());
    };

    const handlePrecDecrease = () => {
        dispatch(descreasePrec());
    };

    const getConnectionIcon = () => {
        switch (connection) {
            case 'Connecting':
            case 'Connected':
                return '🟢';
            case 'Disconnecting':
            case 'Disconnected':
                return '🔴';

            default:
                break;
        }
    };

    useEffect(() => {
        disconnect();
        connect(prec);
    }, [prec]);

    return (
        <>
            <div className='collapseTitle'            >
                <div className='shevron' onClick={handleToggle}>
                    {isExpanded ? '🔻' : '🔺'}
                </div>

                <div>{title}</div>

                {subtitle && (<div className='subtitle'>{subtitle.slice(0, 3) + '/' + subtitle.slice(3)}</div>)}

                <div className='spacer' />

                <Button text='.0' onClick={handlePrecDecrease} disabled={prec === 'P4'} />

                <Button text='.00' onClick={handlePrecIncrease} disabled={prec === 'P0'} />
            </div>

            {isExpanded && (
                <div className='children'>
                    {children}
                </div>
            )}

            <div className='connectionControl'>
                {getConnectionIcon()}
                <Button text={connection} onClick={handleConnectDisconnect} hint="Click to change connection status" />
            </div>
        </>
    );
};
