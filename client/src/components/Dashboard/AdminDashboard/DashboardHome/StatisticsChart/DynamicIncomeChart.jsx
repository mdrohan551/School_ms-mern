import React from "react";
import ReactEcharts from "echarts-for-react";

const chartData = {
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dataset1: [30, 50, 40, 60, 20, 45, 25],
    dataset2: [20, 40, 35, 55, 15, 40, 20],
};

const DynamicIncomeChart = ({ darkMode = false ,barWidth='40%' }) => {
    const option = {
        backgroundColor: darkMode ? "#1e1e1e" : "#ffffff", // পুরো chart container color
        tooltip: { trigger: "axis" },
        legend: {
            textStyle: { color: darkMode ? "#fff" : "#000" }
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
            backgroundColor: darkMode ? "#1e1e1e" : "#ffffff", // plot area's background
        },
        xAxis: {
            type: "category",
            data: chartData.days,
            axisLine: { lineStyle: { color: darkMode ? "#fff" : "#000" } },
            axisLabel: { color: darkMode ? "#fff" : "#000" }
        },
        yAxis: {
            type: "value",
            axisLine: { lineStyle: { color: darkMode ? "#fff" : "#000" } },
            axisLabel: { color: darkMode ? "#fff" : "#000" },
            splitLine: { lineStyle: { color: darkMode ? "#555" : "#ddd" } }
        },
        series: [
            {
                name: "Dataset 1",
                type: "line",
                smooth: true,
                data: chartData.dataset1,
                areaStyle: {
                    color: "rgba(47,0,255,0.2)",
                },
                lineStyle: { color:darkMode ? "#0dde2f" : "rgb(103,83,253)" },
                itemStyle: { color: "#00c853" },
            },
            {
                name: "Dataset 2",
                type: "bar",
                data: chartData.dataset2,
                itemStyle: { color:darkMode ? "#e81d1d" : "rgb(5,5,5)"  },
                barWidth:barWidth,
            },
        ],
    };
    // rgb(79 57 246)
    return (
        <ReactEcharts
            option={option}
            style={{ height: "300px", width: "100%" }}
        />
    );
};

export default DynamicIncomeChart;
