// tools/hash.js
import bcrypt from 'bcryptjs';

const password = 'your_admin_password';
bcrypt.hash(password, 10).then(console.log);
