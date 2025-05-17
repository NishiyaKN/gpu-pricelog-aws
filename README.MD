# Projeto de Desenvolvimento de Sistemas em Nuvem

## GPU Price Tracker

### Envolvidos

**Professor**: 
- Aparecido Valdemir de Freitas 

**Alunos**:
- Kaick Kenithi Nishiya
- Lucas Quinto Roli
- Matheus Pestili

### Visão geral
O projeto utiliza uma instância EC2 na AWS (free-tier), onde possui dois containers Docker: price-tracker e cido-web.

**price-tracker**: Possui diversos scripts escritos em python que periodicamente são ativados pelo crond. Os scripts acessam os websites da Kabum, Terabyte e Pichau para verificar os valores de certas GPUs. Quando é possível obter os valores, eles são armazenados em arquivos json, que estão em um volume compartilhado.

**cido-web**: Possui o nginx rodando para fornecer o website. Ele pega os arquivos json do volume compartilhado e cria gráficos para os valores de cada item conforme o tempo.

### Acesso ao website

**URL**: http://3.87.184.210/

O website possui uma simples página de login. Para acessar, as credenciais são:  
**Usuário**: petulho  
**Senha**: sodorme
