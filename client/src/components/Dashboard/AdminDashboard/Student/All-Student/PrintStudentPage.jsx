import React, {useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSingleStudentQuery } from '../../../../../redux/Features/StudentCreateAdmin/StudentCreateAdmin';
import { useGetSchoolSingleDetailsQuery } from "../../../../../redux/Features/SchoolAdmin/GeneralSettingsApi.js";

const PrintStudentPage = () => {
    const { id } = useParams();
    const { data: singleStudentData, isLoading } = useSingleStudentQuery(id, { skip: !id });
    const { data: schollDetails, isLoading: detailloading, error, refetch } = useGetSchoolSingleDetailsQuery();

    const printRef = useRef();
    const school = schollDetails?.data?.[0];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">Loading student data...</p>
            </div>
        );
    }

    const student = singleStudentData?.data?.[0];

    if (!student) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-red-500">Student data not found.</p>
            </div>
        );
    }
    const handlePrint = () => {
        const content = printRef.current;

        if (!content) return;

        // Clone content so we can remove the print button
        const contentClone = content.cloneNode(true);

        // Remove the button div with class 'print:hidden'
        const printButton = contentClone.querySelector('.print\\:hidden');
        if (printButton) {
            printButton.remove();
        }

        const printWindow = window.open('', '_blank');

        printWindow.document.write(`
        <html>
            <head>
                <title>Print - ${student?.name || 'Student Admission Letter'}</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css">
                <style>
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    .logoImage{
                    background:purple;
                    padding: 30px;
                    opacity: 3%;
                    
                    
                    }
                    body {
                        margin: 0;
                        padding: 10px 50px;
                        font-family: sans-serif;
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


    return (
        <div
            ref={printRef}
            className="w-[800px] relative z-50 h-[1000px] mx-auto p-10 bg-white text-black font-sans shadow-lg"

        >
            <img
                src={school?.logoImage ? school?.logoImage : "/images/no-image.jpg"}
                alt="School Logo"
                className="w-90 h-90 rounded-full logoImage opacity-2 -z-10 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
            />
            {/* Header */}
            <header className="flex justify-between items-center border-b pb-4 mb-6">
                <img
                    src={school?.logoImage ? school?.logoImage : "/images/no-image.jpg"}
                    alt="School Logo"
                    className="w-20 h-20 rounded-full"
                />
                <div className="text-center flex-1 mx-6">
                    <h2 className="text-xl font-bold uppercase">{school?.instituteName || "N/A"}</h2>
                    <p className="text-sm">{school?.tagline || "N/A"}</p>
                    <p className="text-sm">{school?.countresAndZila || "N/A"}</p>
                    <h2 className="text-xl font-semibold mt-3">Student Admission Letter</h2>
                </div>
                <div className="w-20 h-20" /> {/* empty space for symmetry */}
            </header>

            {/* Main Body */}
            <main className="text-sm space-y-6">
                <div className="flex items-center gap-6">
                    <img
                        src={student.image || '/images/no-image.png'}
                        alt={student.name}
                        className="w-24 h-24 rounded border object-cover"
                    />
                    <div className="space-y-1">
                        <p><span className="font-semibold">Name:</span> {student.name || 'N/A'}</p>
                        <p><span className="font-semibold">Date of Birth:</span> {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                        <p>
                            <span className="font-semibold">Mobile:</span>{' '}
                            {student.phone ? (
                                <a href={`tel:${student.phone}`} className="text-blue-600 underline">{student.phone}</a>
                            ) : (
                                'N/A'
                            )}
                        </p>
                        <p>
                            <span className="font-semibold">Email:</span>{' '}
                            {student.email ? (
                                <a href={`mailto:${student.email}`} className="text-blue-600 underline">{student.email}</a>
                            ) : (
                                'N/A'
                            )}
                        </p>
                    </div>
                </div>

                {/* Student Details Grid */}
                <div className="grid grid-cols-2 gap-6 text-xs">
                    <p><span className="font-semibold">Gender:</span> {student.gender || 'N/A'}</p>
                    <p><span className="font-semibold bg-yellow-100">Registration Number:</span> {student.registrationNumber}</p>
                    <p><span className="font-semibold">Birth ID:</span> {student.birthID || 'N/A'}</p>
                    <p><span className="font-semibold bg-yellow-100">Website User-Name:</span> {student.userName}</p>
                    <p><span className="font-semibold">Religion:</span> {student.religion || 'N/A'}</p>
                    <p><span className="font-semibold bg-yellow-100">Website Password:</span> {student.password}</p>
                    <p><span className="font-semibold">Date of Admission:</span> {student.dateOfAdmission ? new Date(student.dateOfAdmission).toLocaleDateString() : 'N/A'}</p>
                    <p><span className="font-semibold">Father's Name:</span> {student.FatherName || 'N/A'}</p>
                    <p><span className="font-semibold">Father's National ID:</span> {student.FatherNationalID || 'N/A'}</p>
                    <p><span className="font-semibold">Father's Profession:</span> {student.profession || 'N/A'}</p>
                    <p><span className="font-semibold">Phone:</span> {student.phone || 'N/A'}</p>
                    <p><span className="font-semibold">Address:</span> {student.address || 'N/A'}</p>
                    <p><span className="font-semibold">Class:</span> {student.classDetails?.name || 'N/A'}</p>
                    <p><span className="font-semibold">Monthly Fee:</span> {student.classDetails?.monthlyFees ? `$${student.classDetails.monthlyFees}` : 'N/A'}</p>
                    <p><span className="font-semibold">Discount:</span> {student.discount ? `${student.discount}%` : 'N/A'}</p>
                    <p><span className="font-semibold">Previous School:</span> {student.previousSchool || 'N/A'}</p>
                    <p><span className="font-semibold">Total Siblings:</span> {student.totalSiblings || 'N/A'}</p>
                    <p><span className="font-semibold">Blood Group:</span> {student.bloodGroup || 'N/A'}</p>
                    <p><span className="font-semibold">Role:</span> {student.role || 'N/A'}</p>
                    <p><span className="font-semibold">Note:</span> {student.note || 'N/A'}</p>
                </div>

                {/* Rules and Regulations for Students */}
                <div className="mt-6">
                    <h3 className="text-md font-bold mb-2">Rules and Regulations:</h3>
                    <ol className="list-decimal list-inside text-sm space-y-1 ">
                        <li className="bg-yellow-100">Respect all teachers, staff, and fellow students.</li>
                        <li className="bg-yellow-100">Maintain school property and cleanliness at all times.</li>
                        <li className="bg-yellow-100">Come to school on time, in proper uniform.</li>
                        <li className="bg-yellow-100">Use mobile phones only with permission in designated areas.</li>
                        <li className="bg-yellow-100">Participate actively in all school activities.</li>
                        <li className="bg-yellow-100">Follow all official instructions and school policies.</li>
                    </ol>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-10 pt-8 flex justify-between text-center text-sm">
                <div>
                    <div className="border-t w-40 mx-auto"></div>
                    <p className="mt-1">Signature of Authority</p>
                </div>
                <div>
                    <div className="border-t w-40 mx-auto"></div>
                    <p className="mt-1">School Teacher</p>
                </div>
            </footer>

            <div className="text-right text-xs mt-4 text-gray-500">Page 1/1</div>

            {/* Print Button */}
            <div className="mt-8 text-center print:hidden">
                <button
                    onClick={handlePrint}
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Print
                </button>
            </div>
        </div>
    );
};

export default PrintStudentPage;
