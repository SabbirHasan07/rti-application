const bcrypt = require('bcryptjs');

const hashedPassword = await bcrypt.hash('yourpassword', 10); // Replace 'yourpassword' with the actual password
