import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { MainContext } from '../../../MainContext';

const Barchart = () => {
    const [orders, setOrder] = useState([]);
    const { apiBaseUrl, apiOrderUrl } = useContext(MainContext);
    const [dataset, setDataSet] = useState([]);

    useEffect(
        () => {
            axios.get(apiBaseUrl + apiOrderUrl + "/get-data")
                .then(
                    (success) => {
                        if (success.data.status) {
                            setOrder(success.data.Order_data)

                        } else {

                        }
                    }
                ).catch(
                    (error) => {
                    }
                )
        }, []
    )

    useEffect(
        () => {
            if (orders && orders.length > 0) {
                const ds = [];
                for (let d of orders) {
                    ds.push({
                        Payment: d.order_total,
                        month: new Date(d.createdAt).getMonth(),
                    })
                }
                setDataSet(ds);
            }
        }, [orders]
    )

    const chartSetting = {
        yAxis: [
            {
                label: '',
            },
        ],
        width: 800,
        height: 600,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-20px, 0)',
                chartLeftMargin: "100px"
            },
        },
    }

    const valueFormatter = (value) => ` ${value}₹`;

    return (
        <div className='pl-24'>
            {
                dataset.length != 0
                    ?
                    <BarChart
                        dataset={dataset}
                        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        series={[
                            { dataKey: 'Payment', label: 'Payment', valueFormatter },
                        ]}
                        {...chartSetting}
                        margin={{
                            left: 80,
                            right: 80,
                            top: 80,
                            bottom: 80,
                        }}
                    />
                    :
                    ""
            }

        </div>
    );
}

export default Barchart;
