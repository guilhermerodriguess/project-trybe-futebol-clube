import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';
import { createToken, findOne, loginEmailOff, loginPasswordOff, loginWright, loginWrong } from './mocks/login';
import TokenJWT from '../helpers/TokenJWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test the login route', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        ...findOne
      } as User);
  });

  afterEach(()=>{
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

  it('returns a token if the login is correct', async () => {
    const token = TokenJWT.createToken(createToken)
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginWright)
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('token', token);
  });

  it('Return a role if a login succeeds', async () => {
    const token = TokenJWT.createToken(createToken)
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', token)
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('role');
  });
});
