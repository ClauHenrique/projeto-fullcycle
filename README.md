### projeto focado em arquitetura de microsserviços. Veja o diagrama da arquitetura do sistema:
![diagrama](https://github.com/ClauHenrique/projeto-fullcycle/blob/main/diagrama-arquitetura.jpg)

#### Eu criei um script que facilita a execução do projeto. Você pode exeutar o script e executar tudo de uma vez, mas vai perder um pouco do controle sobre os logs do sistema.
## Como executar o projeto:
- Conseda permissão de execução ao script:
  - chmod +x run.sh
> este script é foi criado para ser executado em um linux. Então se você utiliza windows, não irá funcionar.
- Execute o script:
    - ./run.sh
- O script abrirá o navegador na pagina do administrador do rabbitmq (se não abrir, atualize a pagina)
    - faça login utilizando "admin" tanto no login quanto na senha
- Você deve criar uma fila de menssagens a serem processadas chamada "orders":
- ![diagrama](https://github.com/ClauHenrique/projeto-fullcycle/blob/main/img.png)
