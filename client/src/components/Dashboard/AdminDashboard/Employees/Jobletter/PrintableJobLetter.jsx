import React from "react";
import QRCode from "react-qr-code";

const PrintableJobLetter = ({ emp, data }) => {
    const details = data?.[0] || {};
    const joiningDate = emp.dateOfJoining
        ? new Date(emp.dateOfJoining).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "N/A";

    const profileUrl = `https://your-website.com/employee/${emp._id || ""}`;
    const contactInfo = `Name: ${emp.name}, Email: ${emp.email || "N/A"}`;

    return (
        <div
            className="w-[794px] h-[1123px] mx-auto p-10 font-sans bg-white text-black shadow-xl"
            style={{ pageBreakAfter: "always" }}
        >
            {/* Header */}
            <header className="flex justify-between flex-col items-center border-b pb-4">
                <img
                    src={details?.logoImage || "/images/default-logo.png"}
                    alt="logo"
                    className="w-20 h-20 rounded-full "
                />
                <div className="text-center">
                    <h2 className="text-xl font-bold uppercase">
                        {details.instituteName || "Institute Name"}
                    </h2>
                    <p className="text-sm">{details.address || "Institute Address"}</p>
                    <h2 className="text-xl font-semibold mt-3">Job Appointment Letter</h2>
                </div>
                <div className="w-20 h-20"></div>
            </header>

            {/* Main Body */}
            <main className="mt-6 text-sm space-y-6">
                <div className="flex items-center gap-6">
                    <img
                        src={emp.image || "/images/no-image.png"}
                        alt={emp.name}
                        className="w-24 h-24 rounded border object-cover"
                    />
                    <div className="space-y-1">
                        <p><span className="font-semibold">Name:</span> {emp.name || "N/A"}</p>
                        <p><span className="font-semibold">Date of Birth:</span> {emp.dateOfBirth ? new Date(emp.dateOfBirth).toLocaleDateString() : "N/A"}</p>
                        <p>
                            <span className="font-semibold">Mobile:</span>{" "}
                            {emp.phone ? (
                                <a href={`tel:${emp.phone}`} className="text-blue-600 underline">{emp.phone}</a>
                            ) : (
                                "N/A"
                            )}
                        </p>


                        <p>
                            <span className="font-semibold">Email:</span>{" "}
                            {emp.email ? (
                                <a href={`mailto:${emp.email}`} className="text-blue-600 underline">
                                    {emp.email}
                                </a>
                            ) : (
                                "N/A"
                            )}
                        </p>

                    </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-10">
                    <p><span className="font-semibold">Designation:</span> {emp.role || "N/A"}</p>
                    <p><span className="font-semibold">Joining Date:</span> {joiningDate}</p>
                    <p><span className="font-semibold">Employee ID:</span> {emp.userName || "N/A"}</p>
                    <p><span className="font-semibold">Password:</span> {emp.password || "N/A"}</p>
                    <p><span className="font-semibold">Education:</span> {emp.education || "N/A"}</p>
                    <p><span className="font-semibold">Experience:</span> {emp.experience || "N/A"}</p>
                </div>

                {/* QR Codes */}
                <div className="mt-4">
                    <p className="font-semibold text-center mb-2">Scan QR Code</p>
                    <div className="flex justify-center items-center gap-20">
                        <div className="text-center">
                            <QRCode value={profileUrl} size={80} />
                            <p className="text-xs mt-1">Profile</p>
                        </div>
                        <div className="text-center">
                            <QRCode value={contactInfo} size={80} />
                            <p className="text-xs mt-1">Contact</p>
                        </div>
                    </div>
                </div>

                {/* Rules Section */}
                <div className="mt-6">
                    <h3 className="text-md font-bold mb-2">Rules and Regulations:</h3>
                    <ol className="list-decimal list-inside text-sm space-y-1">
                        <li>Respect the dignity of the institute.</li>
                        <li>Maintain professionalism at all times.</li>
                        <li>Protect confidentiality of the institute and students.</li>
                        <li>Comply with all official instructions.</li>
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
                    <p className="mt-1">Institute Stamp</p>
                </div>
            </footer>

            <div className="text-right text-xs mt-4 text-gray-500">Page 1/1</div>
        </div>
    );
};

export default PrintableJobLetter;
