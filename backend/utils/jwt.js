import expressJWT from 'express-jwt';

// TODO: connect this to the app -> DONE!!
const authJWT = () => {
  return expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/products\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
      '/api/v1/auth/register',
      '/api/v1/auth/login',
    ],
  });
};

const isRevoked = (req, payload, done) => {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
};

export default authJWT;
