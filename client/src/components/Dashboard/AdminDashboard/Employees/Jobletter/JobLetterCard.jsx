import React from "react";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import ReactDOMServer from "react-dom/server";
import PrintableJobLetter from "./PrintableJobLetter"; // Import the PrintableJobLetter component

const JobLetterCard = ({ emp ,data}) => {
    // Details for the left column of the card
console.log(data)
    const leftDetails = [
        { name: "Registration/ID", value: emp._id || "N/A" },
        { name: "Employee Role", value: emp.role || "N/A" },
        {
            name: "Date of Joining",
            value: emp.dateOfJoining
                ? new Date(emp.dateOfJoining).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })
                : "N/A",
        },
        { name: "Account Status", value: emp.status || "N/A" },
    ];

    // Details for the right column of the card
    const rightDetails = [
        { name: "Username", value: emp.name || "N/A" },
        { name: "Password", value: emp.password || "N/A" },
    ];

    // Function to handle printing the job letter
    const handlePrint = () => {
        // Render the PrintableJobLetter component to a string
        const printContentString = ReactDOMServer.renderToString(<PrintableJobLetter emp={emp} data={data} />);


        // Open a new window for printing
        const printWindow = window.open("", "_blank");

        // Write the HTML content to the new window
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print - ${emp.name || 'Job Letter'}</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css">
                    <style>
                        /* Custom styles for printing, if needed */
                        @page {
                            size: A4;
                            margin: 0;
                        }
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: sans-serif;
                        }
                        /* Ensure the printable container takes full page */
                        .w-[794px] {
                            width: 210mm; /* A4 width */
                        }
                        .h-[1123px] {
                            height: 297mm; /* A4 height */
                        }
                    </style>
                </head>
                <body>
                    ${printContentString}
                </body>
            </html>
        `);

        printWindow.document.close();
        // Focus the new window, print, and then close it
        printWindow.onload = () => {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        };
    };

    return (
        // Main container for the job letter card
        <div className="flex items-center bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 space-x-8 font-sans">
            {/* Employee Image and Name Section */}
            <div className="flex flex-col items-center w-32">
                <img
                    src={emp.image || "/images/no-image.png"}
                    alt={emp.name}
                    className="w-20 h-20 rounded-full ring-2 ring-blue-600 object-cover"
                />
                <h3 className="mt-3 font-bold text-lg text-gray-800 dark:text-white">{emp.name}</h3>
            </div>

            {/* Employee Details Section (Left and Right Columns) */}
            <div className="flex flex-1 justify-around text-xs text-gray-600 dark:text-gray-300">
                {/* Left Details Column */}
                <ul className="space-y-3">
                    {leftDetails.map((item, idx) => (
                        <li key={idx} className="leading-snug">
                            <p className="text-[0.65rem] font-semibold text-gray-400 mb-0.5">
                                {item.name}
                            </p>
                            <div className="flex items-center gap-1 font-bold text-[0.7rem] text-gray-700 dark:text-gray-200">
                                <MdOutlineSubdirectoryArrowRight className="text-gray-400" />
                                {item.name === "Account Status" && item.value === "Active" ? (
                                    <span className="text-green-600 font-semibold">✔ Active</span>
                                ) : (
                                    item.value
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Right Details Column */}
                <ul className="space-y-3">
                    {rightDetails.map((item, idx) => (
                        <li key={idx} className="leading-snug">
                            <p className="text-[0.65rem] font-semibold text-gray-400 mb-0.5">
                                {item.name}
                            </p>
                            <div className="flex items-center gap-1 font-bold text-[0.7rem] text-gray-700 dark:text-gray-200">
                                <MdOutlineSubdirectoryArrowRight className="text-gray-400" />
                                {item.value}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Print Button */}
            <button
                onClick={handlePrint}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9V2h12v7M6 18h12v4H6v-4zm6-10v6"
                    />
                </svg>
                Print Job Letter
            </button>
        </div>
    );
};

export default JobLetterCard;