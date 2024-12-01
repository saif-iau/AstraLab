 async function isEmail(identifier) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
    return emailPattern.test(identifier);
  }


module.exports = isEmail;
