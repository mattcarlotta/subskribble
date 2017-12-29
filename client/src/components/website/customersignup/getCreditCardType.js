import each from 'lodash/each';

export const GetCreditCardType = (accountNumber) => {
  let cardName;
  const cardTypes = {
    amex: /^3[47][0-9]{0,}$/, //34, 37
    discover: /^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$/,
    diners: /^3(?:0[0-59]{1}|[689])[0-9]{0,}$/, //300-305, 309, 36, 38-39
    jcb: /^(?:2131|1800|35)[0-9]{0,}$/, //2131, 1800, 35 (3528-3589)
    mastercard: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$/, //2221-2720, 51-55
    visa: /^4[0-9]{0,}$/ //4
  }
  const cardKeys = Object.keys(cardTypes);

  each(cardKeys, name => {
    if(cardTypes[name].test(accountNumber)) {
      cardName = (name === "diners") ? "diners-club" : name;
    }
  })

  return cardName;
}
