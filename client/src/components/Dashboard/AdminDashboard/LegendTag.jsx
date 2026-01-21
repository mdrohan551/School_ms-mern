import React from 'react';

const LegendTag = ({color, text}) => (<div className="flex items-center space-x-1">
    <span className={`inline-block w-4 h-2 rounded-full ${color}`}></span>
    <p className="text-sm font-medium">{text}</p>
</div>);

export default LegendTag;