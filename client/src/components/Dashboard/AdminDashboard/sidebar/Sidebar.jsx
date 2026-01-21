import React, { useState } from 'react';
import SidebarAccordion from './SidebarAccordion.jsx';
import { admin } from '../../../../constant/sidebar.js';
import SidebarOnlyPage from './SidebarOnlyPage.jsx';

const Sidebar = () => {
    const [openIndex, setOpenIndex] = useState(false);
    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className='pt-[80px]  '>

            {

              admin.map((item, index) => {
                return item.accordion ? (
                    <SidebarAccordion
                    key={index}
                    title={item.title}
                    index={index}
                    openIndex={openIndex}
                    onToggle={handleToggle}
                    icon={item.icon}
                    pages={item.pages}
                />
                ) : (<SidebarOnlyPage key={index} {...item} />)

                })
            }
        </section>
    );
};

export default Sidebar;