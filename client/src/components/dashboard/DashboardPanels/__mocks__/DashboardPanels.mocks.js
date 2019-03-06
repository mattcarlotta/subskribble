const mockRes = [
  {
    data: {
      activetemplates: '4',
      charges: '5',
      chargestotal: '100',
      credits: '3',
      creditstotal: '50',
      dues: '5',
      duestotal: '149.95',
      inactivesubscribers: '6',
      inactivetemplates: '4',
      messages: '3',
      plans: '12',
      popularplans: [{ planname: 'Test', subscribers: 10 }],
      popularpromotionals: [{ promocode: '10PERCENTOFF' }],
      promotionals: '12',
      refunds: '3',
      refundstotal: '30',
      subscribers: '146',
    },
  },
];

export const mockErrorMessage = new Error('Unable to locate dashboard data!');

export const mockGetDashboardData = jest.fn(
  res =>
    new Promise((resolve, reject) => {
      if (res === 'success') {
        resolve(mockRes);
      } else {
        reject(mockErrorMessage);
      }
    }),
);
