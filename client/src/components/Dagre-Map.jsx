/* eslint-disable no-unused-vars */
import {
    addEdge,
    ConnectionLineType,
    Controls,
    MiniMap,
    Panel,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState
} from '@xyflow/react';
import dagre from 'dagre';
import { useCallback, useEffect, useMemo, useState } from 'react';
import getData from "../Flow/nodes-edges";
import { useSelector } from 'react-redux';
import '@xyflow/react/dist/style.css';
import CustomNode from './Custom-node';
import { useParams } from 'react-router-dom';

const nodeWidth = 172;
const nodeHeight = 100;

// Function to layout nodes and edges using Dagre
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    const isHorizontal = direction === 'LR';

    dagreGraph.setGraph({ rankdir: "TB" });
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
    // console.log(JSON.stringify(edges))
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        return {
            ...node,
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
            type: 'customNode'
        };
    });

    return { nodes: layoutedNodes, edges };
};

const LayoutFlow = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [colorMode, setColorMode] = useState('dark');
    const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
    console.log("id here", id)
    useEffect(() => {
        const fetchData = async () => {
            const { initialNodes, initialEdges } = await getData({ id });
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
            setNodes(layoutedNodes);
            setEdges(layoutedEdges);
            setLoading(false);
        };
        fetchData();
    }, [setNodes, setEdges]);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge(
                    { ...params, type: ConnectionLineType.SmoothStep, animated: true },
                    eds
                )
            ),
        [setEdges]
    );

    const onLayout = useCallback(
        (direction) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction);
            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [edges, nodes, setEdges, setNodes]
    );

    const onChange = (evt) => {
        setColorMode(evt.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-screen  h-screen '>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                connectionLineType={ConnectionLineType.SmoothStep}
                // snapToGrid={true}
                fitView
                translateExtent={[[-Infinity, -Infinity], [Infinity, Infinity]]}
                colorMode={colorMode}
                nodeTypes={nodeTypes}
                preventScrolling={false}
                noWheelClassName='nowheel'
                panOnDrag={true}
            >

                <Panel position="top-right" className='text-white'>
                    <button onClick={() => onLayout('TB')}>Vertical Layout</button>
                    <button onClick={() => onLayout('LR')}>Horizontal Layout</button>
                </Panel>
                <Panel position="top-right">
                    <select onChange={onChange} data-testid="colormode-select">
                        <option value="light">light</option>
                        <option value="dark">dark</option>
                        <option value="system">system</option>
                    </select>
                </Panel>

            </ReactFlow>
        </div >
    );
};

export default function WrappedLayoutFlow() {
    return (
        <ReactFlowProvider>
            <LayoutFlow />
        </ReactFlowProvider>
    );
}
