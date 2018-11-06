module.exports = () => ({
  createPlanFirst: 'You must create a plan first!',
  createTemplateFirst: 'You must create a template first!',
  duplicateSub: (email, plan) => `Can't create duplicate subscribers within the same plan. The provided email: ${email}, is already associated with the following plan: ${plan}.`,
  invalidPromo:
    "That promo code is invalid and/or can't be applied to the selected plan.",
  maxPromoUsage:
    'This promotional has reached its max amount of usage and is no longer valid. Please try another code instead.',
  missingCreationParams: 'Missing creation parameters.',
  missingDeletionParams: 'Missing delete parameters.',
  missingQueryParams: 'Missing query fetch parameters.',
  missingSelectParams: 'Missing select parameters.',
  missingUpdateParams: 'Missing update parameters',
  itemAlreadyExists: item => `A ${item} with that name already exists. Please use another unique name.`,
  unableToLocate: item => `Unable to locate the ${item}.`,
});
