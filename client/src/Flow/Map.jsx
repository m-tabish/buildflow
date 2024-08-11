/* eslint-disable no-unused-vars */
import { Controls, Handle, MiniMap, Panel, Position, ReactFlow, addEdge, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from "react";
import Nodes from "./Node.function";
function Flow() {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [mode, setMode] = useState('dark')
    useEffect(() => {
        async function setInitialData() {
            let initialNodes = (await Nodes()).nodes
            let initialEdges = (await Nodes()).edges
            setNodes(initialNodes)
            setEdges(initialEdges)
        }
        setInitialData()
    }, [])

    const onChange = (evt) => {
        setMode(evt.target.value);
    };
    const onConnect = useCallback((connection) => {
        const newEdge = {
            ...connection, animated: true, id: `${connection.source}-${connection.target}`, style: { stroke: '#ff0072', strokeWidth: 2 },
        };
        setEdges((prevEdges) => addEdge(newEdge, prevEdges));
    }, [setEdges]);



    const getLayoutedElements = (nodes, edges) => {
        return { nodes, edges };
    };
    return (

        <div className="w-screen h-screen"   >

            <ReactFlow

                nodes={nodes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                edges={edges}
                fitView
                colorMode={mode}
                onConnect={onConnect}
                snapGrid={[15, 15]}
                snapToGrid={true}
                panOnDrag={true} // Enable dragging
                zoomOnScroll={true} // Enable zooming with scroll

            >
                <MiniMap nodeColor={"#00ff00"} nodeBorderRadius={5} maskColor='rgb(240, 240, 240, 0.6)' pannable zoomable/>
                <Controls position='top-left' />
                <Panel position="top-right">
                    <select onChange={onChange} data-testid="colormode-select">
                        <option value="dark">dark</option>
                        <option value="light">light</option> D
                        <option value="system">system</option>
                    </select>
                </Panel>
                <Handle type='source' position={Position.Right}></Handle>

            </ReactFlow>
        </div>
    );
}

export default Flow;
``