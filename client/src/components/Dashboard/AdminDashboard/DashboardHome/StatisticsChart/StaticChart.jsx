import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";

const StaticChart = ({title, color, categories, data, isSingleLine}) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const styleId = 'apexcharts-dark-menu-fix';

        if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.innerHTML = `
        /* Dark mode menu style fix */
        .dark .apexcharts-menu {
            background-color: #000 !important;
            border: 1px solid #444 !important;
        }
        .dark .apexcharts-menu-item {
            color: #ddd !important;
        }
        .dark .apexcharts-menu-item:hover {
            background-color: #1f2937 !important;
        }

        /* Tooltip fix for dark mode */
        .dark .apexcharts-tooltip {
            background: #1f2937 !important;
            color: #fff !important;
            border: 1px solid #4b5563 !important;
        }

        .dark .apexcharts-tooltip-title {
            background: #374151 !important;
            color: #fff !important;
        }
        `;
            document.head.appendChild(style);
        }
    }, []);



    const axisColor = isDark ? "#F3F4F6" : "#4B5563";

    const chartOptions = {
        chart: {
            type: "area",
            height: 400,
            foreColor: axisColor,
            toolbar: {
                show: true,
                export: {
                    svg: {
                        background: isDark ? "#000" : "#000",
                    },
                    png: {
                        background: isDark ? "#000" : "#000",
                    }
                }
            }
        },
        colors: isSingleLine ? [color] : ["#3F51B5", "#4CAF50"],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.6,
                opacityTo: 0.2,
                stops: [0, 90, 100],
            },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        xaxis: {
            categories,
            labels: {
                style: {
                    colors: axisColor,
                },
            },
        },
        yaxis: {
            labels: {
                formatter: (value) => `${value}k`,
                style: {
                    colors: axisColor,
                },
            },
        },
        tooltip: {
            theme: isDark ? "dark" : "light",
            shared: true,
            intersect: false,
            y: {
                formatter: (value) => `${value}k`,
            },
        },
        legend: {
            labels: {
                colors: axisColor,
            },
            position: "top",
            horizontalAlign: "left",
            fontSize: "14px",
            markers: {
                width: 12,
                height: 12,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 5,
            },
        },
    };

    const chartSeries = isSingleLine
        ? [{name: title, data: data}]
        : [
            {name: "Income", data: data[0]},
            {name: "Expenditure", data: data[1]},
        ];

    return (
        <div className="w-full max-w-full">
            <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-white">
                {title}
            </h3>
            <div className="w-full min-w-[300px]">
                <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="area"
                    height={350}
                />
            </div>
        </div>
    );
};

export default StaticChart;
