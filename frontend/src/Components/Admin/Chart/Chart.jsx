
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';

// import faker from 'faker';
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import {
    Chart as ChartJS,
    BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Trouble-Ticketing-System Chart',
    },
  },
  
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Solved Ticket',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'UnSolved Ticket',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(49, 32, 133, 0.6)',
    },
  ],
};


export default function Chart() {
  return (
    <div className='w-75 m-auto'><Bar options={options} data={data} />;</div>
  )
}