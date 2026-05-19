import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
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
      description:
        "The Fibonacci Numbers Fₙ have the initial values F₀ = 0, F₁ = 1",
      n: "If n ≥ 2",
      minTerms: 3,
      minError:
        "For Fibonacci numbers, the number of terms must be greater than 2.",
      image: fibonacciImg,
    },
    {
      id: "lucas",
      title: "Lucas Numbers",
      recursion: "Lₙ = Lₙ₋₁ + Lₙ₋₂",
      description:
        "The Lucas Numbers Lₙ have the initial values L₀ = 2, L₁ = 1",
      n: "If n ≥ 2",
      minTerms: 3,
      minError:
        "For Lucas numbers, the number of terms must be greater than 2.",
      image: lucasImg,
    },
    {
      id: "tribonacci",
      title: "Tribonacci Numbers",
      recursion: "Tₙ = Tₙ₋₁ + Tₙ₋₂ + Tₙ₋₃",
      description:
        "The Tribonacci Numbers Tₙ have the initial values T₀ = 0, T₁ = 0, T₂ = 1",
      n: "If n ≥ 3",
      minTerms: 4,
      minError:
        "For Tribonacci numbers, the number of terms must be greater than 3.",
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
    const trimmed = inputN.trim()
    const n = Number(trimmed)
    const active = sequences.find((s) => s.id === currentView)!

    if (trimmed === "" || isNaN(n)) {
      setError("Please enter a valid number.")
      return
    }
    if (!Number.isInteger(n)) {
      setError("Please enter a whole number.")
      return
    }
    if (n <= 0) {
      setError(active.minError)
      return
    }
    if (n < active.minTerms) {
      setError(active.minError)
      return
    }
    // if (n > 100) {
    //   setError("Please enter a number of terms ≤ 100.")
    //   return
    // }
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
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-5 p-6">
          <div className="w-full max-w-5xl">
            <Card>
              <CardHeader className="flex flex-col items-center text-center">
                <CardTitle className="text-xl font-extrabold">
                  Recursive Sequence
                </CardTitle>
                <p className="font-medium">
                  is a sequence which is defined as follows:
                </p>
                <div className="mx-5 my-2 flex items-center justify-center rounded-md bg-muted px-4 py-2">
                  <code className="font-medium text-foreground">
                    a₁, a₂, a₃, ..., aₙ, ...
                  </code>
                </div>
                <CardDescription className="flex flex-col items-center gap-2 text-center">
                  <p>
                    I. A number of terms of the sequence a₁, a₂, ..., aᵣ are
                    given. These are the initial values.
                  </p>
                  <p>
                    II. A rule called the recursion is given, which explains how
                    aₙ is computed from previous terms.
                  </p>

                  <br />
                  <p>
                    The terms of a recursive sequence can be numbers, graph, or
                    other objects.
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="flex w-full max-w-5xl items-stretch justify-center gap-5">
            {sequences.map((item) => (
              <Card className="flex w-1/3 flex-col" key={item.id}>
                <CardHeader className="flex flex-1 flex-col items-center text-center">
                  <CardTitle className="text-xl font-extrabold">
                    {item.title}
                  </CardTitle>
                  <div className="mx-5 my-2 flex items-center justify-center rounded-md bg-muted px-2 py-1.5">
                    <code className="font-medium text-foreground">
                      {item.recursion}
                    </code>
                  </div>
                  <CardDescription className="flex flex-col items-center gap-2 text-center">
                    <div>{item.description}</div>
                    <div>{item.n}</div>
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => setCurrentView(item.id)}
                  >
                    Solve now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentView !== "menu" && (
        <div className="flex min-h-screen items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <CardTitle>{activeSequence?.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 px-6">
              {/* Image */}
              <div className="overflow-hidden rounded-md border-2 border-dashed border-muted-foreground/40 bg-muted/30">
                <img
                  src={activeSequence?.image}
                  alt=""
                  className="w-full max-w-lg"
                />
              </div>

              {/* Description */}
              <p className="text-center text-sm">
                This program will find all the terms of the{" "}
                <strong>{activeSequence?.title}</strong>.
              </p>

              {/* Input row */}
              <div className="flex w-full max-w-sm items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={inputN}
                  onChange={(e) => {
                    setInputN(e.target.value)
                    // setResults(null)
                    setError("")
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleCompute()}
                  placeholder="Input the number of terms"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
                />
                <Button onClick={handleCompute}>Compute</Button>
              </div>

              {/* Error */}
              {error && (
                <p className="text-center text-sm text-red-500">{error}</p>
              )}

              {/* Results */}
              {results !== null && (
                <div className="w-full max-w-sm rounded-md border border-border bg-muted px-4 py-3 text-center text-sm">
                  <p>
                    The {activeSequence?.title} are:{" "}
                    <span className="font-mono font-semibold text-foreground">
                      {results.join(", ")}
                    </span>
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex w-full max-w-sm gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleBack}
                >
                  ← Back to Main Menu
                </Button>
                {results !== null && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleSolveAnother}
                  >
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
