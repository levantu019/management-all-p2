const demoApiResponse = [
                {
                    id: "tool-management",
                    icon: "Settings",
                    name: "Quản lý công cụ",
                    type: "group",
                    children: [
                        {
                            id: "measure",
                            icon: "Ruler",
                            name: "Đo đạc",
                            type: "function",
                        },
                        {
                            id: "draw",
                            icon: "Pencil",
                            name: "Vẽ",
                            type: "function",
                        },
                        {
                            id: "visualize",
                            icon: "Eye",
                            name: "Trực quan hóa",
                            type: "group",
                            children: [
                                {
                                    id: "run-viz",
                                    icon: "Play",
                                    name: "Chạy",
                                    type: "function",
                                },
                                {
                                    id: "fly-viz",
                                    icon: "Plane",
                                    name: "Bay",
                                    type: "function",
                                },
                                {
                                    id: "animate-viz",
                                    icon: "BarChart3",
                                    name: "Hoạt hình",
                                    type: "function",
                                },
                            ],
                        },
                    ],
                },
                {
                    id: "info-management",
                    icon: "Info",
                    name: "Quản lý thông tin",
                    type: "group",
                    children: [
                        {
                            id: "layers",
                            icon: "Layers",
                            name: "Lớp bản đồ",
                            type: "function",
                        },
                        {
                            id: "search",
                            icon: "Search",
                            name: "Tìm kiếm",
                            type: "function",
                        },
                        {
                            id: "data-sources",
                            icon: "Database",
                            name: "Nguồn dữ liệu",
                            type: "group",
                            children: [
                                {
                                    id: "local-data",
                                    icon: "FileText",
                                    name: "Dữ liệu cục bộ",
                                    type: "function",
                                },
                                {
                                    id: "remote-data",
                                    icon: "Download",
                                    name: "Dữ liệu từ xa",
                                    type: "function",
                                },
                            ],
                        },
                        {
                            id: "filter",
                            icon: "Filter",
                            name: "Bộ lọc",
                            type: "function",
                        },
                    ],
                },
                {
                    id: "marker",
                    icon: "MapPin",
                    name: "Đánh dấu",
                    type: "function",
                },
            ];