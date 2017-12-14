import { browserHistory } from 'react-router';

export const ACTIVECUSTOMERS = [
  {
    status: 'active',
    gateway: 'Carlotta Corp',
    name: 'Sherry Waters',
    email: 'squatters@gmail.com',
    phone: '(555) 555-5555',
    subs: '2'
  },
  {
    status: 'active',
    gateway: 'Carlotta Corp',
    name: 'Bob Aronssen',
    email: 'bob-eh@sap.com',
    phone: '(555) 555-5555',
    subs: '9'
  },
  {
    status: 'active',
    gateway: 'Carlotta Corp',
    name: 'Shaniqua Smith',
    email: 'shani.smith@hotmail.com',
    phone: '(555) 555-5555',
    subs: '1'
  },
  {
    status: 'active',
    gateway: 'Carlotta Corp',
    name: 'Tanya Ballschin',
    email: 'tanyaballschin@gmail.com',
    phone: '(555) 555-5555',
    subs: '3'
  },
  {
    status: 'active',
    gateway: 'Carlotta Corp',
    name: 'Siemen Walker',
    email: 'lukeskywalker@rebelforce.com',
    phone: '(555) 555-5555',
    subs: '2'
  },
  {
    status: 'active',
    gateway: 'Carlotta Corp',
    name: 'Jerry Lamar',
    email: 'jLamar@gmail.com',
    phone: '(555) 555-5555',
    subs: '1'
  }
];

export const INACTIVECUSTOMERS = [
  {
    status: 'inactive',
    gateway: 'Carlotta Corp',
    name: 'Carl Sagan',
    email: 'carlsagan42@yahoo.com',
    phone: '(555) 555-5555',
    subs: '2'
  },
  {
    status: 'inactive',
    gateway: 'Carlotta Corp',
    name: 'Mark Canelo',
    email: 'seamark@outlook.com',
    phone: '(555) 555-5555',
    subs: '7'
  },
  {
    status: 'suspended',
    gateway: 'Carlotta Corp',
    name: 'Axle Root',
    email: 'axxll@manjaro.com',
    phone: '(555) 555-5555',
    subs: '3'
  },
  {
    status: 'inactive',
    gateway: 'Carlotta Corp',
    name: 'Adam Vicks',
    email: 'vicksAdam@sap.com',
    phone: '(555) 555-5555',
    subs: '6'
  },
  {
    status: 'suspended',
    gateway: 'Carlotta Corp',
    name: 'Wes Walls',
    email: 'wallyworld@manjaro.com',
    phone: '(555) 555-5555',
    subs: '2'
  },
  {
    status: 'suspended',
    gateway: 'Carlotta Corp',
    name: 'Alisha Tallis',
    email: 'aleashtrails@gmail.com',
    phone: '(555) 555-5555',
    subs: '1'
  },
]

export const ACTIVECUSTOMERSBUTTONS = [
  {
    label: "Add Customer",
    onClickAction: () => browserHistory.push('/rocketboard/customer/add-customer')
  },
  {
    label: "Suspend Customer",
    onClickAction: () => browserHistory.push('/rocketboard/customer/suspend-customer')
  },
  {
    label: "View Customer",
    onClickAction: () => browserHistory.push('/rocketboard/customer/view-customer')
  }
]

export const INACTIVECUSTOMERSBUTTONS = [
  {
    label: "Remove Customer",
    onClickAction: () => browserHistory.push('/rocketboard/customers/remove-customer')
  },
  {
    label: "View Customer",
    onClickAction: () => browserHistory.push('/rocketboard/customers/view-customer')
  }
]

export const TABLEHEADERS = ['Status', 'Gateway', 'Name', 'Email', 'Phone', 'Subscriptions'];
