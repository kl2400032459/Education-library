import React from 'react';
import './Table.css';

const Table = ({ columns, data }) => (
    <table className="custom-table">
        <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col.accessor}>{col.Header}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data.map((row, i) => (
                <tr key={i}>
                    {columns.map((col) => (
                        <td key={col.accessor}>{row[col.accessor]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

export default Table;
