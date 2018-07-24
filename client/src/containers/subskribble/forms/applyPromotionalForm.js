import React, { Component } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { Col, Tag } from 'antd';
import { AntInput } from '../app/formFields/antReduxFormFields';
import { applyPromo, resetPromo } from '../../../actions/formActions';
import { allowedCharacters } from '../app/formFields/validateFormFields';

class ApplyPromotional extends Component {
  state = { value: '' }

  componentDidMount = () => {
    const { applyPromo, promoCode, plan } = this.props;
    if (promoCode) applyPromo(promoCode, plan)
  }

  handlePromoSubmit = () => {
    const { applyPromo, plan } = this.props;
    const { value } = this.state;
    if (value) applyPromo(value, plan);
    // console.log(this.props);
    // console.log(this.state);
  }

  handleChange = e => this.setState({ value: e.target.value });

  removeAppliedPromo = () => this.setState({ value: '' }, () => this.props.resetPromo());

  showAppliedPromo = () => {
    const { discounttype, amount } = this.props.appliedPromoCode;
    return ( (discounttype === '$') ? `${discounttype}${amount}` : `${amount}${discounttype}` )
  }

  render = () => (
    <div style={{ float: this.props.appliedPromoCode ? 'right' : 'none' }} className="promo-form">
      { !this.props.appliedPromoCode
          ? <span>
              <Col span={18} style={{ paddingRight: '5px', marginTop: '-3px' }}>
                <Field
                  name="promoCode"
                  component={AntInput}
                  placeholder="Add Promo Code"
                  style={{ width: '100%' }}
                  onChange={this.handleChange}
                  value={this.state.value}
                  validate={[allowedCharacters]}
                />
              </Col>
              <Col span={6}>
                <button
                  type="button"
                  className="ant-btn ant-btn-primary"
                  style={{ width: '100%' }}
                  onClick={this.handlePromoSubmit}
                  >
                    Apply
                  </button>
              </Col>
            </span>
          : <span>
              <Tag className="tag" closable onClose={this.removeAppliedPromo}>
                { `${this.showAppliedPromo()} OFF` }
              </Tag>
              <div style={{ textAlign: 'right' }}>(-${this.props.adjustedPrice})</div>
            </span>
      }
    </div>
  )
}

export default connect(null, { applyPromo, resetPromo })(ApplyPromotional);
