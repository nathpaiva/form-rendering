import chai from 'chai';
import { buildForm } from '../src/helpers/PrepareRenderInput';
import fields from '../fields.json';

chai.should();

describe('#Fields', () => {
  it('#Create a field with inputCheckBox', () => {
    const buildFormBuild = buildForm(fields._embedded.request_fields[0]);
    buildFormBuild.should.not.be.empty;
  });

  it('#Create a field with selectField', () => {
    const buildFormBuild = buildForm(fields._embedded.request_fields[2]);
    buildFormBuild.should.not.be.empty
  });

  it('#Create a field with inputText', () => {
    const buildFormBuild = buildForm(fields._embedded.user_fields[0]);
    buildFormBuild.should.not.be.empty
  });
});
