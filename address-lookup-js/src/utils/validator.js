function validateCep(cep) {
    cep = cep.replace(/\D/g, "");

    if (cep.length !== 8) {
        return null;
    }

    return cep;
}

module.exports = {
    validateCep
};