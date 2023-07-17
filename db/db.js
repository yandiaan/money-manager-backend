const mongoose = require('mongoose');
const retry = require('retry');

const connectToDB = async () => {
  const operation = retry.operation({
    retries: 3, // Jumlah maksimum percobaan koneksi ulang
    factor: 2, // Faktor penundaan antara setiap percobaan (exponential backoff)
    minTimeout: 1000, // Waktu tunggu minimum sebelum percobaan pertama
    maxTimeout: 5000, // Waktu tunggu maksimum antara percobaan
  });

  return new Promise((resolve, reject) => {
    operation.attempt(async () => {
      try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Db Connected');
        resolve();
      } catch (error) {
        console.log('DB Connection Error:', error);
        if (operation.retry(error)) {
          console.log('Retrying connection to DB...');
          return;
        }
        reject(operation.mainError());
      }
    });
  });
};

module.exports = { connectToDB };