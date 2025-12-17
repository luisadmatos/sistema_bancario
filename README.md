# Sistema Bancário - POO

Sistema bancário web implementado em JavaScript usando Programação Orientada a Objetos com interface HTML.

## Estrutura dos Arquivos

### 📁 Arquivos Principais

- **`banco.js`** - Classes `Cliente` e `Banco` com métodos para operações bancárias e gestão de clientes
- **`data.js`** - Dados dos clientes pré-cadastrados e funções auxiliares de busca
- **`ui.js`** - Interface do usuário e manipulação do DOM
- **`index.html`** - Interface web do sistema bancário
- **`styles.css`** - Estilização da interface com design moderno

## 🏗️ Arquitetura do Sistema

### Cliente
- Classe principal que representa um cliente bancário
- Propriedades: nome, conta, agencia, saldo, chavePix, transacoes
- Métodos para todas as operações bancárias

### Banco
- Classe que gerencia todos os clientes do sistema
- Gera números de conta únicos automaticamente
- Valida cadastro de novos clientes
- Métodos de busca por conta e chave PIX

### Interface Web
- HTML com seletor de clientes e formulários para operações
- JavaScript para manipulação do DOM e eventos
- CSS para estilização responsiva e moderna

### Sistema de Dados
- Instância global da classe Banco
- Clientes pré-cadastrados através do data.js
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
- ✅ Cadastro de novos clientes

### ✅ Funcionalidades
- ✅ Histórico de transações por cliente
- ✅ Formatação de moeda em reais (R$)
- ✅ Validações de entrada e integridade
- ✅ Mensagens de feedback para o usuário
- ✅ Geração automática de números de conta únicos
- ✅ Validação de chaves PIX únicas

## 🔒 Recursos de Segurança

- Validações de valor (não aceita valores negativos ou inválidos)
- Verificação de saldo suficiente para saques e transferências
- Prevenção de transferências e PIX para a própria conta
- Tratamento de erros com mensagens claras

## 📋 Como Usar

### 1. Abrir o sistema
Abra o arquivo `index.html` no seu navegador web.

### 2. Selecionar cliente ou Cadastrar um novo
Use o dropdown para selecionar um dos clientes pré-cadastrados ou cadastre um novo:
- Alice Silva (agência: 0001)
- Bruno Costa (agência: 0001) 
- Carlos Souza (agência: 0002)

**Nota**: Os números de conta são gerados automaticamente pelo sistema no formato "00001-X"

### 3. Realizar operações
- **Depositar**: Clique em "Depositar", digite o valor e confirme
- **Sacar**: Clique em "Sacar", digite o valor e confirme
- **Transferir**: Clique em "Transferir", digite a conta destino e valor
- **PIX**: Clique em "PIX", digite a chave PIX destino e valor
- **Histórico**: Clique em "Histórico" para ver as transações

### 4. Clientes pré-cadastrados
```javascript
Alice Silva - Agência: 0001 - PIX: alice@email.com - Saldo inicial: R$ 1.500,50
Bruno Costa - Agência: 0001 - PIX: bruno@email.com - Saldo inicial: R$ 500,00  
Carlos Souza - Agência: 0002 - PIX: carlos@email.com - Saldo inicial: R$ 3.000,75
```

**Observação**: As contas são geradas automaticamente pelo sistema (ex: 00001-1, 00002-4, etc.)

## 🎯 Vantagens desta Estrutura

1. **Interface Web**: Sistema acessível via navegador, sem necessidade de terminal
2. **Simplicidade**: Interface intuitiva para operações bancárias
3. **Separação de responsabilidades**: Lógica (banco.js), dados (data.js) e interface (ui.js) separadas
4. **Extensibilidade**: Fácil adicionar novos clientes ou funcionalidades
5. **Responsividade**: Interface adaptável para diferentes dispositivos

## 📚 Conceitos de POO Aplicados

- **Encapsulamento**: Propriedades e métodos organizados nas classes Cliente e Banco
- **Abstração**: Classes representam entidades do mundo real (Cliente e Banco)
- **Métodos**: Operações bancárias e de gestão encapsuladas em métodos específicos
- **Estado**: Cada instância mantém seu próprio estado (saldo, transações, clientes)
- **Composição**: A classe Banco compõe uma coleção de Clientes
- **Validação**: Métodos internos para garantir integridade dos dados
