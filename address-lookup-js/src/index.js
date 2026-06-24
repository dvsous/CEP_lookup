const readline = require("readline");

const { validateCep } = require("./utils/validator");
const { getAddressByCep } = require("./services/viaCepService");
const { getHistory, addHistory } = require("./storage/historyRepository");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(text) {
    return new Promise(resolve => {
        rl.question(text, resolve);
    });
}

function showAddress(address) {
    console.log("\n--- Endereço ---");
    console.log(`CEP: ${address.cep}`);
    console.log(`Rua: ${address.logradouro}`);
    console.log(`Bairro: ${address.bairro}`);
    console.log(`Cidade: ${address.localidade}`);
    console.log(`Estado: ${address.uf}`);
}

function showHistory() {
    const history = getHistory();

    if (history.length === 0) {
        console.log("\nNenhum histórico encontrado.");
        return;
    }

    console.log("\n=== HISTÓRICO ===");

    history.forEach(item => {
        console.log(`${item.date} | ${item.cep} | ${item.city}/${item.state}`);
    });
}

async function main() {
    while (true) {
        console.log("\n=== CONSULTA DE CEP ===");
        console.log("1 - Buscar CEP");
        console.log("2 - Ver histórico");
        console.log("0 - Sair");

        const option = await question("\nEscolha uma opção: ");

        switch (option) {
            case "1": {
                const input = await question("Digite o CEP: ");

                const cep = validateCep(input);

                if (!cep) {
                    console.log("CEP inválido.");
                    break;
                }

                try {
                    const address = await getAddressByCep(cep);

                    if (!address) {
                        console.log("CEP não encontrado.");
                        break;
                    }

                    showAddress(address);
                    addHistory(address);

                } catch (error) {
                    console.error(error.message);
                }

                break;
            }

            case "2":
                showHistory();
                break;

            case "0":
                rl.close();
                process.exit(0);

            default:
                console.log("Opção inválida.");
        }
    }
}

main();