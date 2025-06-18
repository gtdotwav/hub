"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { BotIcon, UserIcon, GiftIcon, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import ChatCarousel from "./chat-carousel" // Import the new component
import { useBonusPoints } from "@/contexts/bonus-points-context" // Import context for rewards
import { useRouter } from "next/navigation"
import Link from "next/link" // Added for the link in the bonus message

interface Message {
  id: number
  sender: "bot" | "user"
  text?: string // Text is now optional
  component?: React.ReactNode // A message can now contain a component
  avatar?: React.ReactNode
}

interface ChatOption {
  text: string
  nextStep: number | "END_CHAT_BONUS"
  payload?: any
}

// A message can be a string, a function returning a string, or a component
type BotMessageContent = string | ((payload?: any) => string) | { component: (props: any) => React.ReactNode }

interface ChatStep {
  botMessages: BotMessageContent[]
  userOptions?: ChatOption[]
  isBotTypingDuration?: number
}

const chatFlow: Record<number, ChatStep> = {
  0: {
    botMessages: [
      "Olá! 👋 Sou o assistente virtual do CreatorHub.",
      "Estou aqui para te mostrar como é fácil transformar suas ideias e pequenas tarefas em recompensas incríveis. Vamos nessa?",
    ],
    userOptions: [
      { text: "Com certeza! Me explique.", nextStep: 1 },
      { text: "O que é o CreatorHub exatamente?", nextStep: 100 },
    ],
    isBotTypingDuration: 1500,
  },
  1: {
    botMessages: [
      "Excelente! 😄 No CreatorHub, a dinâmica é simples:",
      "Você encontra Tarefas Rápidas (como gerar ideias, escrever legendas) e Desafios Criativos (projetos um pouco maiores).",
      "Ao completá-los, você ganha Pontos ou Bônus em dinheiro. Que tal?",
    ],
    userOptions: [
      { text: "Parece ótimo! Onde acho essas tarefas?", nextStep: 2 },
      { text: "E os ganhos, como funcionam?", nextStep: 200 },
      { text: "Vi uma matéria sobre o CreatorHub no G1!", nextStep: 300 }, // New option added
    ],
    isBotTypingDuration: 2000,
  },
  2: {
    botMessages: [
      "Você encontra todas as tarefas e desafios na seção 'Oportunidades do Hub' na sua página inicial.",
      "Elas são atualizadas regularmente, então sempre tem algo novo para você explorar!",
      "Vamos ver um exemplo prático de como uma tarefa poderia ser?",
    ],
    userOptions: [
      { text: "Sim, mostre um exemplo!", nextStep: 3 },
      { text: "Prefiro saber os tipos de tarefas primeiro.", nextStep: 4 },
    ],
    isBotTypingDuration: 1800,
  },
  3: {
    botMessages: [
      "Legal! Aqui está um exemplo de tarefa interativa. Complete para ganhar um bônus simbólico de 10 Pontos!",
      { component: ChatCarousel }, // We will render the carousel component here
    ],
    // No user options, the component will trigger the next step
    isBotTypingDuration: 1500,
  },
  4: {
    botMessages: [
      "Temos uma variedade! Desde brainstorming de ideias, criação de conteúdo curto (tweets, legendas), resumos, até pequenos roteiros.",
      "O legal é que muitas tarefas podem ser aceleradas com nossa IA exclusiva para membros Pro. Já ouviu falar?",
    ],
    userOptions: [
      { text: "IA para ajudar? Conte mais!", nextStep: 5 },
      { text: "Interessante! E sobre as recompensas gerais?", nextStep: 200 },
    ],
    isBotTypingDuration: 2200,
  },
  5: {
    botMessages: [
      "Isso mesmo! Com o Plano Pro, você tem acesso a ferramentas de IA que te ajudam a completar algumas tarefas do Hub mais rápido, como gerar rascunhos de texto ou ideias.",
      "É uma mão na roda para otimizar seu tempo e aumentar seus ganhos! 😉",
      "Quer saber como começar a participar?",
    ],
    userOptions: [
      { text: "Sim, como começo?", nextStep: 6 },
      { text: "O Plano Pro parece bom!", nextStep: 6 },
    ],
    isBotTypingDuration: 2500,
  },
  6: {
    botMessages: [
      "Para começar é fácil: crie sua conta gratuita, complete seu perfil e explore a seção 'Oportunidades do Hub'.",
      "Escolha uma tarefa que te agrade, siga as instruções e envie sua criação.",
      "Pronto! Recompensa na conta após aprovação.",
      "Você se sente pronto para explorar o CreatorHub?",
    ],
    userOptions: [{ text: "Sim, estou animado(a)!", nextStep: 7 }],
    isBotTypingDuration: 2000,
  },
  7: {
    botMessages: [
      "Que demais! 🎉 Lembre-se que o CreatorHub é uma comunidade. Interaja, aprenda e cresça conosco.",
      "Você percorreu todo o nosso guia interativo e agora sabe os segredos para ter sucesso aqui!",
    ],
    userOptions: [{ text: "Entendi tudo!", nextStep: "END_CHAT_BONUS" }],
    isBotTypingDuration: 1500,
  },
  // Ramificações
  100: {
    botMessages: [
      "O CreatorHub é uma plataforma vibrante onde sua criatividade vira recompensa! 🚀",
      "Conectamos você a oportunidades para gerar renda com suas ideias, textos, designs e muito mais, através de tarefas e desafios.",
      "Quer continuar e ver como funciona na prática?",
    ],
    userOptions: [
      { text: "Sim, vamos lá!", nextStep: 1 },
      { text: "Como são os ganhos?", nextStep: 200 },
    ],
    isBotTypingDuration: 1800,
  },
  200: {
    botMessages: [
      "Cada tarefa tem uma recompensa específica, em Pontos (que podem ser trocados por benefícios) ou em dinheiro (BRL).",
      "Os valores variam conforme a complexidade. E o melhor: o saque é rápido via PIX!",
      "Quer saber mais sobre os tipos de tarefas que geram esses ganhos?",
    ],
    userOptions: [
      { text: "Sim, quais os tipos de tarefa?", nextStep: 4 },
      { text: "Entendi sobre os ganhos!", nextStep: 4 },
    ],
    isBotTypingDuration: 2000,
  },
  300: {
    botMessages: [
      "Que legal que você viu! Sim, a notícia é verdadeira e estamos muito felizes com o reconhecimento. 😊",
      "O G1 publicou uma matéria incrível sobre como o CreatorHub está revolucionando a forma como as pessoas podem gerar renda com sua criatividade.",
      {
        component: () => (
          // Note: Removed 'props: any' as it's not used
          <p>
            Você pode ler a matéria completa clicando{" "}
            <a
              href="https://v0-advertorialguiainvestimento.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              aqui
            </a>
            .
          </p>
        ),
      },
      "Depois de ler, quer continuar descobrindo como funciona por aqui?",
    ],
    userOptions: [
      { text: "Sim, continuar explorando o CreatorHub!", nextStep: 2 },
      { text: "Já li, quero saber dos ganhos.", nextStep: 200 },
    ],
    isBotTypingDuration: 2000,
  },
}

let messageIdCounter = 0

interface BonusConfirmationMessageProps {
  pointsEarned: number
}

const BonusConfirmationMessage: React.FC<BonusConfirmationMessageProps> = ({ pointsEarned }) => {
  return (
    <div className="text-sm whitespace-pre-line">
      <p>Ótimo trabalho! Adicionamos {pointsEarned} Pontos de Bônus à sua conta. ✨</p>
      <p className="mt-2">Você pode ver seu novo saldo lá em cima no cabeçalho! 😉</p>
      <p className="mt-1 text-xs text-muted-foreground">
        (Se o saldo não atualizar imediatamente, verifique sua página de{" "}
        <Link href="/calculadora" className="underline hover:text-primary">
          Ganhos
        </Link>
        .)
      </p>
    </div>
  )
}

export default function InteractiveHowItWorksClient() {
  const router = useRouter() // Add this line
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [currentUserOptions, setCurrentUserOptions] = useState<ChatOption[]>([])
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [isChatEnded, setIsChatEnded] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { addBonusPoints } = useBonusPoints()

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    })
  }

  const addMessage = (sender: "bot" | "user", text?: string, component?: React.ReactNode) => {
    const avatar =
      sender === "bot" ? (
        <BotIcon className="w-7 h-7 text-primary" />
      ) : (
        <UserIcon className="w-7 h-7 text-accent-foreground" />
      )
    setMessages((prev) => [...prev, { id: messageIdCounter++, sender, text, component, avatar }])
  }

  const handleTaskCompletion = useCallback(() => {
    const pointsEarned = 10
    addBonusPoints(pointsEarned)

    // Wait a bit for the component's own "Completed!" message to show.
    setTimeout(() => {
      // Add a new bot message confirming the bonus.
      addMessage("bot", undefined, <BonusConfirmationMessage pointsEarned={pointsEarned} />)

      // Then, after another delay, proceed to the next step.
      setTimeout(() => {
        const nextStepKey = 4
        if (chatFlow[nextStepKey]) {
          setCurrentStep(nextStepKey)
          processBotMessages(chatFlow[nextStepKey])
        }
      }, 2500) // Longer delay to let the user read the message.
    }, 1500) // Delay after the component shows its own completion message.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addBonusPoints])

  const processBotMessages = useCallback(
    async (stepConfig: ChatStep, payload?: any) => {
      setIsBotTyping(true)
      setCurrentUserOptions([])

      if (stepConfig.isBotTypingDuration) {
        await new Promise((resolve) => setTimeout(resolve, stepConfig.isBotTypingDuration / 2))
      }

      for (const msgTemplate of stepConfig.botMessages) {
        if (typeof msgTemplate === "object" && "component" in msgTemplate) {
          const Component = msgTemplate.component
          addMessage("bot", undefined, <Component onTaskComplete={handleTaskCompletion} />)
        } else {
          const text = typeof msgTemplate === "function" ? msgTemplate(payload) : msgTemplate
          addMessage("bot", text)
        }

        await new Promise((resolve) =>
          setTimeout(resolve, (stepConfig.isBotTypingDuration || 1000) / (stepConfig.botMessages.length + 1)),
        )
      }

      setIsBotTyping(false)
      if (stepConfig.userOptions) {
        setCurrentUserOptions(stepConfig.userOptions)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleTaskCompletion], // Added handleTaskCompletion to dependencies
  )

  useEffect(() => {
    if (messages.length === 0) {
      processBotMessages(chatFlow[0])
    }
  }, [processBotMessages, messages.length])

  useEffect(scrollToBottom, [messages, isBotTyping])

  const handleUserResponse = (option: ChatOption) => {
    addMessage("user", option.text)
    setCurrentUserOptions([])

    if (option.nextStep === "END_CHAT_BONUS") {
      setIsChatEnded(true)
      addMessage("bot", "Parabéns por concluir nosso tour! Você está mais que preparado(a).")
      return
    }

    const nextStepKey = option.nextStep as number
    if (chatFlow[nextStepKey]) {
      setCurrentStep(nextStepKey)
      processBotMessages(chatFlow[nextStepKey], option.payload)
    } else {
      console.error("Chat flow step not found:", nextStepKey)
      addMessage("bot", "Ops, parece que me perdi um pouco. Que tal tentarmos de novo?")
      setCurrentStep(0)
      processBotMessages(chatFlow[0])
    }
  }

  const handleBonusClaim = () => {
    alert(
      "Bônus de Boas-Vindas (100 Pontos) será creditado após criar sua conta! Redirecionando para a criação de conta...",
    )
    router.push("/register") // Navigate to the registration page
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl overflow-hidden">
      <CardContent className="p-0">
        <div
          ref={chatContainerRef}
          className="h-[60vh] max-h-[700px] overflow-y-auto p-4 md:p-6 space-y-4 bg-background"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-2 max-w-[85%] md:max-w-[75%]",
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto",
              )}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center self-start mt-1",
                  msg.sender === "bot" ? "bg-primary/10" : "bg-muted",
                )}
              >
                {msg.avatar}
              </div>
              <div
                className={cn(
                  "p-3 rounded-xl shadow",
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-muted-foreground rounded-bl-none",
                )}
              >
                {msg.component ? msg.component : <p className="text-sm whitespace-pre-line">{msg.text}</p>}
              </div>
            </div>
          ))}
          {isBotTyping && (
            <div className="flex items-end gap-2 max-w-[85%] md:max-w-[75%] mr-auto">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary/10">
                <BotIcon className="w-7 h-7 text-primary" />
              </div>
              <div className="p-3 rounded-xl shadow bg-muted text-muted-foreground rounded-bl-none">
                <p className="text-sm italic animate-pulse">Digitando...</p>
              </div>
            </div>
          )}
          {isChatEnded && !isBotTyping && (
            <div className="flex justify-center py-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg transform hover:scale-105 transition-transform duration-150 group"
                onClick={handleBonusClaim}
              >
                <GiftIcon className="w-6 h-6 mr-2 transition-transform group-hover:rotate-12" />
                Receber Bônus de Boas-Vindas!
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      {!isChatEnded && !isBotTyping && currentUserOptions.length > 0 && (
        <CardFooter className="p-4 md:p-6 border-t bg-muted/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {currentUserOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 bg-background hover:bg-primary/5 group"
                onClick={() => handleUserResponse(option)}
              >
                <Send className="w-4 h-4 mr-3 text-primary/70 group-hover:text-primary transition-colors" />
                {option.text}
              </Button>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
