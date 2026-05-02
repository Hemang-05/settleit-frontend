import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "./supabaseClient"

const ORANGE = "#F97316"
const BLUE = "#3B82F6"

const FORMATS = [
  { id: "test", label: "Test", icon: "🏛️", overs: "5 days", desc: "The ultimate format" },
  { id: "odi", label: "ODI", icon: "🏆", overs: "50 overs", desc: "Classic one day" },
  { id: "t20", label: "T20", icon: "⚡", overs: "20 overs", desc: "Explosive cricket" },
  { id: "t10", label: "T10", icon: "🔥", overs: "10 overs", desc: "Pure hitting" },
  { id: "superover", label: "Super Over", icon: "💥", overs: "1 over", desc: "Ultimate decider" },
]

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

function FormatSelector({ selected, onChange }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "13px", letterSpacing: "0.15em",
        color: "rgba(255,255,255,0.4)", marginBottom: "10px",
      }}>
        SELECT FORMAT
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {FORMATS.map(f => {
          const isSel = selected === f.id
          return (
            <motion.button
              key={f.id}
              onClick={() => onChange(f.id)}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: "8px 14px", borderRadius: "10px",
                border: isSel ? `1.5px solid ${ORANGE}` : "1.5px solid rgba(255,255,255,0.1)",
                background: isSel ? `${ORANGE}18` : "rgba(255,255,255,0.03)",
                cursor: "pointer", transition: "all 0.18s", textAlign: "center",
              }}
            >
              <div style={{ fontSize: "16px" }}>{f.icon}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "13px", letterSpacing: "0.05em", color: isSel ? ORANGE : "#fff" }}>
                {f.label}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.3)" }}>
                {f.overs}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

function PlayerSearchCard({ player, onAdd, isAdded }) {
  const roleStyle = getRoleStyle(player.role)
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      onClick={() => !isAdded && onAdd(player)}
      whileHover={!isAdded ? { background: "rgba(255,255,255,0.08)" } : {}}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 14px", borderRadius: "10px",
        background: isAdded ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
        border: isAdded ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(255,255,255,0.1)",
        marginBottom: "8px",
        opacity: isAdded ? 0.4 : 1,
        cursor: isAdded ? "not-allowed" : "pointer",
        transition: "all 0.15s",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "17px", color: "#fff", letterSpacing: "0.03em" }}>
            {player.name}
          </span>
          <span style={{
            fontSize: "10px", fontFamily: "'DM Sans', sans-serif",
            padding: "2px 8px", borderRadius: "999px",
            background: roleStyle.bg, color: roleStyle.color,
            border: `1px solid ${roleStyle.border}`, fontWeight: 500, whiteSpace: "nowrap",
          }}>
            {player.role}
          </span>
        </div>
        <div style={{ display: "flex", gap: "10px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>
          <span>🌍 {player.nationality}</span>
          <span>📅 {player.era_start}–{player.era_end === 2099 ? "Now" : player.era_end}</span>
          <span>⭐ {player.peak_rating}</span>
        </div>
      </div>
      <div style={{
        width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
        border: isAdded ? "1px solid rgba(255,255,255,0.1)" : `1px solid ${ORANGE}`,
        background: isAdded ? "transparent" : `${ORANGE}22`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: isAdded ? "rgba(255,255,255,0.3)" : ORANGE, fontSize: "18px",
      }}>
        {isAdded ? "✓" : "+"}
      </div>
    </motion.div>
  )
}

function TeamSlot({ player, index, onRemove, accentColor, onEmptyClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ delay: index * 0.02 }}
      onClick={() => !player && onEmptyClick && onEmptyClick()}
      whileHover={!player ? { background: "rgba(255,255,255,0.04)" } : {}}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "9px 12px", borderRadius: "10px",
        background: player ? `${accentColor}10` : "rgba(255,255,255,0.02)",
        border: player ? `1px solid ${accentColor}28` : "1px dashed rgba(255,255,255,0.08)",
        marginBottom: "6px",
        cursor: !player ? "pointer" : "default",
        transition: "background 0.2s"
      }}
    >
      {player ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.25)", minWidth: "16px" }}>
              {index + 1}
            </span>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "15px", color: "#fff", letterSpacing: "0.03em" }}>
                {player.name}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>
                {player.role}
              </div>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(player); }}
            style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.2)",
              cursor: "pointer", fontSize: "15px", padding: "2px 5px", borderRadius: "4px",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = "#EF4444"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.2)"}
          >
            ✕
          </button>
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.15)" }}>
            {index + 1}
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
            + Click to search player
          </span>
        </div>
      )}
    </motion.div>
  )
}

function PresetTeamsModal({ onSelect, onClose, sport }) {
  const [presets, setPresets] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("IPL")

  useEffect(() => {
    const fetchPresets = async () => {
      const { data } = await supabase
        .from("preset_teams")
        .select("*")
        .eq("sport", sport)
        .order("year", { ascending: false })
      setPresets(data || [])
      setLoading(false)
    }
    fetchPresets()
  }, [sport])

  const filteredPresets = presets.filter(p => 
    activeTab === "IPL" ? p.tournament === "IPL" : p.tournament !== "IPL"
  )

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "#141414", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px", padding: "1.5rem",
          width: "100%", maxWidth: "500px", maxHeight: "80vh", overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", color: "#fff", letterSpacing: "0.03em" }}>🏆 HISTORIC TEAMS</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "18px", cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "1.25rem", background: "rgba(255,255,255,0.03)", padding: "4px", borderRadius: "12px" }}>
          <button 
            onClick={() => setActiveTab("National")}
            style={{ 
              flex: 1, padding: "8px", borderRadius: "10px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", cursor: "pointer",
              background: activeTab === "National" ? "rgba(255,255,255,0.1)" : "transparent",
              border: activeTab === "National" ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
              color: activeTab === "National" ? "#fff" : "rgba(255,255,255,0.4)", transition: "all 0.2s", letterSpacing: "0.03em"
            }}
          >National Teams</button>
          <button 
            onClick={() => setActiveTab("IPL")}
            style={{ 
              flex: 1, padding: "8px", borderRadius: "10px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", cursor: "pointer",
              background: activeTab === "IPL" ? "rgba(255,255,255,0.1)" : "transparent",
              border: activeTab === "IPL" ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
              color: activeTab === "IPL" ? "#fff" : "rgba(255,255,255,0.4)", transition: "all 0.2s", letterSpacing: "0.03em"
            }}
          >IPL Teams</button>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)" }}>Loading...</div>
        ) : filteredPresets.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem", fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)" }}>No teams found</div>
        ) : (
          filteredPresets.map(preset => (
            <motion.div
              key={preset.id}
              whileHover={{ background: "rgba(255,255,255,0.06)" }}
              onClick={() => onSelect(preset)}
              style={{
                padding: "12px 14px", borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                marginBottom: "8px", cursor: "pointer",
                background: "rgba(255,255,255,0.02)", transition: "all 0.15s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", color: ORANGE, letterSpacing: "0.03em" }}>
                  {preset.name}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.06)", padding: "2px 8px", borderRadius: "999px" }}>
                  {preset.format} • {preset.year}
                </div>
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>
                {preset.player_names?.slice(0, 5).join(", ")}...
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  )
}

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, accentColor }) {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "#141414", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "20px", padding: "1.5rem",
          width: "100%", maxWidth: "400px", textAlign: "center",
        }}
      >
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px", color: accentColor, marginBottom: "8px", letterSpacing: "0.05em" }}>
          {title}
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "24px", lineHeight: "1.5" }}>
          {message}
        </div>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "10px", borderRadius: "10px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", cursor: "pointer", transition: "background 0.2s"
            }}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.05)"}
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            style={{
              flex: 1, padding: "10px", borderRadius: "10px",
              background: `${accentColor}22`, border: `1px solid ${accentColor}55`,
              color: accentColor, fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "background 0.2s"
            }}
            onMouseEnter={e => e.target.style.background = `${accentColor}33`}
            onMouseLeave={e => e.target.style.background = `${accentColor}22`}
          >
            Replace
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function TeamPanel({ team, players, onAdd, onRemove, onReplace, onNameChange, accentColor, label, sport, onAutoFill, autoFilling }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [showPresets, setShowPresets] = useState(false)
  const [confirmPreset, setConfirmPreset] = useState(null)
  const [pendingSquadData, setPendingSquadData] = useState(null)
  const [isEditingName, setIsEditingName] = useState(false)
  const [editName, setEditName] = useState(label)
  const debounceRef = useRef(null)
  const searchInputRef = useRef(null)
  const addedIds = new Set(players.map(p => p.id))

  // Sync editName with label if label changes externally
  useEffect(() => {
    setEditName(label)
  }, [label])

  const handleNameSave = () => {
    setIsEditingName(false)
    if (editName.trim()) {
      onNameChange(editName.trim())
    } else {
      setEditName(label)
    }
  }

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:8000/api/players/search?q=${encodeURIComponent(query)}&sport=${sport}`)
        const data = await res.json()
        setResults(data || [])
      } catch { setResults([]) }
      setLoading(false)
    }, 300)
  }, [query])

const handlePresetSelect = async (preset) => {
  setShowPresets(false)

  try {
    const res = await fetch(
      `http://localhost:8000/api/players/preset/${preset.team_key}`
    )
    const squadData = await res.json()

    if (!Array.isArray(squadData)) return

    if (players.length > 0) {
      setConfirmPreset(preset)
      setPendingSquadData(squadData)
    } else {
      // Add all at once via onAdd calls
      squadData.forEach(player => onAdd(player))
      onNameChange(preset.name)
    }

  } catch (e) {
    console.error("Preset load failed", e)
  }
}

  const confirmReplace = () => {
    if (pendingSquadData) {
      onReplace(team, pendingSquadData)
      if (confirmPreset) {
        onNameChange(confirmPreset.name)
      }
    }
  }
  // Sort results: unselected first, selected last
  const sortedResults = [
    ...results.filter(p => !addedIds.has(p.id)),
    ...results.filter(p => addedIds.has(p.id)),
  ]

  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "10px" }}>

      {/* Team header */}
      <div style={{
        padding: "12px 14px", borderRadius: "14px",
        background: `${accentColor}12`, border: `1px solid ${accentColor}28`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {isEditingName ? (
              <input
                autoFocus
                value={editName}
                onChange={e => setEditName(e.target.value)}
                onBlur={handleNameSave}
                onKeyDown={e => e.key === 'Enter' && handleNameSave()}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: accentColor, letterSpacing: "0.05em",
                  background: "transparent", border: `1px solid ${accentColor}55`, borderRadius: "4px", outline: "none",
                  width: "160px", padding: "0 4px", color: accentColor
                }}
              />
            ) : (
              <>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", color: accentColor, letterSpacing: "0.05em" }}>{label}</div>
                <button onClick={() => { setEditName(label); setIsEditingName(true); }} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: "12px", padding: "2px" }}>✏️</button>
              </>
            )}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>{players.length}/11 selected</div>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPresets(true)}
            style={{
              padding: "5px 10px", borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'DM Sans', sans-serif", fontSize: "11px", cursor: "pointer",
            }}
          >
            🏆 Historic
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onAutoFill(team)}
            disabled={autoFilling || players.length >= 11}
            style={{
              padding: "5px 10px", borderRadius: "8px",
              border: `1px solid ${accentColor}44`,
              background: `${accentColor}15`,
              color: (autoFilling || players.length >= 11) ? "rgba(255,255,255,0.3)" : accentColor,
              fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
              cursor: (autoFilling || players.length >= 11) ? "not-allowed" : "pointer",
            }}
          >
            {autoFilling ? "⚙️ Filling..." : "✨ AI Fill"}
          </motion.button>
        </div>
      </div>

      {/* Search */}
      <div style={{ position: "relative" }}>
        <input
          ref={searchInputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name, role, nationality..."
          style={{
            width: "100%", padding: "9px 12px 9px 34px",
            borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)", color: "#fff",
            fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
            outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = accentColor}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
        />
        <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>🔍</span>

        <AnimatePresence>
          {query.trim() && (results.length > 0 || loading) && (
            <motion.div
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              style={{
                position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
                background: "#141414", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px", padding: "8px",
                zIndex: 50, maxHeight: "340px", overflowY: "auto",
              }}
            >
              {loading ? (
                <div style={{ textAlign: "center", padding: "1rem", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Searching...</div>
              ) : sortedResults.length === 0 ? (
                <div style={{ textAlign: "center", padding: "1rem", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>No players found</div>
              ) : (
                sortedResults.map(p => (
                  <PlayerSearchCard
                    key={p.id} player={p}
                    onAdd={player => { onAdd(player); setQuery(""); setResults([]) }}
                    isAdded={addedIds.has(p.id)}
                  />
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Squad slots */}
      <div style={{
        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "14px", padding: "12px", maxHeight: "420px", overflowY: "auto",
      }}>
        <AnimatePresence>
          {Array.from({ length: 11 }).map((_, i) => (
            <TeamSlot 
              key={i} 
              index={i} 
              player={players[i] || null} 
              onRemove={onRemove} 
              accentColor={accentColor} 
              onEmptyClick={() => searchInputRef.current?.focus()}
            />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showPresets && (
          <PresetTeamsModal sport={sport} onSelect={handlePresetSelect} onClose={() => setShowPresets(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmPreset && (
          <ConfirmModal
            isOpen={!!confirmPreset}
            onClose={() => { setConfirmPreset(null); setPendingSquadData(null); }}
            onConfirm={confirmReplace}
            title={`Replace Team?`}
            message={`Are you sure you want to replace your current squad with ${confirmPreset.name}? This will clear your current selections.`}
            accentColor={accentColor}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TeamBuilder({ onNext, onBack, sport }) {
  const [teamA, setTeamA] = useState([])
  const [teamB, setTeamB] = useState([])
  const [teamAName, setTeamAName] = useState("TEAM A")
  const [teamBName, setTeamBName] = useState("TEAM B")
  const [format, setFormat] = useState(null)
  const [showFormatAlert, setShowFormatAlert] = useState(false)
  const [autoFillingA, setAutoFillingA] = useState(false)
  const [autoFillingB, setAutoFillingB] = useState(false)

  const addPlayer = (team, player) => {
    if (team === "A") {
      if (teamA.length >= 11 || teamA.find(p => p.id === player.id)) return
      setTeamA(prev => [...prev, player])
    } else {
      if (teamB.length >= 11 || teamB.find(p => p.id === player.id)) return
      setTeamB(prev => [...prev, player])
    }
  }

  const removePlayer = (team, player) => {
    if (team === "A") setTeamA(prev => prev.filter(p => p.id !== player.id))
    else setTeamB(prev => prev.filter(p => p.id !== player.id))
  }

  const replaceTeam = (team, newPlayers) => {
    if (team === "A") setTeamA(newPlayers.slice(0, 11))
    else setTeamB(newPlayers.slice(0, 11))
  }

  const handleAutoFill = async (team) => {
    const currentPlayers = team === "A" ? teamA : teamB
    const setter = team === "A" ? setAutoFillingA : setAutoFillingB
    const needed = 11 - currentPlayers.length
    if (needed <= 0) return
    setter(true)
    try {
      const excludeIds = currentPlayers.map(p => p.id).join(",")
      const res = await fetch(`http://localhost:8000/api/players/autofill?sport=${sport}&count=${needed}&exclude=${excludeIds}`)
      const data = await res.json()
      if (Array.isArray(data)) {
        if (team === "A") setTeamA(prev => [...prev, ...data].slice(0, 11))
        else setTeamB(prev => [...prev, ...data].slice(0, 11))
      }
    } catch (e) { console.error("Autofill failed", e) }
    setter(false)
  }

  const bothReady = teamA.length === 11 && teamB.length === 11

  return (
    <div style={{
      minHeight: "100vh", background: "#0A0A0A",
      fontFamily: "'Bebas Neue', sans-serif", padding: "1.5rem",
      backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
      backgroundSize: "60px 60px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <button onClick={onBack} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}>
            ← Back
          </button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", color: "#fff", letterSpacing: "0.05em" }}>BUILD YOUR SQUADS</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>🏏 Cricket — Pick 11 players per team</div>
          </div>
          <motion.button
            whileHover={bothReady ? { scale: 1.04 } : {}}
            whileTap={bothReady ? { scale: 0.97 } : {}}
            disabled={!bothReady}
            onClick={() => {
              if (!format) {
                setShowFormatAlert(true)
                return
              }
              onNext(teamA, teamB, format, teamAName, teamBName)
            }}
            style={{
              padding: "8px 20px", borderRadius: "999px", border: "none",
              background: bothReady ? ORANGE : "rgba(255,255,255,0.08)",
              color: bothReady ? "#fff" : "rgba(255,255,255,0.25)",
              fontSize: "15px", cursor: bothReady ? "pointer" : "not-allowed",
              fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em", transition: "all 0.3s",
            }}
          >
            {bothReady ? "SET TACTICS →" : `${teamA.length + teamB.length}/22`}
          </motion.button>
        </div>

        {/* Format selector */}
        <FormatSelector selected={format} onChange={setFormat} />

        {/* VS divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
          <div style={{ flex: 1, height: "1px", background: `${ORANGE}44` }} />
          <div style={{ fontSize: "22px", color: "#fff", padding: "5px 18px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "999px", background: "rgba(255,255,255,0.03)" }}>VS</div>
          <div style={{ flex: 1, height: "1px", background: `${BLUE}44` }} />
        </div>

        {/* Two panels */}
        <div style={{ display: "flex", gap: "1.25rem" }}>
          <TeamPanel team="A" players={teamA} onAdd={p => addPlayer("A", p)} onRemove={p => removePlayer("A", p)} onReplace={replaceTeam} onNameChange={name => setTeamAName(name)} accentColor={ORANGE} label={teamAName} sport={sport} onAutoFill={handleAutoFill} autoFilling={autoFillingA} />
          <TeamPanel team="B" players={teamB} onAdd={p => addPlayer("B", p)} onRemove={p => removePlayer("B", p)} onReplace={replaceTeam} onNameChange={name => setTeamBName(name)} accentColor={BLUE} label={teamBName} sport={sport} onAutoFill={handleAutoFill} autoFilling={autoFillingB} />
        </div>

        <div style={{ textAlign: "center", marginTop: "1.25rem", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>
          Mix legends from any era • Search by name, role or nationality
        </div>

        <AnimatePresence>
          {showFormatAlert && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "rgba(0,0,0,0.85)",
                display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem",
              }}
              onClick={() => setShowFormatAlert(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
                onClick={e => e.stopPropagation()}
                style={{
                  background: "#141414", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "20px", padding: "1.5rem",
                  width: "100%", maxWidth: "400px", textAlign: "center"
                }}
              >
                <div style={{ fontSize: "40px", marginBottom: "10px" }}>⚠️</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px", color: "#EF4444", marginBottom: "8px" }}>FORMAT NOT SELECTED</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>
                  Please select a match format (T20, ODI, Test, etc.) before proceeding to tactics.
                </div>
                <button 
                  onClick={() => setShowFormatAlert(false)}
                  style={{ padding: "10px 24px", borderRadius: "999px", border: "none", background: "rgba(255,255,255,0.1)", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", cursor: "pointer" }}
                >
                  GOT IT
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { supabase } from "./supabaseClient"

// const ACCENT = "#F97316"
// const BLUE = "#3B82F6"

// const ROLE_COLORS = {
//   "Top Order Bat": { bg: "#FFF7ED", color: "#C2410C", border: "#FED7AA" },
//   "Wicket Keeper Bat": { bg: "#F0FDF4", color: "#15803D", border: "#BBF7D0" },
//   "Fast Bowler": { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
//   "Leg Spin Bowler": { bg: "#FAF5FF", color: "#7E22CE", border: "#E9D5FF" },
//   "All Rounder": { bg: "#FEFCE8", color: "#A16207", border: "#FEF08A" },
//   "Off Spin Bowler": { bg: "#FFF1F2", color: "#BE123C", border: "#FECDD3" },
//   "Middle Order Bat": { bg: "#F0FDFA", color: "#0F766E", border: "#99F6E4" },
// }

// function getRoleStyle(role) {
//   return ROLE_COLORS[role] || { bg: "#F8FAFC", color: "#475569", border: "#E2E8F0" }
// }

// function PlayerCard({ player, onAdd, added }) {
//   const roleStyle = getRoleStyle(player.role)
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 6 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -6 }}
//       style={{
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         padding: "10px 14px", borderRadius: "12px",
//         background: added ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)",
//         border: added ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(255,255,255,0.1)",
//         marginBottom: "6px", opacity: added ? 0.45 : 1,
//         transition: "all 0.2s",
//       }}
//     >
//       <div style={{ flex: 1 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
//           <span style={{
//             fontFamily: "'Bebas Neue', sans-serif",
//             fontSize: "16px", color: "#fff", letterSpacing: "0.03em",
//           }}>
//             {player.name}
//           </span>
//           <span style={{
//             fontSize: "10px", fontFamily: "'DM Sans', sans-serif",
//             padding: "2px 8px", borderRadius: "999px",
//             background: roleStyle.bg, color: roleStyle.color,
//             border: `1px solid ${roleStyle.border}`, fontWeight: 500,
//           }}>
//             {player.role}
//           </span>
//         </div>
//         <div style={{
//           display: "flex", gap: "10px",
//           fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
//           color: "rgba(255,255,255,0.4)",
//         }}>
//           <span>🌍 {player.nationality}</span>
//           <span>📅 {player.era_start}–{player.era_end === 2099 ? "Present" : player.era_end}</span>
//           <span>⭐ {player.peak_rating}/100</span>
//         </div>
//       </div>
//       <button
//         onClick={() => !added && onAdd(player)}
//         style={{
//           width: "30px", height: "30px", borderRadius: "50%",
//           border: added ? "1px solid rgba(255,255,255,0.1)" : `1px solid ${ACCENT}`,
//           background: added ? "transparent" : `${ACCENT}22`,
//           color: added ? "rgba(255,255,255,0.3)" : ACCENT,
//           fontSize: "18px", cursor: added ? "not-allowed" : "pointer",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           flexShrink: 0, fontWeight: 300, lineHeight: 1,
//           transition: "all 0.2s",
//         }}
//       >
//         {added ? "✓" : "+"}
//       </button>
//     </motion.div>
//   )
// }

// function TeamSlot({ player, index, onRemove, accentColor }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -10 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -10 }}
//       transition={{ delay: index * 0.03 }}
//       style={{
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         padding: "8px 10px", borderRadius: "10px",
//         background: player ? `${accentColor}11` : "rgba(255,255,255,0.02)",
//         border: player ? `1px solid ${accentColor}33` : "1px dashed rgba(255,255,255,0.1)",
//         marginBottom: "5px",
//       }}
//     >
//       {player ? (
//         <>
//           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//             <span style={{
//               fontFamily: "'DM Sans', sans-serif",
//               fontSize: "11px", color: "rgba(255,255,255,0.3)",
//               minWidth: "16px",
//             }}>
//               {index + 1}
//             </span>
//             <div>
//               <div style={{
//                 fontFamily: "'Bebas Neue', sans-serif",
//                 fontSize: "14px", color: "#fff", letterSpacing: "0.03em",
//               }}>
//                 {player.name}
//               </div>
//               <div style={{
//                 fontFamily: "'DM Sans', sans-serif",
//                 fontSize: "10px", color: "rgba(255,255,255,0.35)",
//               }}>
//                 {player.role}
//               </div>
//             </div>
//           </div>
//           <button
//             onClick={() => onRemove(player)}
//             style={{
//               background: "none", border: "none",
//               color: "rgba(255,255,255,0.25)", cursor: "pointer",
//               fontSize: "14px", padding: "2px 4px",
//               borderRadius: "4px", transition: "color 0.2s",
//             }}
//             onMouseEnter={e => e.target.style.color = "#EF4444"}
//             onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.25)"}
//           >
//             ✕
//           </button>
//         </>
//       ) : (
//         <span style={{
//           fontFamily: "'DM Sans', sans-serif",
//           fontSize: "11px", color: "rgba(255,255,255,0.15)",
//         }}>
//           Player {index + 1}
//         </span>
//       )}
//     </motion.div>
//   )
// }

// function TeamPanel({ team, players, onAdd, onRemove, accentColor, label, searchResults, searching }) {
//   const [query, setQuery] = useState("")
//   const [results, setResults] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [showDropdown, setShowDropdown] = useState(false)
//   const debounceRef = useRef(null)
//   const searchRef = useRef(null)
//   const addedIds = new Set(players.map(p => p.id))

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowDropdown(false)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   useEffect(() => {
//     if (!query.trim()) { setResults([]); setShowDropdown(false); return }
//     setShowDropdown(true)
//     clearTimeout(debounceRef.current)
//     debounceRef.current = setTimeout(async () => {
//       setLoading(true)
//       const { data } = await supabase
//         .from("players")
//         .select("*")
//         .eq("sport", "cricket")
//         .ilike("name", `%${query}%`)
//         .limit(8)
//       setResults(data || [])
//       setLoading(false)
//     }, 300)
//   }, [query])

//   return (
//     <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "12px" }}>

//       {/* Team header */}
//       <div style={{
//         padding: "14px 16px", borderRadius: "14px",
//         background: `${accentColor}15`,
//         border: `1px solid ${accentColor}33`,
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//       }}>
//         <div>
//           <div style={{
//             fontFamily: "'Bebas Neue', sans-serif",
//             fontSize: "22px", color: accentColor, letterSpacing: "0.05em",
//           }}>
//             {label}
//           </div>
//           <div style={{
//             fontFamily: "'DM Sans', sans-serif",
//             fontSize: "11px", color: "rgba(255,255,255,0.4)",
//           }}>
//             {players.length}/11 players selected
//           </div>
//         </div>
//         <div style={{
//           fontFamily: "'Bebas Neue', sans-serif",
//           fontSize: "36px", color: `${accentColor}44`,
//         }}>
//           {players.length}/11
//         </div>
//       </div>

//       {/* Search */}
//       <div style={{ position: "relative" }} ref={searchRef}>
//         <input
//           value={query}
//           onChange={e => setQuery(e.target.value)}
//           onFocus={() => { if (query.trim()) setShowDropdown(true) }}
//           placeholder="Search players... (e.g. Sachin, Dhoni)"
//           style={{
//             width: "100%", padding: "10px 14px 10px 36px",
//             borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)",
//             background: "rgba(255,255,255,0.05)", color: "#fff",
//             fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
//             outline: "none", boxSizing: "border-box",
//           }}
//         />
//         <span style={{
//           position: "absolute", left: "12px", top: "50%",
//           transform: "translateY(-50%)", fontSize: "14px",
//           color: "rgba(255,255,255,0.3)",
//         }}>🔍</span>

//         {/* Results dropdown */}
//         <AnimatePresence>
//           {showDropdown && results.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: -4 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -4 }}
//               style={{
//                 position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
//                 background: "#141414", border: "1px solid rgba(255,255,255,0.12)",
//                 borderRadius: "12px", padding: "8px",
//                 zIndex: 10, maxHeight: "260px", overflowY: "auto",
//               }}
//             >
//               {results.map(p => (
//                 <PlayerCard
//                   key={p.id}
//                   player={p}
//                   onAdd={(player) => { onAdd(player); }}
//                   added={addedIds.has(p.id)}
//                 />
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Squad slots */}
//       <div style={{
//         background: "rgba(255,255,255,0.02)",
//         border: "1px solid rgba(255,255,255,0.07)",
//         borderRadius: "14px", padding: "12px",
//         maxHeight: "380px", overflowY: "auto",
//       }}>
//         <AnimatePresence>
//           {Array.from({ length: 11 }).map((_, i) => (
//             <TeamSlot
//               key={i}
//               index={i}
//               player={players[i] || null}
//               onRemove={onRemove}
//               accentColor={accentColor}
//             />
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   )
// }

// export default function TeamBuilder({ onNext, onBack }) {
//   const [teamA, setTeamA] = useState([])
//   const [teamB, setTeamB] = useState([])

//   const addPlayer = (team, player) => {
//     if (team === "A") {
//       if (teamA.length >= 11) return
//       if (teamA.find(p => p.id === player.id)) return
//       setTeamA([...teamA, player])
//     } else {
//       if (teamB.length >= 11) return
//       if (teamB.find(p => p.id === player.id)) return
//       setTeamB([...teamB, player])
//     }
//   }

//   const removePlayer = (team, player) => {
//     if (team === "A") setTeamA(teamA.filter(p => p.id !== player.id))
//     else setTeamB(teamB.filter(p => p.id !== player.id))
//   }

//   const bothReady = teamA.length === 11 && teamB.length === 11

//   return (
//     <div style={{
//       minHeight: "100vh", background: "#0A0A0A",
//       fontFamily: "'Bebas Neue', sans-serif",
//       padding: "2rem",
//       backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
//                         linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
//       backgroundSize: "60px 60px",
//     }}>
//       <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

//       <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

//         {/* Header */}
//         <div style={{
//           display: "flex", alignItems: "center",
//           justifyContent: "space-between", marginBottom: "2rem",
//         }}>
//           <button
//             onClick={onBack}
//             style={{
//               background: "none", border: "1px solid rgba(255,255,255,0.1)",
//               color: "rgba(255,255,255,0.5)", borderRadius: "8px",
//               padding: "6px 14px", cursor: "pointer",
//               fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
//             }}
//           >
//             ← Back
//           </button>

//           <div style={{ textAlign: "center" }}>
//             <div style={{ fontSize: "32px", color: "#fff", letterSpacing: "0.05em" }}>
//               BUILD YOUR SQUADS
//             </div>
//             <div style={{
//               fontFamily: "'DM Sans', sans-serif",
//               fontSize: "12px", color: "rgba(255,255,255,0.35)",
//             }}>
//               🏏 Cricket — Pick 11 players per team
//             </div>
//           </div>

//           <motion.button
//             whileHover={bothReady ? { scale: 1.04 } : {}}
//             whileTap={bothReady ? { scale: 0.97 } : {}}
//             disabled={!bothReady}
//             onClick={() => onNext && onNext(teamA, teamB)}
//             style={{
//               padding: "8px 20px", borderRadius: "999px",
//               border: "none",
//               background: bothReady ? ACCENT : "rgba(255,255,255,0.08)",
//               color: bothReady ? "#fff" : "rgba(255,255,255,0.25)",
//               fontSize: "16px", cursor: bothReady ? "pointer" : "not-allowed",
//               fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em",
//               transition: "all 0.3s",
//             }}
//           >
//             {bothReady ? "SETTLE IT →" : `${teamA.length + teamB.length}/22`}
//           </motion.button>
//         </div>

//         {/* VS Banner */}
//         <div style={{
//           display: "flex", alignItems: "center", gap: "1rem",
//           marginBottom: "1.5rem",
//         }}>
//           <div style={{ flex: 1, height: "1px", background: `${ACCENT}44` }} />
//           <div style={{
//             fontSize: "28px", color: "#fff",
//             padding: "6px 20px",
//             border: "1px solid rgba(255,255,255,0.1)",
//             borderRadius: "999px",
//             background: "rgba(255,255,255,0.03)",
//           }}>
//             VS
//           </div>
//           <div style={{ flex: 1, height: "1px", background: `${BLUE}44` }} />
//         </div>

//         {/* Two Team Panels */}
//         <div style={{ display: "flex", gap: "1.5rem" }}>
//           <TeamPanel
//             team="A"
//             players={teamA}
//             onAdd={(p) => addPlayer("A", p)}
//             onRemove={(p) => removePlayer("A", p)}
//             accentColor={ACCENT}
//             label="TEAM A"
//           />
//           <TeamPanel
//             team="B"
//             players={teamB}
//             onAdd={(p) => addPlayer("B", p)}
//             onRemove={(p) => removePlayer("B", p)}
//             accentColor={BLUE}
//             label="TEAM B"
//           />
//         </div>

//         {/* Tip */}
//         <div style={{
//           textAlign: "center", marginTop: "1.5rem",
//           fontFamily: "'DM Sans', sans-serif",
//           fontSize: "12px", color: "rgba(255,255,255,0.2)",
//         }}>
//           Mix legends from any era — Sachin, Brett Lee, Vaibhav Suryavanshi — all welcome
//         </div>
//       </div>
//     </div>
//   )
// }