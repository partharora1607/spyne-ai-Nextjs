export const setVariable = (variable) => ({
    type: 'SET_VARIABLE',
    payload: variable
  });
export const setBoolean = (value) => ({
  type: 'SET_BOOLEAN',
  payload: value
});
export const setLeadFormFilled = (value) => ({
  type: 'SET_FORMSUBMITTED',
  payload: value
});
  