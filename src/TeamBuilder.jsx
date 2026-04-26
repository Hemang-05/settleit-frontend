import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "./supabaseClient"

const ACCENT = "#F97316"
const BLUE = "#3B82F6"

const ROLE_COLORS = {
  "Top Order Bat": { bg: "#FFF7ED", color: "#C2410C", border: "#FED7AA" },
  "Wicket Keeper Bat": { bg: "#F0FDF4", color: "#15803D", border: "#BBF7D0" },
  "Fast Bowler": { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
  "Leg Spin Bowler": { bg: "#FAF5FF", color: "#7E22CE", border: "#E9D5FF" },
  "All Rounder": { bg: "#FEFCE8", color: "#A16207", border: "#FEF08A" },
  "Off Spin Bowler": { bg: "#FFF1F2", color: "#BE123C", border: "#FECDD3" },
  "Middle Order Bat": { bg: "#F0FDFA", color: "#0F766E", border: "#99F6E4" },
}

function getRoleStyle(role) {
  return ROLE_COLORS[role] || { bg: "#F8FAFC", color: "#475569", border: "#E2E8F0" }
}

function PlayerCard({ player, onAdd, added }) {
  const roleStyle = getRoleStyle(player.role)
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 14px", borderRadius: "12px",
        background: added ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)",
        border: added ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(255,255,255,0.1)",
        marginBottom: "6px", opacity: added ? 0.45 : 1,
        transition: "all 0.2s",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "16px", color: "#fff", letterSpacing: "0.03em",
          }}>
            {player.name}
          </span>
          <span style={{
            fontSize: "10px", fontFamily: "'DM Sans', sans-serif",
            padding: "2px 8px", borderRadius: "999px",
            background: roleStyle.bg, color: roleStyle.color,
            border: `1px solid ${roleStyle.border}`, fontWeight: 500,
          }}>
            {player.role}
          </span>
        </div>
        <div style={{
          display: "flex", gap: "10px",
          fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
          color: "rgba(255,255,255,0.4)",
        }}>
          <span>🌍 {player.nationality}</span>
          <span>📅 {player.era_start}–{player.era_end === 2099 ? "Present" : player.era_end}</span>
          <span>⭐ {player.peak_rating}/100</span>
        </div>
      </div>
      <button
        onClick={() => !added && onAdd(player)}
        style={{
          width: "30px", height: "30px", borderRadius: "50%",
          border: added ? "1px solid rgba(255,255,255,0.1)" : `1px solid ${ACCENT}`,
          background: added ? "transparent" : `${ACCENT}22`,
          color: added ? "rgba(255,255,255,0.3)" : ACCENT,
          fontSize: "18px", cursor: added ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, fontWeight: 300, lineHeight: 1,
          transition: "all 0.2s",
        }}
      >
        {added ? "✓" : "+"}
      </button>
    </motion.div>
  )
}

function TeamSlot({ player, index, onRemove, accentColor }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ delay: index * 0.03 }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 10px", borderRadius: "10px",
        background: player ? `${accentColor}11` : "rgba(255,255,255,0.02)",
        border: player ? `1px solid ${accentColor}33` : "1px dashed rgba(255,255,255,0.1)",
        marginBottom: "5px",
      }}
    >
      {player ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px", color: "rgba(255,255,255,0.3)",
              minWidth: "16px",
            }}>
              {index + 1}
            </span>
            <div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "14px", color: "#fff", letterSpacing: "0.03em",
              }}>
                {player.name}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px", color: "rgba(255,255,255,0.35)",
              }}>
                {player.role}
              </div>
            </div>
          </div>
          <button
            onClick={() => onRemove(player)}
            style={{
              background: "none", border: "none",
              color: "rgba(255,255,255,0.25)", cursor: "pointer",
              fontSize: "14px", padding: "2px 4px",
              borderRadius: "4px", transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = "#EF4444"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.25)"}
          >
            ✕
          </button>
        </>
      ) : (
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px", color: "rgba(255,255,255,0.15)",
        }}>
          Player {index + 1}
        </span>
      )}
    </motion.div>
  )
}

function TeamPanel({ team, players, onAdd, onRemove, accentColor, label, searchResults, searching }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const debounceRef = useRef(null)
  const searchRef = useRef(null)
  const addedIds = new Set(players.map(p => p.id))

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (!query.trim()) { setResults([]); setShowDropdown(false); return }
    setShowDropdown(true)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      const { data } = await supabase
        .from("players")
        .select("*")
        .eq("sport", "cricket")
        .ilike("name", `%${query}%`)
        .limit(8)
      setResults(data || [])
      setLoading(false)
    }, 300)
  }, [query])

  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "12px" }}>

      {/* Team header */}
      <div style={{
        padding: "14px 16px", borderRadius: "14px",
        background: `${accentColor}15`,
        border: `1px solid ${accentColor}33`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "22px", color: accentColor, letterSpacing: "0.05em",
          }}>
            {label}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px", color: "rgba(255,255,255,0.4)",
          }}>
            {players.length}/11 players selected
          </div>
        </div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "36px", color: `${accentColor}44`,
        }}>
          {players.length}/11
        </div>
      </div>

      {/* Search */}
      <div style={{ position: "relative" }} ref={searchRef}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => { if (query.trim()) setShowDropdown(true) }}
          placeholder="Search players... (e.g. Sachin, Dhoni)"
          style={{
            width: "100%", padding: "10px 14px 10px 36px",
            borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)", color: "#fff",
            fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
            outline: "none", boxSizing: "border-box",
          }}
        />
        <span style={{
          position: "absolute", left: "12px", top: "50%",
          transform: "translateY(-50%)", fontSize: "14px",
          color: "rgba(255,255,255,0.3)",
        }}>🔍</span>

        {/* Results dropdown */}
        <AnimatePresence>
          {showDropdown && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              style={{
                position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
                background: "#141414", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "12px", padding: "8px",
                zIndex: 10, maxHeight: "260px", overflowY: "auto",
              }}
            >
              {results.map(p => (
                <PlayerCard
                  key={p.id}
                  player={p}
                  onAdd={(player) => { onAdd(player); }}
                  added={addedIds.has(p.id)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Squad slots */}
      <div style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "14px", padding: "12px",
        maxHeight: "380px", overflowY: "auto",
      }}>
        <AnimatePresence>
          {Array.from({ length: 11 }).map((_, i) => (
            <TeamSlot
              key={i}
              index={i}
              player={players[i] || null}
              onRemove={onRemove}
              accentColor={accentColor}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function TeamBuilder({ onNext, onBack }) {
  const [teamA, setTeamA] = useState([])
  const [teamB, setTeamB] = useState([])

  const addPlayer = (team, player) => {
    if (team === "A") {
      if (teamA.length >= 11) return
      if (teamA.find(p => p.id === player.id)) return
      setTeamA([...teamA, player])
    } else {
      if (teamB.length >= 11) return
      if (teamB.find(p => p.id === player.id)) return
      setTeamB([...teamB, player])
    }
  }

  const removePlayer = (team, player) => {
    if (team === "A") setTeamA(teamA.filter(p => p.id !== player.id))
    else setTeamB(teamB.filter(p => p.id !== player.id))
  }

  const bothReady = teamA.length === 11 && teamB.length === 11

  return (
    <div style={{
      minHeight: "100vh", background: "#0A0A0A",
      fontFamily: "'Bebas Neue', sans-serif",
      padding: "2rem",
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
              BUILD YOUR SQUADS
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px", color: "rgba(255,255,255,0.35)",
            }}>
              🏏 Cricket — Pick 11 players per team
            </div>
          </div>

          <motion.button
            whileHover={bothReady ? { scale: 1.04 } : {}}
            whileTap={bothReady ? { scale: 0.97 } : {}}
            disabled={!bothReady}
            onClick={() => onNext && onNext(teamA, teamB)}
            style={{
              padding: "8px 20px", borderRadius: "999px",
              border: "none",
              background: bothReady ? ACCENT : "rgba(255,255,255,0.08)",
              color: bothReady ? "#fff" : "rgba(255,255,255,0.25)",
              fontSize: "16px", cursor: bothReady ? "pointer" : "not-allowed",
              fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em",
              transition: "all 0.3s",
            }}
          >
            {bothReady ? "SETTLE IT →" : `${teamA.length + teamB.length}/22`}
          </motion.button>
        </div>

        {/* VS Banner */}
        <div style={{
          display: "flex", alignItems: "center", gap: "1rem",
          marginBottom: "1.5rem",
        }}>
          <div style={{ flex: 1, height: "1px", background: `${ACCENT}44` }} />
          <div style={{
            fontSize: "28px", color: "#fff",
            padding: "6px 20px",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.03)",
          }}>
            VS
          </div>
          <div style={{ flex: 1, height: "1px", background: `${BLUE}44` }} />
        </div>

        {/* Two Team Panels */}
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <TeamPanel
            team="A"
            players={teamA}
            onAdd={(p) => addPlayer("A", p)}
            onRemove={(p) => removePlayer("A", p)}
            accentColor={ACCENT}
            label="TEAM A"
          />
          <TeamPanel
            team="B"
            players={teamB}
            onAdd={(p) => addPlayer("B", p)}
            onRemove={(p) => removePlayer("B", p)}
            accentColor={BLUE}
            label="TEAM B"
          />
        </div>

        {/* Tip */}
        <div style={{
          textAlign: "center", marginTop: "1.5rem",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "12px", color: "rgba(255,255,255,0.2)",
        }}>
          Mix legends from any era — Sachin, Brett Lee, Vaibhav Suryavanshi — all welcome
        </div>
      </div>
    </div>
  )
}