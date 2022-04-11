import expressJWT from 'express-jwt';

const authJWT = () => {
  return expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
  });
};

export default authJWT;
