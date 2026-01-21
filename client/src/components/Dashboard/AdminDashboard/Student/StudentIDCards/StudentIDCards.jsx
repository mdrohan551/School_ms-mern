import React, {useRef, useState} from 'react';
import {IoHomeOutline, IoSearchOutline} from "react-icons/io5";
import {FaPrint} from "react-icons/fa6";
import {FaPencilRuler} from "react-icons/fa";
import {TfiReload} from "react-icons/tfi";
import {ImCross} from "react-icons/im";
import Card from "./Card.jsx";

const StudentIdCards = () => {
    const printRef = useRef();



    const handlePrint = () => {
        const content = printRef.current;
        if (!content) return;

        const contentClone = content.cloneNode(true);

        contentClone.querySelectorAll('.print\\:hidden').forEach(btn => btn.remove());

        const printWindow = window.open('', '_blank');

        printWindow.document.write(`
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                <style>   
                    @media print {
                        .print-area {
                            display: grid !important;
                            grid-template-columns: repeat(4, 1fr);
                            gap: 0px;
                            padding: 20px;
                            page-break-before: auto;
                            page-break-after: auto;
                          
                        }
                        .id-card {
                            break-inside: avoid;
                            page-break-inside: avoid;
                            display: block;
                            background: white;
                            padding: 10px;
                            box-sizing: border-box;
                            border: 1px solid #000;
                        }
                        body {
                            margin: 0 !important;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        .no-print {
                            display: none !important;
                        }
                    }
                
                </style>
            </head>
            <body>${contentClone.innerHTML}</body>
        </html>
    `);

        printWindow.document.close();
        printWindow.focus();

        printWindow.onload = () => {
            printWindow.print();
            printWindow.close();
        };
    };

    return (<div className="px-2 sm:px-4">

            {/* Header (প্রিন্টে দেখাবে না) */}
            <div
                className="max-w-full mx-auto shadow rounded-xl p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-gray-100/10 mt-4 print:hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full">
                    <h1 className="text-xl font-semibold">Students</h1>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <IoHomeOutline className="text-lg"/>
                        <span>- All Students</span>
                    </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
                    <button
                        onClick={handlePrint}
                        className="flex items-center justify-center gap-2 px-3 py-2 w-full sm:w-auto bg-white dark:bg-blue-950 rounded-lg shadow hover:bg-blue-800 hover:text-white transition"
                    >
                        <FaPrint/>
                        <span>Print</span>
                    </button>
                </div>
            </div>

            {/* Card প্রিন্ট করার অংশ */}
            <div ref={printRef} className="max-w-full">
                <div className="id-card">
                    <Card className={"sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 avoid-break p-2"}/>

                </div>
            </div>
        </div>);
};

export default StudentIdCards;
