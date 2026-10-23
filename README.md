# Pedra Fina Connect

Site institucional do programa de relacionamento Pedra Fina Connect. Apresenta as regras de pontuação, a jornada de recompensas, os parceiros e o convite para novos profissionais.

## Stack

- Next.js 16 (App Router), React 19 e TypeScript.
- Tailwind CSS 4 para estilos e layout.
- GSAP com ScrollTrigger e Motion para as interações e animações.
- `next/image` para imagens e `next/font` para a fonte Archivo.

## Estrutura

| Caminho | Responsabilidade |
| --- | --- |
| `src/app` | Rotas, layout, metadados e estilos globais. |
| `src/components/sections` | Seções das páginas, incluindo vídeo inicial e jornada de recompensas. |
| `src/components/motion` e `src/components/primitives` | Efeitos reutilizáveis e elementos de interface. |
| `src/content` | Textos, parceiros, regras e faixas de recompensas. |
| `src/lib` | Configuração compartilhada de fonte, navegação, SEO e GSAP. |
| `public` | Vídeos, imagens das conquistas e logos dos parceiros. |
| `docs/scrollcinema.md` | Referência de comportamento para a jornada animada. |
