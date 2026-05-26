import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { FaFolder, FaEnvelope, FaChartBar, FaUsers } from 'react-icons/fa';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Home = () => {
  const { workCount, contactCount } = useContext(AdminContext);
  const [chartData, setChartData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Submissions',
        data: [12, 19, 3, 5, 2, 3, 9],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  });

  const stats = [
    {
      title: 'Total Works',
      value: workCount || 0,
      icon: FaFolder,
      color: 'from-blue-600 to-blue-400',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Messages',
      value: contactCount || 0,
      icon: FaEnvelope,
      color: 'from-purple-600 to-purple-400',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Categories',
      value: '3',
      icon: FaChartBar,
      color: 'from-green-600 to-green-400',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Visitors',
      value: '1.2k',
      icon: FaUsers,
      color: 'from-orange-600 to-orange-400',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 ml-64">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`${stat.textColor} text-2xl`} />
                  </div>
                  <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                </div>
                <h3 className="text-gray-600 font-medium">{stat.title}</h3>
                <div className={`h-1 w-full bg-gradient-to-r ${stat.color} rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Weekly Submissions</h3>
              <span className="text-sm text-gray-500">Last 7 days</span>
            </div>
            <div className="h-64">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    },
                    x: {
                      grid: { display: false },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Categories Distribution</h3>
              <span className="text-sm text-gray-500">By project type</span>
            </div>
            <div className="h-64">
              <Doughnut
                data={{
                  labels: ['Frontend', 'Backend', 'Full Stack'],
                  datasets: [{
                    data: [12, 8, 15],
                    backgroundColor: ['#3B82F6', '#8B5CF6', '#10B981'],
                    borderWidth: 0,
                  }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' },
                  },
                  cutout: '70%',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;