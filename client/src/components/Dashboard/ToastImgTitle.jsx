import React from 'react';
const ToastImgTitle = ({imgSrc, title, subtitle}) => {
    return (
        <div className='flex items-center justify-center w-full gap-5'>
            <div className="flex  gap-3">
                <img
                    className="h-10 w-10 rounded-full "
                    src={imgSrc}
                    alt={title || 'avatar'}
                />
                <div className="flex-col gap-1">
                    <p className="text-sm font-medium  break-words text-junglegreen-bright">{title}  🎉</p>
                    <p className=" text-sm text-gray-500 break-words">{subtitle}</p>
                </div>
            </div>
        </div>
    );
};

export default ToastImgTitle;
