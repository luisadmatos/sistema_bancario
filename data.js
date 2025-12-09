// Cadastra clientes iniciais
banco.cadastrarCliente("Alice Silva", "0001", 1500.50, "alice@email.com");
banco.cadastrarCliente("Bruno Costa", "0001", 500.00, "bruno@email.com");
banco.cadastrarCliente("Carlos Souza", "0002", 3000.75, "carlos@email.com");

// Referência aos clientes para compatibilidade
const clients = banco.listarClientes();

// busca por conta
function findClientByAccount(acc) {
    return banco.buscarPorConta(acc);
}

// busca por pix
function findClientByPix(key) {
    return banco.buscarPorPix(key);
}