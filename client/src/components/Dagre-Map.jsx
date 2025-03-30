/* eslint-disable no-unused-vars */
import {
    addEdge,
    Background, BackgroundVariant,
    ConnectionLineType,
    Panel,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import { ChevronLeft, KeyboardIcon, MessageCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import getData from "../Flow/nodes-edges";
import CustomNode from './Custom-node';
import { Button } from './ui/button';


// Function to layout nodes and edges using Dagre

const nodeWidth = 1000;
const nodeHeight = 100;
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
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [colorMode, setColorMode] = useState(useSelector(state => state.colorModeGlobal || "dark"));
    const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

    const serverURL = useSelector(state => state.serverURL)

    //fetching the projects
    useEffect(() => {
        const fetchData = async () => {

            // custom node label
            const { initialNodes, initialEdges } = await getData({ serverURL, id });
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
                minZoom={0}
                translateExtent={[[-Infinity, -Infinity], [Infinity, Infinity]]}
                colorMode={colorMode}
                nodeTypes={nodeTypes}
                preventScrolling={false}
                noWheelClassName='nowheel'
                panOnDrag={true}
            >
                <Background bgColor='#9333ea80' color="#fff" variant={BackgroundVariant.Dots} />
                <Panel position="top-left" className='text-white'
                    onClick={() => navigate("/")}>
                    <Button variant="default" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
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
