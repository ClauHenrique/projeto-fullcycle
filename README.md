### projeto focado em arquitetura de microsserviços. Veja o diagrama da arquitetura do sistema:
![diagrama](https://github.com/ClauHenrique/projeto-fullcycle/blob/main/diagrama-arquitetura.jpg)

#### Eu criei um script que facilita a execução do projeto. Você pode exeutar o script e executar tudo de uma vez, mas vai perder um pouco do controle sobre os logs do sistema.
## Como executar o projeto:
- Conseda permissão de execução ao script:
  - chmod +x run.sh
> este script foi criado para ser executado em um linux. Então se você utiliza windows, não irá funcionar.
- Execute o script:
    - ./run.sh
- O script abrirá o navegador na pagina do administrador do rabbitmq (se não abrir, atualize a pagina)
    - faça login utilizando "admin" tanto no login quanto na senha
- Você deve criar uma fila de menssagens que serão processadas, chamada "orders":
![diagrama](https://github.com/ClauHenrique/projeto-fullcycle/blob/main/criar_fila.jpeg)
- Entre na fila que foi criada para configurar o roteamento das mensagens
![diagrama](https://github.com/ClauHenrique/projeto-fullcycle/blob/main/selecionar_fila.jpeg)
- Crie um roteamento para essa fila e defina a exchange
![diagrama](https://github.com/ClauHenrique/projeto-fullcycle/blob/main/routing_key.jpeg)
- Após isso, volte ao terminal onde o script está sendo utilizado, digite "y" e precione "enter". O script cuidará do resto
> Para abrir o front no navegador, acesse localhost:3000. O Nest.js por padrão utiliza esta porta. Se ela estiver ocupada, ele tentará na porta 3001... e assim consecutivamente
