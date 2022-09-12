function isEmpty(value) {
	return !value || value.trim() === "";
}

function userCredential(email, password) {
  return (
		email &&
		email.includes("@") &&
		password &&
		password.trim().length >= 8);
}

function userDetailsAreValid(email, password, name, street, postal, city) {
	return (
		userCredential(email, password) &&
		!isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
	);
}

function emailisConfirmed(email, confirmemail) {
  return email === confirmemail;
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailisConfirmed: emailisConfirmed
};
