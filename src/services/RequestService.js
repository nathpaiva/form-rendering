'use strict';

function RequestService(env) {
  let url = '../../fields.json';
  if (env) {
    url = 'http://nathpaiva.com.br'
  }
  return fetch(url)
    .then(data => data.json())
    .then(data => data._embedded)
    .catch(error => error);
}

export default RequestService;
