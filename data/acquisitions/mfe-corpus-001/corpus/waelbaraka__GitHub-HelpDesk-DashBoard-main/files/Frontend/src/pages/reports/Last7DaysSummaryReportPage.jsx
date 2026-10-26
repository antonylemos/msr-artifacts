// src/pages/reports/Last7DaysSummaryReportPage.jsx
import React, { useState, useEffect } from 'react';
import {
    DocumentTextIcon,
    UsersIcon,
    HandThumbUpIcon,
    TrophyIcon,
    ShoppingCartIcon,
    ArrowUpIcon, // For positive change
    ArrowDownIcon // For negative change
} from '@heroicons/react/24/outline'; // Using outline for a lighter feel
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Dummy data for the report - in a real app, this would come from props or an API call
const reportDataDefaults = {
    totalChats: {
        current: 8,
        previous: 0, // If previous was, say, 4, change would be +4
        daily: [0, 1, 0, 2, 1, 8, 1], // Sun, Mon, Tue, Wed, Thu, Fri, Sat (example values)
    },
    queuedVisitors: 0,
    goals: 0,
    chatSatisfaction: {
        currentPercentage: 33,
        previousPercentage: 0, // If previous was 20%, change would be +13 p.p.
    },
    sales: 0,
    generatedAt: new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'medium' }), // Dynamic generation time
    // Example data for 'All agents' view if different
    allAgentsTotalChats: {
        current: 25,
        previous: 15,
        daily: [2, 3, 4, 3, 5, 25, 2],
    }
};

const KPI_ICON_CLASS = "w-5 h-5 text-content-text-secondary mr-2"; // Dark gray icon

const Last7DaysSummaryReportPage = ({ data }) => { // Accept data as a prop
    const [activeStatsView, setActiveStatsView] = useState('my_stats'); // 'my_stats' or 'all_agents'

    // Use passed data or defaults
    const currentReportData = activeStatsView === 'my_stats' ? (data || reportDataDefaults) : {
        ...reportDataDefaults, // Use defaults for other KPIs
        totalChats: data?.allAgentsTotalChats || reportDataDefaults.allAgentsTotalChats // Specific data for all agents
    };


    const chartDataConfig = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                label: 'Total Chats',
                data: currentReportData.totalChats.daily,
                backgroundColor: 'rgba(59, 130, 246, 1)', // Solid blue (Tailwind blue-500)
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
                borderRadius: { topLeft: 4, topRight: 4 }, // Rounded top corners for bars
                barPercentage: 0.6, // Adjust for bar width relative to category space
                categoryPercentage: 0.7, // Adjust for category width relative to available space
            },
        ],
    };

    const chartOptionsConfig = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(31, 41, 55, 0.9)', // dark gray bg for tooltip (Gray-800)
                titleColor: '#FFFFFF',
                bodyColor: '#E5E7EB', // Light gray for body
                borderColor: 'rgba(55, 65, 81, 0.9)', // Gray-700
                borderWidth: 1,
                padding: 10,
                cornerRadius: 4,
                displayColors: false, // Don't show color box in tooltip
                callbacks: {
                    label: function(context) {
                        return `Chats: ${context.parsed.y}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: Math.max(0, ...currentReportData.totalChats.daily) + Math.ceil(Math.max(1, ...currentReportData.totalChats.daily)*0.2), // Dynamic headroom
                grid: {
                    drawBorder: false,
                    color: 'rgba(229, 231, 235, 0.6)', // Lighter grid lines (Gray-200)
                },
                ticks: {
                    color: 'var(--color-content-text-secondary)',
                    font: { size: 10 },
                    stepSize: Math.max(1, Math.ceil(Math.max(...currentReportData.totalChats.daily) / 5)), // Dynamic step size
                    padding: 10,
                }
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: 'var(--color-content-text-secondary)',
                    font: { size: 10 },
                }
            },
        },
        elements: {
            bar: {
                hoverBackgroundColor: 'rgba(37, 99, 235, 1)', // Darker blue on hover (Tailwind blue-600)
            }
        }
    };

    const totalChatsChange = currentReportData.totalChats.current - currentReportData.totalChats.previous;
    const satisfactionChange = currentReportData.chatSatisfaction.currentPercentage - (currentReportData.chatSatisfaction.previousPercentage || 0);

    return (
        <div className="flex-1 flex flex-col overflow-hidden"> {/* No explicit bg, inherits from PageContentWrapper */}
            {/* Page Header */}
            <div className="p-6 border-b border-table-border bg-content-bg flex-shrink-0">
                <div className="flex items-center">
                    <DocumentTextIcon className="w-6 h-6 text-content-text-primary mr-3" />
                    <h1 className="text-xl font-semibold text-content-text-primary">Last 7 days</h1>
                </div>
            </div>

            {/* Main Report Content - Scrollable */}
            <div className="flex-1 p-6 overflow-y-auto scrollbar-thin space-y-6 bg-content-bg"> {/* Ensure this also has light bg if page-background is different */}
                {/* Total Chats Section Card */}
                <div className="bg-card-bg p-6 rounded-lg shadow-sm border border-table-border">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-lg font-medium text-content-text-primary">Total chats</h2>
                            <div className="flex items-baseline mt-1">
                                <span className="text-3xl font-semibold text-content-text-primary">{currentReportData.totalChats.current}</span>
                                {(totalChatsChange !== 0 || currentReportData.totalChats.previous !== undefined) && (
                                    <span className={`ml-2 text-xs font-medium flex items-center ${totalChatsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {totalChatsChange >= 0 ? <ArrowUpIcon className="w-3 h-3 mr-0.5"/> : <ArrowDownIcon className="w-3 h-3 mr-0.5"/>}
                                        {totalChatsChange >= 0 ? '+' : ''}{totalChatsChange} from previous 7 days
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex space-x-1 bg-gray-100 p-0.5 rounded-md">
                             <button onClick={() => setActiveStatsView('my_stats')} className={`px-3 py-1 text-xs font-medium rounded ${activeStatsView === 'my_stats' ? 'bg-white text-content-text-primary shadow' : 'text-content-text-secondary hover:bg-gray-200'}`}>My stats</button>
                             <button onClick={() => setActiveStatsView('all_agents')} className={`px-3 py-1 text-xs font-medium rounded ${activeStatsView === 'all_agents' ? 'bg-white text-content-text-primary shadow' : 'text-content-text-secondary hover:bg-gray-200'}`}>All agents</button>
                        </div>
                    </div>
                    <div className="h-56"> {/* Fixed height for chart container */}
                        <Bar options={chartOptionsConfig} data={chartDataConfig} />
                    </div>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card-bg p-4 rounded-lg shadow-sm border border-table-border">
                        <div className="flex items-center mb-1"><UsersIcon className={KPI_ICON_CLASS} /><h3 className="text-sm font-medium text-content-text-secondary">Queued visitors</h3></div>
                        <p className="text-2xl font-semibold text-content-text-primary">{currentReportData.queuedVisitors}</p>
                    </div>
                    <div className="bg-card-bg p-4 rounded-lg shadow-sm border border-table-border">
                        <div className="flex items-center mb-1"><TrophyIcon className={KPI_ICON_CLASS} /><h3 className="text-sm font-medium text-content-text-secondary">Goals</h3></div>
                        <p className="text-2xl font-semibold text-content-text-primary">{currentReportData.goals}</p>
                    </div>
                    <div className="bg-card-bg p-4 rounded-lg shadow-sm border border-table-border">
                        <div className="flex items-center mb-1"><HandThumbUpIcon className={KPI_ICON_CLASS} /><h3 className="text-sm font-medium text-content-text-secondary">Chat satisfaction</h3></div>
                        <div className="flex items-baseline">
                            <span className="text-2xl font-semibold text-content-text-primary">{currentReportData.chatSatisfaction.currentPercentage}%</span>
                            {(satisfactionChange !== 0 || currentReportData.chatSatisfaction.previousPercentage !== undefined) && (
                                <span className={`ml-2 text-xs font-medium ${satisfactionChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                   {satisfactionChange >= 0 ? '+' : ''}{satisfactionChange} p. p.
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="bg-card-bg p-4 rounded-lg shadow-sm border border-table-border">
                        <div className="flex items-center mb-1"><ShoppingCartIcon className={KPI_ICON_CLASS} /><h3 className="text-sm font-medium text-content-text-secondary">Sales</h3></div>
                        <p className="text-2xl font-semibold text-content-text-primary">{currentReportData.sales}</p>
                    </div>
                </div>

                <div className="text-center text-xs text-content-text-secondary mt-4">
                    <p>This report was generated on {currentReportData.generatedAt}</p>
                    <p>All reports are displayed in your local time.</p>
                </div>
            </div>
        </div>
    );
};

export default Last7DaysSummaryReportPage;