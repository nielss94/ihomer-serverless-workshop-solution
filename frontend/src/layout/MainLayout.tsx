import React from 'react';

interface Props {
    children: React.ReactNode;
}

export function MainLayout({ children }: Props) {
    return <div className="container m-auto pt-4">{children}</div>;
}
