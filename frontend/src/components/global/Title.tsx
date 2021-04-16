import React from 'react';
import classNames from 'classnames';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export function Title({ children, className = '' }: Props) {
    return (
        <h1 className={classNames('text-2xl font-bold font-mono', className)}>
            {children}
        </h1>
    );
}
