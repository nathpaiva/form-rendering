import chai from 'chai'
import { JSDOM } from 'jsdom'
import FormView from '../src/views/FormView';
import UserFormView from '../src/views/UserFormView';
import { inputText, inputCheckBox, selectField } from '../src/helpers/PrepareRenderInput';
import fields from '../fields.json';

chai.should();
let templateService;
let templateUser;
let domStub;
describe('#Load new form', () => {
  beforeEach(() => {
    domStub = new JSDOM(`
      <fieldset id="form-for-service" class="forms__content"></fieldset>
      <fieldset id="form-for-user" class="forms__content forms__content--hide"></fieldset>
    `).window;

    templateService = new FormView(domStub.document.getElementById('form-for-service'));
    templateUser = new UserFormView(domStub.document.getElementById('form-for-user'));
  });

  it('#Form service before update', () => {
    domStub.document.querySelector('#form-for-service').innerHTML.should.be.empty
  });

  it('#Create form service with update empty', () => {
    templateService.update();
    domStub.document.querySelector('#form-for-service').innerHTML.should.not.be.empty
  });

  it('#Create form service', () => {
    templateService.update(fields._embedded.request_fields);
    domStub.document.querySelector('#form-for-service').innerHTML.should.not.be.empty
  });

  it('#Form user before update', () => {
    domStub.document.querySelector('#form-for-user').innerHTML.should.be.empty
  });

  it('#Create form user with update empty', () => {
    templateUser.update();
    domStub.document.querySelector('#form-for-user').innerHTML.should.not.be.empty
  });

  it('#Create form user', () => {
    templateUser.update(fields._embedded.user_fields);
    domStub.document.querySelector('#form-for-user').innerHTML.should.not.be.empty
  });
});
