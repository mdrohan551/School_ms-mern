import React, { useState } from 'react';
import { ChevronDown, CalendarDays } from "lucide-react";
import { DateRange } from 'react-date-range';
import {
    startOfToday,
    subDays,
    subMonths,
    startOfMonth,
    endOfMonth,
    format
} from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateForm = ({ onDateChange }) => {
    const [showPicker, setShowPicker] = useState(false);

    // Default: Last Month start date (you can change)
    const defaultDate = subDays(new Date(), 1); // yesterday as default

    const [selectedDate, setSelectedDate] = useState(defaultDate);

    // Preset dates (single date)
    const presets = [
        { label: 'Today', date: startOfToday() },
        { label: 'Yesterday', date: subDays(startOfToday(), 1) },
        { label: '1st of This Month', date: startOfMonth(new Date()) },
        { label: '1st of Last Month', date: startOfMonth(subMonths(new Date(), 1)) },
        { label: 'Clear Date', date: null },
    ];

    // Format: YYYY-M-D (like 2025-8-6)
    const formatDateForAPI = (date) => {
        if (!date) return null;
        const d = new Date(date);
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    };

    const handlePresetClick = (date) => {
        setSelectedDate(date);
        onDateChange(formatDateForAPI(date)); // send formatted date
        setShowPicker(false);
    };

    const handleDateChange = (ranges) => {
        const date = ranges.selection.startDate;
        setSelectedDate(date);
        onDateChange(formatDateForAPI(date));
    };

    const displayText = () => {
        if (!selectedDate) return 'Select Date';
        return format(selectedDate, 'MMM d, yyyy'); // Aug 6, 2025
    };

    const selectionRange = {
        startDate: selectedDate || new Date(),
        endDate: selectedDate || new Date(),
        key: 'selection',
    };

    return (
        <div className="mt-8">
            <div style={{ position: 'relative', maxWidth: '400px', marginBottom: '20px' }}>
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
                        <CalendarDays size={18} />
                        <span>{displayText()}</span>
                    </div>
                    <ChevronDown className="cursor-pointer" />
                </button>

                {showPicker && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 100,
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid #ddd',
                        boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
                        display: 'flex',
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}>
                        <div style={{ borderRight: '1px solid #eee', padding: '10px', backgroundColor: '#f9f9f9' }}>
                            {presets.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handlePresetClick(item.date)}
                                    style={{
                                        padding: '8px 12px',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        borderRadius: '4px',
                                        margin: '2px 0',
                                        fontWeight: 500,
                                        color: '#333',
                                    }}
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>
                        <DateRange
                            editableDateInputs={true}
                            onChange={handleDateChange}
                            moveRangeOnFirstSelection={false}
                            ranges={[selectionRange]}
                            rangeColors={['#3f51b5']}
                            dateDisplayFormat="MMM d, yyyy"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DateForm;