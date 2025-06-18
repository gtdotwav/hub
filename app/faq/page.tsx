import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { HelpCircle, Sparkles, Zap, Rocket, BarChart } from "lucide-react"

export const metadata: Metadata = {
  title: "Perguntas Frequentes | CreatorHub",
  description: "Tire suas dúvidas sobre o CreatorHub, monetização, tarefas, planos e muito mais.",
}

interface FaqItem {
  id: string
  question: string
  answer: React.ReactNode // Permite JSX para links e botões
  category: string
}

const faqData: FaqItem[] = [
  {
    id: "geral-o-que-e",
    question: "O que é o CreatorHub?",
    answer: (
      <>
        <p className="mb-2">
          O CreatorHub é uma plataforma completa projetada para criadores de conteúdo, freelancers e qualquer pessoa com
          ideias criativas! Nós te ajudamos a transformar suas habilidades e criatividade em renda através de tarefas
          rápidas, desafios, venda de produtos digitais e muito mais.
        </p>
        <p>
          Nosso objetivo é simplificar a monetização para que você possa focar no que faz de melhor: criar! Descubra
          como tudo funciona em nosso{" "}
          <Link href="/como-funciona" className="font-semibold text-primary hover:underline">
            guia interativo
          </Link>
          .
        </p>
      </>
    ),
    category: "Geral",
  },
  {
    id: "geral-gratis",
    question: "Posso usar o CreatorHub de graça?",
    answer: (
      <>
        <p className="mb-2">
          Sim! Você pode começar no CreatorHub com nosso plano gratuito. Ele permite que você explore a plataforma,
          participe de algumas tarefas e comece a entender como tudo funciona.
        </p>
        <p className="mb-3">
          No entanto, para desbloquear todo o potencial da plataforma, incluindo acesso ilimitado a tarefas, ferramentas
          de IA, taxas reduzidas e suporte prioritário, recomendamos nossos planos pagos.
        </p>
        <Button asChild variant="default" size="sm" className="bg-primary hover:bg-primary/90">
          <Link href="/planos">
            <Zap className="w-4 h-4 mr-2" />
            Ver Planos e Preços
          </Link>
        </Button>
      </>
    ),
    category: "Geral",
  },
  {
    id: "monetizacao-como-ganhar",
    question: "Como posso ganhar dinheiro no CreatorHub?",
    answer: (
      <>
        <p className="mb-2">Existem várias formas de monetizar sua criatividade no CreatorHub:</p>
        <ul className="list-disc list-inside space-y-1 mb-3 pl-2">
          <li>
            <strong>Tarefas Rápidas do Hub:</strong> Complete pequenas tarefas como gerar ideias, escrever legendas,
            criar tweets, resumir textos e ganhe Pontos ou Bônus.
          </li>
          <li>
            <strong>Desafios Criativos:</strong> Participe de projetos maiores com recompensas mais significativas.
          </li>
          <li>
            <strong>Venda de Produtos Digitais (Planos Pro/Premium):</strong> Crie e venda e-books, templates, presets,
            cursos rápidos, etc.
          </li>
          <li>
            <strong>Assinaturas de Conteúdo (Em breve):</strong> Ofereça conteúdo exclusivo para seus seguidores
            pagantes.
          </li>
        </ul>
        <p>
          Nossa{" "}
          <Link href="/calculadora" className="font-semibold text-primary hover:underline">
            Calculadora de Ganhos
          </Link>{" "}
          pode te dar uma ideia do seu potencial!
        </p>
      </>
    ),
    category: "Monetização",
  },
  {
    id: "monetizacao-saques",
    question: "Como funcionam os saques dos meus ganhos?",
    answer: (
      <p>
        É super simples! Assim que você acumular o valor mínimo para saque, pode solicitar a transferência via PIX
        diretamente para sua conta. Os saques são processados rapidamente, geralmente em poucos minutos. Não há taxas
        escondidas para sacar seu dinheiro.
      </p>
    ),
    category: "Monetização",
  },
  {
    id: "tarefas-ia-como-funciona",
    question: "Como a Inteligência Artificial (IA) me ajuda nas tarefas?",
    answer: (
      <>
        <p className="mb-2">
          Nossa IA integrada é uma ferramenta poderosa para te ajudar a ser mais produtivo e criativo! Ela pode auxiliar
          em diversas tarefas do Hub, como:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-3 pl-2">
          <li>Gerar ideias para posts e conteúdos.</li>
          <li>Criar rascunhos iniciais para textos, legendas e tweets.</li>
          <li>Ajudar a otimizar títulos e descrições para SEO.</li>
          <li>Sugerir melhorias em seus textos.</li>
        </ul>
        <p className="mb-3">
          Essa funcionalidade é um <strong>benefício exclusivo dos nossos assinantes do Plano Pro e Premium</strong>,
          permitindo que você complete mais tarefas em menos tempo e maximize seus ganhos!
        </p>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="border-purple-500 text-purple-500 hover:bg-purple-500/10 hover:text-purple-600 group"
        >
          <Link href="/planos/pro">
            <Sparkles className="w-4 h-4 mr-2 transition-transform group-hover:scale-125" />
            Turbine seus Ganhos com IA (Plano Pro)
          </Link>
        </Button>
      </>
    ),
    category: "Tarefas e IA",
  },
  {
    id: "tarefas-tipos",
    question: "Quais tipos de tarefas encontro no Hub?",
    answer: (
      <p>
        O Hub de Oportunidades (agora Tarefas Rápidas) oferece uma variedade de micro-tarefas e desafios criativos. Você
        encontrará atividades como brainstorming de ideias, criação de legendas para redes sociais, redação de tweets,
        sugestão de títulos para vídeos, resumos de artigos, criação de pequenos roteiros, e muito mais. As tarefas são
        atualizadas regularmente!
      </p>
    ),
    category: "Tarefas e IA",
  },
  {
    id: "planos-diferencas",
    question: "Qual a diferença entre os planos de assinatura?",
    answer: (
      <>
        <p className="mb-2">Oferecemos diferentes planos para atender às suas necessidades como criador:</p>
        <ul className="list-disc list-inside space-y-1 mb-3 pl-2">
          <li>
            <strong>Plano Gratuito:</strong> Ideal para começar e explorar a plataforma.
          </li>
          <li>
            <strong>Plano Básico:</strong> Ferramentas essenciais para publicar e começar a monetizar.
          </li>
          <li>
            <strong>Plano Pro:</strong> Desbloqueia recursos avançados, incluindo as <strong>ferramentas de IA</strong>,
            venda de produtos digitais, analytics detalhados e suporte prioritário. É o nosso plano mais popular para
            quem quer levar a monetização a sério!
          </li>
          <li>
            <strong>Plano Premium:</strong> A experiência completa com consultoria, automação, IA avançada e as menores
            taxas.
          </li>
        </ul>
        <p className="mb-3">
          Cada plano oferece um conjunto crescente de funcionalidades e benefícios para impulsionar seus resultados.
        </p>
        <Button
          asChild
          variant="default"
          size="sm"
          className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white"
        >
          <Link href="/planos">
            <BarChart className="w-4 h-4 mr-2" />
            Comparar Planos Detalhadamente
          </Link>
        </Button>
      </>
    ),
    category: "Planos e Pagamentos",
  },
  {
    id: "seguranca-confiavel",
    question: "O CreatorHub é seguro e confiável?",
    answer: (
      <p>
        Absolutamente! A segurança dos seus dados e dos seus ganhos é nossa prioridade máxima. Utilizamos criptografia
        de ponta, processamento de pagamentos seguro (nível bancário) e seguimos as melhores práticas de segurança
        digital, incluindo conformidade com a LGPD. Pode focar na sua criatividade com tranquilidade.
      </p>
    ),
    category: "Segurança e Suporte",
  },
  {
    id: "suporte-como-funciona",
    question: "Como funciona o suporte ao cliente?",
    answer: (
      <>
        <p className="mb-2">
          Nossa equipe de suporte está pronta para te ajudar! Oferecemos suporte por email para todos os usuários.
        </p>
        <p className="mb-3">
          Assinantes dos planos <strong>Pro e Premium</strong> contam com <strong>suporte prioritário</strong>,
          incluindo acesso a canais mais rápidos e, no caso do Premium, um gerente de sucesso dedicado para consultoria
          estratégica.
        </p>
        <Button asChild variant="outline" size="sm">
          <Link href="/contato">Falar com Suporte</Link>
        </Button>
      </>
    ),
    category: "Segurança e Suporte",
  },
]

const FaqPage = () => {
  const categories = Array.from(new Set(faqData.map((item) => item.category)))

  return (
    <div className="pt-20 md:pt-24 pb-16 md:pb-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <HelpCircle className="w-5 h-5" />
              Tudo o que Você Precisa Saber
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">Perguntas Frequentes</h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              Encontre respostas rápidas para suas dúvidas sobre o CreatorHub.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {categories.map((category) => (
              <div key={category} className="mb-10">
                <h2 className="text-2xl font-semibold font-heading mb-6 border-b pb-2 border-border">{category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqData
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <AccordionItem value={item.id} key={item.id}>
                        <AccordionTrigger className="text-left hover:no-underline text-base md:text-lg">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm md:text-base pt-2 pb-4">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Seção de Upsell Principal */}
          <div className="max-w-3xl mx-auto mt-16 p-8 bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5 rounded-xl border border-primary/20 shadow-xl text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-3">
              Pronto para Levar sua Criação ao Próximo Nível?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Com o Plano Pro, você desbloqueia ferramentas de IA, analytics avançados, a capacidade de vender produtos
              digitais e muito mais. Maximize seus ganhos e produtividade!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                <Link href="/planos/pro">
                  <Zap className="w-5 h-5 mr-2 transition-transform group-hover:animate-pulse" />
                  Conhecer o Plano Pro
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/como-funciona">
                  <Rocket className="w-5 h-5 mr-2" />
                  Ver Como Funciona (Grátis)
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FaqPage
