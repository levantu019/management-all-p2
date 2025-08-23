import React, { useState } from 'react';
import { Tree } from 'primereact/tree';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { LoadingOverlay, ErrorDisplay } from '../CommonComponents'; // Adjust the import path as necessary

const TreePanel = ({ treeData, isLoading, error, onRetry, onNodeSelect, onNodeEdit, onNodeDelete }) => {
    const [expandedKeys, setExpandedKeys] = useState({});
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);

    const nodeTemplate = (node) => {
        return (
            <div className="flex align-items-center justify-content-between w-full">
                <span>{node.label}</span>
                <div className="flex gap-1">
                    <Button
                        icon="pi pi-pencil"
                        size="small"
                        text
                        rounded
                        severity="secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNodeEdit(node);
                        }}
                        tooltip="Edit"
                    />
                    <Button
                        icon="pi pi-trash"
                        size="small"
                        text
                        rounded
                        severity="danger"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNodeDelete(node);
                        }}
                        tooltip="Delete"
                    />
                </div>
            </div>
        );
    };

    const panelHeaderTemplate = (options) => {
        return (
            <div className="flex align-items-center justify-content-between">
                <span className="font-bold">Tree Structure</span>
                <Button 
                    icon="pi pi-plus" 
                    size="small"
                    rounded
                    text
                    tooltip="Add Node"
                />
            </div>
        );
    };

    if (isLoading) {
        return (
            <Panel header="Tree Structure" className="h-full">
                <LoadingOverlay message="Loading tree data..." />
            </Panel>
        );
    }

    if (error) {
        return (
            <Panel header="Tree Structure" className="h-full">
                <ErrorDisplay error={error} onRetry={onRetry} />
            </Panel>
        );
    }

    return (
        <Panel headerTemplate={panelHeaderTemplate} className="h-full">
            <Tree
                value={treeData}
                expandedKeys={expandedKeys}
                onToggle={(e) => setExpandedKeys(e.value)}
                selectionMode="single"
                selectionKeys={selectedNodeKey}
                onSelectionChange={(e) => {
                    setSelectedNodeKey(e.value);
                    onNodeSelect(e.node);
                }}
                nodeTemplate={nodeTemplate}
                className="w-full"
            />
        </Panel>
    );
};

export default TreePanel;