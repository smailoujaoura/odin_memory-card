import { FlagIcon } from "lucide-react"

export default function Nav(props) {
  return (
    <div className="py-4 px-8 border-b-2 border-b-[#9DC3C8] flex justify-center items-center flex-wrap sm:justify-between gap-3">
      <Logo />
      {/* <Mode /> */}
      <Scores
        {...props}  
      />
    </div>
  )
}

function Logo() {
  return (
    <h1 onClick={() => {window.location.reload()}} className="flex gap-1 items-center text-lg font-bold bold cursor-pointer"> <FlagIcon /> Flag Memory Game</h1>
  )
}

function Mode() {
  return (
    <div className="flex gap-4">
      <button className="bg-amber-700 rounded-2xl px-4 py-1">Normal</button>
      <button className="bg-amber-700 rounded-2xl px-4 py-1">Difficult</button>
    </div>
  )
}

function Scores({current = 0, best = 0}) {
  return (
    <div className="flex gap-2 self-center font-bold min-w-80">
      <p className="border-2 p-1 rounded border-[#9DC3C8] min-w-40 flex justify-center">Current Score: {current}</p>
      <p className="border-2 p-1 rounded border-[#9DC3C8] min-w-40 justify-center">Best Score: {best}</p>
    </div>
  )
}