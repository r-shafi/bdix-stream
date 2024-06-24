'use client';

import { useState } from 'react';

interface TabsProps {
  tabs: string[];
  components: JSX.Element[];
}

const Tabs = ({ tabs, components }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <div className="flex flex-wrap -mb-px">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={
                'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600' +
                (activeTab === index ? ' text-gray-800 border-gray-300' : '')
              }
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="py-4">{components[activeTab]}</div>
    </div>
  );
};

export default Tabs;
