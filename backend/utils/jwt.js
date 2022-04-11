import expressJWT from 'express-jwt';

// TODO: connect this to the app -> DONE!!
const authJWT = () => {
  return expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      '/api/v1/auth/register',
      '/api/v1/auth/login',
    ],
  });
};

export default authJWT;
