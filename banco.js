//banco
//controlar as transações do usuário
//agencia(s)
//clientes - saque, deposito, transferencia, pix
//extrato por cliente 

// Função auxiliar para trabalhar com valores monetários precisos
function roundMoney(value) {
    return Math.round(value * 100) / 100;
}

class Cliente {
    constructor(nome, conta, agencia, saldo, chavePix) {
        this.nome = nome;
        this.conta = conta;
        this.agencia = agencia;
        this.saldo = roundMoney(saldo);
        this.chavePix = chavePix;
        this.transacoes = [];
    }

    addTransaction(tipo, valor, detalhes = {}) {
        this.transacoes.unshift({
            tipo,
            valor,
            data: new Date().toLocaleString(),
            ...detalhes
        });
    }

    depositar(valor) {
        valor = roundMoney(valor);
        this.saldo = roundMoney(this.saldo + valor);
        this.addTransaction('depositar', valor);
    }

    // Método interno para receber valores sem criar transação de depósito
    _receberValor(valor) {
        valor = roundMoney(valor);
        this.saldo = roundMoney(this.saldo + valor);
    }

    sacar(valor) {
        valor = roundMoney(valor);
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente.");
        }
        this.saldo = roundMoney(this.saldo - valor);
        this.addTransaction('sacar', valor);
    }

    transferir(destino, valor) {
        valor = roundMoney(valor);
        if (destino.conta === this.conta) {
            throw new Error("Não é possível transferir para si mesmo.");
        }
        // Verifica saldo sem registrar transação de saque
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente.");
        }
        // Atualiza saldo diretamente sem criar transação duplicada
        this.saldo = roundMoney(this.saldo - valor);
        destino._receberValor(valor); // Usa método interno
        // Registra apenas as transações de transferência
        this.addTransaction('transferir', valor, { contaDestino: destino.conta });
        destino.addTransaction('transferir', valor, { contaOrigem: this.conta });
    }

    pix(destino, valor) {
        valor = roundMoney(valor);
        if (destino.conta === this.conta) {
            throw new Error("Não é possível enviar PIX para si mesmo.");
        }
        // Verifica saldo sem registrar transação de saque
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente.");
        }
        // Atualiza saldo diretamente sem criar transação duplicada
        this.saldo = roundMoney(this.saldo - valor);
        destino._receberValor(valor); // Usa método interno
        // Registra apenas a transação do PIX
        this.addTransaction('pix-out', valor, { chaveDestino: destino.chavePix });
        destino.addTransaction('pix-in', valor, { chaveOrigem: this.chavePix });
    }
}

// Classe para gerenciar o banco
class Banco {
    constructor() {
        this.clientes = [];
        this.proximaConta = 1;
    }

    // Gera próximo número de conta
    gerarNumeroConta() {
        const conta = this.proximaConta.toString().padStart(5, '0') + '-' + Math.floor(Math.random() * 10);
        this.proximaConta++;
        return conta;
    }

    // Verifica se conta já existe
    contaExiste(conta) {
        return this.clientes.some(c => c.conta === conta);
    }

    // Verifica se chave PIX já existe
    pixExiste(chavePix) {
        return this.clientes.some(c => c.chavePix === chavePix);
    }

    // Cadastra novo cliente
    cadastrarCliente(nome, agencia, saldoInicial, chavePix) {
        // Validações
        if (!nome || nome.trim().length < 2) {
            throw new Error("Nome deve ter pelo menos 2 caracteres");
        }
        
        if (!agencia) {
            throw new Error("Agência é obrigatória");
        }
        
        if (saldoInicial < 0) {
            throw new Error("Saldo inicial não pode ser negativo");
        }
        
        if (!chavePix || chavePix.trim().length < 3) {
            throw new Error("Chave PIX deve ter pelo menos 3 caracteres");
        }
        
        if (this.pixExiste(chavePix)) {
            throw new Error("Esta chave PIX já está em uso");
        }

        // Gera conta única
        let conta;
        do {
            conta = this.gerarNumeroConta();
        } while (this.contaExiste(conta));

        // Cria e adiciona o cliente
        const novoCliente = new Cliente(nome, conta, agencia, saldoInicial, chavePix);
        this.clientes.push(novoCliente);
        
        return novoCliente;
    }

    // Busca cliente por conta
    buscarPorConta(conta) {
        return this.clientes.find(c => c.conta === conta);
    }

    // Busca cliente por PIX
    buscarPorPix(chavePix) {
        return this.clientes.find(c => c.chavePix === chavePix);
    }

    // Lista todos os clientes
    listarClientes() {
        return this.clientes;
    }
}

// Instância global do banco
const banco = new Banco();
