import { useState } from "react"
import { motion } from "framer-motion"
import TeamBuilder from "./TeamBuilder"
import Tactics from "./Tactics"
import Toss from "./Toss"
import LiveMatch from "./LiveMatch"
import SimulationResult from "./SimulationResult"

const sports = [
  { id: "cricket", label: "Cricket", emoji: "🏏", accent: "#F97316", description: "Cross-era legends. Sachin vs Kohli. Your call." },
  { id: "football", label: "Football", emoji: "⚽", accent: "#3B82F6", description: "Ronaldo vs Messi era. Finally settled.", comingSoon: true },
]

function Landing({ onStart }) {
  const [selected, setSelected] = useState(null)
  const [hovering, setHovering] = useState(null)

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", fontFamily: "'Bebas Neue', sans-serif", overflow: "hidden", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 6, repeat: Infinity }} style={{ position: "fixed", top: "-200px", left: "-200px", width: "600px", height: "600px", borderRadius: "50%", background: "#F97316", filter: "blur(120px)", zIndex: 0 }} />
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }} style={{ position: "fixed", bottom: "-200px", right: "-200px", width: "600px", height: "600px", borderRadius: "50%", background: "#3B82F6", filter: "blur(120px)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem" }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "999px", padding: "6px 18px", marginBottom: "2rem", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
          ⚡ AI-Powered Sports Simulation
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ fontSize: "clamp(64px, 12vw, 140px)", lineHeight: 0.9, color: "#fff", margin: 0, textAlign: "center" }}>
          SETTLE
          <span style={{ display: "block", WebkitTextStroke: "2px #F97316", color: "transparent" }}>IT.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: "480px", margin: "1.5rem 0 3.5rem", lineHeight: 1.6 }}>
          Build your dream squad with legends from any era. Let AI simulate the match. End the debate — forever.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
          {sports.map(sport => {
            const isSel = selected === sport.id
            const disabled = sport.comingSoon
            return (
              <motion.button key={sport.id} onClick={() => !disabled && setSelected(sport.id)} onMouseEnter={() => setHovering(sport.id)} onMouseLeave={() => setHovering(null)} whileHover={{ scale: disabled ? 1 : 1.04 }} whileTap={{ scale: disabled ? 1 : 0.97 }} style={{ width: "240px", padding: "2rem 1.5rem", borderRadius: "20px", border: isSel ? `2px solid ${sport.accent}` : "2px solid rgba(255,255,255,0.1)", background: isSel ? `${sport.accent}22` : hovering === sport.id ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)", cursor: disabled ? "default" : "pointer", textAlign: "left", transition: "all 0.2s", position: "relative", opacity: disabled ? 0.5 : 1 }}>
                {disabled && <div style={{ position: "absolute", top: "12px", right: "12px", fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: sport.accent, background: `${sport.accent}20`, padding: "2px 10px", borderRadius: "999px", border: `1px solid ${sport.accent}44`, letterSpacing: "0.03em" }}>Coming Soon</div>}
                {isSel && !disabled && <div style={{ position: "absolute", top: "12px", right: "12px", width: "10px", height: "10px", borderRadius: "50%", background: sport.accent }} />}
                <div style={{ fontSize: "40px", marginBottom: "1rem" }}>{sport.emoji}</div>
                <div style={{ fontSize: "32px", color: isSel ? sport.accent : "#fff", marginBottom: "4px" }}>{sport.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{sport.description}</div>
              </motion.button>
            )
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: selected ? 1 : 0.3 }}>
          <motion.button whileHover={selected ? { scale: 1.04 } : {}} whileTap={selected ? { scale: 0.97 } : {}} disabled={!selected} onClick={() => selected && onStart(selected)} style={{ padding: "16px 48px", borderRadius: "999px", border: "none", background: selected ? (sports.find(s => s.id === selected)?.accent || "#F97316") : "rgba(255,255,255,0.1)", color: "#fff", fontSize: "22px", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em", cursor: selected ? "pointer" : "not-allowed", transition: "background 0.3s" }}>
            BUILD YOUR SQUAD →
          </motion.button>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.2)", marginTop: "2.5rem" }}>
          Sachin vs Kohli. Messi vs Ronaldo. Any era. Any squad.
        </motion.p>
      </div>
    </div>
  )
}

function SimulatingScreen() {
  const lines = ["Analysing player stats across eras...", "Calculating matchup probabilities...", "Simulating over by over...", "Generating live commentary...", "Finalising the result..."]
  const [lineIndex, setLineIndex] = useState(0)

  useState(() => {
    const interval = setInterval(() => setLineIndex(i => (i + 1) % lines.length), 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} style={{ fontSize: "64px" }}>🏏</motion.div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", color: "#fff", letterSpacing: "0.05em" }}>AI IS SIMULATING...</div>
      <motion.div key={lineIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
        {lines[lineIndex]}
      </motion.div>
      <div style={{ display: "flex", gap: "6px" }}>
        {[0, 1, 2].map(i => (
          <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4 }} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F97316" }} />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState("landing")
  const [sport, setSport] = useState(null)
  const [format, setFormat] = useState("odi")
  const [teams, setTeams] = useState({ teamA: [], teamB: [], nameA: "TEAM A", nameB: "TEAM B" })
  const [tactics, setTactics] = useState({ tacticsA: null, tacticsB: null })
  const [tossResult, setTossResult] = useState(null)
  const [simResult, setSimResult] = useState(null)
  const [error, setError] = useState(null)

  const handleStart = (selectedSport) => { setSport(selectedSport); setScreen("teambuilder") }

  const handleTeamsReady = (teamA, teamB, selectedFormat, nameA = "TEAM A", nameB = "TEAM B") => {
    setTeams({ teamA, teamB, nameA, nameB })
    setFormat(selectedFormat)
    setScreen("tactics")
  }

  const handleTacticsReady = (tacticsA, tacticsB) => {
    setTactics({ tacticsA, tacticsB })
    setScreen("toss")
  }

  const handleTossComplete = (toss) => {
    setTossResult(toss)
    setScreen("live_match")
  }

  const handleMatchComplete = (result) => {
    setSimResult(result)
    setScreen("result")
  }

  const handlePlayAgain = () => { setSimResult(null); setTossResult(null); setTeams({ teamA: [], teamB: [], nameA: "TEAM A", nameB: "TEAM B" }); setTactics({ tacticsA: null, tacticsB: null }); setScreen("landing") }

  return (
    <>
      {screen === "landing" && <Landing onStart={handleStart} />}
      {screen === "teambuilder" && <TeamBuilder sport={sport} onNext={handleTeamsReady} onBack={() => setScreen("landing")} />}
      {screen === "tactics" && <Tactics teamA={teams.teamA} teamB={teams.teamB} nameA={teams.nameA} nameB={teams.nameB} format={format} onNext={handleTacticsReady} onBack={() => setScreen("teambuilder")} />}
      {screen === "toss" && <Toss nameA={teams.nameA} nameB={teams.nameB} onComplete={handleTossComplete} onBack={() => setScreen("tactics")} />}
      {screen === "live_match" && <LiveMatch teamA={teams.teamA} teamB={teams.teamB} nameA={teams.nameA} nameB={teams.nameB} tacticsA={tactics.tacticsA} tacticsB={tactics.tacticsB} tossResult={tossResult} format={format} sport={sport} onComplete={handleMatchComplete} onError={(msg) => { setError(msg); setScreen("error") }} />}
      {screen === "result" && <SimulationResult result={simResult} teamA={teams.teamA} teamB={teams.teamB} nameA={teams.nameA} nameB={teams.nameB} onPlayAgain={handlePlayAgain} />}
      {screen === "error" && (
        <div style={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", fontFamily: "'Bebas Neue', sans-serif" }}>
          <div style={{ fontSize: "48px" }}>❌</div>
          <div style={{ fontSize: "32px", color: "#EF4444" }}>SIMULATION FAILED</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", maxWidth: "400px", textAlign: "center" }}>{error}</div>
          <button onClick={() => setScreen("tactics")} style={{ marginTop: "1rem", padding: "10px 28px", borderRadius: "999px", border: "none", background: "#F97316", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", cursor: "pointer" }}>TRY AGAIN</button>
        </div>
      )}
    </>
  )
}

// import { useState } from "react"
// import { motion } from "framer-motion"
// import TeamBuilder from "./TeamBuilder"
// import Tactics from "./Tactics"
// import SimulationResult from "./SimulationResult"

// const sports = [
//   { id: "cricket", label: "Cricket", emoji: "🏏", accent: "#F97316", description: "Cross-era legends. Sachin vs Kohli. Your call." },
//   { id: "football", label: "Football", emoji: "⚽", accent: "#3B82F6", description: "Ronaldo vs Messi era. Finally settled." },
// ]

// function Landing({ onStart }) {
//   const [selected, setSelected] = useState(null)
//   const [hovering, setHovering] = useState(null)

//   return (
//     <div style={{ minHeight: "100vh", background: "#0A0A0A", fontFamily: "'Bebas Neue', sans-serif", overflow: "hidden", position: "relative" }}>
//       <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
//       <div style={{ position: "fixed", inset: 0, zIndex: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
//       <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 6, repeat: Infinity }} style={{ position: "fixed", top: "-200px", left: "-200px", width: "600px", height: "600px", borderRadius: "50%", background: "#F97316", filter: "blur(120px)", zIndex: 0 }} />
//       <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }} style={{ position: "fixed", bottom: "-200px", right: "-200px", width: "600px", height: "600px", borderRadius: "50%", background: "#3B82F6", filter: "blur(120px)", zIndex: 0 }} />

//       <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem" }}>
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "999px", padding: "6px 18px", marginBottom: "2rem", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
//           ⚡ AI-Powered Sports Simulation
//         </motion.div>

//         <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ fontSize: "clamp(64px, 12vw, 140px)", lineHeight: 0.9, color: "#fff", margin: 0, textAlign: "center" }}>
//           SETTLE
//           <span style={{ display: "block", WebkitTextStroke: "2px #F97316", color: "transparent" }}>IT.</span>
//         </motion.h1>

//         <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: "480px", margin: "1.5rem 0 3.5rem", lineHeight: 1.6 }}>
//           Build your dream squad with legends from any era. Let AI simulate the match. End the debate — forever.
//         </motion.p>

//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
//           {sports.map(sport => {
//             const isSel = selected === sport.id
//             return (
//               <motion.button key={sport.id} onClick={() => setSelected(sport.id)} onMouseEnter={() => setHovering(sport.id)} onMouseLeave={() => setHovering(null)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ width: "240px", padding: "2rem 1.5rem", borderRadius: "20px", border: isSel ? `2px solid ${sport.accent}` : "2px solid rgba(255,255,255,0.1)", background: isSel ? `${sport.accent}22` : hovering === sport.id ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)", cursor: "pointer", textAlign: "left", transition: "all 0.2s", position: "relative" }}>
//                 {isSel && <div style={{ position: "absolute", top: "12px", right: "12px", width: "10px", height: "10px", borderRadius: "50%", background: sport.accent }} />}
//                 <div style={{ fontSize: "40px", marginBottom: "1rem" }}>{sport.emoji}</div>
//                 <div style={{ fontSize: "32px", color: isSel ? sport.accent : "#fff", marginBottom: "4px" }}>{sport.label}</div>
//                 <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{sport.description}</div>
//               </motion.button>
//             )
//           })}
//         </motion.div>

//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: selected ? 1 : 0.3 }}>
//           <motion.button whileHover={selected ? { scale: 1.04 } : {}} whileTap={selected ? { scale: 0.97 } : {}} disabled={!selected} onClick={() => selected && onStart(selected)} style={{ padding: "16px 48px", borderRadius: "999px", border: "none", background: selected ? (sports.find(s => s.id === selected)?.accent || "#F97316") : "rgba(255,255,255,0.1)", color: "#fff", fontSize: "22px", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em", cursor: selected ? "pointer" : "not-allowed", transition: "background 0.3s" }}>
//             BUILD YOUR SQUAD →
//           </motion.button>
//         </motion.div>

//         <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.2)", marginTop: "2.5rem" }}>
//           Sachin vs Kohli. Messi vs Ronaldo. Any era. Any squad.
//         </motion.p>
//       </div>
//     </div>
//   )
// }

// // Loading screen while AI simulates
// function SimulatingScreen() {
//   const lines = [
//     "Analysing player stats across eras...",
//     "Calculating matchup probabilities...",
//     "Simulating over by over...",
//     "Generating live commentary...",
//     "Finalising the result...",
//   ]
//   const [lineIndex, setLineIndex] = useState(0)

//   useState(() => {
//     const interval = setInterval(() => {
//       setLineIndex(i => (i + 1) % lines.length)
//     }, 2000)
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div style={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
//       <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
//       <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} style={{ fontSize: "64px" }}>
//         🏏
//       </motion.div>
//       <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "36px", color: "#fff", letterSpacing: "0.05em" }}>
//         AI IS SIMULATING...
//       </div>
//       <motion.div
//         key={lineIndex}
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0 }}
//         style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}
//       >
//         {lines[lineIndex]}
//       </motion.div>
//       <div style={{ display: "flex", gap: "6px", marginTop: "1rem" }}>
//         {[0, 1, 2].map(i => (
//           <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4 }} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F97316" }} />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default function App() {
//   const [screen, setScreen] = useState("landing")
//   const [sport, setSport] = useState(null)
//   const [teams, setTeams] = useState({ teamA: [], teamB: [] })
//   const [simResult, setSimResult] = useState(null)
//   const [error, setError] = useState(null)

//   const handleStart = (selectedSport) => { setSport(selectedSport); setScreen("teambuilder") }
//   const handleTeamsReady = (teamA, teamB) => { setTeams({ teamA, teamB }); setScreen("tactics") }

//   const handleSimulate = async (tacticsA, tacticsB) => {
//     setScreen("simulating")
//     setError(null)
//     try {
//       const res = await fetch("http://localhost:8000/api/simulation/run", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           team_a: teams.teamA,
//           team_b: teams.teamB,
//           tactics_a: tacticsA,
//           tactics_b: tacticsB,
//           sport,
//         }),
//       })
//       const data = await res.json()
//       if (!res.ok) throw new Error(data.detail || "Simulation failed")
//       setSimResult(data.data)
//       setScreen("result")
//     } catch (err) {
//       setError(err.message)
//       setScreen("error")
//     }
//   }

//   const handlePlayAgain = () => {
//     setSimResult(null)
//     setTeams({ teamA: [], teamB: [] })
//     setScreen("landing")
//   }

//   return (
//     <>
//       {screen === "landing" && <Landing onStart={handleStart} />}
//       {screen === "teambuilder" && <TeamBuilder sport={sport} onNext={handleTeamsReady} onBack={() => setScreen("landing")} />}
//       {screen === "tactics" && <Tactics teamA={teams.teamA} teamB={teams.teamB} onSimulate={handleSimulate} onBack={() => setScreen("teambuilder")} />}
//       {screen === "simulating" && <SimulatingScreen />}
//       {screen === "result" && <SimulationResult result={simResult} teamA={teams.teamA} teamB={teams.teamB} onPlayAgain={handlePlayAgain} />}
//       {screen === "error" && (
//         <div style={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", fontFamily: "'Bebas Neue', sans-serif" }}>
//           <div style={{ fontSize: "48px" }}>❌</div>
//           <div style={{ fontSize: "32px", color: "#EF4444" }}>SIMULATION FAILED</div>
//           <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", maxWidth: "400px", textAlign: "center" }}>{error}</div>
//           <button onClick={() => setScreen("tactics")} style={{ marginTop: "1rem", padding: "10px 28px", borderRadius: "999px", border: "none", background: "#F97316", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", cursor: "pointer" }}>
//             TRY AGAIN
//           </button>
//         </div>
//       )}
//     </>
//   )
// }