// Libraries
import React, { useEffect, useState, useCallback } from "react";

// Personal components
import MapView from "./MapView";
import MapControls from "./MapControls";
import MapInfo from "./MapInfo";
import ToolPanel from "../ToolPanelComponents";
import DraggablePanel from "../DataPanelComponents/DraggablePanel";
import SplitPanelContent from "../DataPanelComponents/SplitPanelContent";

// Map Container Component
/**
 * MapContainer component renders the main map view along with controls, info, and an optional tool/data panel.
 *
 * @param {string} typePanel - Specifies which panel to render ("data" or "tool"). If not matched, no panel is rendered.
 * @param {function} activeFunction - MenuItem key.
 * @param {function} onCloseToolPanel - Callback function invoked when the Panel is requested to close.
 */
const MapContainer = ({
    activeFunction,
    activeFunctionID,
    typePanel,
    tableNameMenu,
    tableNameData,
    titleData,
    setActiveFunction,
}) => {
    const [openPanels, setOpenPanels] = useState([]);

    const handleMenuItemClick = useCallback((panelId, title) => {
        console.log('click', openPanels);
        // Check if panel is already open
        const existingPanel = openPanels.find((panel) => panel.id === panelId);
        if (existingPanel) {
            // Panel already exists, just focus it (bring to front)
            setOpenPanels((prev) =>
                prev.map((panel) =>
                    panel.id === panelId
                        ? {
                              ...panel,
                              zIndex:
                                  Math.max(...prev.map((p) => p.zIndex)) + 1,
                          }
                        : panel
                )
            );
            return;
        }

        // Create new panel
        const newPanel = {
            id: panelId,
            title: title,
            content: (
                <SplitPanelContent
                    activeFunction={activeFunction}
                    activeFunctionID={activeFunctionID}
                    tableNameMenu={tableNameMenu}
                    tableNameData={tableNameData}
                    hasTree={true}
                />
            ),
            position: {
                x: 50 + openPanels.length * 30,
                y: 50 + openPanels.length * 30,
            },
            zIndex:
                Math.max(...openPanels.map((p) => p.zIndex || 1000), 1000) + 1,
        };

        setOpenPanels((prev) => [...prev, newPanel]);
    }, []);

    const handleClosePanel = (panelId) => {
        setOpenPanels((prev) => prev.filter((panel) => panel.id !== panelId));
    };

    // useEffect(() => {
    //     console.log(openPanels);
    // }, [openPanels]);

    useEffect(() => {
        handleMenuItemClick(activeFunction, titleData);
    }, [activeFunction]);

    const renderPanel = () => {
        switch (typePanel) {
            case "data":
                return openPanels.map((panel) => (
                    <DraggablePanel
                        key={panel.id}
                        title={panel.title}
                        initialPosition={panel.position}
                        onClose={() => {
                            handleClosePanel(panel.id);
                            setActiveFunction(null);
                        }}
                        style={{ zIndex: panel.zIndex }}
                    >
                        {panel.content}
                    </DraggablePanel>
                ));

            case "tool":
                return (
                    <ToolPanel
                        activeFunction={activeFunction}
                        onClose={() => {
                            setActiveFunction(null);
                        }}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <main className="flex-1 relative">
            <MapView />
            <MapControls />
            <MapInfo />
            {renderPanel()}
        </main>
    );
};

export default MapContainer;
