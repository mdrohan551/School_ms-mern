import React  from 'react';

const LoginTab = ({icon: Icon, text, textStyle, iconStyle}) => {
    return (
             <>
                {Icon && <Icon className={`w-36 ${iconStyle}`} />}
                <p  className={`text-[12px] ${textStyle}`}> {text} </p>
             </>
    );
};

export default LoginTab;