Questões Teóricas

1 - ReactJS e NextJS: Renderização e Estratégias

a) Explique, com suas próprias palavras, as diferenças entre:

- Client-Side Rendering (CSR)
  É quando toda a logica de renderização HTML é feita no novegador do cliente. O javascript controe a pagina alterando o DOM sem precisar consultar ou esperar o servidor.

- Server-Side Rendering (SSR)
  É quando toda a rederização HTML é feita no lado do servidor e entregue ao cliente pronta.

- Static Site Generation (SSG)
  É quando o HTML é construido no momento da compilação do site.

b) Em que cenários cada uma dessas abordagens pode ser vantajosa ou
problemática? Dê exemplos práticos.

- Client-Side Rendering (CSR)
  Ideal para usuarios autenticados sem SEO e em que o site deve funcionar fluidez e rapidez.
  Não indicado para sites publicos ou usuarios com conexões lentas e instaveis.

- Server-Side Rendering (SSR)
  Ideal em paginas publicas que precisam de SEO e que exibem dados personalizados por usuário.
  Não indicado para sites com muito trafego.

- Static Site Generation (SSG)
  Ideal para sites onde o conteudo nao muda de acordo com usário.
  Não indicado para portais grandes onde o tempo de compilação seria grande de mais para se tornar viavel.

2 - Backend: Conceitos e Approaches

a) Quais são as principais maneiras de implementar um backend para uma
aplicação web?

- Monólito: Todo o código fica em um único projeto, sendo fácil de criar mas difícil de crescer.
- Microsserviços: O sistema é dividido em vários blocos independentes, sendo mais seguro contra quedas mas complexo de gerenciar.
- Serverless: O código roda em funções na nuvem apenas quando acionado, eliminando gastos com servidores ligados direto.

b) Conhece a lib tRPC? Se sim, quais são as principais vantagens e desvantagens
de utilizar tRPC, especialmente em termos de segurança, tipagem e escalabilidade?

Eu não conhecia o tRPC e acabei descobrindo a tecnologia pesquisando especificamente para o desafio dessa vaga. Entendi que ele serve para conectar o backend e o frontend usando TypeScript, garantindo que se eu mudar algo no servidor, a tela avisa o erro na hora.
