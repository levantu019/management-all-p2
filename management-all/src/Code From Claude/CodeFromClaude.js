import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Tree } from 'primereact/tree';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Panel } from 'primereact/panel';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Menu } from 'primereact/menu';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import axios from 'axios';

// Import PrimeReact CSS
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// API Configuration from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000;

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    }
});

// API function to fetch tree data
const fetchTreeData = async (value1, value2) => {
    try {
        console.log('🌳 Fetching tree data from API...');
        
        const response = await apiClient.post('/tree-data', {
            value1,
            value2,
            requestType: 'tree',
            timestamp: new Date().toISOString()
        });

        console.log('✅ Tree data fetched successfully');
        
        // Transform data for PrimeReact Tree component
        const transformToTreeNodes = (data) => {
            return data.map(item => ({
                key: item.id,
                label: item.name,
                data: item,
                icon: 'pi pi-folder',
                children: item.children ? transformToTreeNodes(item.children) : undefined
            }));
        };

        // Mock data if API doesn't return proper structure
        const mockTreeData = [
            {
                id: `tree-${value1}`,
                name: `Root ${value1}`,
                children: [
                    {
                        id: `${value1}-1`,
                        name: `Branch ${value1}-1`,
                        children: [
                            { id: `${value1}-1-1`, name: `Leaf ${value1}-1-1` },
                            { id: `${value1}-1-2`, name: `Leaf ${value1}-1-2` }
                        ]
                    },
                    {
                        id: `${value1}-2`,
                        name: `Branch ${value1}-2`,
                        children: [
                            { id: `${value1}-2-1`, name: `Leaf ${value1}-2-1` }
                        ]
                    }
                ]
            },
            {
                id: `tree-${value2}`,
                name: `Root ${value2}`,
                children: [
                    {
                        id: `${value2}-1`,
                        name: `Branch ${value2}-1`,
                        children: [
                            { id: `${value2}-1-1`, name: `Leaf ${value2}-1-1` }
                        ]
                    }
                ]
            }
        ];

        return transformToTreeNodes(response.data || mockTreeData);

    } catch (error) {
        console.error('❌ Tree API Error:', error);
        throw new Error(`Failed to fetch tree data: ${error.message}`);
    }
};

// API function to fetch table data
const fetchTableData = async (value1, value2) => {
    try {
        console.log('📊 Fetching table data from API...');
        
        const response = await apiClient.get('/table-data', {
            params: {
                value1,
                value2,
                page: 1,
                limit: 10
            }
        });

        console.log('✅ Table data fetched successfully');

        // Mock data if API doesn't return proper structure
        const mockTableData = [
            { 
                id: 1, 
                order: 1, 
                name: `${value1} User 1`, 
                email: `user1@${value1.toLowerCase()}.com`, 
                status: 'Active',
                createdAt: new Date('2024-01-15')
            },
            { 
                id: 2, 
                order: 2, 
                name: `${value2} User 2`, 
                email: `user2@${value2.toLowerCase()}.com`, 
                status: 'Inactive',
                createdAt: new Date('2024-02-20')
            },
            { 
                id: 3, 
                order: 3, 
                name: `${value1} Manager`, 
                email: `manager@${value1.toLowerCase()}.com`, 
                status: 'Active',
                createdAt: new Date('2024-03-10')
            },
            { 
                id: 4, 
                order: 4, 
                name: `${value2} Admin`, 
                email: `admin@${value2.toLowerCase()}.com`, 
                status: 'Pending',
                createdAt: new Date('2024-04-05')
            }
        ];

        return response.data || mockTableData;

    } catch (error) {
        console.error('❌ Table API Error:', error);
        throw new Error(`Failed to fetch table data: ${error.message}`);
    }
};

// Loading Component
const LoadingOverlay = ({ message = "Loading data..." }) => (
    <div className="flex items-center justify-center p-8">
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
        <span className="ml-3 text-gray-600">{message}</span>
    </div>
);

// Error Component
const ErrorDisplay = ({ error, onRetry }) => (
    <div className="flex flex-column align-items-center justify-content-center p-4">
        <i className="pi pi-exclamation-triangle text-red-500 text-4xl mb-3"></i>
        <p className="text-red-600 mb-4 text-center">{error}</p>
        <Button 
            label="Retry" 
            icon="pi pi-refresh" 
            onClick={onRetry}
            className="p-button-sm"
        />
    </div>
);

// Tree Panel Component
const TreePanel = ({ treeData, isLoading, error, onRetry, onNodeSelect, onNodeEdit, onNodeDelete }) => {
    const [expandedKeys, setExpandedKeys] = useState({});
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);

    // Node template for context menu
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

// Table Panel Component
const TablePanel = ({ tableData, isLoading, error, onRetry, onCreate, onEdit, onDelete, onDetail }) => {
    const [selectedItems, setSelectedItems] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    // Action buttons template
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button
                    icon="pi pi-eye"
                    size="small"
                    rounded
                    text
                    severity="info"
                    onClick={() => onDetail(rowData)}
                    tooltip="View Details"
                />
                <Button
                    icon="pi pi-pencil"
                    size="small"
                    rounded
                    text
                    severity="secondary"
                    onClick={() => onEdit(rowData)}
                    tooltip="Edit"
                />
                <Button
                    icon="pi pi-trash"
                    size="small"
                    rounded
                    text
                    severity="danger"
                    onClick={() => onDelete(rowData)}
                    tooltip="Delete"
                />
            </div>
        );
    };

    // Status template
    const statusBodyTemplate = (rowData) => {
        const getSeverity = (status) => {
            switch (status) {
                case 'Active': return 'success';
                case 'Inactive': return 'danger';
                case 'Pending': return 'warning';
                default: return 'info';
            }
        };

        return (
            <span className={`pi pi-circle-fill text-${getSeverity(rowData.status)}`}>
                <span className="ml-2">{rowData.status}</span>
            </span>
        );
    };

    // Date template
    const dateBodyTemplate = (rowData) => {
        return rowData.createdAt ? rowData.createdAt.toLocaleDateString() : '';
    };

    // Table header
    const tableHeader = (
        <div className="flex justify-content-between align-items-center">
            <h3>Data Table</h3>
            <div className="flex gap-2 align-items-center">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Global Search"
                    />
                </span>
                <Button
                    label="Create"
                    icon="pi pi-plus"
                    onClick={onCreate}
                />
            </div>
        </div>
    );

    // Toolbar for bulk actions
    const leftToolbarTemplate = () => {
        return (
            <div className="flex gap-2">
                <Button
                    label="Delete Selected"
                    icon="pi pi-trash"
                    severity="danger"
                    disabled={!selectedItems || !selectedItems.length}
                    onClick={() => {
                        confirmDialog({
                            message: `Are you sure you want to delete ${selectedItems.length} selected items?`,
                            header: 'Confirm Delete',
                            icon: 'pi pi-exclamation-triangle',
                            accept: () => {
                                selectedItems.forEach(item => onDelete(item));
                                setSelectedItems(null);
                            }
                        });
                    }}
                />
            </div>
        );
    };

    if (isLoading) {
        return (
            <Panel header="Data Table" className="h-full">
                <LoadingOverlay message="Loading table data..." />
            </Panel>
        );
    }

    if (error) {
        return (
            <Panel header="Data Table" className="h-full">
                <ErrorDisplay error={error} onRetry={onRetry} />
            </Panel>
        );
    }

    return (
        <Panel className="h-full">
            <Toolbar className="mb-4" left={leftToolbarTemplate} />
            <DataTable
                value={tableData}
                selection={selectedItems}
                onSelectionChange={(e) => setSelectedItems(e.value)}
                dataKey="id"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                header={tableHeader}
                filters={filters}
                globalFilterFields={['name', 'email', 'status']}
                globalFilter={globalFilter}
                emptyMessage="No data found."
                sortMode="multiple"
                removableSort
                showGridlines
                stripedRows
                responsiveLayout="scroll"
            >
                <Column selectionMode="multiple" exportable={false} />
                <Column field="order" header="Order" sortable style={{ minWidth: '8rem' }} />
                <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                <Column field="email" header="Email" sortable filter filterPlaceholder="Search by email" style={{ minWidth: '12rem' }} />
                <Column field="status" header="Status" body={statusBodyTemplate} sortable filter filterElement={statusBodyTemplate} style={{ minWidth: '10rem' }} />
                <Column field="createdAt" header="Created Date" body={dateBodyTemplate} sortable style={{ minWidth: '10rem' }} />
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }} />
            </DataTable>
        </Panel>
    );
};

// Main Split Panel Component
const PrimeReactSplitPanel = ({ value1, value2, onClose }) => {
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
    }, [value1, value2]);

    // API loading functions
    const loadTreeData = async () => {
        try {
            setIsTreeLoading(true);
            setTreeError(null);
            const data = await fetchTreeData(value1, value2);
            setTreeData(data);
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Tree data loaded successfully',
                life: 3000
            });
        } catch (error) {
            setTreeError(error.message);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.message,
                life: 5000
            });
        } finally {
            setIsTreeLoading(false);
        }
    };

    const loadTableData = async () => {
        try {
            setIsTableLoading(true);
            setTableError(null);
            const data = await fetchTableData(value1, value2);
            setTableData(data);
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Table data loaded successfully',
                life: 3000
            });
        } catch (error) {
            setTableError(error.message);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.message,
                life: 5000
            });
        } finally {
            setIsTableLoading(false);
        }
    };

    // Event handlers
    const handleNodeSelect = (node) => {
        console.log('Node selected:', node);
        toast.current?.show({
            severity: 'info',
            summary: 'Node Selected',
            detail: `Selected: ${node.label}`,
            life: 2000
        });
    };

    const handleNodeEdit = (node) => {
        console.log('Edit node:', node);
        toast.current?.show({
            severity: 'info',
            summary: 'Edit Node',
            detail: `Editing: ${node.label}`,
            life: 2000
        });
    };

    const handleNodeDelete = (node) => {
        confirmDialog({
            message: `Are you sure you want to delete "${node.label}"?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Deleted',
                    detail: `${node.label} has been deleted`,
                    life: 3000
                });
            }
        });
    };

    const handleTableCreate = () => {
        console.log('Create new table item');
        toast.current?.show({
            severity: 'info',
            summary: 'Create',
            detail: 'Opening create dialog...',
            life: 2000
        });
    };

    const handleTableEdit = (rowData) => {
        console.log('Edit table item:', rowData);
        toast.current?.show({
            severity: 'info',
            summary: 'Edit',
            detail: `Editing: ${rowData.name}`,
            life: 2000
        });
    };

    const handleTableDelete = (rowData) => {
        confirmDialog({
            message: `Are you sure you want to delete "${rowData.name}"?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => {
                setTableData(prev => prev.filter(item => item.id !== rowData.id));
                toast.current?.show({
                    severity: 'success',
                    summary: 'Deleted',
                    detail: `${rowData.name} has been deleted`,
                    life: 3000
                });
            }
        });
    };

    const handleTableDetail = (rowData) => {
        console.log('View details:', rowData);
        toast.current?.show({
            severity: 'info',
            summary: 'Details',
            detail: `Viewing details for: ${rowData.name}`,
            life: 2000
        });
    };

    return (
        <div className="h-screen flex flex-column">
            <Toast ref={toast} />
            <ConfirmDialog />
            
            {/* Header */}
            <div className="flex align-items-center justify-content-between p-3 border-bottom-1 surface-border">
                <h2 className="m-0">Split Panel App ({value1}, {value2})</h2>
                <Button
                    icon="pi pi-times"
                    rounded
                    text
                    severity="secondary"
                    onClick={onClose}
                    tooltip="Close Panel"
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <Splitter style={{ height: '100%' }}>
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
            </div>
        </div>
    );
};

// Demo App Component
const App = () => {
    const [showPanel, setShowPanel] = useState(false);
    const [panelValues, setPanelValues] = useState({ value1: '', value2: '' });

    const handleOpenPanel = (value1, value2) => {
        setPanelValues({ value1, value2 });
        setShowPanel(true);
    };

    const handleClosePanel = () => {
        setShowPanel(false);
        setPanelValues({ value1: '', value2: '' });
    };

    if (showPanel) {
        return (
            <PrimeReactSplitPanel
                value1={panelValues.value1}
                value2={panelValues.value2}
                onClose={handleClosePanel}
            />
        );
    }

    return (
        <div className="min-h-screen flex align-items-center justify-content-center bg-gray-100">
            <Panel header="PrimeReact Split Panel Demo" className="w-30rem">
                <div className="flex flex-column gap-3">
                    <Button
                        label="Open Panel: Vietnam, Asia"
                        icon="pi pi-external-link"
                        onClick={() => handleOpenPanel('Vietnam', 'Asia')}
                        className="w-full"
                    />
                    <Button
                        label="Open Panel: USA, America"
                        icon="pi pi-external-link"
                        severity="success"
                        onClick={() => handleOpenPanel('USA', 'America')}
                        className="w-full"
                    />
                    <Button
                        label="Open Panel: Japan, Asia"
                        icon="pi pi-external-link"
                        severity="help"
                        onClick={() => handleOpenPanel('Japan', 'Asia')}
                        className="w-full"
                    />
                </div>
            </Panel>
        </div>
    );
};

export default App;