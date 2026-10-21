RUNBOOK · SCROLL-BOUND VIDEO

# Scroll Cinema

Como fazer um vídeo responder ao scroll frame a frame, sem engasgo — o passo a passo exato usado no Hero da **Nudē Arquitetura**, pra repetir em qualquer outro site.

Fonte **1× vídeo existente (nenhum gerado por IA)**

Custo **R$ 0 — só FFmpeg local**

Resultado medido **348ms → 10ms de seek**

## 00 O problema, em uma frase

Um `<video>` comum guarda um quadro completo (keyframe) só a cada \~2 segundos; entre eles, quadros parciais que dependem do anterior. Pedir pro navegador pular direto pra um instante qualquer — o que o scroll faz a cada pixel rolado — força ele a reconstruir tudo desde o último keyframe. Multiplique isso por dezenas de eventos de scroll por segundo e o vídeo trava.

A correção não é código, é o **arquivo**: reprocessar o vídeo pra que *todo* quadro seja um keyframe. Depois disso, qualquer ponto do vídeo responde igual.

## 01 Pré-requisito

FFMPEG Instalar localmente, uma vez

Processamento de vídeo é local e gratuito — não precisa de nenhum serviço pago. No Windows, via winget:

```
winget install --id Gyan.FFmpeg -e
```

Depois de instalar, abra um terminal *novo* — o PATH só atualiza numa sessão nova.

## 02 Interpolar pra 60fps

ETAPA 1 Suavizar o movimento antes de reencodar

Opcional, mas recomendado se o vídeo fonte for 24-30fps: gera quadros intermediários por interpolação de movimento, o que deixa o scroll mais fluido no passo seguinte.

Comando usado (vídeo de 8s, 1920×1080)

```
ffmpeg -y -i heronude.mp4 -vf "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:vsbmc=1:me_mode=bidir:search_param=32" \
  -c:v libx264 -crf 16 -preset medium -an interp.mp4
```

Observado neste projeto

A estimativa de referência é \~75s de processamento a cada 5s de vídeo. Na prática, com `search_param=32`, levou **quase 9 minutos** pra 8 segundos de vídeo — o filtro é sensível ao número de núcleos de CPU realmente usados. Não é travamento: confira com `Get-Process ffmpeg` (Windows) se o tempo de CPU continua subindo. Se precisar de algo mais rápido, baixe o `search_param` pra 16.

## 03 Forçar todo quadro a virar keyframe

ETAPA 2 O passo que resolve o engasgo

`keyint=1` obriga cada quadro a ser independente. O arquivo fica maior — é a troca certa: peso é invisível numa conexão boa, engasgo é visível sempre.

Comando

```
ffmpeg -y -i interp.mp4 -vf "scale=1920:-2:flags=lanczos" \
  -c:v libx264 -x264-params "keyint=1:min-keyint=1:scenecut=0" \
  -g 1 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart -an hero.mp4
```

Piso obrigatório

1920px de largura, nunca abaixo — mesmo pra economizar peso. Se o arquivo incomodar, encurte a duração ou suba o CRF antes de mexer na resolução.

Verificação — frames precisa ser igual a keyframes

```
ffmpeg -i hero.mp4 -f null - 2>&1 | grep -oE 'frame=\s*[0-9]+' | tail -1
ffmpeg -i hero.mp4 -vf "select=eq(pict_type\,I)" -frames:v 99999 -f null - 2>&1 \
  | grep -oE 'frame=\s*[0-9]+' | tail -1
```

## 04 Amarrar no scroll

ETAPA 3 O vídeo nunca toca sozinho

Seção alta (300–500vh) com um contêiner `sticky` de 100vh por dentro. O progresso do scroll (0 a 1) vira `video.currentTime`.

Bug real encontrado neste projeto

O componente tinha `autoPlay` e `loop` no `<video>` — o navegador tocava sozinho *enquanto* o código também setava `currentTime` via scroll. Os dois brigando pelo mesmo valor causa um piscar/conflito visual. Correção: remover os dois atributos e chamar `video.pause()` assim que o vídeo estiver pronto.

Padrão de binding (React / vanilla JS)

```
// dentro do handler de scroll, com scrollYProgress já calculado (0→1)
if (video.readyState >= 2 && duration > 0) {
  video.currentTime = progresso * duration
}
// nunca video.play() — o navegador não deve controlar o tempo
```

Armadilha de ambiente

`requestAnimationFrame` é suspenso em abas/painéis de preview em segundo plano (`document.hidden === true`). Se o efeito "não funcionar" só dentro de um preview embutido, teste numa aba visível de verdade antes de suspeitar do código.

## 05 O resultado, medido

Tempo de `seek` até 10 timestamps não-sequenciais do vídeo do Hero, antes e depois do reencode — medido com `performance.now()` no navegador real, não estimado.

| Timestamp alvo | Antes | Depois |
| --- | --- | --- |
| 1.5s | 74ms | 5ms |
| 3.9s | 195ms | 10ms |
| 6.8s | 301ms | 10ms |
| 7.9s | 348ms | 10ms |
| 2.1s | 96ms | 4ms |

348ms

Pior caso, antes

3–10ms

Toda vez, depois

476 / 476

Frames = keyframes

## 06 Checklist pra repetir em outro site

O vídeo fonte tem no mínimo 1920px de largura antes de processarse a fonte já é baixa, o resultado não melhora — refaça a captura/exportação primeiro

Rodei os dois comandos FFmpeg (interpolar → keyint=1) e conferi frames == keyframes

O `<video>` não tem `autoPlay` nem `loop` — só `muted playsInline preload="auto"`

Testei numa aba de verdade, não num painel de preview embutidorAF pausa em abas ocultas — falso negativo garantido

Rolar pra cima faz o vídeo voltar, não só avançar

Testei no celular — o binding de scroll por toque se comporta igual

Se não houver vídeo fonte

Quando o site não tem nenhum vídeo pra reaproveitar, o caminho muda: gerar duas imagens (quadro inicial e final da jornada) com Frame B usando Frame A como referência única, depois um gerador de vídeo com first/last-frame (ex: Wan 3.0 via Higgsfield) pra preencher a transição — e só então aplicar as etapas 02 e 03 deste manual no resultado. Isso consome créditos de geração; o restante do pipeline é idêntico.

Caso de referência: Nudē Arquitetura, Hero Vídeo final: 1920×1080 · 60fps · 32,5MB · 476 keyframes