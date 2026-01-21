import React, { useState } from 'react';

const CalenderData = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = getDaysInMonth(month, year);

    const calendar = [];
    for (let i = 0; i < firstDayIndex; i++) {
      calendar.push('');
    }
    for (let i = 1; i <= totalDays; i++) {
      calendar.push(i);
    }
    return calendar;
  };

  const goToPrevMonth = () => {
    setCurrentDate(prev => {
      const month = prev.getMonth();
      const year = prev.getFullYear();
      if (month === 0) {
        return new Date(year - 1, 11, 1);
      } else {
        return new Date(year, month - 1, 1);
      }
    });
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const month = prev.getMonth();
      const year = prev.getFullYear();
      if (month === 11) {
        return new Date(year + 1, 0, 1);
      } else {
        return new Date(year, month + 1, 1);
      }
    });
  };

  const dates = generateCalendar();

  return (
    <div className="bg-gray-50 dark:bg-black dark:ring-[1px]  rounded-2xl shadow-md p-4  mx-auto mt-10">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPrevMonth} className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center text-lg text-gray-600 hover:bg-gray-300">
          &lt;
        </button>
        <div className="text-center">
          <div className="text-pink-500 font-bold text-lg uppercase">
            {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
          </div>
          <div className="text-pink-400 text-xs mt-1">
            {today.toDateString()}
          </div>
        </div>
        <button onClick={goToNextMonth} className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center text-lg text-gray-600 hover:bg-gray-300">
          &gt;
        </button>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 border-b border-pink-300 pb-2">
        {days.map((day, index) => (
          <div key={index} className="py-2">{day}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 text-center text-sm mt-2 gap-y-2">
        {dates.map((date, index) => (
          <div 
            key={index}
            className={`h-10 w-10 flex items-center justify-center mx-auto
                        ${date === today.getDate() &&
                          currentDate.getMonth() === today.getMonth() &&
                          currentDate.getFullYear() === today.getFullYear()
                          ? 'bg-pink-500 text-white rounded-full'
                          : 'text-gray-600-600 dark:text-gray-300'
                        }`}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalenderData;
