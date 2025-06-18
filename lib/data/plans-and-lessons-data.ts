export interface PlanOrAula {
  id: string
  type: "Plano" | "Aula Gratuita" | "Ebook Gratuito" // Added Ebook Gratuito type
  title: string
  description: string
  imageUrl: string
  href: string
  detailedDescription: string
  price?: string
  features?: string[]
  duration?: string
  learningObjectives?: string[] // Can be used for Key Topics for ebooks
  ctaPopupText: string
}

export const plansAndLessonsData: PlanOrAula[] = [
  {
    id: "ebook-ai-guia",
    type: "Ebook Gratuito",
    title: "Desvendando a IA: Seu Guia Completo",
    description: "Aprenda Machine Learning, Redes Neurais, IA Ética e os segredos da Inteligência Artificial.",
    imageUrl: "/ebook-ai-cover.png", // New cover image
    href: "#", // No navigation, direct download
    detailedDescription:
      "Mergulhe no universo da Inteligência Artificial com este guia completo. Desde os fundamentos de Machine Learning e Redes Neurais até discussões sobre IA Ética e o futuro da tecnologia. Ideal para iniciantes e entusiastas que desejam compreender o impacto da IA no mundo.",
    learningObjectives: [
      // Key Topics
      "Fundamentos de Machine Learning",
      "Introdução a Redes Neurais",
      "Aplicações Práticas da IA",
      "Considerações sobre IA Ética",
      "O Futuro da Inteligência Artificial",
    ],
    ctaPopupText: "Baixar E-book Agora",
  },
  {
    id: "plano-basico",
    type: "Plano",
    title: "Básico",
    description: "Comece sua jornada com as ferramentas essenciais.",
    imageUrl: "/abstract-gradient-blue-minimalist.png",
    href: "/planos/basico",
    detailedDescription:
      "O Plano Básico é perfeito para quem está começando. Tenha acesso às funcionalidades essenciais para publicar seu conteúdo, interagir com seus primeiros seguidores e começar a monetizar. Ideal para validar suas ideias e construir sua base.",
    price: "R$ 29,90/mês",
    features: [
      "Publicações ilimitadas",
      "Página de criador personalizável",
      "Suporte básico por email",
      "Até 100 assinantes",
    ],
    ctaPopupText: "Assinar Plano Básico",
  },
  {
    id: "plano-pro",
    type: "Plano",
    title: "Pro",
    description: "Desbloqueie recursos avançados e maximize seus ganhos.",
    imageUrl: "/abstract-gradient-purple-professional.png",
    href: "/planos/pro",
    detailedDescription:
      "O Plano Pro oferece ferramentas avançadas para criadores que buscam crescimento acelerado. Inclui analytics detalhados, opções de monetização expandidas, suporte prioritário e **acesso às ferramentas de IA para auxiliar na criação de conteúdo e resolução de tarefas do Hub!**",
    price: "R$ 79,90/mês",
    features: [
      "Tudo do Básico, mais:",
      "Analytics avançados",
      "Produtos digitais e cursos",
      "**Ferramentas de IA para Criadores**",
      "Suporte prioritário",
      "Até 1000 assinantes",
    ],
    ctaPopupText: "Assinar Plano Pro",
  },
  {
    id: "plano-premium",
    type: "Plano",
    title: "Premium",
    description: "A experiência completa para criadores de elite.",
    imageUrl: "/abstract-gradient-gold-exclusive.png",
    href: "/planos/premium",
    detailedDescription:
      "O Plano Premium é a solução definitiva para criadores de elite. Acesso total a todas as funcionalidades, incluindo consultoria estratégica, ferramentas de automação, **IA Avançada com limites maiores** e as menores taxas. Para quem busca o máximo de performance e exclusividade.",
    price: "R$ 149,90/mês",
    features: [
      "Tudo do Pro, mais:",
      "Consultoria estratégica mensal",
      "Ferramentas de automação de marketing",
      "**IA Avançada e limites expandidos**",
      "Taxas de transação reduzidas",
      "Assinantes ilimitados",
    ],
    ctaPopupText: "Assinar Plano Premium",
  },
  {
    id: "aula-monetizando-conteudo",
    type: "Aula Gratuita",
    title: "Monetizando Conteúdo",
    description: "Estratégias para transformar suas ideias em receita.",
    imageUrl: "/financial-growth-monetization.png",
    href: "/aulas/monetizando-conteudo",
    detailedDescription:
      "Descubra diversas estratégias para monetizar seu conteúdo na CreatorHub. Abordaremos desde a criação de planos de assinatura atraentes até a venda de produtos digitais e a utilização eficaz das Oportunidades do Hub.",
    duration: "Aprox. 1 hora",
    learningObjectives: [
      "Compreender modelos de assinatura",
      "Criar produtos digitais vendáveis",
      "Maximizar ganhos com Oportunidades",
      "Definir preços estratégicos",
    ],
    ctaPopupText: "Acessar Aula Gratuita",
  },
  {
    id: "aula-psicologia-copy",
    type: "Aula Gratuita",
    title: "Psicologia de Copy e Roteirização",
    description: "Domine a arte de escrever textos que vendem e roteiros que engajam.",
    imageUrl: "/psychology-copywriting-course.png",
    href: "/aulas/psicologia-copy",
    detailedDescription:
      "Aprenda os gatilhos mentais e as estruturas narrativas que transformam espectadores em clientes. Este curso aprofunda na psicologia por trás de uma copy eficaz e na criação de roteiros para vídeos que capturam a atenção do início ao fim.",
    duration: "Aprox. 1h 30min",
    learningObjectives: [
      "Aplicar gatilhos mentais em textos.",
      "Estruturar roteiros de vídeo persuasivos.",
      "Entender a jornada do cliente na escrita.",
      "Criar CTAs (Call to Actions) irresistíveis.",
    ],
    ctaPopupText: "Acessar Aula Agora",
  },
]
