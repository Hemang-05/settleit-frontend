import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const ORANGE = "#F97316"
const BLUE = "#3B82F6"

const PITCHES = [
  { id: "green_top", label: "Green Top", icon: "🌿", desc: "Lush grass cover. Seam movement all day. Fast bowlers' paradise.", tip: "Bowl first — early swing & seam." },
  { id: "dusty_turner", label: "Dusty Turner", icon: "🏜️", desc: "Dry, cracked surface. Spin from ball one. Gets worse to bat on.", tip: "Bat first — it'll only get harder." },
  { id: "flat_track", label: "Flat Track", icon: "🛣️", desc: "True bounce, no demons. Batters' dream. Nothing for bowlers.", tip: "Bat first — pile on the runs." },
  { id: "seaming_deck", label: "Seaming Deck", icon: "💨", desc: "Variable bounce. Nips around off the surface. Bowlers love it.", tip: "Bowl first — exploit early conditions." },
  { id: "balanced", label: "Balanced Pitch", icon: "⚖️", desc: "Something for everyone. Fair contest between bat and ball.", tip: "Both options viable. Trust your strength." },
]

const WEATHERS = [
  { id: "sunny", label: "Sunny", icon: "☀️", desc: "Clear skies, firm outfield. Ball comes on nicely. No swing.", color: "#FBBF24" },
  { id: "overcast", label: "Overcast", icon: "☁️", desc: "Cloud cover assists swing bowling. Ball does plenty in the air.", color: "#94A3B8" },
  { id: "partly_cloudy", label: "Partly Cloudy", icon: "⛅", desc: "Patches of sun. Conditions may change through the match.", color: "#60A5FA" },
  { id: "hot_dry", label: "Hot & Dry", icon: "🌡️", desc: "Scorching heat. Pitch will crack up. Reverse swing later.", color: "#EF4444" },
  { id: "humid", label: "Humid", icon: "💧", desc: "Heavy air. Ball swings prodigiously. Tough for batters early.", color: "#06B6D4" },
]

function CoinFlip({ onComplete, nameA, nameB }) {
  const [flipping, setFlipping] = useState(false)
  const [winner, setWinner] = useState(null)
  const [rotation, setRotation] = useState(0)

  const flipCoin = () => {
    setFlipping(true)
    const isTeamA = Math.random() > 0.5
    const finalRotation = 1800 + (isTeamA ? 0 : 180) // multiple full spins + landing
    setRotation(finalRotation)

    setTimeout(() => {
      setFlipping(false)
      setWinner(isTeamA ? "A" : "B")
      onComplete(isTeamA ? "A" : "B")
    }, 2200)
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(32px, 5vw, 48px)", color: "#fff",
        letterSpacing: "0.05em", marginBottom: "1.5rem",
      }}>
        THE TOSS
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "14px", color: "rgba(255,255,255,0.4)",
        marginBottom: "2.5rem",
      }}>
        {winner
          ? `${winner === "A" ? nameA : nameB} won the toss!`
          : "Flip the coin to decide who calls the shots"
        }
      </div>

      {/* Coin */}
      <div style={{ perspective: "600px", marginBottom: "2.5rem" }}>
        <motion.div
          animate={{ rotateX: rotation }}
          transition={{ duration: 2.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width: "120px", height: "120px", borderRadius: "50%",
            margin: "0 auto",
            background: `linear-gradient(135deg, #FFD700, #FFA500)`,
            boxShadow: "0 0 40px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transformStyle: "preserve-3d",
          }}
        >
          <span style={{
            fontSize: "40px",
            backfaceVisibility: "hidden",
          }}>
            🪙
          </span>
        </motion.div>
      </div>

      {!winner && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={flipCoin}
          disabled={flipping}
          style={{
            padding: "14px 40px", borderRadius: "999px",
            border: "none", background: flipping ? "rgba(255,255,255,0.1)" : ORANGE,
            color: "#fff", fontSize: "20px",
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.1em",
            cursor: flipping ? "not-allowed" : "pointer",
            transition: "all 0.3s",
          }}
        >
          {flipping ? "FLIPPING..." : "FLIP COIN"}
        </motion.button>
      )}
    </div>
  )
}

function PitchCard({ pitch }) {
  return (
    <div style={{
      padding: "16px", borderRadius: "14px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px",
      }}>
        <span style={{ fontSize: "28px" }}>{pitch.icon}</span>
        <div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "20px", color: "#fff", letterSpacing: "0.05em",
          }}>
            {pitch.label}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px", letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.3)",
          }}>
            PITCH REPORT
          </div>
        </div>
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "13px", color: "rgba(255,255,255,0.5)",
        lineHeight: 1.6, marginBottom: "12px",
      }}>
        {pitch.desc}
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "12px", color: ORANGE,
        background: `${ORANGE}15`, padding: "6px 12px",
        borderRadius: "8px", border: `1px solid ${ORANGE}30`,
      }}>
        💡 {pitch.tip}
      </div>
    </div>
  )
}

function WeatherCard({ weather }) {
  return (
    <div style={{
      padding: "16px", borderRadius: "14px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px",
      }}>
        <span style={{ fontSize: "28px" }}>{weather.icon}</span>
        <div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "20px", color: weather.color, letterSpacing: "0.05em",
          }}>
            {weather.label}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px", letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.3)",
          }}>
            WEATHER REPORT
          </div>
        </div>
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "13px", color: "rgba(255,255,255,0.5)",
        lineHeight: 1.6,
      }}>
        {weather.desc}
      </div>
    </div>
  )
}

function DecisionScreen({ tossWinner, nameA, nameB, pitch, weather, onDecide }) {
  const winnerName = tossWinner === "A" ? nameA : nameB
  const winnerColor = tossWinner === "A" ? ORANGE : BLUE

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ maxWidth: "700px", margin: "0 auto" }}
    >
      {/* Winner announcement */}
      <div style={{
        textAlign: "center", marginBottom: "2rem",
        padding: "1.5rem", borderRadius: "16px",
        background: `${winnerColor}12`,
        border: `1px solid ${winnerColor}30`,
      }}>
        <div style={{ fontSize: "36px", marginBottom: "6px" }}>🪙</div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "28px", color: winnerColor,
          letterSpacing: "0.05em",
        }}>
          {winnerName} WON THE TOSS!
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px", color: "rgba(255,255,255,0.4)",
          marginTop: "4px",
        }}>
          Review the conditions below, then make your call
        </div>
      </div>

      {/* Pitch & Weather side by side */}
      <div style={{
        display: "flex", gap: "1rem", marginBottom: "2rem",
      }}>
        <div style={{ flex: 1 }}>
          <PitchCard pitch={pitch} />
        </div>
        <div style={{ flex: 1 }}>
          <WeatherCard weather={weather} />
        </div>
      </div>

      {/* Decision label */}
      <div style={{
        textAlign: "center",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "16px", letterSpacing: "0.15em",
        color: "rgba(255,255,255,0.35)", marginBottom: "1rem",
      }}>
        WHAT DOES {winnerName.toUpperCase()} CHOOSE?
      </div>

      {/* Bat / Bowl buttons */}
      <div style={{
        display: "flex", gap: "1rem", justifyContent: "center",
      }}>
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: `0 0 30px ${ORANGE}40` }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onDecide("bat")}
          style={{
            flex: 1, maxWidth: "260px",
            padding: "20px", borderRadius: "16px",
            border: `2px solid ${ORANGE}55`,
            background: `${ORANGE}12`,
            cursor: "pointer", textAlign: "center",
            transition: "all 0.2s",
          }}
        >
          <div style={{ fontSize: "36px", marginBottom: "6px" }}>🏏</div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "22px", color: ORANGE,
            letterSpacing: "0.08em",
          }}>
            BAT FIRST
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px", color: "rgba(255,255,255,0.35)",
            marginTop: "4px",
          }}>
            Set a target. Put scoreboard pressure.
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04, boxShadow: `0 0 30px ${BLUE}40` }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onDecide("bowl")}
          style={{
            flex: 1, maxWidth: "260px",
            padding: "20px", borderRadius: "16px",
            border: `2px solid ${BLUE}55`,
            background: `${BLUE}12`,
            cursor: "pointer", textAlign: "center",
            transition: "all 0.2s",
          }}
        >
          <div style={{ fontSize: "36px", marginBottom: "6px" }}>⚾</div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "22px", color: BLUE,
            letterSpacing: "0.08em",
          }}>
            BOWL FIRST
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px", color: "rgba(255,255,255,0.35)",
            marginTop: "4px",
          }}>
            Exploit early conditions. Chase under lights.
          </div>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Toss({ nameA, nameB, onComplete, onBack }) {
  const [phase, setPhase] = useState("flip") // "flip" | "decide"
  const [tossWinner, setTossWinner] = useState(null)
  const [pitch] = useState(() => PITCHES[Math.floor(Math.random() * PITCHES.length)])
  const [weather] = useState(() => WEATHERS[Math.floor(Math.random() * WEATHERS.length)])

  const handleFlipComplete = (winner) => {
    setTossWinner(winner)
    // Short delay before showing decision screen
    setTimeout(() => setPhase("decide"), 1200)
  }

  const handleDecision = (decision) => {
    onComplete({
      tossWinner: tossWinner === "A" ? nameA : nameB,
      tossWinnerTeam: tossWinner,
      decision,
      pitch: pitch.id,
      pitchLabel: pitch.label,
      weather: weather.id,
      weatherLabel: weather.label,
    })
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#0A0A0A",
      fontFamily: "'Bebas Neue', sans-serif",
      padding: "2rem",
      backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
      backgroundSize: "60px 60px",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Background glows */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: "fixed", top: "-150px", left: "-150px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: ORANGE, filter: "blur(100px)", zIndex: 0, pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        style={{
          position: "fixed", bottom: "-150px", right: "-150px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: BLUE, filter: "blur(100px)", zIndex: 0, pointerEvents: "none",
        }}
      />

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: "absolute", top: "1.5rem", left: "1.5rem",
          background: "none", border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.5)", borderRadius: "8px",
          padding: "6px 14px", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
          zIndex: 2,
        }}
      >
        ← Back to Tactics
      </button>

      {/* VS badge */}
      <div style={{
        position: "absolute", top: "1.5rem", right: "1.5rem",
        display: "flex", alignItems: "center", gap: "8px",
        fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
        color: "rgba(255,255,255,0.4)", zIndex: 2,
      }}>
        <span style={{ color: ORANGE }}>{nameA}</span>
        <span style={{
          padding: "2px 10px", borderRadius: "999px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "14px", color: "#fff",
        }}>VS</span>
        <span style={{ color: BLUE }}>{nameB}</span>
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "700px" }}>
        <AnimatePresence mode="wait">
          {phase === "flip" && (
            <motion.div
              key="flip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CoinFlip
                onComplete={handleFlipComplete}
                nameA={nameA}
                nameB={nameB}
              />
            </motion.div>
          )}
          {phase === "decide" && (
            <motion.div
              key="decide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <DecisionScreen
                tossWinner={tossWinner}
                nameA={nameA}
                nameB={nameB}
                pitch={pitch}
                weather={weather}
                onDecide={handleDecision}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
