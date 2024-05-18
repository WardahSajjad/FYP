// DashboardPage.js
import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Cell } from 'recharts';
import { useUser } from '../../CustomHooks/UserContext';
import SideBar from '../../Componenets/SideBar/SideBar.js';
import './PerformanceAnalysis.css';

const modeData = [
    { name: 'Monday', collisions: 0, speedExceed: 2 },
    { name: 'Tuesday', collisions: 0, speedExceed: 2 },
    { name: 'Wednesday', collisions: 2, speedExceed: 2 },
    { name: 'Thursday', collisions: 2, speedExceed: 3 },
    { name: 'Friday', collisions: 1, speedExceed: 1 },

];

const violationData = [
    { name: 'Speeding', value: 10 },
    { name: 'Running Red Lights', value: 3 },
    { name: 'Illegal Turns', value: 2 },
    { name: 'Wrong Lane', value: 1 },
    { name: 'Not Signalling', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];
const PerformanceAnalysis = ({ LastModeData }) => {
    const { user } = useUser();
    return (

        <div className="dashboard-container">
            <SideBar />

            <div className='dives main-content'>

                <h1 className='main'>{user.username}'s Driving Performance Dashboard</h1>
                <h2>Mode: {LastModeData.lastPlayedMode}</h2>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div className='dives inside'>
                        <h3>Total Collisions This Week</h3>
                        <BarChart width={300} height={300} data={modeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="collisions" fill="#8884d8" />
                        </BarChart>
                    </div>
                    <div className='dives inside'>
                        <h3>Speed Exceed Incidents This Week</h3>
                        <BarChart width={300} height={300} data={modeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="speedExceed" fill="#82ca9d" />
                        </BarChart>
                    </div>

                </div>

                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div className='dives inside'>
                        <h3>Traffic Violation Distribution</h3>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={violationData}
                                cx={200}
                                cy={150}
                                innerRadius={40}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label
                            >
                                {violationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    <div className='dives inside'>
                        <h3>Speed Exceed Trend This Week</h3>
                        <LineChart width={300} height={300} data={modeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="speedExceed" stroke="#82ca9d" activeDot={{ r: 8 }} />
                        </LineChart>
                    </div>

                </div>




            </div>
        </div >
    );
};

export default PerformanceAnalysis;
