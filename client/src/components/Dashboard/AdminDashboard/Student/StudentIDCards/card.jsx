import React, { useState } from 'react';
import QRCode from "react-qr-code";
import Barcode from "react-barcode";
import { useGetSchoolSingleDetailsQuery } from "../../../../../redux/Features/SchoolAdmin/GeneralSettingsApi.js";
import { useGetAllStudentsQuery } from "../../../../../redux/Features/StudentCreateAdmin/StudentCreateAdmin.js";
import { useAllClassesQuery } from "../../../../../redux/Features/createClassAdmin/ClassCreateAdmin.js";

const Card = ({ className }) => {
    const { data: schollDetails } = useGetSchoolSingleDetailsQuery();
    const { data: studentData = [] } = useGetAllStudentsQuery();
    const { data: classData = [] } = useAllClassesQuery();

    const school = schollDetails?.data?.[0];
    const styleOptions = ['default', 'style1', 'style2', 'style3'];
    const [selectedStyle, setSelectedStyle] = useState('default');

    const renderCardByStyle = (style, student) => {
        const image = student.image && student.image !== "null" && student.image !== null
            ? student.image
            : "/images/no-image.png";

        const barvalue = `${student.registrationNumber}`;

        const barcode = (
            <Barcode
                value={barvalue}
                width={1.2}
                height={40}
                fontSize={10}
                displayValue={false}
            />
        );

        const matchedClass = classData?.data?.find((cls) => cls?._id === student.classID);
        const className = matchedClass?.name || "Unknown";
        const qrValue = `Name: ${student.name}\nID: ${student.registrationNumber}\nClass: ${className}`;
        const Qcode = ({ size }) => {
            return <QRCode value={qrValue} size={size} />;
        };
        const doa = new Date(student.dateOfAdmission).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

        // Add 'id-card' class to the main div for each style
        switch (style) {
            case 'style1':
                return (
                    <div className="bg-white border border-blue-300 rounded-xl shadow p-4 w-70 flex flex-col items-center text-center relative overflow-hidden id-card">
                        <div className="absolute top-[80px] left-0 w-full h-[130px] z-0">
                            <div className="absolute  -z-10 left-0 top-0 w-50 h-50 bg-blue-300/50 rounded-3xl rotate-45 origin-top-left opacity-90"></div>
                            <div className="absolute -z-10 right-0 top-0 w-50 h-50 bg-blue-300/50 rounded-3xl -rotate-45 origin-top-right opacity-90"></div>
                        </div>
                        <img src={school?.logoImage} alt="logo" className="w-12 h-12 object-contain rounded-full mb-1 z-10" />
                        <h2 className="font-bold text-[15px] z-10 text-gray-800">{school?.instituteName || "IT Institute Solution"}</h2>
                        <p className="text-sm text-gray-500 -mt-1 z-10">{school?.tagline || "web development"}</p>
                        <div className="z-50 flex flex-col items-center mt-2 space-y-1">
                            <div className="z-50">{<Qcode size={100} />}</div>
                            <div className="z-50">{barcode}</div>
                            <p className="font-bold">{student.name || "MD Fawjul Azim"}</p>
                        </div>
                        <div className="flex justify-between items-end w-full mt-4 text-xs text-left px-1 z-10">
                            <div className="space-y-[2px] text-gray-700">
                                <p><span className="text-black font-semibold">ID</span>: <span className="text-blue-600 font-bold">{student.registrationNumber || "10003"}</span></p>
                                <p><span className="text-black font-semibold">CLASS</span>: {className || "English"}</p>
                                <p><span className="text-black font-semibold">DOA</span>: {doa || "N/A"}</p>
                            </div>
                            <div>
                                <img src={image} alt="profile" className="w-10 h-10 rounded-full border shadow" />
                            </div>
                        </div>
                    </div>
                );

            case 'style2':
                return (
                    <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-5 rounded-2xl shadow-xl space-y-4 w-80 relative overflow-hidden id-card">
                        <div className="flex justify-between items-center">
                            <Qcode size={80} />
                            <img
                                src={school?.logoImage}
                                alt="logo"
                                className="w-12 h-12 object-contain rounded-full shadow-sm border"
                            />
                        </div>
                        <div className="text-center">
                            <h2 className="text-lg font-extrabold text-gray-800 tracking-wide">{school?.instituteName || "School Name"}</h2>
                            <p className="text-xs text-gray-600 italic">{school?.tagline || "Your Tagline Here"}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                            <img
                                src={image}
                                alt={student?.name}
                                className="w-20 h-20 rounded-full border-4 border-blue-200 shadow-md object-cover"
                            />
                            <div className="text-sm space-y-1">
                                <p className="font-bold text-blue-900 text-base">{student?.name || "Student Name"}</p>
                                <p className="font-semibold text-gray-700">ID: {student?.registrationNumber || "10001"}</p>
                                <p className="text-gray-600">Class: {className || "Not Assigned"}</p>
                                <p className="text-xs text-gray-500">DOA: {doa || "N/a"}</p>
                            </div>
                        </div>
                        <div className="flex justify-center mt-2">{barcode}</div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300/20 blur-2xl rounded-full z-0"></div>
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-300/20 blur-2xl rounded-full z-0"></div>
                    </div>
                );

            case 'style3':
                return (
                    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 border-l-8 border-blue-500 p-5 rounded-2xl shadow-xl flex flex-col justify-between relative w-72 overflow-hidden id-card">
                        <div className="absolute top-2 right-2 z-10">
                            <Qcode size={50} />
                        </div>
                        <div className="flex flex-col items-center z-10">
                            <img src={school?.logoImage} alt="logo" className="w-12 h-12 object-contain rounded-full mb-1" />
                            <p className="font-bold text-sm text-center text-gray-800">{school?.instituteName || "IT Institute"}</p>
                            <p className="text-sm text-gray-500 -mt-1 z-10">{school?.tagline || "web development"}</p>

                            <img
                                src={image}
                                alt={student.name}
                                className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-md mt-3 object-cover"
                            />
                            <h3 className="font-bold text-lg mt-2 text-blue-700 uppercase">{student.name || "Student Name"}</h3>
                            <p className="font-semibold text-sm text-gray-600">ID: {student.registrationNumber || "10001"}</p>
                            <p className="text-sm text-gray-500">Class: {className || "Not Assigned"}</p>
                            <p className="text-xs text-gray-400">DOA: {doa || "N/a"}</p>
                        </div>
                        <div className="flex justify-center mt-4 z-10">
                            {barcode}
                        </div>
                        <div className="absolute bottom-0 left-0 w-28 h-28 bg-purple-200/30 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl z-0"></div>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/30 rounded-full translate-x-1/3 -translate-y-1/3 blur-2xl z-0"></div>
                    </div>
                );



            default:
                return (
                    <div className="bg-white border p-4 rounded-xl w-64 shadow text-center id-card">
                        <img src={school?.logoImage} className="w-12 h-12 mx-auto rounded-full" />
                        <h2 className="font-bold text-gray-800">{school?.instituteName}</h2>
                        <img src={image} className="w-20 h-20 rounded-full border shadow mx-auto mt-2" />
                        <div className="flex justify-center gap-2 mt-2">{barcode}</div>
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col items-start">
                                <p className="text-sm">{student.name}</p>
                                <p className="font-bold text-gray-800 ">ID: {student.registrationNumber}</p>
                                <p className="text-sm text-gray-800 ">Class: {className}</p>
                                <p className="text-sm text-gray-800 ">DOA: {doa || "N/a"}</p>
                            </div>
                            <div className="flex items-end">
                                <div className="ring p-1 shadow-xl rounded">
                                    <Qcode size={70} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="mt-10 px-2 sm:px-4">
            <div className="flex flex-wrap gap-3 justify-center font-medium mb-6 no-print">
                {styleOptions.map((style, i) => (
                    <button
                        key={style}
                        onClick={() => setSelectedStyle(style)}
                        className={`px-4 py-2 rounded-md border shadow text-xl sm:text-2xl transition ${
                            selectedStyle === style
                                ? 'bg-blue-800 text-white'
                                : 'bg-white text-blue-800 hover:bg-blue-800 hover:text-white'
                        }`}
                    >
                        {style === 'default' ? 'Default' : `Style ${i}`}
                    </button>
                ))}
            </div>

            <div className={`grid grid-cols-1 gap-6 ${className}`} >
                {studentData?.data?.map((student) => (
                    <div key={student._id} className="id-card-wrapper">
                        {renderCardByStyle(selectedStyle, student)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;