const fs = require("fs");

const HISTORY_FILE = "history.json";

function getHistory() {
    if (!fs.existsSync(HISTORY_FILE)) {
        return [];
    }

    return JSON.parse(
        fs.readFileSync(HISTORY_FILE, "utf8")
    );
}

function saveHistory(history) {
    fs.writeFileSync(
        HISTORY_FILE,
        JSON.stringify(history, null, 2)
    );
}

function addHistory(address) {
    const history = getHistory();

    history.push({
        date: new Date().toLocaleString("pt-BR"),
        cep: address.cep,
        city: address.localidade,
        state: address.uf
    });

    saveHistory(history);
}

module.exports = {
    getHistory,
    addHistory
};