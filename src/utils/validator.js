
const validator = (firstName, lastName, emailId, password) => {

    const isEmailValid = /^[a-zA-Z0-9.*%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(emailId)
    const isPasswordValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
    const isFirstName = /^[a-zA-Z]{3,25}$/.test(firstName)
    const isLastName = /^[a-zA-Z]{3,25}$/.test(lastName)

    if (!isFirstName) return "Firstname is not valid"
    if (!isLastName) return "Lastname is not valid"

    if (!isEmailValid) return "Please enter valid email.";
    if (!isPasswordValid) return "Password should have atleast one[a-z,A-Z,0-9,!@#$%&] Minimum 8 char"

    return null;

}

export default validator;