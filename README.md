-> Landing Page foi desenvolvida também com um foco em Page Speed, SEO, Acessibilidade e Boas práticas de Rankeamento do google.

->Foram alterados locais onde o font-weight não fica visualmente similar ao figma mesmo possuindo as mesmas propriedades como por exemplo:
home**hero-title--subtitle-primary figma esta 500 utilizei 400 pois ficou mais próximo do figma(testes realizados em 1920)
home**hero-title--subtitle-secondary esta 500 utilizei 400 pois ficou mais pr?ximo do figma(testes realizados em 1920)

->.home\_\_hero-title--main-title foi alterado a cor para #707375 que no figma é #0B0C0D por questões de visibilidade e contraste,
monitores com pouco brilho ou pessoas com deficiência visual podem ter problemas com as cores do figma por conter pouco contraste, as diretrizes de contraste estavam em 1.07:1 e o recomendado é 3:1 para textos grandes, utilizei a cor #75787A que possui uma razão 4.72:1 que facilita muito a leitura para usuários.(foi utilizado IA para realizar os cálculos e verificar as cores após ter notado a dificuldade de visualização do mesmo)

->Todas as medidas para as versões desktop foram feitas com calculo de proporções baseados nas medidas do figma x 1920px e calculando a largura atual das telas para manter os componentes o mais proporcionais possíveis para outras larguras de tela, já o desktop seguiu medidas fiéis ao figma já que o calculo poderia reduzir fontes para telas mobile o que não é recomendado.

->Como o Figma não possuía um valor padrão de altura para alguns componentes, supus que pelo tamanho seria um componente que tem a altura total de tela(mantendo todas as proporções para que as posições do texto fiquem fiéis ao figma)

-> as dependências externas utilizadas foram gsap para alguns efeitos visuais de animação e o prettier com a adição de CSSComb(Organizador de ordem e estilização de css)
-> Tentei seguir o padrão classes que encontrei no site da fiap.

->Junto ao Email, irei inserir a url onde farei o deploy do projeto na vercel para analise e avaliação.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
