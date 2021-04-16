import React from 'react';
import classNames from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: 'primary' | 'secondary';
}

export function Button({ children, color, className, ...props }: Props) {
    return (
        <button
            className={classNames(
                [
                    props.disabled
                        ? [`bg-${color}-defused`]
                        : `bg-${color} hover:bg-${color}-darker`,
                ],
                'transition-colors duration-100 text-white px-6 py-2 rounded-full',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
