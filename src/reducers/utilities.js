

export const getHost = () => {
  if (location.host.indexOf('localhost') > -1) {
    return 'http://localhost:9999'

  } else if (location.host.indexOf('-dev') > -1) {
    return 'https://openmantle-env.us-east-1.elasticbeanstalk.com'

  } else if (location.host.indexOf('mapping.mit.edu') > -1) {
    return 'https://openmantle-env.us-east-1.elasticbeanstalk.com';
  }
}
