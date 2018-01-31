import { browserHistory } from 'react-router';

export const ACTIVETEMPLATES = [
  {
    name: 'Carlotta Prime',
    id: 'carlotta-prime',
    from: 'Matt Carlotta'
  },
  {
    name: 'Carlotta Enterprise Partners',
    id: 'carlotta-enterprise-partners',
    from: 'Carlota Corp LLC'
  },
  {
    name: 'Carlotta Local Affiliates',
    id: 'carlotta-local-affiliates',
    from: 'Carlotta Corp LLC'
  }
];

export const TEMPLATEBUTTONS = [
  {
    className: 'btn-reposition f-l',
    label: "Edit Template",
    onClickAction: () => browserHistory.push('/rocketboard/templates/edit-template')
  },
  {
    className: 'btn-reposition f-l',
    label: "Remove Template",
    onClickAction: () => browserHistory.push('/rocketboard/templates/remove-template')
  }
]

export const TABLEHEADERS = ['Template Name', 'Id', 'From'];
