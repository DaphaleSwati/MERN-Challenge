import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BarChart from './BarChart';
import PieChart from './PieChart';

const ChartPage = () => {
    const { type } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            let response;
            try {
                if (type === 'bar') {
                    response = await axios.get('http://localhost:3000/api/bar-chart?month=March');
                } else if (type === 'pie') {
                    response = await axios.get('http://localhost:3000/api/pie-chart?month=March');
                }
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {type === 'bar' && <BarChart data={data} key={type} />}
            {type === 'pie' && <PieChart data={data} key={type} />}
        </div>
    );
};

export default ChartPage;
