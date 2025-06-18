import type { GameScene } from "./types" // Assuming GameScene type is defined or will be

export interface Opportunity {
  id: string
  type: string
  title: string
  bonus: string
  imageUrl: string
  href: string
  detailedDescription: string
  ctaText?: string
  aiEnabled?: boolean
  scenes?: GameScene[]
  // For specific tasks, we might add more fields or rely on id for custom rendering
  taskType?: "image-carousel" | "vegan-ideas" | "tweet-ideas" | "game-scenes" | "generic-form"
  prompts?: { imageUrl: string; promptText: string }[] // For carousel-like tasks
}

export const carouselPostsData = [
  {
    id: "carousel-post-1",
    imageUrl: "/beautiful-landscape-sunset.png",
    promptText: "Sugira uma legenda poética e inspiradora para esta paisagem ao pôr do sol:",
  },
  {
    id: "carousel-post-2",
    imageUrl: "/delicious-food-flatlay.png",
    promptText: "Agora, crie uma legenda divertida e apetitosa para esta foto de comida:",
  },
  {
    id: "carousel-post-3",
    imageUrl: "/modern-product-showcase.png",
    promptText: "Para finalizar, escreva uma legenda persuasiva que destaque este produto:",
  },
]

export const veganCookingPostsData = [
  {
    id: "vegan-post-1",
    imageUrl: "/vegan-breakfast-bowl.png",
    promptText: "Crie uma ideia de post para este café da manhã vegano:",
  },
  {
    id: "vegan-post-2",
    imageUrl: "/quick-vegan-lunch.png",
    promptText: "Agora, uma ideia para um almoço vegano rápido e prático:",
  },
  {
    id: "vegan-post-3",
    imageUrl: "/placeholder-t0ka2.png", // Ensure this placeholder exists or update path
    promptText: "Para finalizar, uma ideia de post para um jantar vegano sofisticado:",
  },
]

export const opportunitiesData: Opportunity[] = [
  {
    id: "ideias-instagram",
    type: "Brainstorming Interativo",
    title: "Desafio de Ideias: Culinária Vegana",
    bonus: "+ 25 Pontos",
    imageUrl: veganCookingPostsData[0].imageUrl,
    href: "#",
    detailedDescription:
      "Teste sua criatividade com nosso desafio de ideias para posts veganos! Você verá 3 imagens de pratos veganos e precisará criar uma ideia de post única para cada um. Complete todos para ganhar seus pontos!",
    ctaText: "Iniciar Desafio de Ideias",
    aiEnabled: true,
    taskType: "vegan-ideas",
    prompts: veganCookingPostsData,
  },
  {
    id: "game-scenes-carousel",
    type: "Demonstração Interativa",
    title: "Tour Virtual: Cenas de Jogos Épicos",
    bonus: "+ 20 Pontos",
    imageUrl: "/game-carousel-showcase.png",
    href: "#",
    detailedDescription:
      "Explore cenas de 3 jogos incríveis em nosso carrossel interativo! Cada cena será exibida por 15 segundos antes de avançar automaticamente. Você também pode navegar manualmente. Complete o tour por todas as cenas para ganhar seus pontos!",
    ctaText: "Iniciar Tour Virtual",
    aiEnabled: false,
    taskType: "game-scenes",
    scenes: [
      {
        gameTitle: "Reino da Fantasia Perdida",
        sceneImageUrl: "/game-scene-fantasy.png",
        description: "Mergulhe em um mundo mágico vibrante, enfrente dragões e desvende segredos ancestrais.",
      },
      {
        gameTitle: "Odisseia Cósmica Z",
        sceneImageUrl: "/game-scene-sci-fi.png",
        description: "Pilote naves espaciais de última geração por nebulosas deslumbrantes e batalhas intergalácticas.",
      },
      {
        gameTitle: "Asfalto em Chamas: Nitro GP",
        sceneImageUrl: "/game-scene-racing.png",
        description: "Sinta a adrenalina pura em corridas urbanas ilegais, personalizando seu carro para a vitória.",
      },
    ],
  },
  {
    id: "escrever-tweets-ia",
    type: "Redação Curta",
    title: "Crítico por 1 Minuto: 3 Mini-Reviews Criativas!",
    bonus: "+ 15 Pontos",
    imageUrl: "/creative-mini-reviews.png",
    href: "#",
    detailedDescription:
      "Seja um crítico por um minuto! Escreva 3 mini-reviews super criativas (estilo tweet, até 280 caracteres) para: 1. Um filme que acabou de 'lançar' na sua imaginação. 2. Uma música que não sai da sua cabeça. 3. Um jogo que te viciou. Use humor, sarcasmo ou pura admiração! #MiniReviewChallenge",
    ctaText: "Ver Detalhes",
    aiEnabled: true,
    taskType: "tweet-ideas",
  },
  {
    id: "legenda-foto-paisagem",
    type: "Criatividade Interativa",
    title: "Desafio de Legendas: Carrossel",
    bonus: "+ 10 Pontos",
    imageUrl: carouselPostsData[0].imageUrl,
    href: "#",
    detailedDescription:
      "Teste sua criatividade com nosso desafio de legendas interativo! Você verá 3 posts diferentes e precisará criar uma legenda única para cada um. Complete todos para ganhar seus pontos!",
    ctaText: "Iniciar Desafio",
    aiEnabled: false,
    taskType: "image-carousel",
    prompts: carouselPostsData,
  },
  {
    id: "titulos-video-produtividade",
    type: "Brainstorming",
    title: "5 Títulos para Vídeo (Produtividade)",
    bonus: "+ 20 Pontos",
    imageUrl: "/productivity-video-titles.png",
    href: "#",
    detailedDescription:
      "Sugira 5 títulos chamativos e otimizados para SEO para um vídeo sobre como aumentar a produtividade no trabalho remoto.",
    ctaText: "Ver Detalhes",
    aiEnabled: true,
    taskType: "generic-form",
  },
  {
    id: "resumir-artigo",
    type: "Síntese",
    title: "Resumir Artigo em 3 Frases",
    bonus: "+ 30 Pontos",
    imageUrl: "/article-summary.png",
    href: "#",
    detailedDescription:
      "Leia o artigo fornecido (link no popup) de aproximadamente 500 palavras e resuma as ideias principais em exatamente 3 frases concisas.",
    ctaText: "Ver Detalhes",
    aiEnabled: true,
    taskType: "generic-form",
  },
  // ... (rest of the opportunities, add taskType and prompts if applicable)
  {
    id: "roteiro-video-financas",
    type: "Roteirização",
    title: "Roteiro Básico (Vídeo Finanças)",
    bonus: "+ 50 Pontos",
    imageUrl: "/financial-planning-video-script.png",
    href: "#",
    detailedDescription:
      "Crie um roteiro básico (tópicos principais e falas chave) para um vídeo curto de 1 minuto explicando a importância de uma reserva de emergência.",
    ctaText: "Ver Detalhes",
    aiEnabled: true,
    taskType: "generic-form",
  },
  {
    id: "community-request-animation",
    type: "Engajamento Comunitário",
    title: "Animação para Post: Pedido da Comunidade!",
    bonus: "+ 40 Pontos",
    imageUrl: "/community-request-animation.png",
    href: "#",
    detailedDescription:
      "Um membro da comunidade pediu uma animação curta (5-10s) para um post sobre 'Alegria Contagiante'. Crie um storyboard simples ou descreva a animação. O que você faria para transmitir essa emoção visualmente em poucos segundos? Pense em cores, movimento, personagens (se houver) e som (opcional).",
    ctaText: "Ver Detalhes",
    aiEnabled: true,
    taskType: "generic-form",
  },
  {
    id: "social-media-vegan-food",
    type: "Conteúdo para Redes Sociais",
    title: "Post Engajador: Receita Vegana Surpresa",
    bonus: "+ 35 Pontos",
    imageUrl: "/vegan-food-social-media.png",
    href: "#",
    detailedDescription:
      "Crie um post completo para Instagram (legenda + 3 hashtags) para uma receita vegana surpresa (você inventa a receita!). O post deve ser apetitoso, fácil de entender e incentivar o salvamento e compartilhamento. Qual seria sua receita e como você a apresentaria?",
    ctaText: "Ver Detalhes",
    aiEnabled: true,
    taskType: "generic-form",
  },
]
