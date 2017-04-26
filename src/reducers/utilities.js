

export const getHost = () => {
  if (location.host.indexOf('localhost') > -1) {
    return 'http://localhost:9999'

  } else if (location.host.indexOf('-dev') > -1) {
    return 'http://open-ed-graph-dev.us-east-1.elasticbeanstalk.com/'

  } else if (location.host.indexOf('mapping.mit.edu') > -1) {
    return 'http://open-ed-graph.aeizqnc7mw.us-east-1.elasticbeanstalk.com';
  }
}
