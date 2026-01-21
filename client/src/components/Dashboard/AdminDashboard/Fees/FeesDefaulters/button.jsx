import React, {useState} from 'react';
import { List } from 'lucide-react';
import { Bell } from 'lucide-react';
import { Check } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
import Datacard from "../FeesPaidSlip/Datacard.jsx";
import Feescard from "../FeesPaidSlip/Feescard.jsx";


const Button = () => {

    const [isClick,setisClick]=useState()
    const [Sendclick,setisSendclick]=useState()

    return (
        <div>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

                {/*Month Show section*/}
                <div>
                    <div className="relative border border-purple-400 rounded-full w-2/3 p-2">
                        <input
                            type="month"
                            className="w-full rounded-full shadow-md bg-white px-3 py-2 focus:outline-none border-none"
                        />
                        <div
                            className="absolute -top-3 left-4 bg-gradient-to-r from-[#2D9CDB] to-[#BB6BD9] text-white text-xs px-2 py-0.5 rounded-full">
                            Fees Month*
                        </div>
                    </div>
                </div>

                {/*button section*/}
                <div className="flex items-center justify-center gap-4 text-[#3f51b5] ">

                    <div onClick={() => setisClick(!isClick)}>
                        {
                            isClick ? (
                                    <button
                                        className="px-4 py-2 border border-[#3f51b5] rounded-md flex items-center gap-2 cursor-pointer">
                                        <LayoutGrid className="w-4 h-4"/>
                                        Large View
                                    </button>
                            ): (
                                <button
                                    className="px-4 py-2 border border-[#3f51b5] rounded-md flex items-center gap-2 cursor-pointer">
                                    <List className="w-4 h-4"/>
                                    See Details
                                </button>
                            )
                        }
                    </div>

                    <button
                        onClick={() => setisSendclick(!Sendclick)}
                        className="px-4 py-2 border border-[#3f51b5] rounded-md flex items-center gap-2 cursor-pointer"
                    >
                    {Sendclick ? (
                            <Check className="w-4 h-4 text-green-400"/>
                        ) : (
                            <Bell className="w-4 h-4 text-red-400"/>
                        )}
                        Send Reminder
                    </button>


                    <button
                        className="px-4 py-2 border border-[#3f51b5] rounded-md flex items-center gap-2 cursor-pointer">
                        <CalendarDays className="w-4 h-4 text-[#3f51b5]"/>
                        Carry ForWord Balance
                    </button>

                </div>
            </div>


            {
                isClick ? (<div className="mr-8 mt-15"><Datacard/></div>):(<Feescard/>)
            }
        </div>
    );
};

export default Button;