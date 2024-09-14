/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Handle, Position, } from '@xyflow/react';

import { useState } from 'react';

export default function CustomNode({ data }) {

    const [showCode, setShowCode] = useState(false);
    return (
        <>

            <Handle type="target" position={Position.Top} id="1" />

            <div className="text-white outline-1 outline rounded-lg w-[200px] h-auto min-height-[50px] text-xs  whitespace-normal p-1 flex flex-col justify-center  items-center gap-1">
                {data.label}
                <button className='bg-blue-400 text-white w-auto h-auto min-w-[35px] p-1 block rounded-sm whitespace-normal break-words' onClick={() => setShowCode(showCode => !showCode)}>Code {showCode && <div open>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, ab.  </div>} </button>
            </div>

            <Handle type="source" position={Position.Bottom} id="1" />  
        </>
    );
}
