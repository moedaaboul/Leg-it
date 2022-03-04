require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dn0xeptfr',
  api_key: '564649231227524',
  api_secret: 'Qb-VHE8RXG3LI1D3KAcfqiyU5rE',
});

module.exports = { cloudinary };
