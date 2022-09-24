export default {
  change: ({code, title}) => {
    return {type: 'country/change', payload: {code, title}};
  },
}
