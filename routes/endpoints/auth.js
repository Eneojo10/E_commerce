const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY || 'SECRET_KEY';

let adminPasswordHash = null;

const saltRounds = 10;
bcrypt.hash('adminPassword', saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    adminPasswordHash = hash;
    console.log('Admin Password Hash:', hash);
  }
});

const adminEmail = 'cscbuddystore@gmail.com';



const routes = function(app) {

  app.post('/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      if (email === adminEmail) {
        if (adminPasswordHash) {
          const passwordMatch = await bcrypt.compare(
            password,
            adminPasswordHash
          );

          if (passwordMatch) {
            const token = jwt.sign({ email: adminEmail }, secretKey, {
              expiresIn: '1h',
            });

            return res.status(200).json({ token });
          }
        }
      }

      console.log('Email:', email);
      console.log('Password:', password);

      res.status(401).json({ message: 'Authentication failed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/update-password', async (req, res) => {

    try {
      const { currentPassword, newPassword } = req.body;

      const passwordMatch = await bcrypt.compare(
        currentPassword,
        adminPassword
      );


      if(!passwordMatch) {
        return res.status(401).json({ message: 'Current password is incorrect'})
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      adminPassword = hashedNewPassword;

      res.status(200).json({ message: 'Password updated successfully' });

    }catch(error) {
      console.error(error);
      res.status(500).json({ message: 'Server error'})
    }
  });

}

module.exports = routes
