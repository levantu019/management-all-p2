import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { confirmDialog } from 'primereact/confirmdialog';

//
import { LoadingOverlay, ErrorDisplay } from '../CommonComponents';

const TablePanel = ({ tableData, isLoading, error, onRetry, onCreate, onEdit, onDelete, onDetail }) => {
    const [selectedItems, setSelectedItems] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

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

    const dateBodyTemplate = (rowData) => {
        return rowData.createdAt ? rowData.createdAt.toLocaleDateString() : '';
    };

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

export default TablePanel;