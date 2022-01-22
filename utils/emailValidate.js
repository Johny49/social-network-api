const validateEmail = (emailStr) => {
    let emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return emailRegex.test(emailStr.toLowercase());
} 

module.exports = validateEmail;