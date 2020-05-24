export const resolveDetail = response => {
  const result = response.data.result;
  return {
    ...result,
  };
};
