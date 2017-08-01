import chai from 'chai';
import fetch from 'isomorphic-fetch';
import RequestService from '../src/services/RequestService';
import fields from '../fields.json';

chai.should();

describe('#Test request', () => {
  it('#Request input', (done) => {
    RequestService('test').then(data => {
      data.should.to.be.an('object');
      done();
    });
  });
});
