
export const getUser = (state) => {
  let temp = {
    id: 'dev-editor',
    displayName: 'dev editor'
  }
  return state.login.user || temp;
}
