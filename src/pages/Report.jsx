import { Tab } from '@headlessui/react'
import TopSelling from '../sections/report/TopSelling'
import DailySales from '../sections/report/DailySales'
import Transaction from '../sections/report/Transaction'

const Report = () => {
  return (
    <div className='page-container py-4'>
      <h1 className='text-2xl uppercase font-bold w-fit border-b border-black'>Report</h1>
      <div className='tab-wrap py-8'>
        <Tab.Group>
          <Tab.List as={'div'}
                    className='flex flex-row w-fit py-2 rounded-sm'>
            <Tab as='fragment'>
              {({ selected }) => (
                <div
                  className={`${selected ? 'bg-gray-600 text-white' : 'text-gray-800 bg-gray-200'} py-2 px-4 cursor-pointer uppercase`}>
                  Top Selling Product
                </div>
              )}
            </Tab>
            <Tab as='fragment'>
              {({ selected }) => (
                <div
                  className={`${selected ? 'bg-gray-600 text-white' : 'text-gray-800 bg-gray-200'} py-2 px-4 cursor-pointer uppercase`}>
                  Daily Gross Income
                </div>
              )}
            </Tab>
            <Tab as='fragment'>
              {({ selected }) => (
                <div
                  className={`${selected ? 'bg-gray-600 text-white' : 'text-gray-800 bg-gray-200'} py-2 px-4 cursor-pointer uppercase`}>
                  Transaction
                </div>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <TopSelling />
            </Tab.Panel>
            <Tab.Panel>
              <DailySales />
            </Tab.Panel>
            <Tab.Panel>
              <Transaction />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default Report