const User = require('../models/UserModel');

     exports.getUserInfo = async (req, res) => {
       try {
         // Mendapatkan informasi pengguna berdasarkan ID pengguna yang ada di token JWT
         const user = await User.findById(req.user.userId).select('-password');
         if (!user) {
           return res.status(404).json({ message: 'User not found' });
         }

         res.status(200).json(user);
       } catch (error) {
         res.status(500).json({ message: 'Server Error' });
       }
     };

     exports.updateSaldo = async (req, res) => {
      try {
        const { method, amount } = req.body;
    
        // Mendapatkan informasi pengguna berdasarkan ID pengguna yang ada di token JWT
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Validasi method
        if (method !== 'increment' && method !== 'decrement') {
          return res.status(400).json({ message: 'Invalid method' });
        }
    
        // Validasi amount
        if (isNaN(amount) || amount <= 0) {
          return res.status(400).json({ message: 'Invalid amount' });
        }
    
        // Perbarui saldo pengguna berdasarkan metode yang dipilih
        if (method === 'increment') {
          user.saldo += amount;
        } else if (method === 'decrement') {
          // Validasi saldo cukup untuk dikurangi
          if (user.saldo < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
          }
          user.saldo -= amount;
        }
    
        await user.save();
    
        res.status(200).json({ message: 'Saldo updated successfully', saldo: user.saldo });
      } catch (error) {
        res.status(500).json({ message: 'Server Error' });
      }
    };
    