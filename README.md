# EvolveFit — Site oficial

Landing page pública do **EvolveFit**, um app de treino que ajuda a pessoa a treinar com mais direção: criar um plano, registrar cargas e repetições e acompanhar a evolução.

O site é a vitrine do produto. Ele apresenta o EvolveFit, explica a proposta e leva o usuário para o app/PWA.

- **App/PWA:** https://evolve-fit-app.vercel.app
- O **aplicativo** (Next.js, banco, autenticação) fica em **outro repositório** (`EvolveFit_APP`). Este repositório é **somente o site**.

---

## O que o site faz

- Apresenta o produto e o problema que ele resolve (treino improvisado, sem registro).
- Explica como funciona (criar conta → responder perguntas → gerar plano → registrar → acompanhar).
- Mostra os recursos já disponíveis e os que estão **planejados** (treino manual avançado, EvolveFit Plus, recursos com IA — ainda não prontos).
- Direciona para o app com CTAs claros ("Começar agora", "Abrir app").

---

## Estrutura

```
SITE/
  index.html         Home (hero, problema, solução, como funciona, recursos, telas, Free/Plus, segurança, CTA)
  recursos.html      Recursos (disponível agora / planejado)
  sobre.html         Sobre o produto
  download.html      Acesso ao app/PWA + QR Code + instruções de instalação PWA
  privacidade.html   Política de privacidade
  css/style.css      Design system (tokens em :root, tema claro/escuro)
  js/app-config.js   Fonte única da URL do app/PWA (constante EVOLVEFIT_APP_URL)
  js/translations.js Textos PT/EN
  js/language.js     Troca de idioma
  js/main.js         Menu mobile, tema, reveal no scroll
  js/qrcode.js       Gera o QR Code apontando para o app
  imagem/            Logo e ícones
```

Stack: **HTML, CSS e JavaScript puro** — sem framework e sem etapa de build.

---

## Link do app (fonte única)

A URL do app/PWA fica **apenas** em `SITE/js/app-config.js`:

```js
const EVOLVEFIT_APP_URL = 'https://evolve-fit-app.vercel.app';
```

Todos os botões com `data-app-link` e o QR Code usam essa constante. Para mudar o destino, altere só esse arquivo.

---

## Como testar localmente

Como é um site estático, basta servir a pasta `SITE/`:

```bash
# Python 3
python -m http.server 8099 --directory SITE
# depois abra http://localhost:8099
```

Ou abra `SITE/index.html` direto no navegador (o QR Code usa um CDN, então precisa de internet).

Verifique: menu mobile, tema claro/escuro, troca PT/EN, botões e QR apontando para o app, e o console sem erros.

---

## Idiomas e tema

- **PT/EN** via `translations.js` (cada texto tem um `id`). O seletor no menu troca o idioma e salva a preferência.
- **Tema claro/escuro** com escuro como padrão; a preferência é salva em `localStorage`.

## Identidade visual

Paleta **Onyx + Candy Blue** (fitness-tech premium): fundo Onyx (`#020202`), superfícies em carvão, texto branco gelo e **Candy Blue** (`#B2D5E5`) como destaque/ação. Tokens centralizados em `:root` (e `:root.light`) no `css/style.css`. Tipografia: **Sora** (títulos) + **Manrope** (corpo).

---

## Status

Projeto em desenvolvimento, de estudo e portfólio. O site não promete recursos que ainda não existem: o que está por vir aparece marcado como "em breve" ou "planejado".

**Autor:** Marco Nafalski · uso educacional e experimental.
