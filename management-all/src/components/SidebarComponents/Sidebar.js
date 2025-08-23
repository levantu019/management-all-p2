// Libraries
import React, { useState, useEffect } from "react";
import { SquareChartGantt } from "lucide-react";

// Personal components
import SidebarHeader from "./SidebarHeader";
import { TreeMenu } from "../CommonComponents/TreeMenu";
import { LoadingEffect, ErrorEffect } from "../CommonComponents";
import SearchResultTab from "./SearchResultTab";
import { sampleMenuStructure, iconMap } from "../../constants";
import { buildHierarchy, buildHierarchyTwoArray } from "../../utils/transformUtils";
import { addKeysAndValues, sortArrayJsonByKey } from "../../utils/arrayUtils";
import { apiGetMultiple } from "../../utils/apiUtils";

// Sidebar Component
const Sidebar = ({ collapsed, onToggle, activeFunction, onFunctionChange }) => {
    const [expandedItems, setExpandedItems] = useState({});
    const [menuStructure, setMenuStructure] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("management");

    // API call to fetch menu structure from backend
    const fetchMenuStructure = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Make API call to backend
            const [response_area, response_category] = await apiGetMultiple([
                "areas",
                "categories",
            ]);

            // Check if response contains data
            if (response_area.data && Array.isArray(response_area.data)) {
                if (
                    response_category.data &&
                    Array.isArray(response_category.data)
                ) {
                    const response_area_extra = addKeysAndValues(
                        response_area.data,
                        {
                            // id: (oldValue) => `${oldValue}_area`,
                            id_active: "area_${id}",
                            type_menu: "group",
                            table_name_menu: "areas",
                        }
                    );
                    const response_category_extra = addKeysAndValues(
                        response_category.data,
                        {
                            // id: (oldValue) => `${oldValue}_category`,
                            id_active: "category_${id}",
                            type_menu: "function",
                            type_function: "data",
                            table_name_menu: "category",
                            table_name_data: "target",
                            title_data: "Danh sách mục tiêu",
                        }
                    );

                    const combine_area_category = buildHierarchyTwoArray(
                        response_area_extra,
                        buildHierarchy(
                            sortArrayJsonByKey(
                                response_category_extra,
                                "priority"
                            ),
                            "parent_id"
                        ),
                        "area_id"
                    );

                    setMenuStructure([
                        {
                            id: "target-management",
                            icon: "Target",
                            name: "Quản lý mục tiêu",
                            type_menu: "group",
                            children: combine_area_category,
                        },
                    ]);
                } else throw new Error("Invalid data format received from API");
            } else {
                throw new Error("Invalid data format received from API");
            }
        } catch (err) {
            console.error("Error fetching menu structure:", err);

            // Handle different types of errors
            if (err.code === "ECONNABORTED") {
                setError("Kết nối timeout. Vui lòng thử lại.");
            } else if (err.response) {
                // Server responded with error status
                setError(
                    `Lỗi server: ${err.response.status} - ${err.response.statusText}`
                );
            } else if (err.request) {
                // Network error
                setError(
                    "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
                );
            } else {
                // Other errors
                setError(err.message || "Không thể tải cấu trúc menu");
            }
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Fetches the menu structure asynchronously and concatenates it with a sample menu structure.
     * Transforms the combined menu items before updating the state.
     *
     * @async
     * @function fetchAndConcatMenu
     * @returns {Promise<void>} Resolves when the menu structure has been fetched, concatenated, transformed, and set.
     */
    const fetchAndConcatMenu = async () => {
        await fetchMenuStructure();
        setMenuStructure((prev) => {
            return transformMenuItems([...prev, ...sampleMenuStructure]);
        });
    };

    // Helper function to transform menu items from API response
    const transformMenuItems = (items) => {
        return items.map((item) => ({
            ...item,
            // Map icon string to icon component, fallback to SquareChartGantt if not found
            icon: iconMap[item.icon] || SquareChartGantt,
            // Recursively transform children if they exist
            children:
                item.children && Array.isArray(item.children)
                    ? transformMenuItems(item.children)
                    : undefined,
        }));
    };

    // Load menu structure on component mount
    useEffect(() => {
        fetchAndConcatMenu();
    }, []);

    // Handle expanding/collapsing menu items
    const toggleExpanded = (itemId) => {
        setExpandedItems((prev) => ({
            ...prev,
            [itemId]: !prev[itemId],
        }));
    };

    // Retry function for error state
    const handleRetry = () => {
        fetchAndConcatMenu();
    };

    return (
        <aside
            className={`h-screen bg-white shadow-lg border-r border-gray-200 transition-all duration-300 flex flex-col ${
                collapsed ? "w-16" : "w-80"
            }`}
        >
            {/* <MiddleExpandButton
                expanded={!collapsed}
                onClick={onToggle}
                side="right"
            /> */}

            {/* Fixed Header */}
            <div className="flex-shrink-0">
                <SidebarHeader collapsed={collapsed} onToggle={onToggle} />
            </div>

            {/* Fixed Tab Navigation */}
            {!collapsed && (
                <div className="flex-shrink-0 flex border-b border-gray-200 bg-gray-50">
                    <button
                        className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === "management"
                                ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                                : "text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setActiveTab("management")}
                    >
                        Management
                    </button>
                    <button
                        className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === "search"
                                ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                                : "text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={() => setActiveTab("search")}
                    >
                        Search Result
                    </button>
                </div>
            )}

            {/* Scrollable Tab Content - Takes remaining space */}
            <div className="flex-1 min-h-0 overflow-hidden">
                {activeTab === "management" ? (
                    isLoading ? (
                        <LoadingEffect collapsed={collapsed} />
                    ) : error ? (
                        <ErrorEffect
                            error={error}
                            onRetry={handleRetry}
                            collapsed={collapsed}
                        />
                    ) : (
                        <TreeMenu
                            menuStructure={menuStructure}
                            collapsed={collapsed}
                            expandedItems={expandedItems}
                            onToggleExpanded={toggleExpanded}
                            activeFunction={activeFunction}
                            onFunctionChange={onFunctionChange}
                        />
                    )
                ) : (
                    <SearchResultTab collapsed={collapsed} />
                )}
            </div>

            {/* Uncomment if you want a fixed footer */}
            {/* <div className="flex-shrink-0">
                <SidebarFooter collapsed={collapsed} />
            </div> */}
        </aside>
    );
};

export default Sidebar;
