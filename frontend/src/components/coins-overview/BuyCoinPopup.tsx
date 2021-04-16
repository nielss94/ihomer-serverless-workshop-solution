import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { Button } from '../global/Button';
import { useCoinsStore } from '../../state/useCoinsStore';
import { parseToMoney } from '../../utils/money';
import { CryptoCoin } from '../../models/Currency';
import { isNil } from 'lodash';
import { CurrencyInput } from '../global/CurrencyInput';
import { Formik } from 'formik';
import { PortfolioService } from '../../services/portfolio.service';

interface Props {
    trigger: JSX.Element;
    coinId: string;
}

export function BuyCoinPopup({ trigger, coinId }: Props) {
    const coins = useCoinsStore((state) => state.coins);
    const [coin, setCoin] = useState<CryptoCoin | undefined>(undefined);

    useEffect(() => {
        setCoin(coins.find((coin) => coin.id === coinId));
    }, [coins, coinId]);

    const getPrice = (amount: number) => {
        if (isNil(coin)) {
            return 0;
        }

        return coin.price * amount;
    };

    return (
        <Popup modal nested trigger={trigger} position="right center">
            {(onClose: any) => (
                <div className="modal p-4">
                    <div className="flex">
                        <div className="flex-1 text-2xl">Buy {coin?.name}</div>
                        <div className="flex-1 flex justify-end mb-4">
                            <Button color="primary" onClick={onClose}>
                                &times;
                            </Button>
                        </div>
                    </div>

                    <Formik
                        initialValues={{ amount: '0.0000' }}
                        validate={(values) => {
                            const errors: any = {};
                            if (
                                !values.amount ||
                                values.amount === '0,00' ||
                                values.amount === '0.00'
                            ) {
                                errors.amount = 'Amount is required.';
                            }

                            if (
                                Number.parseFloat(values.amount) < 0 ||
                                Number.parseFloat(values.amount) > 1000
                            ) {
                                errors.amount = `Must be between ${coin?.symbol} 0,0000 and ${coin?.symbol} 1000,0000`;
                            }

                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await PortfolioService.buy(
                                    coinId,
                                    Number.parseFloat(values.amount)
                                );
                                onClose();
                            } catch (e) {
                                alert('Oops, something went wrong');
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <CurrencyInput
                                    symbol={coin?.symbol || ''}
                                    placeholder="0,0000"
                                    step="0.0001"
                                    min={0}
                                    max={1000}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.amount}
                                />

                                <div className="text-red-500">
                                    {errors.amount &&
                                        touched.amount &&
                                        errors.amount}
                                </div>

                                <div className="text-2xl">
                                    <span className="mr-2">
                                        {`1 ${coin?.symbol}`}
                                    </span>
                                    <span>
                                        {`= ${parseToMoney(getPrice(1), {
                                            symbol: '$',
                                        })}`}
                                    </span>
                                </div>

                                <div className="mt-4">
                                    <div className="text-2xl">Total price</div>
                                    <div className="text-4xl">
                                        {parseToMoney(
                                            getPrice(
                                                Number.parseFloat(values.amount)
                                            ),
                                            {
                                                symbol: '$',
                                            }
                                        )}
                                    </div>
                                </div>

                                <Button
                                    color="secondary"
                                    className="w-full mt-4"
                                    onClick={() => {
                                        console.log('Buy');
                                    }}
                                >
                                    Buy
                                </Button>
                            </form>
                        )}
                    </Formik>
                </div>
            )}
        </Popup>
    );
}
