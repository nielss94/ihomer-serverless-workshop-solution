import React from 'react';
import { FormikHandlers } from 'formik';

interface Props {
    symbol: string;
    handleChange: FormikHandlers['handleChange'];
    handleBlur: FormikHandlers['handleBlur'];
    value: string;
    placeholder?: string;
    name?: string;
    step?: string;
    min?: number;
    max?: number;
}

export function CurrencyInput({
    symbol,
    handleChange,
    handleBlur,
    value,
    name = 'amount',
    step = '0.01',
    min = 0,
    max = 100,
    placeholder = '0,00',
}: Props) {
    return (
        <div className="border border-gray-300 rounded px-2 py-1 block w-full text-4xl flex">
            <div className="flex-initial mr-2">{symbol}</div>
            <input
                className="flex-1"
                min={min}
                max={max}
                type="number"
                step={step}
                placeholder={placeholder}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
            />
        </div>
    );
}
