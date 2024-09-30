import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

// Registering the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ data }) => {
    const chartData = {
        labels: ['0-100', '101-200', '201-300', '301-400', '401-500'], // Adjust labels as needed
        datasets: [
            {
                label: '# of Items',
                data: data, // Assuming 'data' is an array of counts corresponding to the labels
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    return <Bar data={chartData} />;
};

export default BarChart;
