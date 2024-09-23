/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';

export default function CustomNode({ data }) {

    const [showCode, setShowCode] = useState(false);
    const [showResources, setShowResources] = useState(false);
    return (
        <div className="flex gap-2 items-center relative ">
            <div className="bg-[#e2e2e2]  relative text-black text-center font-bold outline-1 outline rounded-lg w-[200px] h-auto min-h-[50px] text-xs whitespace-normal p-1 flex flex-col justify-center items-center gap-1">
                <Handle type="target" position={Position.Top} id="1" />
                {JSON.parse(data.label).process}
                <Handle type="source" position={Position.Bottom} id="1" />
            </div>


            {/* Code button  */}
            <button
                className="bg-blue-400 text-white w-auto h-auto min-w-[35px] p-1 block rounded-sm whitespace-normal break-words"
                onClick={() => setShowCode(true)}
            >
                Code
            </button>

            {showCode && (
                <div
                    className="absolute left-full  cursor-text select-text ml-2 bg-gray-700 text-white rounded-md p-2 w-[200px] z-10 overflow-hidden overscroll-contain"

                >
                    <button
                        onClick={() => setShowCode(false)}
                        className="text-white bg-red-500 rounded-full px-2 py-1 mb-1 float-right"
                    >
                        X
                    </button>
                    <pre className="whitespace-pre-wrap text-xs select-text">{JSON.parse(data.label).code}</pre>
                </div>
            )}
            {/* Code button  */}

            {/* Resources Button */}
            <button
                className="bg-red-400 text-white w-auto h-auto min-w-[35px] p-1 block rounded-sm whitespace-normal break-words"
                onClick={() => setShowResources(true)}
            >
                Resources
            </button>
            {showResources && (
                <div
                    className="absolute left-full  cursor-text select-text ml-2 bg-gray-700 text-white rounded-md p-2 w-[200px] z-10 overflow-hidden overscroll-contain"

                >
                    <button
                        onClick={() => setShowResources(false)}
                        className="text-white bg-red-500 rounded-full px-2 py-1 mb-1 float-right"
                    >
                        X
                    </button>
                    <pre className="whitespace-pre-wrap text-xs select-text">{JSON.parse(data.label).resources || "resources"}</pre>
                </div>
            )}

            {/* Resources Button */}
        </div>
    );
}
