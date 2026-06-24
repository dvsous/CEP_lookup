import requests
import json
import os

HISTORY_FILE = "history.json"
cache = {}


def load_history():
    if not os.path.exists(HISTORY_FILE):
        return []

    with open(HISTORY_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def save_history(history):
    with open(HISTORY_FILE, "w", encoding="utf-8") as file:
        json.dump(history, file, indent=4, ensure_ascii=False)


def add_history(data):
    history = load_history()

    history.append({
        "cep": data["cep"],
        "city": data["localidade"],
        "state": data["uf"]
    })

    save_history(history)


def show_history():
    history = load_history()

    if not history:
        print("\nNenhum histórico encontrado.")
        return

    print("\n=== HISTÓRICO ===")

    for item in history:
        print(
            f"{item['cep']} | "
            f"{item['city']}/{item['state']}"
        )


def search_cep(cep):
    cep = "".join(filter(str.isdigit, cep))

    if len(cep) != 8:
        print("CEP inválido.")
        return

    if cep in cache:
        print("\n[Cache] Resultado encontrado localmente.")
        data = cache[cep]
    else:
        response = requests.get(
            f"https://viacep.com.br/ws/{cep}/json/"
        )

        response.raise_for_status()

        data = response.json()

        if "erro" in data:
            print("CEP não encontrado.")
            return

        cache[cep] = data

    print("\n=== ENDEREÇO ===")
    print(f"CEP: {data['cep']}")
    print(f"Logradouro: {data['logradouro']}")
    print(f"Bairro: {data['bairro']}")
    print(f"Cidade: {data['localidade']}")
    print(f"UF: {data['uf']}")

    add_history(data)


while True:
    print("\n=== ADDRESS LOOKUP ===")
    print("1 - Consultar CEP")
    print("2 - Ver Histórico")
    print("0 - Sair")

    option = input("\nEscolha uma opção: ")

    if option == "1":
        cep = input("Digite o CEP: ")

        try:
            search_cep(cep)
        except Exception as error:
            print(f"Erro: {error}")

    elif option == "2":
        show_history()

    elif option == "0":
        print("Encerrando...")
        break

    else:
        print("Opção inválida.")