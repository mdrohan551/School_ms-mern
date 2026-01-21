import React from 'react';

import StudentsitebarLink from "./StudentsitebarLink.jsx";
import {studentcontent} from "../../../../constant/StudentDashConstant/studentsidebar.js";

const StudentSidebar = () => {

    return (
        <section className="pt-[80px]">
            {
                studentcontent.map((item, index) => {
                   return (
                       <StudentsitebarLink
                       key={index}
                       title={item.title}
                       icon={item.icon}
                       href={item.href}
                       />
                   )
                })
            }
            
        </section>
    );
};

export default StudentSidebar;