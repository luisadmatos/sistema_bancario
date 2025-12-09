# Sistema Bancário - POO

Sistema bancário web implementado em JavaScript usando Programação Orientada a Objetos com interface HTML.

## Estrutura dos Arquivos

### 📁 Arquivos Principais

- **`banco.js`** - Classe `Cliente` com métodos para operações bancárias (depósito, saque, transferência, PIX)
- **`data.js`** - Dados dos clientes e funções de busca por conta e chave PIX
- **`ui.js`** - Interface do usuário e manipulação do DOM
- **`index.html`** - Interface web do sistema bancário
- **`styles.css`** - Estilização da interface
- **`Transacao.js`** - Arquivo para extensões futuras (atualmente vazio)

## 🏗️ Arquitetura do Sistema

### Cliente
- Classe principal que representa um cliente bancário
- Propriedades: nome, conta, agencia, saldo, chavePix, transacoes
- Métodos para todas as operações bancárias

### Interface Web
- HTML com seletor de clientes e formulários para operações
- JavaScript para manipulação do DOM e eventos
- CSS para estilização responsiva

### Sistema de Dados
- Array de clientes pré-cadastrados
- Funções de busca por conta e chave PIX
- Histórico de transações por cliente

## 🚀 Funcionalidades Implementadas

### ✅ Interface Web
- ✅ Seletor de clientes via dropdown
- ✅ Exibição de informações da conta (agência e saldo)
- ✅ Formulários para operações bancárias
- ✅ Interface responsiva e intuitiva

### ✅ Operações Bancárias
- ✅ Depósito
- ✅ Saque (com validação de saldo)
- ✅ Transferência entre contas
- ✅ PIX por chave

### ✅ Funcionalidades
- ✅ Histórico de transações por cliente
- ✅ Formatação de moeda em reais (R$)
- ✅ Validações de entrada
- ✅ Mensagens de feedback para o usuário

## 🔒 Recursos de Segurança

- Validações de valor (não aceita valores negativos ou inválidos)
- Verificação de saldo suficiente para saques e transferências
- Prevenção de transferências e PIX para a própria conta
- Tratamento de erros com mensagens claras

## 📋 Como Usar

### 1. Abrir o sistema
Abra o arquivo `index.html` no seu navegador web.

### 2. Selecionar cliente ou Cadastre um novo
Use o dropdown para selecionar um dos clientes pré-cadastrados:
- Alice Silva (conta: 12345-6)
- Bruno Costa (conta: 67890-1) 
- Carlos Souza (conta: 11223-3)

### 3. Realizar operações
- **Depositar**: Clique em "Depositar", digite o valor e confirme
- **Sacar**: Clique em "Sacar", digite o valor e confirme
- **Transferir**: Clique em "Transferir", digite a conta destino e valor
- **PIX**: Clique em "PIX", digite a chave PIX destino e valor
- **Histórico**: Clique em "Histórico" para ver as transações

### 4. Clientes pré-cadastrados
```javascript
Alice Silva - Conta: 12345-6 - PIX: alice@email.com - Saldo inicial: R$ 1.500,50
Bruno Costa - Conta: 67890-1 - PIX: bruno@email.com - Saldo inicial: R$ 500,00  
Carlos Souza - Conta: 11223-3 - PIX: carlos@email.com - Saldo inicial: R$ 3.000,75
```

## 🎯 Vantagens desta Estrutura

1. **Interface Web**: Sistema acessível via navegador, sem necessidade de terminal
2. **Simplicidade**: Interface intuitiva para operações bancárias
3. **Separação de responsabilidades**: Lógica (banco.js), dados (data.js) e interface (ui.js) separadas
4. **Extensibilidade**: Fácil adicionar novos clientes ou funcionalidades
5. **Responsividade**: Interface adaptável para diferentes dispositivos

## 📚 Conceitos de POO Aplicados

- **Encapsulamento**: Propriedades e métodos da classe Cliente organizados
- **Abstração**: Classe Cliente representa entidade do mundo real
- **Métodos**: Operações bancárias encapsuladas em métodos específicos
- **Estado**: Cada cliente mantém seu próprio estado (saldo, transações)
