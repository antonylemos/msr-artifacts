// src/pages/reports/TotalChatsReportPage.jsx
import React, { useState } from 'react';
import {
    ChartBarIcon as PageIcon, PlusIcon, CalendarDaysIcon, ChevronDownIcon, InformationCircleIcon,
    ArrowUpOnSquareIcon, ViewfinderCircleIcon // Added ViewfinderCircleIcon for heatmap
} from '@heroicons/react/24/outline';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler);

// --- Dummy Data Functions (consistent with previous versions) ---
function generateHourlyDataForSingleDay() {
    const labels = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
    let values = Array(24).fill(0);
    for(let i=0; i < 24; i++) {
        if (i >= 17 && i <= 18) values[i] = Math.floor(Math.random() * 2) + 3;
        else if (i >= 19 && i <= 20) values[i] = Math.floor(Math.random() * 2) + 1;
        else if (i >= 6 && i <= 16) values[i] = Math.floor(Math.random()*1.5);
        else values[i] = 0;
    }
    return { labels, values, total: values.reduce((s, v) => s + v, 0) };
}

function generateSingleDayHeatmap(dayOffset = 0) {
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);
    const currentYear = new Date().getFullYear();
    const dateYear = date.getFullYear();
    const hourlyCounts = Array.from({ length: 24 }, () => Math.floor(Math.random() * 4));
    return [{
        dateLabel: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: (currentYear !== dateYear ? '2-digit' : undefined )}),
        fullDate: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        hours: hourlyCounts
    }];
}

function generateHeatmapDataForRange(days) {
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const currentYear = new Date().getFullYear();
        const dateYear = date.getFullYear();
        const hourlyCounts = Array.from({ length: 24 }, () => Math.floor(Math.random() * 2));
        data.push({
            dateLabel: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: (currentYear !== dateYear ? '2-digit' : undefined )}),
            fullDate: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            hours: hourlyCounts
        });
    }
    return data;
}
const generateSingleDayTableData = (dayLabel, heatmapDayData) => {
    let total = 0;
    if(heatmapDayData && heatmapDayData.hours) {
        total = heatmapDayData.hours.reduce((a,b) => a+b, 0);
    }
     // Ensure dayLabel is a string before trying to split
    const labelStr = String(dayLabel || '');
    const displayYear = labelStr.split(' ')[2]; // Check if year is part of dayLabel
    let labelDate;
    try {
        labelDate = new Date(labelStr.replace(/(\d+)(st|nd|rd|th)/, '$1'));
         if (isNaN(labelDate.getTime())) { // if parsing failed, use a fallback
            labelDate = new Date(); // Or handle error appropriately
        }
    } catch (e) {
        labelDate = new Date(); // Fallback on error
    }


    return {
        labels: [labelDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: displayYear ? '2-digit' : undefined })],
        values: [total],
        total: total
    };
};

const generateDailyData = (numDays, maxValue, endDayOffset = 0) => {
    const labels = [];
    const values = [];
    let grandTotal = 0;
    const baseEndDate = new Date();
    baseEndDate.setDate(baseEndDate.getDate() - endDayOffset);
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < numDays; i++) {
        const date = new Date(baseEndDate);
        date.setDate(date.getDate() - (numDays - 1 - i));
        const dateYear = date.getFullYear();
        let dayTotal;
        if (numDays === 7 && datePresetKey === 'last7days' && i === numDays - 2) { // Specific for "30 May" in a typical "Last 7 days ending 31 May"
            dayTotal = 8;
        } else if (numDays === 7 && datePresetKey === 'last7days') {
            dayTotal = 0;
        } else {
            dayTotal = Math.floor(Math.random() * maxValue);
        }
        
        labels.push(date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: (currentYear !== dateYear ? '2-digit' : undefined) }));
        values.push(dayTotal);
        grandTotal += dayTotal;
    }
    return { labels, values, total: grandTotal };
};

const createHourlyTableFromHeatmapDay = (heatmapDayObject) => {
    if (!heatmapDayObject || !heatmapDayObject.hours) {
        return { labels: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`), values: Array(24).fill(0), total: 0};
    }
    return {
        labels: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
        values: heatmapDayObject.hours,
        total: heatmapDayObject.hours.reduce((s, v) => s + v, 0)
    };
};
// Initialize datePresetKey here to be accessible by generateDailyData if needed for specific logic
let datePresetKey = 'last7days'; // Default or managed by state later

const todayHeatmapArray = generateSingleDayHeatmap(0);
const todayHeatmapDayObject = todayHeatmapArray[0];
const yesterdayHeatmapArray = generateSingleDayHeatmap(1);
const yesterdayHeatmapDayObject = yesterdayHeatmapArray[0];

const initialReportDataByPreset = {
    today: {
        heatmap: todayHeatmapArray,
        dailyTable: generateSingleDayTableData(todayHeatmapDayObject.dateLabel, todayHeatmapDayObject),
        hourlyTable: createHourlyTableFromHeatmapDay(todayHeatmapDayObject)
    },
    yesterday: {
        heatmap: yesterdayHeatmapArray,
        dailyTable: generateSingleDayTableData(yesterdayHeatmapDayObject.dateLabel, yesterdayHeatmapDayObject),
        hourlyTable: createHourlyTableFromHeatmapDay(yesterdayHeatmapDayObject)
    },
    last7days: {
        heatmap: generateHeatmapDataForRange(7),
        dailyTable: generateDailyData(7, 10),
        hourlyTable: generateHourlyDataForSingleDay()
    },
    last30days: {
        heatmap: generateHeatmapDataForRange(30),
        dailyTable: generateDailyData(30, 15),
        hourlyTable: generateHourlyDataForSingleDay()
    },
    lastmonth: {
        heatmap: generateHeatmapDataForRange(30),
        dailyTable: generateDailyData(30, 15, new Date().getDate()),
        hourlyTable: generateHourlyDataForSingleDay()
    },
    currentmonth: {
        heatmap: generateHeatmapDataForRange(new Date().getDate()),
        dailyTable: generateDailyData(new Date().getDate(), 25),
        hourlyTable: generateHourlyDataForSingleDay()
    },
};
// --- End Dummy Data ---

// --- Chart Component ---
const ChatsDisplayChart = ({ data, type }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Total chats',
                data: data.values,
                backgroundColor: type === 'bar' ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.1)', // blue-500
                borderColor: 'rgb(59, 130, 246)', // blue-500
                borderWidth: type === 'bar' ? 1 : 2,
                fill: type === 'line',
                tension: type === 'line' ? 0.3 : undefined,
                pointBackgroundColor: type === 'line' ? 'rgb(59, 130, 246)' : undefined,
                pointRadius: type === 'line' ? 3 : undefined,
                pointHoverRadius: type === 'line' ? 5 : undefined,
            },
        ],
    };
    const options = {
        responsive: true, maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(203, 213, 225, 0.5)'}, ticks: { color: '#64748b', precision: 0 }}, // slate-300, slate-500
            x: { grid: { display: false }, ticks: { color: '#64748b' }} // slate-500
        },
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#fff', titleColor: '#334155', bodyColor: '#334155', borderColor: '#e2e8f0', borderWidth: 1 }}
    };
    return type === 'bar' ? <Bar options={options} data={chartData} /> : <Line options={options} data={chartData} />;
};
// --- End Chart Component ---

// --- HeatmapChart Component (Light Theme) ---
const HeatmapChart = ({ data, datePresetKey }) => {
    const hourLabelsY = ["00:00", "3:00", "6:00", "9:00", "12:00", "15:00", "18:00", "21:00"];
    let displayDayLabelsX = [];

    if (data && data.length > 0) {
        if (datePresetKey === 'last30days') {
            const step = Math.max(1, Math.floor(data.length / 7));
            displayDayLabelsX = data.map((d, index) => (index % step === 0) ? d.dateLabel : '').filter(Boolean);
            if (data.length > 0 && displayDayLabelsX.length > 0 && !displayDayLabelsX.includes(data[data.length - 1].dateLabel)) {
                 displayDayLabelsX.push(data[data.length - 1].dateLabel);
            } else if (data.length > 0 && displayDayLabelsX.length === 0 ) {
                displayDayLabelsX.push(data[data.length -1].dateLabel);
            }
        } else if (['yesterday', 'today'].includes(datePresetKey) && data[0]) {
            displayDayLabelsX = [data[0].dateLabel];
        } else {
            displayDayLabelsX = data.map(d => d.dateLabel);
        }
    }
    
    const getColorForValue = (value) => { // Colors for LIGHT THEME
        if (value === 0) return 'bg-slate-100 hover:ring-1 hover:ring-slate-300';
        if (value === 1) return 'bg-blue-100 hover:ring-1 hover:ring-blue-300';
        if (value === 2) return 'bg-blue-200 hover:ring-1 hover:ring-blue-400';
        if (value === 3) return 'bg-blue-300 hover:ring-1 hover:ring-blue-500';
        return 'bg-blue-400 hover:ring-1 hover:ring-blue-600'; // For 4+
    };

    if (!data || data.length === 0 || data.every(d => !d.hours || d.hours.every(h => h === 0))) {
        return <div className="flex items-center justify-center h-full text-slate-500 text-sm">No data available for heatmap.</div>;
    }

    return (
        <div className="flex mt-1 h-full w-full overflow-hidden">
            <div className="flex flex-col justify-around text-xs text-slate-500 pr-2 flex-shrink-0 w-14 text-right">
                {hourLabelsY.map(label => <span key={label} className="flex-1 flex items-start pt-0.5">{label}</span>)}
                <span className="h-6"></span>
            </div>
            <div className="flex-1 grid overflow-x-auto scrollbar-thin" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(20px, 1fr))` }}>
                {data.map((dayData, dayIndex) => (
                    <div key={dayData.dateLabel || dayIndex} className="flex flex-col items-center border-l border-slate-200 first:border-l-0">
                        <div className="h-6 text-xs text-slate-500 text-center pt-1 whitespace-nowrap">
                            {displayDayLabelsX.includes(dayData.dateLabel) || (data.length === 1 && dayIndex === 0) ? dayData.dateLabel : ''}
                        </div>
                        <div className="w-full grid grid-rows-24 gap-px bg-slate-200 flex-grow">
                            {dayData.hours.map((hourValue, hourIndex) => (
                                <div
                                    key={`${dayData.dateLabel}-${hourIndex}`}
                                    className={`min-h-[10px] h-full ${getColorForValue(hourValue)} transition-all duration-75`}
                                    title={`${dayData.fullDate}, ${String(hourIndex).padStart(2, '0')}:00 - ${String(hourIndex + 1 > 23 ? 0 : hourIndex + 1).padStart(2, '0')}:00 \nChats: ${hourValue}`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col justify-end items-center text-xs text-slate-500 pl-3 pb-1 pt-6 w-16 flex-shrink-0">
                <div className="flex space-x-0.5 mb-0.5">
                    {[0,1,2,3,4].map(val => (<div key={`legend-color-${val}`} className={`w-2.5 h-2.5 rounded-sm ${getColorForValue(val)}`}></div>))}
                </div>
                <div className="flex space-x-0.5">
                    {[0,1,2,3,4].map(val => (<span key={`legend-text-${val}`} className="w-2.5 text-center text-[9px] leading-none">{val === 4 ? '4+' : val}</span>))}
                </div>
            </div>
        </div>
    );
};
// --- End HeatmapChart Component ---

// --- DateFilterDropdown Component ---
const DateFilterDropdown = ({ selectedPresetKey, onSelectPreset }) => {
    const presets = [
        { key: 'today', label: 'Today' }, { key: 'yesterday', label: 'Yesterday' },
        { key: 'last7days', label: 'Last 7 days' }, { key: 'last30days', label: 'Last 30 days' },
        { key: 'lastmonth', label: 'Last month' }, { key: 'currentmonth', label: 'Current month' },
    ];
    const selectedLabel = presets.find(p => p.key === selectedPresetKey)?.label || 'Select date';
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="px-3 py-1.5 border border-slate-300 bg-white rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center">
                <CalendarDaysIcon className="w-4 h-4 mr-1.5 text-slate-400" /> {selectedLabel} <ChevronDownIcon className="w-4 h-4 ml-1.5 text-slate-400" />
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-max bg-white border border-slate-300 rounded shadow-lg z-10">
                    {presets.map(preset => (<div key={preset.key} onClick={() => { onSelectPreset(preset.key); setIsOpen(false); }} className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer">{preset.label}</div>))}
                </div>
            )}
        </div>
    );
};
// --- End DateFilterDropdown ---

const TotalChatsReportPage = () => {
    const [is24HourDistribution, setIs24HourDistribution] = useState(false);
    const [_datePresetKey, _setDatePresetKey] = useState('last7days'); // Internal state for preset key
    
    // Update global datePresetKey when internal state changes, for generateDailyData logic
    datePresetKey = _datePresetKey; 

    const currentDataForPreset = initialReportDataByPreset[_datePresetKey] || initialReportDataByPreset.today;
    const chartSourceData = is24HourDistribution ? currentDataForPreset.hourlyTable : currentDataForPreset.dailyTable;
    const breakdownTableData = is24HourDistribution ? currentDataForPreset.hourlyTable : currentDataForPreset.dailyTable;
    
    const tableLabels = breakdownTableData?.labels || [];
    const breakdownTableHeaders = ["Series", ...tableLabels, "Total"];
    const tableValues = breakdownTableData?.values || [];
    const tableTotal = breakdownTableData?.total || 0;

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Page Header - Light Theme */}
            <div className="p-4 md:p-6 border-b border-slate-200 bg-white flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center"><PageIcon className="w-6 h-6 text-slate-700 mr-3" /><h1 className="text-xl font-semibold text-slate-800">Total chats</h1></div>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Save view</button>
                </div>
            </div>

            {/* Filter Bar - Light Theme */}
            <div className="p-3 md:px-6 md:py-3 border-b border-slate-200 bg-white flex-shrink-0 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-1.5 border border-slate-300 bg-white rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center">
                        <PlusIcon className="w-4 h-4 mr-1.5 text-slate-400" /> Add filter</button>
                    <DateFilterDropdown selectedPresetKey={_datePresetKey} onSelectPreset={_setDatePresetKey} />
                </div>
                <div className="flex items-center text-sm text-slate-600">
                    24-hour distribution:
                    <label htmlFor="distToggle" className="flex items-center cursor-pointer ml-2">
                        <div className="relative">
                            <input type="checkbox" id="distToggle" className="sr-only" checked={is24HourDistribution} onChange={() => setIs24HourDistribution(!is24HourDistribution)} />
                            <div className={`block w-10 h-5 rounded-full transition-colors ${is24HourDistribution ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <div className={`dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${is24HourDistribution ? 'translate-x-5' : ''}`}></div>
                        </div>
                    </label>
                </div>
            </div>

            {/* Main Report Content - Light Theme */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto scrollbar-thin space-y-6 bg-slate-100">
                {/* Card 1: Total Chats Chart - Light Theme */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-slate-700">
                            <InformationCircleIcon className="w-5 h-5 mr-2 text-slate-400"/>
                            <h2 className="text-md font-medium">Total chats</h2>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        {chartSourceData && chartSourceData.labels && chartSourceData.values ? (
                             <ChatsDisplayChart data={chartSourceData} type={is24HourDistribution ? 'line' : 'bar'} />
                        ) : ( <div className="flex items-center justify-center h-full text-slate-500">Loading chart data...</div> )}
                    </div>
                </div>

                {/* Card 2: Total Chats Breakdown Table - Light Theme */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-4 flex justify-between items-center border-b border-slate-200">
                        <h3 className="text-md font-medium text-slate-700 flex items-center">
                            <ChevronDownIcon className="w-5 h-5 mr-1 text-slate-400"/> Total chats breakdown</h3>
                        <button className="px-3 py-1 border border-slate-300 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center">
                            <ArrowUpOnSquareIcon className="w-4 h-4 mr-1.5"/> Export CSV</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-50">
                                <tr>{breakdownTableHeaders.map(header => (<th key={header} scope="col" className={`px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap ${header === "Series" ? "text-left" : "text-right"}`}>{header}</th>))}</tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                <tr>
                                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap">Total chats</td>
                                    {tableValues.map((value, index) => (<td key={`${tableLabels[index] || index}-${value}-${index}`} className="px-4 py-3 text-right text-slate-700">{value}</td>))}
                                    <td className="px-4 py-3 text-right text-slate-700 font-medium">{tableTotal}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Card 3: Chat Activity Heatmap - Light Theme */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-slate-700">
                            <ViewfinderCircleIcon className="w-5 h-5 mr-2 text-slate-400"/> {/* Using a different icon for variety */}
                            <h2 className="text-md font-medium">Chat Activity Heatmap</h2>
                        </div>
                        <button className="px-3 py-1 border border-slate-300 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center">
                           <ArrowUpOnSquareIcon className="w-4 h-4 mr-1.5"/> Export CSV
                        </button>
                    </div>
                    <div className="h-[350px] md:h-[450px] w-full"> {/* Standard height for heatmap */}
                        <HeatmapChart data={currentDataForPreset.heatmap} datePresetKey={_datePresetKey} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalChatsReportPage;