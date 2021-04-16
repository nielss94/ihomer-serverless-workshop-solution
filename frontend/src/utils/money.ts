export const parseToMoney = (
    value: string | number,
    options: {
        symbol?: string;
        digits?: number;
    } = {}
) => {
    const { symbol = undefined, digits = 2 } = options;

    let moneyValue = '0,00';

    if (value) {
        moneyValue = Number.parseFloat(
            Number.parseFloat(`${value}`.replace(',', '.')).toFixed(digits)
        ).toString();

        const commaIndex = moneyValue.indexOf('.');

        if (commaIndex === -1 || moneyValue.length - commaIndex < 3) {
            moneyValue = Number.parseFloat(moneyValue).toFixed(2);
        }
    }

    if (symbol) {
        moneyValue = `${symbol} ` + moneyValue;
    }

    return moneyValue.replace('.', ',');
};

export const roundAmount = (value: number, fractionDigits = 2) => {
    return Number.parseFloat(value.toFixed(fractionDigits));
};
