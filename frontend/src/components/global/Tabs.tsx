import React from 'react';
import classNames from 'classnames';

interface Props {
    tabs: string[];
    onSwitchTab: (activeTab: string) => void;
    className?: string;
}

export function Tabs({ tabs, onSwitchTab, className }: Props) {
    const [activeTab, setActiveTab] = React.useState(tabs[0]);

    function activateTab(tab: string) {
        setActiveTab(tab);
        onSwitchTab(tab);
    }

    return (
        <div className={classNames('flex', className)}>
            {tabs.map((tab, index) => (
                <div
                    key={index}
                    onClick={() => activateTab(tab)}
                    className={classNames(
                        'flex-1 p-2 border border-dark cursor-pointer hover:bg-gray-200 transition-colors duration-100',
                        {
                            'bg-dark hover:bg-dark text-light':
                                activeTab === tab,
                            'rounded-l': index === 0,
                            'rounded-r': index === tabs.length - 1,
                        }
                    )}
                >
                    {tab}
                </div>
            ))}
        </div>
    );
}
