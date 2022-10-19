module.exports = function (errors) {
    let errorMessages = new Set();
    for (let error of errors.array()) {
        errorMessages.add(error.msg)
    }
    return errorMessages;
}