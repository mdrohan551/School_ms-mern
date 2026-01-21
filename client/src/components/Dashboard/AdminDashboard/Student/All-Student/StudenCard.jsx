import React from "react";
import { Eye, Loader, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
import { DeleteAlert } from "../../../../Swal.js";
import { Link } from "react-router-dom";



const StudentCard = ({ refetch, student, DeleteStudent }) => {

    const [localDeleteLoading, setLocalDeleteLoading] = React.useState(false);

    // Handle Delete
    const HandleDelete = async (Id) => {
        setLocalDeleteLoading(true);
        try {

            const isConfirmed = await DeleteAlert()
            if (isConfirmed) {
                const res = await DeleteStudent(Id);
                if (res?.data?.status === true) {
                    toast.success(res?.data?.message);
                    refetch();
                }
            }
        } catch (deleteError) {
            console.log(deleteError?.data?.message);
            toast.error(deleteError?.data?.message);
        } finally {
            setLocalDeleteLoading(false);
        }
    };
    const StudentLoader = () => {
        return (
            <div className="absolute inset-0 bg-white/70 dark:bg-black/50 flex items-center justify-center rounded-2xl z-10">
                <Loader className="animate-spin w-6 h-6 text-red-500" />
            </div>
        );
    };
    return (
        <div
            className="bg-white  dark:bg-gray-900 p-4 rounded-2xl shadow-md flex flex-col items-center w-full max-w-[170px] relative group transition hover:shadow-lg border border-gray-200 dark:border-gray-700">
            {/* Profile Image */}
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 mb-2">
                <img
                    src={
                        student?.image && student.image !== "null" && student.image.trim() !== ""
                            ? student.image
                            : "/images/no-image.png"
                    }
                    alt="avatar"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/no-image.png";
                    }}
                    className="w-full h-full object-cover"
                />


            </div>

            {/* ID & Name */}
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{student?.registrationNumber || "N/A"}</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white capitalize">
                {student?.name || "No Name"}
            </p>

            {/* Actions */}
            {/* Actions */}
            <div className="flex gap-2 mt-3 relative z-0">
                {/* View */}
                <button
                    title="View"
                    className="bg-[#d1d5fa] text-gray-700 p-2 rounded-full hover:bg-[#a8aff2] transition"
                >
                    <Eye size={16} />
                </button>

                {/* Edit */}
                <Link
                    to={`/dashboard/admission?studentId=${student._id}`}
                    title="Edit"
                    className="bg-[#c2c9ff] text-gray-700 p-2 rounded-full hover:bg-[#98a2ff] transition"
                >
                    <Pencil size={16} />
                </Link>

                {/* Delete */}
                <button
                    onClick={() => HandleDelete(student?._id)}
                    title="Delete"
                    disabled={localDeleteLoading}
                    className="bg-[#ffc9c9] text-gray-700 p-2 rounded-full hover:bg-[#ff8f8f] transition flex items-center justify-center"
                >
                    <Trash2 size={16} />
                </button>
                {/* Loader Overlay */}
                {localDeleteLoading && <StudentLoader />}
            </div>


        </div>
    );
};

export default StudentCard;
