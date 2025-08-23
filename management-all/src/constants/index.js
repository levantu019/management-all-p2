import { Settings, Target, Ruler, Pencil, Eye, Play, Plane, BarChart3, Info, Layers, Search, Database, FileText, Download, Filter, MapPin } from 'lucide-react';

const sampleMenuStructure = [
    {
        id: "tool-management",
        id_active: "tool-management",
        icon: "Settings",
        name: "Quản lý công cụ",
        type_menu: "group",
        children: [
            {
                id: "measure",
                id_active: "measure",
                icon: "Ruler",
                name: "Đo đạc",
                type_menu: "function",
                type_function: "tool",
            },
            {
                id: "draw",
                id_active: "draw",
                icon: "Pencil",
                name: "Vẽ",
                type_menu: "function",
                type_function: "tool",
            },
            {
                id: "visualize",
                id_active: "visualize",
                icon: "Eye",
                name: "Trực quan hóa",
                type_menu: "group",
                children: [
                    {
                        id: "run-viz",
                        id_active: "run-viz",
                        icon: "Play",
                        name: "Chạy",
                        type_menu: "function",
                        type_function: "tool",
                    },
                    {
                        id: "fly-viz",
                        id_active: "fly-viz",
                        icon: "Plane",
                        name: "Bay",
                        type_menu: "function",
                        type_function: "tool",
                    },
                    {
                        id: "animate-viz",
                        id_active: "animate-viz",
                        icon: "BarChart3",
                        name: "Hoạt hình",
                        type_menu: "function",
                        type_function: "tool",
                    },
                ],
            },
        ],
    },
    {
        id: "info-management",
        id_active: "info-management",
        icon: "Info",
        name: "Quản lý thông tin",
        type_menu: "group",
        children: [
            {
                id: "layers",
                id_active: "layers",
                icon: "Layers",
                name: "Lớp bản đồ",
                type_menu: "function",
                type_function: "tool",
            },
            {
                id: "search",
                id_active: "search",
                icon: "Search",
                name: "Tìm kiếm",
                type_menu: "function",
                type_function: "tool",
            },
            {
                id: "data-sources",
                id_active: "data-sources",
                icon: "Database",
                name: "Nguồn dữ liệu",
                type_menu: "group",
                children: [
                    {
                        id: "local-data",
                        id_active: "local-data",
                        icon: "FileText",
                        name: "Dữ liệu cục bộ",
                        type_menu: "function",
                        type_function: "tool",
                    },
                    {
                        id: "remote-data",
                        id_active: "remote-data",
                        icon: "Download",
                        name: "Dữ liệu từ xa",
                        type_menu: "function",
                        type_function: "tool",
                    },
                ],
            },
            {
                id: "filter",
                id_active: "filter",
                icon: "Filter",
                name: "Bộ lọc",
                type_menu: "function",
                type_function: "tool",
            },
        ],
    },
    {
        id: "marker",
        id_active: "marker",
        icon: "MapPin",
        name: "Đánh dấu",
        type_menu: "function",
        type_function: "tool",
    },
];

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
        Target: Target
    };

export {sampleMenuStructure, iconMap};