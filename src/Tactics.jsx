import { useState } from "react"
import { motion } from "framer-motion"

const ORANGE = "#F97316"
const BLUE = "#3B82F6"

const BATTING_STYLES = [
  { id: "defensive", label: "Defensive", desc: "Grind it out. Occupy the crease.", icon: "🛡️" },
  { id: "balanced", label: "Balanced", desc: "Read the situation. Adapt.", icon: "⚖️" },
  { id: "aggressive", label: "Aggressive", desc: "Go big from ball one.", icon: "💥" },
  { id: "anchor", label: "Anchor Role", desc: "One holds an end, others attack.", icon: "⚓" },
  { id: "counter", label: "Counter-Attack", desc: "Absorb pressure, then explode.", icon: "🔄" },
]

const BOWLING_STYLES = [
  { id: "pace", label: "Pace Heavy", desc: "Bounce & raw speed. Intimidate.", icon: "🔥" },
  { id: "balanced", label: "Balanced Attack", desc: "Mix it up. Keep them guessing.", icon: "🎯" },
  { id: "spin", label: "Spin Heavy", desc: "Turn & flight. Bamboozle.", icon: "🌀" },
  { id: "containment", label: "Containment", desc: "Dry up runs. Dot-ball pressure.", icon: "🧱" },
  { id: "strike", label: "Strike Force", desc: "Aggressive lines. Risk runs for wickets.", icon: "⚡" },
]

const FIELD_STYLES = [
  { id: "attacking", label: "Attacking Field", desc: "Catchers in close. Go for wickets.", icon: "⚔️" },
  { id: "standard", label: "Standard", desc: "Balanced field placement.", icon: "🏟️" },
  { id: "defensive", label: "Defensive Field", desc: "Protect the boundary. Save runs.", icon: "🔒" },
  { id: "ring", label: "Ring Field", desc: "Stop singles. Force big shots.", icon: "🔵" },
]

function TacticSelector({ label, options, value, onChange, accentColor }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "13px", letterSpacing: "0.15em",
        color: "rgba(255,255,255,0.4)", marginBottom: "10px",
      }}>
        {label}
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {options.map(opt => {
          const isSelected = value === opt.id
          return (
            <motion.button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              whileTap={{ scale: 0.97 }}
              style={{
                flex: "1 1 auto", minWidth: "90px", maxWidth: "180px",
                padding: "10px 12px", borderRadius: "12px",
                border: isSelected ? `1.5px solid ${accentColor}` : "1.5px solid rgba(255,255,255,0.08)",
                background: isSelected ? `${accentColor}18` : "rgba(255,255,255,0.03)",
                cursor: "pointer", textAlign: "left",
                transition: "all 0.18s ease",
              }}
            >
              <div style={{ fontSize: "18px", marginBottom: "4px" }}>{opt.icon}</div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "13px", letterSpacing: "0.05em",
                color: isSelected ? accentColor : "#fff",
                marginBottom: "2px",
              }}>
                {opt.label}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "9px", color: "rgba(255,255,255,0.35)",
                lineHeight: 1.4,
              }}>
                {opt.desc}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

function AggressionSlider({ value, onChange, accentColor }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: "10px",
      }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "13px", letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.4)",
        }}>
          AGGRESSION LEVEL
        </div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "20px", color: accentColor,
        }}>
          {value}/10
        </div>
      </div>
      <div style={{ position: "relative", height: "6px", borderRadius: "999px", background: "rgba(255,255,255,0.08)" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${value * 10}%`, borderRadius: "999px",
          background: accentColor, transition: "width 0.1s",
        }} />
      </div>
      <input
        type="range" min="1" max="10" value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: "100%", marginTop: "-6px", opacity: 0,
          cursor: "pointer", height: "20px", position: "relative", zIndex: 1,
        }}
      />
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "10px", color: "rgba(255,255,255,0.25)", marginTop: "4px",
      }}>
        <span>Play Safe</span>
        <span>All Out Attack</span>
      </div>
    </div>
  )
}

function CaptainNote({ value, onChange, accentColor, placeholder }) {
  return (
    <div>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "13px", letterSpacing: "0.15em",
        color: "rgba(255,255,255,0.4)", marginBottom: "10px",
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        CAPTAIN'S INSTRUCTION
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "10px", color: accentColor,
          background: `${accentColor}18`, padding: "2px 8px",
          borderRadius: "999px", letterSpacing: "0.03em",
        }}>
          AI reads this
        </span>
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={200}
        rows={3}
        style={{
          width: "100%", padding: "12px 14px",
          borderRadius: "12px",
          border: `1.5px solid rgba(255,255,255,0.08)`,
          background: "rgba(255,255,255,0.04)",
          color: "#fff", fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px", lineHeight: 1.6, resize: "none",
          outline: "none", boxSizing: "border-box",
          transition: "border-color 0.2s",
        }}
        onFocus={e => e.target.style.borderColor = accentColor}
        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
      />
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "10px", color: "rgba(255,255,255,0.2)",
        textAlign: "right", marginTop: "4px",
      }}>
        {value.length}/200
      </div>
    </div>
  )
}

function TacticPanel({ teamLabel, players, accentColor, tactics, onChange }) {
  const captainId = tactics.captain || players[0]?.id
  const captain = players.find(p => p.id === captainId) || players[0]

  return (
    <div style={{ flex: 1, minWidth: 0 }}>

      {/* Panel header */}
      <div style={{
        padding: "16px", borderRadius: "16px",
        background: `${accentColor}12`,
        border: `1px solid ${accentColor}30`,
        marginBottom: "16px",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "10px",
        }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "24px", color: accentColor,
            letterSpacing: "0.05em",
          }}>
            {teamLabel}
          </div>
          {captain && (
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px", color: accentColor,
              background: `${accentColor}18`, padding: "3px 10px",
              borderRadius: "999px", border: `1px solid ${accentColor}44`,
            }}>
              © {captain.name}
            </div>
          )}
        </div>

        {/* Label */}
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "11px", letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.3)", marginBottom: "8px",
        }}>
          TAP TO ASSIGN CAPTAIN
        </div>

        {/* Mini squad preview — clickable */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {players.slice(0, 11).map((p) => {
            const isCaptain = p.id === captainId
            return (
              <motion.button
                key={p.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => onChange({ ...tactics, captain: p.id })}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px", padding: "3px 9px",
                  borderRadius: "999px", cursor: "pointer",
                  background: isCaptain ? `${accentColor}25` : "rgba(255,255,255,0.06)",
                  color: isCaptain ? accentColor : "rgba(255,255,255,0.5)",
                  border: isCaptain ? `1.5px solid ${accentColor}` : "1px solid transparent",
                  fontWeight: isCaptain ? 600 : 400,
                  transition: "all 0.2s",
                }}
              >
                {isCaptain ? `© ${p.name}` : p.name}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Tactics */}
      <div style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px", padding: "16px",
      }}>
        <AggressionSlider
          value={tactics.aggression}
          onChange={v => onChange({ ...tactics, aggression: v })}
          accentColor={accentColor}
        />

        <TacticSelector
          label="BATTING APPROACH"
          options={BATTING_STYLES}
          value={tactics.batting}
          onChange={v => onChange({ ...tactics, batting: v })}
          accentColor={accentColor}
        />

        <TacticSelector
          label="BOWLING STRATEGY"
          options={BOWLING_STYLES}
          value={tactics.bowling}
          onChange={v => onChange({ ...tactics, bowling: v })}
          accentColor={accentColor}
        />

        <TacticSelector
          label="FIELD PLACEMENT"
          options={FIELD_STYLES}
          value={tactics.field}
          onChange={v => onChange({ ...tactics, field: v })}
          accentColor={accentColor}
        />

        <CaptainNote
          value={tactics.captainNote}
          onChange={v => onChange({ ...tactics, captainNote: v })}
          accentColor={accentColor}
          placeholder={`e.g. "Open with spinners, keep ${captain?.name || 'best batsman'} for death overs..."`}
        />
      </div>
    </div>
  )
}

const defaultTactics = () => ({
  aggression: 5,
  batting: "balanced",
  bowling: "balanced",
  field: "standard",
  captain: null,
  captainNote: "",
})

export default function Tactics({ teamA, teamB, nameA = "TEAM A", nameB = "TEAM B", format, onNext, onBack }) {
  const [tacticsA, setTacticsA] = useState(defaultTactics())
  const [tacticsB, setTacticsB] = useState(defaultTactics())

  const handleNext = () => {
    onNext(tacticsA, tacticsB)
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#0A0A0A",
      fontFamily: "'Bebas Neue', sans-serif", padding: "2rem",
      backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
      backgroundSize: "60px 60px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginBottom: "2rem",
        }}>
          <button
            onClick={onBack}
            style={{
              background: "none", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)", borderRadius: "8px",
              padding: "6px 14px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
            }}
          >
            ← Back
          </button>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "32px", color: "#fff", letterSpacing: "0.05em" }}>
              SET YOUR TACTICS
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px", color: "rgba(255,255,255,0.35)",
            }}>
              🏏 {format ? format.toUpperCase() : "MATCH"} • Assign captains & set strategy
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNext}
            style={{
              padding: "8px 22px", borderRadius: "999px", border: "none",
              background: ORANGE,
              color: "#fff", fontSize: "16px", letterSpacing: "0.08em",
              fontFamily: "'Bebas Neue', sans-serif",
              cursor: "pointer",
              transition: "all 0.3s",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            🪙 TOSS →
          </motion.button>
        </div>

        {/* VS divider */}
        <div style={{
          display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem",
        }}>
          <div style={{ flex: 1, height: "1px", background: `${ORANGE}44` }} />
          <div style={{
            fontSize: "24px", color: "#fff", padding: "6px 20px",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "999px",
            background: "rgba(255,255,255,0.03)",
          }}>
            TACTICS
          </div>
          <div style={{ flex: 1, height: "1px", background: `${BLUE}44` }} />
        </div>

        {/* Two tactic panels */}
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <TacticPanel
            teamLabel={nameA}
            players={teamA}
            accentColor={ORANGE}
            tactics={tacticsA}
            onChange={setTacticsA}
          />
          <TacticPanel
            teamLabel={nameB}
            players={teamB}
            accentColor={BLUE}
            tactics={tacticsB}
            onChange={setTacticsB}
          />
        </div>

        <div style={{
          textAlign: "center", marginTop: "1.5rem",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "12px", color: "rgba(255,255,255,0.2)",
        }}>
          Captain's instructions are fed directly to the AI — be specific for better simulation
        </div>
      </div>
    </div>
  )
}