import { browserHistory } from 'react-router';

export const ACTIVEFORMS = [
  {
    name: 'Carlotta Prime',
    gateway: 'Carlotta Corp',
    id: 'Carlotta-Prime-Plan',
    plans: '1'
  },
];

export const FORMBUTTONS = [
  {
    className: "btn-reposition f-l",
    label: "Add Form",
    onClickAction: () => browserHistory.push('/rocketboard/forms/add-form')
  }
]

export const TABLEHEADERS = ['Name', 'Gateway', 'Unique Id', 'Plans'];
