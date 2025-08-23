import React, { useState, useRef, useEffect } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

// API functions
import { apiGet } from "../../utils/apiUtils";
import { transformToTreeNodes } from "../../utils/transformUtils";
import TreePanel from "./TreePanel";
import TablePanel from "./TablePanel";

// Main Split Panel Component
const SplitPanelContent = ({ activeFunction, activeFunctionID, tableNameMenu, tableNameData, hasTree }) => {
    // State management
    const [isTreeLoading, setIsTreeLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [treeError, setTreeError] = useState(null);
    const [tableError, setTableError] = useState(null);
    const [treeData, setTreeData] = useState([]);
    const [tableData, setTableData] = useState([]);

    // Refs
    const toast = useRef(null);

    // Load data on mount
    useEffect(() => {
        loadTreeData();
        loadTableData();
    }, []);

    //
    // API function to fetch tree data
    const fetchTreeData = async () => {
        try {
            switch (tableNameMenu) {
                case "category":
                    const response = await apiGet(
                        `categories/all-parents/${activeFunctionID}`
                    );
                    return transformToTreeNodes(response.data);
                default:
                    return [];
            }
        } catch (error) {
            console.error("❌ Tree API Error:", error);
            throw new Error(`Failed to fetch tree data: ${error.message}`);
        }
    };

    // API function to fetch table data
    const fetchTableData = async () => {
        try {
            switch (tableNameData) {
                case "target":
                    const response = await apiGet(
                        `targets/category/${activeFunctionID}`
                    );
                    return response.data;
                default:
                    return [];
            }            
        } catch (error) {
            console.error("❌ Table API Error:", error);
            throw new Error(`Failed to fetch table data: ${error.message}`);
        }
    };

    // API loading functions
    const loadTreeData = async () => {
        try {
            setIsTreeLoading(true);
            setTreeError(null);
            const data = await fetchTreeData();
            setTreeData(data);
        } catch (error) {
            setTreeError(error.message);
        } finally {
            setIsTreeLoading(false);
        }
    };

    const loadTableData = async () => {
        try {
            setIsTableLoading(true);
            setTableError(null);
            const data = await fetchTableData();
            setTableData(data);
        } catch (error) {
        } finally {
            setIsTableLoading(false);
        }
    };

    // Event handlers
    const handleNodeSelect = (node) => {
        console.log("Node selected:", node);
    };

    const handleNodeEdit = (node) => {
        console.log("Edit node:", node);
    };

    const handleNodeDelete = (node) => {
        confirmDialog({
            message: `Are you sure you want to delete "${node.label}"?`,
            header: "Delete Confirmation",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            accept: () => {
                toast.current?.show({
                    severity: "success",
                    summary: "Deleted",
                    detail: `${node.label} has been deleted`,
                    life: 3000,
                });
            },
        });
    };

    const handleTableCreate = () => {
        console.log("Create new table item");
        toast.current?.show({
            severity: "info",
            summary: "Create",
            detail: "Opening create dialog...",
            life: 2000,
        });
    };

    const handleTableEdit = (rowData) => {
        console.log("Edit table item:", rowData);
        toast.current?.show({
            severity: "info",
            summary: "Edit",
            detail: `Editing: ${rowData.name}`,
            life: 2000,
        });
    };

    const handleTableDelete = (rowData) => {
        confirmDialog({
            message: `Are you sure you want to delete "${rowData.name}"?`,
            header: "Delete Confirmation",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            accept: () => {
                setTableData((prev) =>
                    prev.filter((item) => item.id !== rowData.id)
                );
                toast.current?.show({
                    severity: "success",
                    summary: "Deleted",
                    detail: `${rowData.name} has been deleted`,
                    life: 3000,
                });
            },
        });
    };

    const handleTableDetail = (rowData) => {
        console.log("View details:", rowData);
        toast.current?.show({
            severity: "info",
            summary: "Details",
            detail: `Viewing details for: ${rowData.name}`,
            life: 2000,
        });
    };

    return (
        <div className="h-full">
            <Toast ref={toast} />
            <ConfirmDialog />

            {/* Header */}
            <div className="flex align-items-center justify-content-between p-3 border-bottom-1 surface-border">
                <h2 className="m-0">
                    Split Panel App 
                </h2>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                {hasTree ? (
                    <Splitter style={{ height: "100%" }}>
                        <SplitterPanel size={35} minSize={20}>
                            <TreePanel
                                treeData={treeData}
                                isLoading={isTreeLoading}
                                error={treeError}
                                onRetry={loadTreeData}
                                onNodeSelect={handleNodeSelect}
                                onNodeEdit={handleNodeEdit}
                                onNodeDelete={handleNodeDelete}
                            />
                        </SplitterPanel>
                        <SplitterPanel size={65} minSize={40}>
                            <TablePanel
                                tableData={tableData}
                                isLoading={isTableLoading}
                                error={tableError}
                                onRetry={loadTableData}
                                onCreate={handleTableCreate}
                                onEdit={handleTableEdit}
                                onDelete={handleTableDelete}
                                onDetail={handleTableDetail}
                            />
                        </SplitterPanel>
                    </Splitter>
                ) : (
                    <TablePanel
                        tableData={tableData}
                        isLoading={isTableLoading}
                        error={tableError}
                        onRetry={loadTableData}
                        onCreate={handleTableCreate}
                        onEdit={handleTableEdit}
                        onDelete={handleTableDelete}
                        onDetail={handleTableDetail}
                    />
                )}
            </div>
        </div>
    );
};

export default SplitPanelContent;
