import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import ParticlesBg from "./components/particleBg"

import fibonacciImg from "./assets/2.jpg"
import lucasImg from "./assets/3.jpg"
import tribonacciImg from "./assets/4.jpg"

export default function App() {
  const [currentView, setCurrentView] = useState<string>("menu")
  const [inputN, setInputN] = useState<string>("")
  const [results, setResults] = useState<number[] | null>(null)
  const [error, setError] = useState<string>("")

  const sequences = [
    {
      id: "fibonacci",
      title: "Fibonacci Numbers",
      recursion: "Fₙ = Fₙ₋₁ + Fₙ₋₂",
      description: "The Fibonacci Numbers Fₙ have the initial values F₀ = 0, F₁ = 1",
      n: "If n ≥ 2",
      minTerms: 3,
      minError: "For Fibonacci numbers, the number of terms must be greater than 2.",
      image: fibonacciImg,
    },
    {
      id: "lucas",
      title: "Lucas Numbers",
      recursion: "Lₙ = Lₙ₋₁ + Lₙ₋₂",
      description: "The Lucas Numbers Lₙ have the initial values L₀ = 2, L₁ = 1",
      n: "If n ≥ 2",
      minTerms: 3,
      minError: "For Lucas numbers, the number of terms must be greater than 2.",
      image: lucasImg,
    },
    {
      id: "tribonacci",
      title: "Tribonacci Numbers",
      recursion: "Tₙ = Tₙ₋₁ + Tₙ₋₂ + Tₙ₋₃",
      description: "The Tribonacci Numbers Tₙ have the initial values T₀ = 0, T₁ = 0, T₂ = 1",
      n: "If n ≥ 3",
      minTerms: 4,
      minError: "For Tribonacci numbers, the number of terms must be greater than 3.",
      image: tribonacciImg,
    },
  ]

  const compute = (id: string, n: number): number[] => {
    if (id === "fibonacci") {
      const seq = [0, 1]
      for (let i = 2; i < n; i++) seq.push(seq[i - 1] + seq[i - 2])
      return seq.slice(0, n)
    }
    if (id === "lucas") {
      const seq = [2, 1]
      for (let i = 2; i < n; i++) seq.push(seq[i - 1] + seq[i - 2])
      return seq.slice(0, n)
    }
    if (id === "tribonacci") {
      const seq = [0, 0, 1]
      for (let i = 3; i < n; i++) seq.push(seq[i - 1] + seq[i - 2] + seq[i - 3])
      return seq.slice(0, n)
    }
    return []
  }

  const handleCompute = () => {
    setError("")
    setResults(null)
    const n = parseInt(inputN)
    const active = sequences.find((s) => s.id === currentView)!

    if (isNaN(n) || inputN.trim() === "") {
      setError("Please enter a valid number.")
      return
    }
    if (n < active.minTerms) {
      setError(active.minError)
      return
    }
    if (n > 100) {
      setError("Please enter a number of terms ≤ 100.")
      return
    }
    setResults(compute(currentView, n))
  }

  const handleBack = () => {
    setCurrentView("menu")
    setInputN("")
    setResults(null)
    setError("")
  }

  const handleSolveAnother = () => {
    setInputN("")
    setResults(null)
    setError("")
  }

  const activeSequence = sequences.find((item) => item.id === currentView)

  return (
    <>
      <ParticlesBg />
      {currentView === "menu" && (
        <div className="w-full h-screen flex gap-5 flex-col items-center justify-center">
          <div className="w-2/3">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="font-extrabold text-xl">Recursive Sequence</CardTitle>
                <p className="font-medium">is a sequence which is defined as follows:</p>
                <CardContent className="my-2 mx-5 flex items-center justify-center rounded-md bg-taupe-100 px-2 py-1.5">
                  <code className="font-medium">a₁, a₂, a₃, ..., aₙ, ...</code>
                </CardContent>
                <CardDescription className="flex flex-col gap-2 items-center text-center">
                  <p>I. A number of terms of the sequence a₁, a₂, ..., aᵣ are given. These are the initial values.</p>
                  <p>II. A rule called the recursion is given, which explains how aₙ is computed from previous terms.</p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="flex w-2/3 items-center justify-center gap-5">
            {sequences.map((item) => (
              <Card className="w-1/3" key={item.id}>
                <CardHeader className="flex flex-col items-center">
                  <CardTitle className="font-extrabold text-xl">{item.title}</CardTitle>
                  <CardContent className="my-2 mx-5 flex items-center justify-center rounded-md bg-taupe-100 px-2 py-1.5">
                    <code className="font-medium">{item.recursion}</code>
                  </CardContent>
                  <CardDescription className="flex flex-col gap-2 items-center text-center">
                    <div>{item.description}</div>
                    <div>{item.n}</div>
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full" onClick={() => setCurrentView(item.id)}>Solve now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentView !== "menu" && (
        <div className="flex min-h-screen items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="capitalize">{activeSequence?.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col m-4">

              <div className="flex flex-col items-center gap-4">
                <div className="w-fit rounded-md border-2 border-dashed border-muted-foreground/40  justify-center bg-muted/30">
                    <img src={activeSequence?.image} alt="" className="w-125"/>
                </div>
                <div className="w-max flex flex-col gap-2">

                <p className="text-sm">
                  This program will find all the terms of the <strong>{activeSequence?.title}</strong>.
                </p>

                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    min={activeSequence?.minTerms}
                    max={100}
                    value={inputN}
                    onChange={(e) => {
                      setInputN(e.target.value)
                      setResults(null)
                      setError("")
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleCompute()}
                    placeholder="Input the number of terms"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <Button onClick={handleCompute}>Compute</Button>
                </div>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              {results !== null && (
                <div className="rounded-md border border-border bg-muted/40 px-4 py-3 text-sm">
                  <p>
                    The {activeSequence?.title} are:{" "}
                    <span className="font-mono font-semibold">{results.join(", ")}</span>
                  </p>
                </div>
              )}

              <div className="flex gap-2 mt-2">
                <Button variant="outline" className="text-black" onClick={handleBack}>
                  ← Back to Main Menu
                </Button>
                {results !== null && (
                  <Button variant="outline" onClick={handleSolveAnother}>
                    Compute Again
                  </Button>
                )}
              </div>

            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}