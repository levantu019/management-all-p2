// Libraries
import React, { useState, useEffect } from "react";
import {
    Layers,
    Search,
    Filter,
    Ruler,
    MapPin,
    Download,
    Settings,
    Pencil,
    Eye,
    Plane,
    Play,
    BarChart3,
    Info,
    Database,
    FileText,
} from "lucide-react";

// Personal components
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";
import SidebarError from "./SidebarError";
import SidebarLoading from "./SidebarLoading";
import SearchResultTab from "./SearchResultTab";
import MiddleExpandButton from "../Common/MiddleExpandButton";

// Sidebar Component
const Sidebar = ({ collapsed, onToggle, activeFunction, onFunctionChange }) => {
    const [expandedItems, setExpandedItems] = useState({});
    const [menuStructure, setMenuStructure] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("management");

    // Icon mapping for API data
    const iconMap = {
        Settings: Settings,
        Ruler: Ruler,
        Pencil: Pencil,
        Eye: Eye,
        Play: Play,
        Plane: Plane,
        BarChart3: BarChart3,
        Info: Info,
        Layers: Layers,
        Search: Search,
        Database: Database,
        FileText: FileText,
        Download: Download,
        Filter: Filter,
        MapPin: MapPin,
    };

    // API call to fetch menu structure
    const fetchMenuStructure = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const demoApiResponse = [
                {
                    id: "tool-management",
                    icon: "Settings",
                    label: "Quản lý công cụ",
                    type: "group",
                    children: [
                        {
                            id: "measure",
                            icon: "Ruler",
                            label: "Đo đạc",
                            type: "function",
                        },
                        {
                            id: "draw",
                            icon: "Pencil",
                            label: "Vẽ",
                            type: "function",
                        },
                        {
                            id: "visualize",
                            icon: "Eye",
                            label: "Trực quan hóa",
                            type: "group",
                            children: [
                                {
                                    id: "run-viz",
                                    icon: "Play",
                                    label: "Chạy",
                                    type: "function",
                                },
                                {
                                    id: "fly-viz",
                                    icon: "Plane",
                                    label: "Bay",
                                    type: "function",
                                },
                                {
                                    id: "animate-viz",
                                    icon: "BarChart3",
                                    label: "Hoạt hình",
                                    type: "function",
                                },
                            ],
                        },
                    ],
                },
                {
                    id: "info-management",
                    icon: "Info",
                    label: "Quản lý thông tin",
                    type: "group",
                    children: [
                        {
                            id: "layers",
                            icon: "Layers",
                            label: "Lớp bản đồ",
                            type: "function",
                        },
                        {
                            id: "search",
                            icon: "Search",
                            label: "Tìm kiếm",
                            type: "function",
                        },
                        {
                            id: "data-sources",
                            icon: "Database",
                            label: "Nguồn dữ liệu",
                            type: "group",
                            children: [
                                {
                                    id: "local-data",
                                    icon: "FileText",
                                    label: "Dữ liệu cục bộ",
                                    type: "function",
                                },
                                {
                                    id: "remote-data",
                                    icon: "Download",
                                    label: "Dữ liệu từ xa",
                                    type: "function",
                                },
                            ],
                        },
                        {
                            id: "filter",
                            icon: "Filter",
                            label: "Bộ lọc",
                            type: "function",
                        },
                    ],
                },
                {
                    id: "marker",
                    icon: "MapPin",
                    label: "Đánh dấu",
                    type: "function",
                },
            ];

            // Transform demo data to include icon components
            const transformedStructure = transformMenuItems(demoApiResponse);
            setMenuStructure(transformedStructure);
        } catch (err) {
            console.error("Error:", err);
            setError("Không thể tải cấu trúc menu");
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to transform menu items
    const transformMenuItems = (items) => {
        return items.map((item) => ({
            ...item,
            icon: iconMap[item.icon] || Settings,
            children: item.children
                ? transformMenuItems(item.children)
                : undefined,
        }));
    };

    // Load menu structure on component mount
    useEffect(() => {
        fetchMenuStructure();
    }, []);

    const toggleExpanded = (itemId) => {
        setExpandedItems((prev) => ({
            ...prev,
            [itemId]: !prev[itemId],
        }));
    };

    return (
        <aside
            className={`bg-white shadow-lg border-r border-gray-200 transition-all duration-300 flex flex-col ${
                collapsed ? "w-16" : "w-80"
            }`}
        >
            {/* <MiddleExpandButton
                expanded={!collapsed}
                onClick={onToggle}
                side="right"
            /> */}
            <SidebarHeader collapsed={collapsed} onToggle={onToggle} />

            {/* Tab Navigation */}
            {!collapsed && (
                <div className="flex border-b border-gray-200 bg-gray-50">
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

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
                {activeTab === "management" ? (
                    <div className="h-full overflow-y-auto">
                        {isLoading ? (
                            <SidebarLoading collapsed={collapsed} />
                        ) : error ? (
                            <SidebarError
                                error={error}
                                onRetry={fetchMenuStructure}
                                collapsed={collapsed}
                            />
                        ) : (
                            <SidebarMenu
                                menuStructure={menuStructure}
                                collapsed={collapsed}
                                expandedItems={expandedItems}
                                onToggleExpanded={toggleExpanded}
                                activeFunction={activeFunction}
                                onFunctionChange={onFunctionChange}
                            />
                        )}
                    </div>
                ) : (
                    <div className="h-full overflow-y-auto">
                        <SearchResultTab collapsed={collapsed} />
                    </div>
                )}
            </div>

            {/* <SidebarFooter collapsed={collapsed} /> */}
        </aside>
    );
};

export default Sidebar;
