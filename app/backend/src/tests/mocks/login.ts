const findOne = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const createToken = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com'
}

const loginEmailOff = {
  email: '',
  password: "secret_admin"
}

const loginPasswordOff = {
  email: 'admin@admin.com',
  password: ''
}

const loginWrong = {
  email: 'email@.com',
  password: '123'
}

const loginWright = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

export { findOne, loginEmailOff, loginPasswordOff, loginWrong, loginWright, createToken }