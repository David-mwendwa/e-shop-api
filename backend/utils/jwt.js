import expressJWT from 'express-jwt';

// TODO: connect this to the app
const authJWT = () => {
  return expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
  });
};

export default authJWT;
