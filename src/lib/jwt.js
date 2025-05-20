import jwt from 'jsonwebtoken';

const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

export function signToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    const res = jwt.verify(token, secret)
    return res;
  } catch (err) {
    return null;
  }
}
