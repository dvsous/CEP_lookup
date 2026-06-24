const cache = {};

async function getAddressByCep(cep) {
    if (cache[cep]) {
        console.log("\n[Cache] Resultado encontrado localmente.");
        return cache[cep];
    }

    const response = await fetch(
        `https://viacep.com.br/ws/${cep}/json/`
    );

    if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
    }

    const data = await response.json();

    if (data.erro) {
        return null;
    }

    cache[cep] = data;

    return data;
}

module.exports = {
    getAddressByCep
};