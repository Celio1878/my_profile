---
title: "Engenharia do HandSpeak: Tradução 3D de Libras em Tempo Real a 60 FPS e Vídeo P2P Acessível"
slug: "engineering-handspeak-3d-libras-ai"
description: "Blueprint arquitetural do HandSpeak: rastreamento de mãos 3D com MediaPipe a 60 FPS com anti-jitter EMA, desambiguação fonética por Levenshtein, tutor anatômico WebGL em Three.js e videochamadas WebRTC criptografadas via PeerJS."
date: "2026-10-17"
tags: ["AI", "Computer Vision", "WebAssembly", "WebRTC", "Three.js", "Libras", "Cloud Run"]
lang: "pt-BR"
author: "Célio Vieira"
---

## A Visão: Quebrando Barreiras de Comunicação com IA 3D

Para pessoas surdas e com deficiência auditiva, navegar por conversas cotidianas em ambientes ouvintes frequentemente introduz atrito cognitivo. Embora a Língua Brasileira de Sinais (**Libras**) seja rica, espacial e expressiva, ferramentas de tradução existentes costumam ser limitadas por caixas delimitadoras 2D rígidas, latência instável de visão em nuvem ou fluxos constrangedores de fala-para-texto que exigem permissões de microfone.

O **HandSpeak** (`aldeon.app/handspeak`) foi projetado como o 5º empreendimento carro-chefe sob o guarda-chuva da Aldeon para resolver essas limitações a partir dos primeiros princípios. Nossos requisitos centrais:

1. **Visão Computacional 3D Determinística a 60 FPS**: Rastrear até duas mãos simultaneamente em tempo real com latência local abaixo de 16ms diretamente dentro de navegadores modernos.
2. **Desambiguação Fonética e Geométrica**: Resolver colisões sutis de sinais (como *F vs. T*, *A vs. S*, *1 vs. D*, *U vs. V*) sem exigir correções frustrantes com backspace.
3. **Tutor Anatômico 3D Interativo**: Renderizar um rig cibernético de mão com 21 articulações em WebGL com órbita de 360 graus e animação de frases em tempo real para ajudar usuários surdos a ler entradas de texto visualmente.
4. **Vídeo Criptografado Ponto a Ponto (P2P)**: Viabilizar videochamadas diretas via WebRTC com legendas flutuantes ao vivo e reações de compreensão sem custos dedicados de servidor de streaming.
5. **Segurança Zero-Trust e Moderação de Conteúdo**: Implantar Trust & Safety multimodal em camada dupla no GCP Cloud Run com proteção contra picos (*burst protection*) para uma comunicação interpessoal segura.

```
┌──────────────────────────────────────────────────────────────────┐
│                 Cliente no Navegador (React Router 7)            │
│                                                                  │
│  [Feed da Câmera 60 FPS] ──► [MediaPipe Tasks Vision 3D (WASM)]  │
│                                      │                           │
│                            [Filtro Anti-Jitter EMA α=0.72]       │
│                                      │                           │
│                       [Extrator de Atributos Geométricos]        │
│                                      │                           │
│              [Desambiguador Fonético Levenshtein Ponderado]      │
│                                      │                           │
│  ┌───────────────────────┴───────────────────────┐               │
│  ▼                                               ▼               │
│ [Tutor 3D WebGL Three.js]             [Dados P2P PeerJS WebRTC]  │
└──────────────────────────────────────────────────┼───────────────┘
                                                   │ 
                                      [Stream de Mídia Criptografado]
                                                   │
                                                   ▼
                                       ┌───────────────────────┐
                                       │  Peer Remoto PeerJS   │
                                       │ (Legendas Flutuantes) │
                                       └───────────────────────┘
```

---

## 1. Rastreamento de Mãos 3D a 60 FPS e Arquitetura Anti-Jitter

Protótipos iniciais baseados em coordenadas 2D sofriam com distorção de perspectiva: uma mão inclinada 15 graus na direção da câmera ou para longe dela produzia classificações falsas.

Para resolver isso, o HandSpeak adotou o **MediaPipe Tasks Vision** com *landmarks* 3D normalizados (`numHands: 2`), computando fatores de escala intrínsecos baseados na distância euclidiana entre o punho ($P_0$) e a articulação metacarpofalangeana do dedo médio ($P_9$).

### Resiliência Local em WASM e Fallback de Hardware em 4 Camadas
Para eliminar quebras de *mime-type* de CDN e garantir execução pronta para uso offline, o HandSpeak auto-hospeda todos os binários WebAssembly e modelos de tarefa em `public/wasm/`. O ciclo de inicialização aplica uma estratégia resiliente de *fallback* em 4 camadas:

1. Modelo WASM Local + Delegado de GPU WebGL
2. Modelo WASM Local + Delegado de CPU
3. Modelo Remoto com Versão Fixada + Delegado de GPU WebGL
4. Modelo Remoto com Versão Fixada + Delegado de CPU

### Suavização por Média Móvel Exponencial (EMA)
O ruído do sensor óptico da webcam cria microtremores nas coordenadas dos *landmarks*. Aplicamos um filtro de Média Móvel Exponencial (EMA) em todas as 21 articulações da mão ($x, y, z$) antes da avaliação geométrica:

$$S_t = \alpha \cdot X_t + (1 - \alpha) \cdot S_{t-1}$$

Usar $\alpha = 0,72$ preserva transições rápidas da mão enquanto amortece completamente o ruído de alta frequência do sensor. Combinado com um limiar otimizado de travamento de **320ms** (travamento rápido em 200ms quando a confiança da classificação supera $0,90$), sinalizadores conseguem compor frases naturais em velocidades de digitação conversacional.

---

## 2. Resolvendo Colisões em Libras com Levenshtein Fonético

Na datilologia em Libras, diversas letras compartilham configurações de mão quase idênticas:

- **F vs. T**: Ambas apresentam três dedos estendidos com o indicador dobrado sobre o polegar. Na letra **F**, o polegar repousa *por fora* do dedo indicador; no **T**, o polegar trava *por dentro*.
- **A vs. S**: Ambas são punhos fechados. No **A**, o polegar repousa verticalmente ao lado da articulação do indicador; no **S**, o polegar cruza horizontalmente sobre os dedos.
- **U vs. V**: Ambas têm os dedos indicador e médio levantados. No **U**, os dedos ficam bem paralelos ($\Delta < 0,22$); no **V**, abrem-se em um ângulo agudo claro ($\Delta \ge 0,25$).

Em vez de depender puramente de limiares heurísticos, o HandSpeak combina cálculos de ângulos geométricos com um **Algoritmo de Levenshtein Ponderado Fonologicamente** (`libras-disambiguation-service.ts`). Pares conhecidos de colisão visual carregam penalidades fracionárias de substituição ($0,18$ a $0,25$ em vez de $1,0$). Quando um usuário faz uma pausa de $1,2\text{s}$ ou insere um sinal de espaço, o sistema autocorrige o buffer de tokens de forma transparente em menos de $2\text{ms}$, sem alterar palavras já validadas.

---

## 3. O Tutor Anatômico 3D WebGL com 57+ Poses e Modo de Prática

A comunicação é bidirecional. Quando uma pessoa ouvinte responde digitando no chat, pessoas surdas se beneficiam ao ver como esse texto é formado nas configurações de mão em Libras.

Construímos um **Rig Anatômico WebGL em Three.js** (`anatomical-hand-scene.ts`) expandido para **57+ poses articuladas** com 100% de paridade entre o alfabeto A–Z (`26`), números `0–10` (`11`) e expressões conversacionais essenciais (`20+`):
- **21 Articulações e 20 Ossos Cibernéticos**: Malha 3D totalmente articulada com interpolação geométrica suave de poses (`interpolateHandPoses`).
- **Órbita 360° e Predefinições de Câmera**: Perspectivas palmar, dorsal, lateral e superior permitindo que aprendizes e sinalizadores inspecionem a profundidade da articulação.
- **Predefinições de Cadência de Fluxo de Movimento Sincronizadas**: Predefinições de temporização compartilhadas (`accessible` `550ms`, `natural` `320ms`, `fluent` `220ms`) sincronizadas entre o motor tradutor, o tutor 3D e os links profundos da Academia (`?practice=` e `?sign=`).
- **Modo Interativo de Prática na Câmera**: Pontuação de precisão em tempo real comparada aos *landmarks* ao vivo da webcam para que aprendizes validem a configuração de mão (`CM`) e a orientação (`O`) imediatamente.
- **Ciclo de Vida Estrito de Memória WebGL**: Impõe descarte completo de geometrias e materiais com cancelamento de `requestAnimationFrame` ao desmontar o componente para eliminar vazamentos de memória.

---

## 4. Vídeo WebRTC P2P, Privacidade Solo com Custo Zero e Trust & Safety

Para comunicação remota em tempo real entre sinalizadores e pessoas ouvintes, o HandSpeak implementa chamadas WebRTC P2P *serverless* via **PeerJS**:

- **Handshake por Código de Sala**: Códigos leves de sala com 6 caracteres (ex.: `HS-7482`) permitem conexões instantâneas sem atrito de cadastro.
- **Legendas Flutuantes e Reações de Compreensão Mútua**: Exibe legendas dinâmicas ao vivo diretamente sobre o vídeo remoto, acompanhadas de reações táteis rápidas (👍 *Entendi*, 🔄 *Por favor, repita*, ⏳ *Um momento*, 👏 *Concordo*).
- **Isolamento de Webcam Solo com Custo Zero**: A tradução local solo e o Modo de Prática na Câmera rodam **100% no dispositivo** via WebAssembly + WebGL locais com **$0 de custo de servidor ou API multimodal**. A moderação `VideoSafetyGuard` no servidor é ativada **estritamente dentro de chamadas WebRTC remotas ativas entre 2 pares** (`P2PVideoCallModal`).
- **Moderação Multimodal em Dupla Camada (Chamadas Remotas)**:
  - *Camada 1 (Canvas do Cliente 128x128)*: Monitoramento heurístico de tom de pele e velocidade no navegador.
  - *Camada 2 (Microsserviço no GCP Cloud Run)*: Moderação periódica de quadros via FastAPI (3s em cruzeiro / 1s em rajada sob anomalia visual), com desfoque imediato e desconexão caso ocorram violações críticas de política.

---

## 5. Academia Bilíngue de Libras e Acessibilidade em 5 Trilhas (/handspeak/learn)

Para ampliar a adoção antes mesmo de os usuários fazerem login, o HandSpeak inclui uma **Academia bilíngue (`PT-BR`/`EN`) 100% gratuita, sem login e sem backend** em [`aldeon.app/handspeak/learn`](https://aldeon.app/handspeak/learn):

1. **Trilha 1 — Acessibilidade, LBI e Auditoria de Etiqueta em 10 Pontos**: Auditoria prática de comunicação fundamentada nos padrões brasileiros de inclusão.
2. **Trilha 2 — Os 5 Parâmetros Fonológicos (`CM/PA/M/O/ENM`)**: Gramática visual tópico-comentário e anatomia estrutural dos sinais.
3. **Trilha 3 — Espaço Neutro de Sinalização e Laboratório de Colisões de 11 Pares**: Decomposições geométricas interativas para pares de alta colisão (`F/T`, `A/S`, `U/V`, `G/L`, `G/Q`, `K/P/H`, `I/J`, `1/D`, `2/V`, `5/B`, `0/O`).
4. **Trilha 4 — Cenários Reais de Mão Dupla**: Cinco fluxos práticos de diálogo combinados com estratégias de reparo visual.
5. **Trilha 5 — Leitura Labial (~30%) vs. Legendas + Simulador de Clareza na Sinalização**: Demonstra por que a leitura labial isolada falha na maioria das palavras e conecta aprendizes diretamente a sessões `?practice=` com predefinições de cadência sincronizadas.

---

## Resultados em Produção

- **60 FPS** de rastreamento contínuo com latência de processamento de quadro $<16\text{ms}$ em webcams padrão de notebook.
- **57+ Poses 3D** atingindo 100% de paridade em `A–Z`, `0–10` e expressões conversacionais essenciais.
- **Custo Zero de Mídia em Servidor e Prática Solo**: Fluxos de vídeo e dados trafegam diretamente entre os pares via WebRTC, enquanto a prática solo roda 100% localmente em WASM + WebGL.
- **Privacidade Soberana**: Os *landmarks* das mãos são computados localmente na memória WebAssembly do cliente; os quadros da câmera nunca saem do dispositivo na prática solo.

*O HandSpeak e sua Academia de Libras em 5 trilhas estão no ar em [aldeon.app/handspeak](https://aldeon.app/handspeak) e [aldeon.app/handspeak/learn](https://aldeon.app/handspeak/learn).*
