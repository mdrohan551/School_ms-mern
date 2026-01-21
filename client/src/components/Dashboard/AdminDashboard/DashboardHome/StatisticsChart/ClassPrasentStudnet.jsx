import React, { useEffect, useMemo } from 'react';
import Chart from 'react-apexcharts';

const ClassPrasentStudnet = ({ darkMode = false, apiData = [], refetch }) => {

    useEffect(() => {
        // শুধু তখনই refetch করো যদি function exist করে
        if (typeof refetch === 'function') {
            try {
                refetch();
            } catch (err) {
                console.warn("Refetch ignored:", err);
            }
        }

        // Dark mode CSS inject
        const styleId = 'apexcharts-dark-menu-fix';
        if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.innerHTML = `
            .dark .apexcharts-menu { background-color: #000 !important; border: 1px solid #444 !important; }
            .dark .apexcharts-menu-item { color: #ddd !important; }
            .dark .apexcharts-menu-item:hover { background-color: #1f2937 !important; }
            .dark .apexcharts-tooltip { background: #1f2937 !important; color: #fff !important; border: 1px solid #4b5563 !important; }
            .dark .apexcharts-tooltip-title { background: #374151 !important; color: #fff !important; }
        `;
            document.head.appendChild(style);
        }
    }, [refetch]);


    const chartData = useMemo(() => {
        const categories = apiData.map(item => item.className?.trim() || 'no name');
        const seriesData = apiData.map(item => item.totalPresent || 0);
        return { categories, series: [{ name: "Total Present Students", data: seriesData }] };
    }, [apiData]);

    // Axis color
    const axisColor = darkMode ? '#F3F4F6' : '#4B5563';
    // Bar color: darkMode অনুযায়ী উল্টো
    const barColor = darkMode ? '#8f6ff6' : '#000000';
    const headerTextColor = darkMode ? 'white' : 'black';

    const chartOptions = {
        chart: {
            type: 'bar',
            height: 400,
            foreColor: axisColor,
            toolbar: {
                show: true,
                export: {
                    svg: { background: darkMode ? '#1f2937' : '#fff' },
                    png: { background: darkMode ? '#1f2937' : '#fff' },
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
            categories: chartData.categories,
            title: { style: { color: axisColor } },
            labels: { style: { colors: axisColor } },
        },
        yaxis: {
            title: { text: 'Total Present Students', style: { color: axisColor } },
            labels: { style: { colors: axisColor } },
        },
        fill: { type: 'solid' },
        tooltip: {
            theme: darkMode ? 'dark' : 'light',
            y: { formatter: (val) => `${val}` },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            labels: { colors: axisColor },
            markers: { width: 12, height: 12 },
            itemMargin: { horizontal: 10, vertical: 5 },
        },
        colors: [barColor],
    };

    return (
        <div
            style={{
                padding: '20px',
                backgroundColor: darkMode ? '#1f2937' : '#fff',
                borderRadius: '8px',
            }}
        >
            <h3
                style={{
                    color: headerTextColor,
                    textAlign: 'center',
                    marginBottom: '20px',
                    fontSize: '18px',
                    fontWeight: '600',
                }}
            >
                Class-wise Present Students
            </h3>

            <div className="w-full min-w-[300px]">
                <Chart
                    options={chartOptions}
                    series={chartData.series}
                    type="bar"
                    height={350}
                />
            </div>
        </div>
    );
};

export default ClassPrasentStudnet;
