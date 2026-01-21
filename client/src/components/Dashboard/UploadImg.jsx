import React from 'react';
import {Plus} from "lucide-react";
const UploadImg = ({ classinput, classlabel, name, id, labelText, setLogoFile, setPreviewUrl }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // ✅ ১টি ফাইল
        if (file) {
            setLogoFile(file);
            const preview = URL.createObjectURL(file); // ✅ Preview URL তৈরি
            setPreviewUrl(preview);
        }
    };

    return (
        <>
            <label htmlFor={id} className={classlabel}>
                <Plus className="text-lg" />
                {labelText}
            </label>
            <input type="file" name={name} id={id} className={classinput} onChange={handleFileChange} />
        </>
    );
};


export default UploadImg;
