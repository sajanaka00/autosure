// Central export for all upload configurations
const blogUpload = require('./blogUpload');
const vehicleUpload = require('./vehicleUpload');
// const profileUpload = require('./profileUpload');
// const generalUpload = require('./generalUpload');

module.exports = {
  blog: blogUpload,
  vehicle: vehicleUpload,
  // profile: profileUpload,
  // general: generalUpload
};