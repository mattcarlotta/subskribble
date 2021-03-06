import React from 'react';
import Loading from 'images/subskribble-525x125px.gif';
import { spinnerContainer } from './Spinner.scss';

const Spinner = () => (
  <div className={spinnerContainer}>
    <img src={Loading} alt="loading-block.gif" height={125} />
  </div>
);

export default Spinner;
