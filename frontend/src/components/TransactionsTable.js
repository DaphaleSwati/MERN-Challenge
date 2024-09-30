import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TransactionsTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await axios.get(`http://localhost:5000/api/transactions`, {
                params: { search, page }
            });
            setTransactions(response.data);
        };
        fetchTransactions();
    }, [search, page]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t) => (
                        <tr key={t.id}>
                            <td>{t.title}</td>
                            <td>{t.description}</td>
                            <td>{t.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => setPage(page - 1)}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default TransactionsTable;
