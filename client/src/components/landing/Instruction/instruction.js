import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Col } from 'antd';
import styles from './instruction.scss';

const Instruction = ({ description, imgSrc, link, title }) => (
  <Fragment>
    <Col sm={24} className={styles.landingInstructionContainer}>
      <h2 className={styles.landingTitle}>{title}</h2>
      <Link to={link} className={styles.landingImageContainer}>
        <img className={styles.landingImage} src={imgSrc} alt="" />
      </Link>
      <div className={styles.landingInstruction}>{description}</div>
    </Col>
    <div className="clear-fix" />
    <hr className={styles.landingDivider} />
  </Fragment>
);

Instruction.propTypes = {
  description: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Instruction;
