import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';

// Registering the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item._id), // Assuming _id is the category
        datasets: [
            {
                label: '# of Items',
                data: data.map(item => item.count), // Count from the API response
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    // Add more colors if you have more categories
                ],
            }
        ]
    };

    return <Pie data={chartData} />;
};

export default PieChart;
