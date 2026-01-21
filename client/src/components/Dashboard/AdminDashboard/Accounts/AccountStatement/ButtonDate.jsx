import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import {  subDays, startOfMonth, endOfMonth, startOfToday, subMonths } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { CalendarDays } from 'lucide-react';
import { ArrowDown } from 'lucide-react';
import { RotateCw } from 'lucide-react';
import { Trash2  } from 'lucide-react';

const ButtonDate = () => {
    const [showPicker, setShowPicker] = useState(false);
    const [range, setRange] = useState([
        {
            startDate: startOfMonth(new Date()),
            endDate: endOfMonth(new Date()),
            key: 'selection'
        }
    ]);

    const presetRanges = [
        { label: 'Today', range: [startOfToday(), startOfToday()] },
        { label: 'Yesterday', range: [subDays(startOfToday(), 1), subDays(startOfToday(), 1)] },
        { label: 'Last 7 Days', range: [subDays(new Date(), 6), new Date()] },
        { label: 'Last 30 Days', range: [subDays(new Date(), 29), new Date()] },
        { label: 'This Month', range: [startOfMonth(new Date()), endOfMonth(new Date())] },
        { label: 'Last Month', range: [
                startOfMonth(subMonths(new Date(), 1)),
                endOfMonth(subMonths(new Date(), 1))
            ] },
    ];

    const handlePresetClick = ([start, end]) => {
        setRange([{ startDate: start, endDate: end, key: 'selection' }]);
        setShowPicker(false);
    };

    const [isOn, setIsOn] = useState(false);

    return (
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

            {/*Month Show section*/}
            <div style={{position: 'relative', maxWidth: '400px', marginBottom: '20px'}}>
                <button
                    className="flex items-center justify-between gap-2"
                    style={{
                        backgroundColor: '#3f51b5',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '6px',
                        width: '100%',
                    }}
                    onClick={() => setShowPicker(!showPicker)}
                >
                    <div className="flex items-center gap-2">
                        <CalendarDays/>
                        <span>
            {range[0].startDate.toDateString()} - {range[0].endDate.toDateString()}
        </span>
                    </div>
                    <ArrowDown className="cursor-pointer"/>
                </button>


                {showPicker && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 100,
                        backgroundColor: 'white',
                        border: '1px solid #ddd',
                        boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
                        display: 'flex'
                    }}>
                        <div style={{borderRight: '1px solid #eee', padding: '10px'}}>
                            {presetRanges.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handlePresetClick(item.range)}
                                    style={{padding: '6px 10px', cursor: 'pointer', whiteSpace: 'nowrap'}}
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                        />
                    </div>
                )}
            </div>

            {/*button section*/}
            <div className="flex items-center justify-center gap-4 text-[#3f51b5] ">

                <button
                    onClick={() => setIsOn(!isOn)}
                    className="flex items-center gap-3 bg-white px-4 py-3 rounded-md cursor-pointer"
                >
                    <div
                        className={`relative w-10 h-5 flex items-center rounded-full transition-colors duration-300 ${
                            isOn ? "bg-blue-500" : "bg-gray-400"
                        }`}
                    >
                        <div
                            className={`absolute w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
                                isOn ? "translate-x-5" : "translate-x-1"
                            }`}
                        />
                    </div>
                    <span className="text-sm font-medium">Show References</span>
                </button>


                <button className="px-4 py-2 border border-[#3f51b5] rounded-md flex items-center gap-2 cursor-pointer">
                    <RotateCw className="w-4 h-4"/>
                    Reset Profit
                </button>

                <button className="px-4 py-2 border border-[#3f51b5] rounded-md flex items-center gap-2 cursor-pointer">
                    <Trash2 className="w-4 h-4 text-red-400"/>
                    Delete
                </button>

            </div>


        </div>
    );
};

export default ButtonDate;
