let currentClient = null;

// Utilidades
function formatCurrency(value) {
    return `R$ ${value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

function parseMoneyInput(input) {
    // Remove espaços e substitui vírgula por ponto
    const cleaned = input.replace(/\s/g, '').replace(',', '.');
    const value = parseFloat(cleaned);
    return isNaN(value) ? 0 : value;
}

function showMessage(msg) {
    alert(msg);
}

// DOM refs
const clientSelect = document.getElementById('client-select');
const agencyDisplay = document.getElementById('agency-display');
const balanceDisplay = document.getElementById('balance-display');
const historyList = document.getElementById('transaction-history');
const historySection = document.querySelector('.history-section');
const inputSections = document.querySelectorAll('.input-section');

// Updates
function updateAccountInfo() {
    agencyDisplay.textContent = currentClient.agencia;
    balanceDisplay.textContent = formatCurrency(currentClient.saldo);
    updateHistory();
}

function updateHistory() {
    historyList.innerHTML = "";
    currentClient.transacoes.forEach(tr => {
        const li = document.createElement('li');
        let description = '';
        
        switch(tr.tipo) {
            case 'depositar':
                description = 'Depósito';
                break;
            case 'sacar':
                description = 'Saque';
                break;
            case 'transferir':
                if (tr.contaDestino) {
                    description = `Transferência para conta ${tr.contaDestino}`;
                } else if (tr.contaOrigem) {
                    description = `Transferência recebida de conta ${tr.contaOrigem}`;
                } else {
                    description = 'Transferência';
                }
                break;
            case 'pix-out':
                description = `PIX enviado para ${tr.chaveDestino}`;
                break;
            case 'pix-in':
                description = `PIX recebido de ${tr.chaveOrigem}`;
                break;
            default:
                description = tr.tipo;
        }
        
        li.textContent = `${tr.data} — ${description} — ${formatCurrency(tr.valor)}`;
        historyList.appendChild(li);
    });
}

function selectClient(acc) {
    currentClient = banco.buscarPorConta(acc);
    if (currentClient) {
        updateAccountInfo();
    }
}

// Mostrar inputs
function showInput(id) {
    inputSections.forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    historySection.classList.add('hidden');
}

// Eventos
clientSelect.addEventListener('change', e => {
    selectClient(e.target.value);
});

// Depósito
document.getElementById('deposit-button').addEventListener('click', () => {
    const amount = parseMoneyInput(document.getElementById('deposit-amount-input').value);
    if (amount <= 0) return showMessage("Valor inválido");
    currentClient.depositar(amount);
    updateAccountInfo();
    showMessage("Depósito realizado!");
});

// Saque
document.getElementById('withdraw-button').addEventListener('click', () => {
    try {
        const amount = parseMoneyInput(document.getElementById('withdraw-amount-input').value);
        if (amount <= 0) return showMessage("Valor inválido");
        currentClient.sacar(amount);
        updateAccountInfo();
        showMessage("Saque realizado!");
    } catch (err) {
        showMessage(err.message);
    }
});

// Transferência
document.getElementById('transfer-button').addEventListener('click', () => {
    try {
        const amount = parseMoneyInput(document.getElementById('transfer-amount-input').value);
        if (amount <= 0) return showMessage("Valor inválido");
        const to = findClientByAccount(document.getElementById('transfer-target-account').value);
        if (!to) return showMessage("Conta destino não encontrada");
        currentClient.transferir(to, amount);
        updateAccountInfo();
        showMessage("Transferência realizada!");
    } catch (err) {
        showMessage(err.message);
    }
});

// PIX
document.getElementById('pix-button').addEventListener('click', () => {
    try {
        const amount = parseMoneyInput(document.getElementById('pix-amount-input').value);
        if (amount <= 0) return showMessage("Valor inválido");
        const to = findClientByPix(document.getElementById('pix-key-input').value);
        if (!to) return showMessage("Chave PIX não encontrada");
        currentClient.pix(to, amount);
        updateAccountInfo();
        showMessage("PIX realizado!");
    } catch (err) {
        showMessage(err.message);
    }
});

// Cadastrar Cliente
document.getElementById('register-client-button').addEventListener('click', () => {
    try {
        const nome = document.getElementById('client-name-input').value.trim();
        const agencia = document.getElementById('client-agency-input').value.trim();
        const saldo = parseMoneyInput(document.getElementById('client-balance-input').value);
        const chavePix = document.getElementById('client-pix-input').value.trim();
        
        if (!nome) return showMessage("Nome é obrigatório");
        if (!agencia) return showMessage("Agência é obrigatória");
        if (!chavePix) return showMessage("Chave PIX é obrigatória");
        
        const novoCliente = banco.cadastrarCliente(nome, agencia, saldo, chavePix);
        
        // Atualiza o dropdown com o novo cliente
        const option = document.createElement('option');
        option.value = novoCliente.conta;
        option.textContent = `${novoCliente.nome} (${novoCliente.conta})`;
        clientSelect.appendChild(option);
        
        // Seleciona o novo cliente
        currentClient = novoCliente;
        clientSelect.value = currentClient.conta;
        updateAccountInfo();
        
        // Limpa os campos
        document.getElementById('client-name-input').value = '';
        document.getElementById('client-agency-input').value = '';
        document.getElementById('client-balance-input').value = '';
        document.getElementById('client-pix-input').value = '';
        
        // Esconde o formulário
        document.querySelectorAll('.input-section').forEach(s => s.classList.remove('active'));
        
        showMessage(`Cliente ${nome} cadastrado com sucesso!\nConta: ${novoCliente.conta}`);
        
    } catch (err) {
        showMessage(err.message);
    }
});

// Inicialização
function atualizarDropdownClientes() {
    // Limpa o dropdown
    clientSelect.innerHTML = '';
    
    // Adiciona todos os clientes
    banco.listarClientes().forEach(c => {
        const option = document.createElement('option');
        option.value = c.conta;
        option.textContent = `${c.nome} (${c.conta})`;
        clientSelect.appendChild(option);
    });
}

// Inicializa a aplicação
atualizarDropdownClientes();

if (banco.listarClientes().length > 0) {
    currentClient = banco.listarClientes()[0];
    clientSelect.value = currentClient.conta;
    updateAccountInfo();
}
