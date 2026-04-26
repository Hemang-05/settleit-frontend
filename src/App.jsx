import { useState } from "react"
import { motion } from "framer-motion"
import TeamBuilder from "./TeamBuilder"
import Tactics from "./Tactics"

const sports = [
  {
    id: "cricket",
    label: "Cricket",
    emoji: "🏏",
    accent: "#F97316",
    description: "Cross-era legends. Sachin vs Kohli. Your call.",
  },
  {
    id: "football",
    label: "Football",
    emoji: "⚽",
    accent: "#3B82F6",
    description: "Ronaldo vs Messi era. Finally settled.",
  },
]

function Landing({ onStart }) {
  const [selected, setSelected] = useState(null)
  const [hovering, setHovering] = useState(null)

  return (
    <div style={{
      minHeight: "100vh", background: "#0A0A0A",
      fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
      overflow: "hidden", position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "fixed", top: "-200px", left: "-200px",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "#F97316", filter: "blur(120px)", zIndex: 0,
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "fixed", bottom: "-200px", right: "-200px",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "#3B82F6", filter: "blur(120px)", zIndex: 0,
        }}
      />
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", minHeight: "100vh", padding: "2rem",
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "999px", padding: "6px 18px", marginBottom: "2rem",
            fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
            color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em",
          }}
        >
          ⚡ AI-Powered Sports Simulation
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: "clamp(64px, 12vw, 140px)", lineHeight: 0.9,
            color: "#FFFFFF", margin: 0, textAlign: "center", letterSpacing: "0.02em",
          }}
        >
          SETTLE
          <span style={{ display: "block", WebkitTextStroke: "2px #F97316", color: "transparent" }}>
            IT.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px, 2vw, 18px)",
            color: "rgba(255,255,255,0.5)", textAlign: "center",
            maxWidth: "480px", margin: "1.5rem 0 3.5rem", lineHeight: 1.6, fontWeight: 400,
          }}
        >
          Build your dream squad with legends from any era.
          Let AI simulate the match. End the debate — forever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}
        >
          {sports.map((sport) => {
            const isSelected = selected === sport.id
            const isHovering = hovering === sport.id
            return (
              <motion.button
                key={sport.id}
                onClick={() => setSelected(sport.id)}
                onMouseEnter={() => setHovering(sport.id)}
                onMouseLeave={() => setHovering(null)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "240px", padding: "2rem 1.5rem", borderRadius: "20px",
                  border: isSelected ? `2px solid ${sport.accent}` : "2px solid rgba(255,255,255,0.1)",
                  background: isSelected ? `${sport.accent}22` : isHovering ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                  cursor: "pointer", textAlign: "left", transition: "all 0.2s ease",
                  position: "relative",
                }}
              >
                {isSelected && (
                  <div style={{
                    position: "absolute", top: "12px", right: "12px",
                    width: "10px", height: "10px", borderRadius: "50%",
                    background: sport.accent,
                  }} />
                )}
                <div style={{ fontSize: "40px", marginBottom: "1rem" }}>{sport.emoji}</div>
                <div style={{ fontSize: "32px", color: isSelected ? sport.accent : "#FFFFFF", marginBottom: "4px", letterSpacing: "0.05em" }}>
                  {sport.label}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", fontWeight: 400, lineHeight: 1.5 }}>
                  {sport.description}
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: selected ? 1 : 0.3 }} transition={{ duration: 0.3 }}>
          <motion.button
            whileHover={selected ? { scale: 1.04 } : {}}
            whileTap={selected ? { scale: 0.97 } : {}}
            disabled={!selected}
            onClick={() => selected && onStart(selected)}
            style={{
              padding: "16px 48px", borderRadius: "999px", border: "none",
              background: selected ? (sports.find(s => s.id === selected)?.accent || "#F97316") : "rgba(255,255,255,0.1)",
              color: "#FFFFFF", fontSize: "22px",
              fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em",
              cursor: selected ? "pointer" : "not-allowed", transition: "background 0.3s ease",
            }}
          >
            BUILD YOUR SQUAD →
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
            color: "rgba(255,255,255,0.2)", marginTop: "2.5rem", letterSpacing: "0.05em",
          }}
        >
          Sachin vs Kohli. Messi vs Ronaldo. Any era. Any squad.
        </motion.p>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState("landing")
  const [sport, setSport] = useState(null)
  const [teams, setTeams] = useState({ teamA: [], teamB: [] })

  const handleStart = (selectedSport) => {
    setSport(selectedSport)
    setScreen("teambuilder")
  }

  const handleTeamsReady = (teamA, teamB) => {
    setTeams({ teamA, teamB })
    setScreen("tactics")
  }

  const handleSimulate = async (tacticsA, tacticsB) => {
    // Simulation screen coming next
    setScreen("simulation")
  }

  return (
    <>
      {screen === "landing" && <Landing onStart={handleStart} />}

      {screen === "teambuilder" && (
        <TeamBuilder
          sport={sport}
          onNext={handleTeamsReady}
          onBack={() => setScreen("landing")}
        />
      )}

      {screen === "tactics" && (
        <Tactics
          teamA={teams.teamA}
          teamB={teams.teamB}
          onSimulate={handleSimulate}
          onBack={() => setScreen("teambuilder")}
        />
      )}

      {screen === "simulation" && (
        <div style={{
          minHeight: "100vh", background: "#0A0A0A",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: "1rem",
          color: "#fff", fontFamily: "'Bebas Neue', sans-serif",
        }}>
          <div style={{ fontSize: "48px" }}>⚙️</div>
          <div style={{ fontSize: "36px" }}>AI SIMULATION — COMING NEXT</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
            This is where the magic happens
          </div>
        </div>
      )}
    </>
  )
}

// import { useState } from "react"
// import { motion } from "framer-motion"
// import TeamBuilder from "./TeamBuilder"

// const sports = [
//   {
//     id: "cricket",
//     label: "Cricket",
//     emoji: "🏏",
//     accent: "#F97316",
//     description: "Cross-era legends. Sachin vs Kohli. Your call.",
//   },
//   {
//     id: "football",
//     label: "Football",
//     emoji: "⚽",
//     accent: "#3B82F6",
//     description: "Ronaldo vs Messi era. Finally settled.",
//   },
// ]

// function Landing({ onStart }) {
//   const [selected, setSelected] = useState(null)
//   const [hovering, setHovering] = useState(null)

//   return (
//     <div style={{
//       minHeight: "100vh", background: "#0A0A0A",
//       fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
//       overflow: "hidden", position: "relative",
//     }}>
//       <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

//       <div style={{
//         position: "fixed", inset: 0, zIndex: 0,
//         backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
//                           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
//         backgroundSize: "60px 60px",
//       }} />
//       <motion.div
//         animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
//         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//         style={{
//           position: "fixed", top: "-200px", left: "-200px",
//           width: "600px", height: "600px", borderRadius: "50%",
//           background: "#F97316", filter: "blur(120px)", zIndex: 0,
//         }}
//       />
//       <motion.div
//         animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//         style={{
//           position: "fixed", bottom: "-200px", right: "-200px",
//           width: "600px", height: "600px", borderRadius: "50%",
//           background: "#3B82F6", filter: "blur(120px)", zIndex: 0,
//         }}
//       />

//       <div style={{
//         position: "relative", zIndex: 1,
//         display: "flex", flexDirection: "column", alignItems: "center",
//         justifyContent: "center", minHeight: "100vh", padding: "2rem",
//       }}>
//         <motion.div
//           initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           style={{
//             background: "rgba(255,255,255,0.08)",
//             border: "1px solid rgba(255,255,255,0.15)",
//             borderRadius: "999px", padding: "6px 18px", marginBottom: "2rem",
//             fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
//             color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em",
//           }}
//         >
//           ⚡ AI-Powered Sports Simulation
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           style={{
//             fontSize: "clamp(64px, 12vw, 140px)", lineHeight: 0.9,
//             color: "#FFFFFF", margin: 0, textAlign: "center", letterSpacing: "0.02em",
//           }}
//         >
//           SETTLE
//           <span style={{ display: "block", WebkitTextStroke: "2px #F97316", color: "transparent" }}>
//             IT.
//           </span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           style={{
//             fontFamily: "'DM Sans', sans-serif",
//             fontSize: "clamp(15px, 2vw, 18px)",
//             color: "rgba(255,255,255,0.5)", textAlign: "center",
//             maxWidth: "480px", margin: "1.5rem 0 3.5rem",
//             lineHeight: 1.6, fontWeight: 400,
//           }}
//         >
//           Build your dream squad with legends from any era.
//           Let AI simulate the match. End the debate — forever.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}
//         >
//           {sports.map((sport) => {
//             const isSelected = selected === sport.id
//             const isHovering = hovering === sport.id
//             return (
//               <motion.button
//                 key={sport.id}
//                 onClick={() => setSelected(sport.id)}
//                 onMouseEnter={() => setHovering(sport.id)}
//                 onMouseLeave={() => setHovering(null)}
//                 whileHover={{ scale: 1.04 }}
//                 whileTap={{ scale: 0.97 }}
//                 style={{
//                   width: "240px", padding: "2rem 1.5rem", borderRadius: "20px",
//                   border: isSelected ? `2px solid ${sport.accent}` : "2px solid rgba(255,255,255,0.1)",
//                   background: isSelected ? `${sport.accent}22` : isHovering ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
//                   cursor: "pointer", textAlign: "left", transition: "all 0.2s ease",
//                   position: "relative", overflow: "hidden",
//                 }}
//               >
//                 {isSelected && (
//                   <div style={{
//                     position: "absolute", top: "12px", right: "12px",
//                     width: "10px", height: "10px", borderRadius: "50%",
//                     background: sport.accent,
//                   }} />
//                 )}
//                 <div style={{ fontSize: "40px", marginBottom: "1rem" }}>{sport.emoji}</div>
//                 <div style={{ fontSize: "32px", color: isSelected ? sport.accent : "#FFFFFF", marginBottom: "4px", letterSpacing: "0.05em" }}>
//                   {sport.label}
//                 </div>
//                 <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", fontWeight: 400, lineHeight: 1.5 }}>
//                   {sport.description}
//                 </div>
//               </motion.button>
//             )
//           })}
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: selected ? 1 : 0.3 }}
//           transition={{ duration: 0.3 }}
//         >
//           <motion.button
//             whileHover={selected ? { scale: 1.04 } : {}}
//             whileTap={selected ? { scale: 0.97 } : {}}
//             disabled={!selected}
//             onClick={() => selected && onStart(selected)}
//             style={{
//               padding: "16px 48px", borderRadius: "999px", border: "none",
//               background: selected ? (sports.find(s => s.id === selected)?.accent || "#F97316") : "rgba(255,255,255,0.1)",
//               color: "#FFFFFF", fontSize: "22px",
//               fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em",
//               cursor: selected ? "pointer" : "not-allowed", transition: "background 0.3s ease",
//             }}
//           >
//             BUILD YOUR SQUAD →
//           </motion.button>
//         </motion.div>

//         <motion.p
//           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
//           style={{
//             fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
//             color: "rgba(255,255,255,0.2)", marginTop: "2.5rem", letterSpacing: "0.05em",
//           }}
//         >
//           Sachin vs Kohli. Messi vs Ronaldo. Any era. Any squad.
//         </motion.p>
//       </div>
//     </div>
//   )
// }

// export default function App() {
//   const [screen, setScreen] = useState("landing")
//   const [sport, setSport] = useState(null)
//   const [teams, setTeams] = useState(null)

//   const handleStart = (selectedSport) => {
//     setSport(selectedSport)
//     setScreen("teambuilder")
//   }

//   const handleTeamsReady = (teamA, teamB) => {
//     setTeams({ teamA, teamB })
//     setScreen("tactics")
//   }

//   return (
//     <>
//       {screen === "landing" && <Landing onStart={handleStart} />}
//       {screen === "teambuilder" && (
//         <TeamBuilder
//           sport={sport}
//           onNext={handleTeamsReady}
//           onBack={() => setScreen("landing")}
//         />
//       )}
//       {screen === "tactics" && (
//         <div style={{
//           minHeight: "100vh", background: "#0A0A0A",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "40px",
//         }}>
//           TACTICS SCREEN — COMING NEXT
//         </div>
//       )}
//     </>
//   )
// }