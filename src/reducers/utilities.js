

export const getHost = () => {
  if (location.host.indexOf('localhost') > -1) {
    return 'http://localhost:8888'

  } else if (location.host.indexOf('-dev') > -1) {
    return 'https://fbw-web-backend-dev.herokuapp.com'

  } else if (location.host.indexOf('mapping.mit.edu') > -1) {
    return 'https://fbw-web-backend.herokuapp.com';
  }
}
