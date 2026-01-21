import React, { useState, useMemo } from 'react';
import CardData from "./cardData.jsx";
import * as XLSX from 'xlsx';
import Pagination from "../../../Pagination.jsx";

const Card = ({ allStudent,allClasses, total, currentPage, setCurrentPage, totalPages ,endStudent,startStudent}) => {
    const [searchText, setSearchText] = useState("");



    // Filter student list by searchText (name, registrationNumber, userName)
    const filteredStudents = useMemo(() => {
        return allStudent
            .filter(s =>
                s.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                s.registrationNumber?.toString().includes(searchText) ||
                s.userName?.toLowerCase().includes(searchText.toLowerCase())
            )
            .map(student => {
                const matchedClass = allClasses?.data?.find(cls => cls._id === student.classID);
                return {
                    ...student,
                    className: matchedClass ? matchedClass.name : 'Unknown Class',
                };
            });
    }, [allStudent, allClasses, searchText]);


    // Copy selected students text to clipboard
    const handleCopy = () => {
        const text = filteredStudents
            .map(s => `${s.registrationNumber}\t${s.name}\t${s.className || 'N/A'}\t${s.userName || 'N/A'} 'N/A'}`)
            .join('\n');
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard");
    };

    // Export filtered students to CSV
    const handleCSV = () => {
        const header = "ID,Student Name,Class,Username,Password\n";
        const rows = filteredStudents
            .map(s => `${s.registrationNumber},${s.name},${s.className || ''},${s.userName || ''} ''}`)
            .join('\n');
        const blob = new Blob([header + rows], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "students.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    // Export filtered students to Excel
    const handleExcel = () => {
        const dataToExport = filteredStudents.map(s => ({
            ID: s.registrationNumber,
            "Student Name": s.name,
            Class: s.className || '',
            Username: s.userName || '',

        }));
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Students");
        XLSX.writeFile(wb, "students.xlsx");
    };

    // Print filtered students
    const handlePrint = () => {
        let printContent = `<table border="1" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
            <thead>
                <tr style="background-color: #555; color: white;">
                    <th style="padding: 8px;">ID</th>
                    <th style="padding: 8px;">Student Name</th>
                    <th style="padding: 8px;">Class</th>
                    <th style="padding: 8px;">Username</th>
            
                </tr>
            </thead>
            <tbody>`;

        filteredStudents.forEach(s => {
            printContent += `<tr>
                <td style="padding: 8px;">${s.registrationNumber}</td>
                <td style="padding: 8px;">${s.name}</td>
                <td style="padding: 8px;">${s.className || ''}</td>
                <td style="padding: 8px;">${s.userName || ''}</td>
            </tr>`;
        });

        printContent += `</tbody></table>`;

        const printWindow = window.open("", "", "width=900,height=700");
        printWindow.document.write(`<html><head><title>Print Students</title></head><body>${printContent}</body></html>`);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    return (
        <div>
            <div className="shadow rounded-3xl p-5 mt-4 ">
                <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-3 sm:gap-6 w-full">
                    <div className="flex flex-wrap items-center gap-3 ml-4">
                        <button onClick={handleCopy} className="px-4 py-2.5 bg-gray-700 text-white rounded-full hover:bg-blue-800">Copy</button>
                        <button onClick={handleCSV} className="px-4 py-2.5 bg-gray-700 text-white rounded-full hover:bg-blue-800">CSV</button>
                        <button onClick={handleExcel} className="px-4 py-2.5 bg-gray-700 text-white rounded-full hover:bg-blue-800">Excel</button>
                        <button onClick={handlePrint} className="px-4 py-2.5 bg-gray-700 text-white rounded-full hover:bg-blue-800">Print</button>

                    </div>

                    <div className="space-x-2">

                        <label htmlFor="search" className="text-xl">Search :</label>
                        <input
                            id="search"
                            type="text"
                            placeholder="Search by Name, RegNo, Username..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="border placeholder:text-[0.8rem] border-gray-500 placeholder:text-gray-400 rounded-3xl px-3 py-2 focus:outline-none w-full sm:w-auto"
                        />
                    </div>
                </div>
                <div>
                    <p className="mt-8 -mb-4 text-gray-700 dark:text-white text-sm">Showing {startStudent} to {endStudent} of {total} entries</p>
                    <div className="mt-4">
                        <CardData allStudent={filteredStudents} allClasses={allClasses}  />
                    </div>
                </div>

                <Pagination  total={total} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default Card;
