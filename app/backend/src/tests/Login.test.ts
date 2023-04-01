import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';
import { findOne, loginEmailOff, loginPasswordOff, loginWrong } from './mocks/login';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        ...findOne
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('returns an error if no email is passed', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginEmailOff)
    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.have.property('message', 'All fields must be filled');
  });

  it('returns an error if no password is passed', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginPasswordOff)
    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.have.property('message', 'All fields must be filled');
  });

  it('returns an error if no password or email is wrong', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginWrong)
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.have.property('message', 'Invalid email or password');
  });
});
