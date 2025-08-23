// Libraries
import React, { useState } from "react";

// Personal components
// import Header from '../HeaderComponents/Header';
import Sidebar from "../SidebarComponents";
import MapContainer from "../MapComponents";

const MapDashboard = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeFunction, setActiveFunction] = useState(null);
    const [activeFunctionID, setActiveFunctionID] = useState(null);
    const [typePanel, setTypePanel] = useState(null);
    const [tableNameMenu, setTableNameMenu] = useState(null);
    const [tableNameData, setTableNameData] = useState(null);
    const [titleData, setTitleData] = useState(null);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    /**
     * Handles the change of function selection and updates the active function and panel type.
     *
     * @param {string|number} functionId - The menuItem key.
     * @param {string} panelType - The type of panel to display.
     * @param {string} table_name - The name of the table associated with the function.
     */
    const handleFunctionChange = (
        functionId,
        functionId2,
        panelType,
        table_nameMenu,
        table_nameData,
        title_data
    ) => {
        setActiveFunctionID(functionId);
        setActiveFunction(functionId2);
        setTypePanel(panelType);
        setTableNameMenu(table_nameMenu);
        setTableNameData(table_nameData);
        setTitleData(title_data);
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* <Header onToggleSidebar={toggleSidebar} /> */}

            <div className="flex-1 flex">
                <Sidebar
                    collapsed={sidebarCollapsed}
                    onToggle={toggleSidebar}
                    activeFunction={activeFunction}
                    tableNameMenu={tableNameMenu}
                    tableNameData={tableNameData}
                    onFunctionChange={handleFunctionChange}
                />

                <MapContainer
                    activeFunction={activeFunction}
                    activeFunctionID={activeFunctionID}
                    onClosePanel={() => setActiveFunction(null)}
                    typePanel={typePanel}
                    tableNameMenu={tableNameMenu}
                    tableNameData={tableNameData}
                    titleData={titleData}
                    setActiveFunction={setActiveFunction}
                />
            </div>
        </div>
    );
};

export default MapDashboard;
