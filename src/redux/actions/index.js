export const NAME = 'NAME';
export const EMAIL = 'EMAIL';

export const sendName = (payload) => ({ type: NAME, payload });
export const sendEmail = (payload) => ({ type: EMAIL, payload });
