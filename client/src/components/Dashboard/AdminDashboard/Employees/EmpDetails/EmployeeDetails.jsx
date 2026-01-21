import React from 'react';


const EmployeeDetails = () => {

    return (
        <div className='text-red-600 flex'>
            {
                Array(10).fill(null).map((_, index) => (
                    <h1 key={index}>details</h1>
                ))
            }
        </div>
    );
};

export default EmployeeDetails;