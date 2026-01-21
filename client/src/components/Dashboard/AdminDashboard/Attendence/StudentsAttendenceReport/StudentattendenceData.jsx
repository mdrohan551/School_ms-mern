import React, { useState, useMemo } from 'react';
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { format, parseISO } from 'date-fns';
import Pagination from "../../../Pagination.jsx";
import { useAllClassesQuery } from "../../../../../redux/Features/createClassAdmin/ClassCreateAdmin.js";

// For Excel export
import * as XLSX from 'xlsx';

const StudentattendenceData = ({ attendanceData }) => {
    // State for sorting (true = ascending, false = descending)
    const [sort, setSort] = useState({
        Date: true,
        Day: true,
        ID: true,
        Name: true,
        Class: true,
        Status: true,
    });

    // Search term for filtering
    const [searchTerm, setSearchTerm] = useState('');

    // Toggle sort direction for a column
    const toggleSort = (field) => {
        setSort((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    // Fetch all classes from API
    const { data: classesData, isLoading: classesLoading } = useAllClassesQuery();
    const classesMap = useMemo(() => {
        const map = {};
        classesData?.data?.forEach((cls) => {
            map[cls._id] = cls.name;
        });
        return map;
    }, [classesData]);

    // Extract and process attendance data
    const rawData = attendanceData?.data || [];
    const hasData = rawData.length > 0;

    const processedData = useMemo(() => {
        return rawData.map((item) => {
            const dateObj = parseISO(item.date);
            return {
                ...item,
                formattedDate: format(dateObj, 'MMM d, yyyy'),
                day: format(dateObj, 'EEEE'),
                id: item.ID,
                name: item.studentName,
                classID: item.classID,
                className: classesMap[item.classID] || 'Unknown Class',
            };
        });
    }, [rawData, classesMap]);

    // Filter data based on search term
    const filteredData = useMemo(() => {
        return processedData.filter((item) =>
            item.formattedDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [processedData, searchTerm]);

    // Sort filtered data
    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            for (const [key, isAsc] of Object.entries(sort)) {
                if (isAsc === null) continue;

                let fieldA, fieldB;

                switch (key) {
                    case 'Date':
                        fieldA = new Date(a.date);
                        fieldB = new Date(b.date);
                        return isAsc ? fieldA - fieldB : fieldB - fieldA;
                    case 'Day':
                        fieldA = a.day;
                        fieldB = b.day;
                        break;
                    case 'ID':
                        fieldA = a.id;
                        fieldB = b.id;
                        break;
                    case 'Name':
                        fieldA = a.name;
                        fieldB = b.name;
                        break;
                    case 'Class':
                        fieldA = a.className;
                        fieldB = b.className;
                        break;
                    case 'Status':
                        fieldA = a.status;
                        fieldB = b.status;
                        break;
                    default:
                        return 0;
                }

                if (fieldA < fieldB) return isAsc ? -1 : 1;
                if (fieldA > fieldB) return isAsc ? 1 : -1;
                return 0;
            }
            return 0;
        });
    }, [filteredData, sort]);

    // Pagination
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    // Export to CSV
    const handleCSVExport = () => {
        const headers = ['Date', 'Day', 'ID', 'Name', 'Class', 'Status'];
        const csvRows = [headers];

        sortedData.forEach((item) => {
            csvRows.push([
                item.formattedDate,
                item.day,
                item.id || '',
                item.name,
                item.className,
                item.status,
            ]);
        });

        const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((row) => row.join(',')).join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'attendance_report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Copy to clipboard (tab-separated)
    const handleCopy = () => {
        const text = sortedData
            .map((item) => `${item.formattedDate}\t${item.day}\t${item.id || ''}\t${item.name}\t${item.className}\t${item.status}`)
            .join('\n');

        navigator.clipboard.writeText(text).then(() => {
            alert('Data copied to clipboard!');
        }).catch((err) => {
            console.error('Copy failed:', err);
        });
    };

    // Export to Excel
    const handleExcelExport = () => {
        const worksheetData = sortedData.map((item) => ({
            Date: item.formattedDate,
            Day: item.day,
            ID: item.id || '',
            Name: item.name,
            Class: item.className,
            Status: item.status,
        }));

        const ws = XLSX.utils.json_to_sheet(worksheetData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
        XLSX.writeFile(wb, 'attendance_report.xlsx');
    };

    if (classesLoading) {
        return <p className="text-center py-4">Loading class data...</p>;
    }

    return (
        <div className="text-white rounded-lg overflow-hidden">
            {/* Action Buttons & Search */}
            <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-3 sm:gap-6 w-full mb-6">
                <div className="flex flex-wrap items-center gap-3 ml-4">
                    {[
                        { label: 'Copy', onClick: handleCopy },
                        { label: 'CSV', onClick: handleCSVExport },
                        { label: 'Excel', onClick: handleExcelExport },
                    ].map((btn) => (
                        <button
                            key={btn.label}
                            onClick={btn.onClick}
                            className="flex items-center px-4 py-2.5 bg-[#5E5E5E] rounded-full gap-2 hover:bg-blue-800 text-white cursor-pointer w-full sm:w-auto"
                        >
                            <span>{btn.label}</span>
                        </button>
                    ))}
                </div>
                <div className="space-x-2">
                    <label htmlFor="search" className="text-xl">Search:</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="border border-gray-500 rounded-3xl px-3 py-2 focus:outline-none w-full sm:w-auto"
                    />
                </div>
            </div>

            {/* Table Header */}
            <div className="flex flex-col md:flex-row items-center justify-between dark:bg-gray-900 bg-gray-400 p-4 mb-4 shadow-md">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold">Attendance Report</h1>
                </div>
                <div className="text-sm text-gray-300 mt-2 md:mt-0">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length} entries
                </div>
            </div>

            {/* Visible Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-700 text-white">
                    <tr>
                        <th onClick={() => toggleSort('Date')} className="px-4 py-3 border-b border-gray-600 cursor-pointer hover:bg-gray-600 transition">
                            <div className="flex items-center space-x-2">
                                <span>Date</span>
                                <FaLongArrowAltUp className={sort.Date ? 'text-white' : 'text-gray-400'} />
                                <FaLongArrowAltDown className={!sort.Date ? 'text-white' : 'text-gray-400'} />
                            </div>
                        </th>
                        <th onClick={() => toggleSort('Day')} className="px-4 py-3 border-b border-gray-600 cursor-pointer hover:bg-gray-600 transition">
                            <div className="flex items-center space-x-2">
                                <span>Day</span>
                                <FaLongArrowAltUp className={sort.Day ? 'text-white' : 'text-gray-400'} />
                                <FaLongArrowAltDown className={!sort.Day ? 'text-white' : 'text-gray-400'} />
                            </div>
                        </th>
                        <th onClick={() => toggleSort('ID')} className="px-4 py-3 border-b border-gray-600 cursor-pointer hover:bg-gray-600 transition">
                            <div className="flex items-center space-x-2">
                                <span>ID</span>
                                <FaLongArrowAltUp className={sort.ID ? 'text-white' : 'text-gray-400'} />
                                <FaLongArrowAltDown className={!sort.ID ? 'text-white' : 'text-gray-400'} />
                            </div>
                        </th>
                        <th onClick={() => toggleSort('Name')} className="px-4 py-3 border-b border-gray-600 cursor-pointer hover:bg-gray-600 transition">
                            <div className="flex items-center space-x-2">
                                <span>Name</span>
                                <FaLongArrowAltUp className={sort.Name ? 'text-white' : 'text-gray-400'} />
                                <FaLongArrowAltDown className={!sort.Name ? 'text-white' : 'text-gray-400'} />
                            </div>
                        </th>
                        <th onClick={() => toggleSort('Class')} className="px-4 py-3 border-b border-gray-600 cursor-pointer hover:bg-gray-600 transition">
                            <div className="flex items-center space-x-2">
                                <span>Class</span>
                                <FaLongArrowAltUp className={sort.Class ? 'text-white' : 'text-gray-400'} />
                                <FaLongArrowAltDown className={!sort.Class ? 'text-white' : 'text-gray-400'} />
                            </div>
                        </th>
                        <th className="px-4 py-3 border-b border-gray-600 font-semibold">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!hasData ? (
                        <tr>
                            <td colSpan={6} className="p-6 text-center text-gray-400 text-lg">
                                No data available in table
                            </td>
                        </tr>
                    ) : currentItems.length > 0 ? (
                        currentItems.map((item, idx) => (
                            <tr
                                key={item._id || idx}
                                className="bg-gray-200 dark:bg-blue-950 text-gray-900 dark:text-gray-300 transition duration-150"
                            >
                                <td className="px-4 py-3 border-b border-gray-600">{item.formattedDate}</td>
                                <td className="px-4 py-3 border-b border-gray-600">{item.day}</td>
                                <td className="px-4 py-3 border-b border-gray-600">{item.id || '-'}</td>
                                <td className="px-4 py-3 border-b border-gray-600">{item.name || '-'}</td>
                                <td className="px-4 py-3 border-b border-gray-600">{item.className}</td>
                                <td className="px-4 py-3 border-b border-gray-600">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                                                item.status === 'Present' ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                        >
                                            {item.status}
                                        </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="p-6 text-center text-gray-400 text-lg">
                                No matching data found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {hasData && sortedData.length > 0 && (
                <div className="flex justify-around my-6">
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </div>
    );
};

export default StudentattendenceData;