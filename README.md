# Landing page: Le Salgados

HTML5 + CSS3 + JavaScript puro, sem frameworks nem dependências externas.

## Estrutura

```text
index.html
css/style.css
js/script.js
assets/images/   (colocar aqui as fotos autorizadas)
assets/logo/
README.md
```

Para ver a página, abra `index.html` no navegador.

## Dados usados (fonte: cardápio digital oficial da loja)

- Endereço: Av. Gonçalo de Paiva Gomes, 355, Jardim República, São Paulo, SP, 04812-090
- WhatsApp: (11) 98782-4755
- Instagram: https://www.instagram.com/le_salgados/
- Google Maps: https://maps.app.goo.gl/CL9sqHurmAf5bwf77
- Horário: ter, qui, sex e sáb, 12h às 18h50
- Pagamento: PIX, dinheiro, crédito e débito, MercadoPago

## Pendente (procure os comentários `INSERIR` no código)

- Fotos dos produtos: por enquanto vêm direto do cardápio digital da loja (`lesalgados.pedizap.com.br`). Para não depender dele, baixe as fotos para `assets/images/` e troque os `src` no `index.html`
- Fotos da fachada e do ambiente, se o dono quiser
- Imagem para compartilhamento (`og:image`), com URL absoluta após publicar (sugestão: `assets/logo/logo-512.png`)
- História da empresa (início, dono)
- Área e taxa de entrega, se existirem
- Confirmar os horários e os preços com o dono

## Como editar

- Preços e itens: seções `#kits`, `#cardapio` e `#combos` do `index.html`.
- Cores e fontes: variáveis no topo de `css/style.css` (paleta tirada da logo: amarelo `#fbd16d`, azul `#0b5fb5`/`#0a8fdd`, verde-azulado `#1f8f85`).
- Horário do selo "aberto agora": constantes no topo de `js/script.js`.
  Lembre de atualizar também a tabela de horários e o JSON-LD no `index.html`.
- Número do WhatsApp: os links `wa.me/5511987824755` aparecem em vários pontos do `index.html`.
  Use buscar e substituir.

## Importante ao abrir o projeto

Mantenha as pastas juntas. O `index.html` só carrega o visual e as fotos se `css/`, `js/` e `assets/` estiverem ao lado dele, com estes nomes. Extraia o `.zip` inteiro e abra o `index.html` de dentro da pasta.
