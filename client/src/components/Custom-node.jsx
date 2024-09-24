/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';
import { Button } from './ui/button';
export default function CustomNode({ data }) {

    const [showCode, setShowCode] = useState(false);
    const [showResources, setShowResources] = useState(false);
    return (
        <div className="flex gap-2 items-center relative ">
            <div className="bg-slate-800  text-white  relative text-center font-bold rounded-lg w-[200px] h-auto min-h-[50px] text-xs whitespace-normal p-1 flex flex-col justify-center items-center gap-1">
                <Handle type="target" position={Position.Top} id="1" />
                {JSON.parse(data.label).process}


                {/* Code button------  */}
                <Button
                    className=" bg-zinc-600  text-white w-auto h-fit h-auto p-1 min-w-[35px]  block rounded-sm whitespace-normal break-words"
                    onClick={() => setShowCode(true)}
                >
                    Code
                </Button>

                {showCode && (
                    <div
                        className="absolute left-full  cursor-text select-text ml-2 bg-gray-700 text-white rounded-md p-2 w-[200px] z-10 overflow-hidden overscroll-contain"

                    >
                        <Button
                            onClick={() => setShowCode(false)}
                            className="text-white bg-red-500 rounded-sm px-2 py-1 mb-1 float-right"
                        >
                            X
                        </Button>
                        <pre className="whitespace-pre-wrap text-xs select-text">{JSON.parse(data.label).code}</pre>
                    </div>
                )}
                {/* ----Code button  */}

                {/* Resources Button------ */}
                <Button
                    className="bg-red-400 text-white w-auto h-auto min-w-[35px] p-1 block rounded-sm whitespace-normal break-words"
                    onClick={() => setShowResources(true)}
                >
                    Resources
                </Button>
                {showResources && (
                    <div
                        className="absolute left-full  cursor-text select-text ml-2 bg-orange-700 text-white rounded-md p-2 w-[200px] z-10 overflow-hidden overscroll-contain"

                    >
                        <button
                            onClick={() => setShowResources(false)}
                            className="text-white bg-red-500 rounded-full px-2 py-1 mb-1 float-right"
                        >
                            X
                        </button>
                        <pre className="whitespace-pre-wrap text-xs select-text">{JSON.parse(data.label).resources || "resources"}</pre>

                        {/* ------Resources Button */}
                    </div>
                )}

                <Handle type="source" position={Position.Bottom} id="1" />
            </div>



        </div>
    );
}
