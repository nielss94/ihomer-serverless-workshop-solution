import React from 'react';
import { MainLayout } from '../layout/MainLayout';
import { Tabs } from '../components/global/Tabs';
import { Formik } from 'formik';
import { Button } from '../components/global/Button';
import { isNil } from 'lodash';
import { CurrencyInput } from '../components/global/CurrencyInput';
import { PortfolioService } from '../services/portfolio.service';
import { FiatService } from '../services/fiat.service';
import { useFiatStore } from '../state/useFiatStore';
import { parseToMoney } from '../utils/money';

interface Props {}

export function Fiat(props: Props) {
    const tabs = ['Balance', 'Deposit'];
    const [activeTab, setActiveTab] = React.useState(tabs[0]);
    const currentBalance = useFiatStore((state) => state.balance);

    function onSwitchTab(tab: string) {
        setActiveTab(tab);
    }

    return (
        <div>
            <MainLayout>
                <div className="max-w-xl mx-auto shadow-md p-4 mt-12 bg-light">
                    <Tabs tabs={tabs} onSwitchTab={onSwitchTab} />

                    <div className="mt-6">
                        {activeTab === tabs[0] && (
                            <div>
                                <div className="text-2xl">
                                    Your current balance
                                </div>
                                <div className="text-4xl">$0,00</div>
                            </div>
                        )}

                        {activeTab === tabs[1] && (
                            <div>
                                <div className="text-2xl mb-6">
                                    Add money in your balance
                                </div>
                                <Formik
                                    initialValues={{ amount: '0.00' }}
                                    validate={(values) => {
                                        const errors: any = {};
                                        if (
                                            !values.amount ||
                                            values.amount === '0,00' ||
                                            values.amount === '0.00'
                                        ) {
                                            errors.amount =
                                                'Amount is required.';
                                        }

                                        if (
                                            Number.parseFloat(values.amount) <
                                                0 ||
                                            Number.parseFloat(values.amount) >
                                                100
                                        ) {
                                            errors.amount =
                                                'Must be between $ 0,00 and $ 100,01';
                                        }

                                        return errors;
                                    }}
                                    onSubmit={async (
                                        values,
                                        { setSubmitting }
                                    ) => {
                                        try {
                                            await FiatService.deposit(
                                                Number.parseFloat(values.amount)
                                            );
                                            alert(
                                                'Your new balance is ' +
                                                    parseToMoney(
                                                        currentBalance +
                                                            Number.parseFloat(
                                                                values.amount
                                                            ),
                                                        { symbol: '$' }
                                                    )
                                            );
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
                                                symbol="$"
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                value={values.amount}
                                            />

                                            <div className="text-red-500">
                                                {errors.amount &&
                                                    touched.amount &&
                                                    errors.amount}
                                            </div>

                                            <Button
                                                className="block mt-6 w-full"
                                                color="secondary"
                                                type="submit"
                                                disabled={
                                                    !touched.amount ||
                                                    isSubmitting ||
                                                    !isNil(errors.amount)
                                                }
                                            >
                                                Add to balance
                                            </Button>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        )}
                    </div>
                </div>
            </MainLayout>
        </div>
    );
}
