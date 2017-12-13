export const allowedCharacters = value => (/[~`@#$%&*+=[\]\\/{}|\\":<>]/g.test(value)) ? 'Please remove any special characters' : undefined;
export const isNotEmpty = value => value.length === 0 ? 'You must include at least one item' : undefined;
export const isRequired = value => !value ? 'Required' : undefined;
export const isValidEmail = value => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) ? 'Invalid email address' : undefined;
export const isValidState = value =>
(!/^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/i.test(value)) ? 'Invalid state' : undefined;
export const isValidZip = value => !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value) ? 'Invalid zip code' : undefined;
export const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less!` : undefined;
export const maxLength30 = maxLength(30);
export const maxLength50 = maxLength(50);
export const maxLength100 = maxLength(100);
export const maxLength250 = maxLength(250);
export const maxLength2000 = maxLength(2000);
export const maxLength20000 = maxLength(20000);
export const minPassword = value => (value.length <= 5) ? 'Password must be longer than 6 characters!' : null
