import React, { MouseEvent } from 'react';
import './styles.css';

type Props = {
    text: string;
    hint?: string;
    disabled?: boolean;
    onClick: (e: MouseEvent<HTMLDivElement>) => void;
};

export const Button: React.FC<Props> = ({ text, hint = '', disabled, onClick }) => {
    return (
        <div
            className={`btn ${disabled ? 'disabled' : ''}`}
            onClick={onClick}
            title={hint}
        >
            {text}
        </div>
    );
};
