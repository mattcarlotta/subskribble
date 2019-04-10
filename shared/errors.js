const createPlanFirst = 'You must create a plan first!';

const createTemplateFirst = 'You must create a template first!';

const duplicateSub = (email, plan) => `Can't create duplicate subscribers within the same plan. The provided email: ${email}, is already associated with the following plan: ${plan}.`;

const invalidPromo = "That promo code is invalid and/or can't be applied to the selected plan.";

const maxPromoUsage = 'This promotional has reached its max amount of usage and is no longer valid. Please try another code instead.';

const missingCreationParams = 'Missing creation parameters.';

const missingDeletionParams = 'Missing delete parameters.';

const missingQueryParams = 'Missing query fetch parameters.';

const missingSelectParams = 'Missing select parameters.';

const missingUpdateParams = 'Missing update parameters';

const itemAlreadyExists = item => `A ${item} with that name already exists. Please use another unique name.`;

const unableToLocate = item => `Unable to locate the ${item}.`;

export {
  createPlanFirst,
  createTemplateFirst,
  duplicateSub,
  invalidPromo,
  maxPromoUsage,
  missingCreationParams,
  missingDeletionParams,
  missingQueryParams,
  missingSelectParams,
  missingUpdateParams,
  itemAlreadyExists,
  unableToLocate,
};
