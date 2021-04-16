import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
    to: string;
    name: string;
}

export function MenuLink(props: Props) {
    return (
        <li className="inline-block cursor-pointer hover:text-primary pr-3">
            <NavLink activeClassName="text-primary" exact to={props.to}>
                {props.name}
            </NavLink>
        </li>
    );
}
