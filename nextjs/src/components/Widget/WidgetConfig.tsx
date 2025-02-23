// components/Widget/widgetConfig.ts

export const widgetConfig = {
  ongoing: [
    { icon: 'tabler-sum', title: 'Total Task', number: 150, desc:'* keterangan widget' },
    { icon: '' , title: 'Active Task', number: 250, desc:'* keterangan widget' },
    { icon: 'tabler-clipboard-check', title: 'Completed Task', number: 10, desc:'* keterangan widget'},
    { icon: '' , title: 'Active Agents', number: 250, desc:'* keterangan widget' },
    
  ],
  request: [
    { icon: '', title: 'Total Request', number: 200, desc:'* keterangan widget' },
    { icon: 'icon-[ic--baseline-pending-actions]' , title: 'Pending Request', number: 300, desc:'* keterangan widget' },
    { icon: '', title: 'Active Agent', number: 5, desc:'* keterangan widget' },
    { icon: '' , title: 'Completed Request', number: 300, desc:'* keterangan widget' },
   
  ],
  settings: [
    { icon: 'tabler-sum', title: 'Total Task', number: 200, desc:'* keterangan widget' },
    { icon: '' , title: 'Completed Task', number: 300, desc:'* keterangan widget' },
    { icon: '', title: 'Queality Satisfaction', number: 5, desc:'* keterangan widget' },
    { icon: '' , title: 'Average Time', number: 300, desc:'* keterangan widget' },
    { icon: '' , title: 'Total Time', number: 300, desc:'* keterangan widget' }
  ]
}
// components/Widget/widgetConfig.ts

// import { useDispatch, useSelector } from 'react-redux';
// import { Dispatch } from "@reduxjs/toolkit";

// // Define a function that returns the widget config based on the Redux store data
// export const getWidgetConfig = () => {
//   const { data, error, loading } = useSelector((state: any) => state.widgets);
//   const dispatch: Dispatch<any> = useDispatch();

//   return {
//     ongoing: [
//       { icon: 'tabler-sum', title: 'Total Task', number: data.ongoingTasks || 150, desc: '* keterangan widget' },
//       { icon: '', title: 'Active Task', number: data.activeTasks || 250, desc: '* keterangan widget' },
//       { icon: 'tabler-clipboard-check', title: 'Completed Task', number: data.completedTasks || 10, desc: '* keterangan widget' },
//       { icon: '', title: 'Active Agents', number: data.activeAgents || 250, desc: '* keterangan widget' },
//     ],
//     request: [
//       { icon: '', title: 'Total Request', number: data.totalRequests || 200, desc: '* keterangan widget' },
//       { icon: 'icon-[ic--baseline-pending-actions]', title: 'Pending Request', number: data.pendingRequests || 300, desc: '* keterangan widget' },
//       { icon: '', title: 'Active Agent', number: data.activeAgents || 5, desc: '* keterangan widget' },
//       { icon: '', title: 'Completed Request', number: data.completedRequests || 300, desc: '* keterangan widget' },
//     ],
//     settings: [
//       { icon: 'tabler-sum', title: 'Total Task', number: data.totalTasks || 200, desc: '* keterangan widget' },
//       { icon: '', title: 'Completed Task', number: data.completedTasks || 300, desc: '* keterangan widget' },
//       { icon: '', title: 'Quality Satisfaction', number: data.qualitySatisfaction || 5, desc: '* keterangan widget' },
//       { icon: '', title: 'Average Time', number: data.averageTime || 300, desc: '* keterangan widget' },
//       { icon: '', title: 'Total Time', number: data.totalTime || 300, desc: '* keterangan widget' },
//     ]
//   };
// };
