import React, {useEffect, useState} from 'react';
import {IoHomeOutline} from "react-icons/io5";
import Profile from "./Profile.jsx";
import View from "./View.jsx";
import {useGetSchoolSingleDetailsQuery,useUpdateSchoolMutation} from "../../../../../redux/Features/SchoolAdmin/GeneralSettingsApi.js";
import toast from "react-hot-toast";
import ToastImgTitle from "../../../ToastImgTitle.jsx";


const InstituteProfile = () => {
    const {data,isLoading:detailloading,error,refetch} = useGetSchoolSingleDetailsQuery()
    const [updateSchool, {isLoading:isUpdating}] = useUpdateSchoolMutation()
    const [errorMessage,setError] = useState({
        instituteName: "", tagline: "", phone: "", address: "",
    });
    const [logoFile, setLogoFile] = useState('');
    const [previewUrl, setPreviewUrl] = useState("");
    const [formData, setFormData] = useState({

        instituteName: "", tagline: "", phone: "", website: "", address: "", countresAndZila: ""

    });
    const validation = () => {
        const newErrors = {}
        if(!formData.instituteName){
            newErrors.instituteName = "Institute name is required";
        }
        if(!formData.tagline){
            newErrors.tagline = "tagline  is required";
        }
        if(!formData.phone){
            newErrors.phone = "phone number is required";
        }
        if(!formData.address){
            newErrors.address = "address  is required";
        }
        setError(newErrors);
        return Object.keys(newErrors).length === 0

    }

    // Daynamic location get
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("https://ipinfo.io/json?token=001d4b8020a7dd");
                const data = await res.json();
                const countryCode = data.country || "";
                const region = data.region || "";
                const countryName = countryCode === "BD" ? "Bangladesh" : data.country_name || countryCode || "";
                let fullLocation = countryName;
                if (region) {
                    fullLocation = `${countryName} , ${region}`;
                }
                setFormData((prev) => ({
                    ...prev, countresAndZila: fullLocation,

                }));
            } catch (err) {
                console.error("GeoLocation Error:", err);
            }
        })();


    }, []);


    const FormChangeHandler = (e) => {
        const {name, value} = e.target;
        setFormData((olddata) => ({
            ...olddata, [name]: value
        }))

    }
    const HandleSubmit = async (e) => {
        e.preventDefault();
        let isvalid = validation();
        if(!isvalid)return;
        let Data = new FormData();
        if (logoFile) {
            Data.append("logoImage", logoFile);
        } // 👈 Multer will handle this

        Data.append("formData", JSON.stringify(formData)); // 👈 Must be string

        try {
            let res = await updateSchool(Data).unwrap();
            if (res.statusCode === 200) {
                refetch()
                // 👇 Custom toast call
                toast(<ToastImgTitle
                    imgSrc={previewUrl?previewUrl:data?.data[0].logoImage || "/images/no-logo.png"}
                    title={formData.instituteName}
                    subtitle={formData.tagline}
                />, {
                    autoClose: 5000, // 5 sec
                    position: "top-center",
                });
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (<div className="sm:p-10 p-5 ">
        <div
            className="max-w-full  mx-auto shadow rounded-xl p-3  flex items-center text-start space-x-5 mt-3 bg-white dark:bg-gray-800">
            <h1 className="text-sm sm:text-lg font-light text-gray-700 dark:text-white">General Settings</h1>
            <div className="flex items-center justify-center space-x-2">
                <IoHomeOutline className="text-"/>
                <p className="text-sm sm:text-lg font-light">- Institute Profile</p>
            </div>
        </div>
        <div className="max-w-full mx-auto ">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-6 mt-8 ">
                <div className="lg:col-span-3">
                    <Profile FormChangeHandler={FormChangeHandler} setFormData={setFormData} formData={formData} HandleSubmit={HandleSubmit}
                             setLogoFile={setLogoFile} isUpdating={isUpdating} setPreviewUrl={setPreviewUrl}
                             previewUrl={previewUrl}  data={data}  errorMessage={errorMessage}/>
                </div>
                <div className="lg:col-span-2">
                    <View detailloading={detailloading} data={data}  />
                </div>
            </div>
        </div>
    </div>);
};

export default InstituteProfile;