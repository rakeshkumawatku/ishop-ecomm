import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
    yAxis: [
        {
            label: '',
        },
    ],
    width: 600,
    height: 400,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
};
const dataset = [
    {
        seoul: 21,
        month: 'Jan',
    },
    {
        seoul: 28,
        month: 'Fev',
    },
    {
        seoul: 41,
        month: 'Mar',
    },
    {
        seoul: 73,
        month: 'Apr',
    },
    {
        seoul: 99,
        month: 'May',
    },
    {
        seoul: 144,
        month: 'June',
    },
    {
        seoul: 319,
        month: 'July',
    },
    {
        seoul: 249,
        month: 'Aug',
    },
    {
        seoul: 131,
        month: 'Sept',
    },
    {
        seoul: 55,
        month: 'Oct',
    },
    {
        seoul: 48,
        month: 'Nov',
    },
    {
        seoul: 25,
        month: 'Dec',
    },
];

const valueFormatter = (value) => ` ${value}mm`;

const Chart = () => {
    return (
        <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
                { dataKey: 'seoul', label: 'Seoul', valueFormatter },
            ]}
            {...chartSetting}
        />
    );
}

export default Chart;