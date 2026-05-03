import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const ORANGE = "#F97316"
const BLUE = "#3B82F6"
const GREEN = "#22C55E"

const FORMAT_PP = { odi: 10, t20: 6, t10: 3 }
const EVENT_DELAYS = { wicket: 3000, milestone: 2500, phase_end: 2000, dramatic: 2000, boundary: 1200, six: 1500, normal: 1000 }
const EVENT_COLORS = { wicket: "#EF4444", milestone: "#FBBF24", boundary: GREEN, six: "#A855F7", phase_end: ORANGE, dramatic: "#EC4899", normal: "rgba(255,255,255,0.6)" }

function ScoreBar({ innings1, innings2, currentInnings, nameA, nameB, firstBat }) {
  const battingFirst = firstBat === "A" ? nameA : nameB
  const battingSecond = firstBat === "A" ? nameB : nameA
  const s1 = innings1 || { runs: 0, wickets: 0, overs: 0 }
  const s2 = innings2 || { runs: 0, wickets: 0, overs: 0 }
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "1.5rem", padding: "14px 20px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ textAlign: "center", opacity: currentInnings === 1 ? 1 : 0.5 }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "14px", color: firstBat === "A" ? ORANGE : BLUE, letterSpacing: "0.05em" }}>{battingFirst}</div>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "28px", color: "#fff" }}>{s1.runs}/{s1.wickets}</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>({s1.overs} ov)</div>
      </div>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", color: "rgba(255,255,255,0.2)", alignSelf: "center" }}>VS</div>
      <div style={{ textAlign: "center", opacity: currentInnings === 2 ? 1 : 0.5 }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "14px", color: firstBat === "A" ? BLUE : ORANGE, letterSpacing: "0.05em" }}>{battingSecond}</div>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "28px", color: "#fff" }}>{s2.runs}/{s2.wickets}</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>({s2.overs} ov)</div>
      </div>
    </div>
  )
}

function CommentaryFeed({ events, revealIndex }) {
  const feedRef = useRef(null)
  useEffect(() => { feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" }) }, [revealIndex])
  return (
    <div ref={feedRef} style={{ maxHeight: "340px", overflowY: "auto", padding: "12px", borderRadius: "14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <AnimatePresence>
        {events.slice(0, revealIndex).map((ev, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ display: "flex", gap: "10px", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "11px", color: ORANGE, minWidth: "32px" }}>{ev.over}</span>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: EVENT_COLORS[ev.type] || "rgba(255,255,255,0.6)", lineHeight: 1.5, fontWeight: ev.type === "wicket" || ev.type === "milestone" ? 600 : 400 }}>{ev.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
      {revealIndex < events.length && (
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)", padding: "8px 0", textAlign: "center" }}>
          ● Live...
        </motion.div>
      )}
    </div>
  )
}

function QuickTacticPanel({ tactics, onChange, onContinue, accentColor, label, mode = "batting", showContinue = true }) {
  const battingOpts = ["defensive", "balanced", "aggressive", "anchor", "counter"]
  const bowlingOpts = ["pace", "balanced", "spin", "containment", "strike"]
  const fieldOpts = ["attacking", "standard", "defensive", "ring"]
  const opts = mode === "bowling" ? bowlingOpts : battingOpts
  const tacticKey = mode === "bowling" ? "bowling" : "batting"
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ flex: 1, padding: "16px", borderRadius: "14px", background: `${accentColor}10`, border: `1px solid ${accentColor}30`, marginTop: "1rem" }}>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", color: accentColor, marginBottom: "6px" }}>⚡ {label}</div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>Adjust your approach for the next phase</div>
      <div style={{ marginBottom: "10px" }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: "6px" }}>{mode === "bowling" ? "BOWLING" : "BATTING"}</div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {opts.map(o => (
            <button key={o} onClick={() => onChange({ ...tactics, [tacticKey]: o })} style={{ padding: "5px 10px", borderRadius: "8px", border: tactics[tacticKey] === o ? `1px solid ${accentColor}` : "1px solid rgba(255,255,255,0.1)", background: tactics[tacticKey] === o ? `${accentColor}20` : "transparent", color: tactics[tacticKey] === o ? accentColor : "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',sans-serif", fontSize: "11px", cursor: "pointer", textTransform: "capitalize" }}>{o}</button>
          ))}
        </div>
      </div>
      {mode === "bowling" && (
        <div style={{ marginBottom: "10px" }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: "6px" }}>FIELD</div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {fieldOpts.map(o => (
              <button key={o} onClick={() => onChange({ ...tactics, field: o })} style={{ padding: "5px 10px", borderRadius: "8px", border: tactics.field === o ? `1px solid ${accentColor}` : "1px solid rgba(255,255,255,0.1)", background: tactics.field === o ? `${accentColor}20` : "transparent", color: tactics.field === o ? accentColor : "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',sans-serif", fontSize: "11px", cursor: "pointer", textTransform: "capitalize" }}>{o}</button>
            ))}
          </div>
        </div>
      )}
      <div style={{ marginBottom: showContinue ? "12px" : "0" }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: "6px" }}>AGGRESSION: {tactics.aggression}/10</div>
        <input type="range" min="1" max="10" value={tactics.aggression} onChange={e => onChange({ ...tactics, aggression: Number(e.target.value) })} style={{ width: "100%", cursor: "pointer" }} />
      </div>
      {showContinue && (
        <motion.button whileTap={{ scale: 0.96 }} onClick={onContinue} style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "none", background: accentColor, color: "#fff", fontFamily: "'Bebas Neue',sans-serif", fontSize: "16px", cursor: "pointer", letterSpacing: "0.08em" }}>
          CONTINUE MATCH →
        </motion.button>
      )}
    </motion.div>
  )
}

function MiniScorecard({ scorecard, accentColor }) {
  if (!scorecard || scorecard.length === 0) return null
  const onCrease = scorecard.filter(p => p.out?.toLowerCase().includes("not out"))
  return (
    <div style={{ padding: "12px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginTop: "10px" }}>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: "8px" }}>BATSMEN AT CREASE</div>
      {onCrease.length > 0 ? onCrease.map((b, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < onCrease.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: accentColor, fontWeight: 500 }}>{b.name}</span>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", color: "#fff" }}>{b.runs}<span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>({b.balls})</span></span>
        </div>
      )) : <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>New pair coming in</div>}
    </div>
  )
}

function InningsBreak({ innings1Score, nameA, nameB, firstBat, tacticsA, tacticsB, onChangeTacticsA, onChangeTacticsB, onContinue }) {
  const chasingTeam = firstBat === "A" ? nameB : nameA
  const bowlingTeam = firstBat === "A" ? nameA : nameB
  const chasingColor = firstBat === "A" ? BLUE : ORANGE
  const bowlingColor = firstBat === "A" ? ORANGE : BLUE
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "2rem" }}>
      <div style={{ fontSize: "40px", marginBottom: "8px" }}>🏏</div>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "32px", color: "#fff", marginBottom: "4px" }}>INNINGS BREAK</div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>
        Target: <span style={{ color: ORANGE, fontWeight: 600 }}>{(innings1Score?.runs || 0) + 1}</span> runs
      </div>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", color: chasingColor, marginBottom: "1rem" }}>{chasingTeam} NEED {(innings1Score?.runs || 0) + 1} TO WIN</div>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", textAlign: "left" }}>
        <QuickTacticPanel tactics={firstBat === "A" ? tacticsB : tacticsA} onChange={firstBat === "A" ? onChangeTacticsB : onChangeTacticsA} accentColor={chasingColor} label={`${chasingTeam} — Batting`} mode="batting" showContinue={false} />
        <QuickTacticPanel tactics={firstBat === "A" ? tacticsA : tacticsB} onChange={firstBat === "A" ? onChangeTacticsA : onChangeTacticsB} accentColor={bowlingColor} label={`${bowlingTeam} — Bowling`} mode="bowling" showContinue={false} />
      </div>
      <motion.button whileTap={{ scale: 0.96 }} onClick={onContinue} style={{ padding: "12px 32px", borderRadius: "999px", border: "none", background: ORANGE, color: "#fff", fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", cursor: "pointer", letterSpacing: "0.08em" }}>
        START 2ND INNINGS →
      </motion.button>
    </motion.div>
  )
}

function SuperOverSetup({ teamA, teamB, nameA, nameB, onStart }) {
  const [battersA, setBattersA] = useState([])
  const [bowlerA, setBowlerA] = useState(null)
  const [battersB, setBattersB] = useState([])
  const [bowlerB, setBowlerB] = useState(null)
  const toggleBatter = (team, player, batters, setBatters) => {
    if (batters.find(b => b.id === player.id)) setBatters(batters.filter(b => b.id !== player.id))
    else if (batters.length < 3) setBatters([...batters, player])
  }
  const ready = battersA.length === 3 && bowlerA && battersB.length === 3 && bowlerB
  const renderTeam = (team, name, batters, setBatters, bowler, setBowler, color) => (
    <div style={{ flex: 1, padding: "14px", borderRadius: "14px", background: `${color}10`, border: `1px solid ${color}30` }}>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", color, marginBottom: "8px" }}>{name}</div>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: "6px" }}>PICK 3 BATTERS</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px" }}>
        {team.map(p => { const sel = batters.find(b => b.id === p.id); return (
          <button key={p.id} onClick={() => toggleBatter("", p, batters, setBatters)} style={{ padding: "3px 8px", borderRadius: "999px", fontSize: "10px", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", background: sel ? `${color}25` : "rgba(255,255,255,0.06)", color: sel ? color : "rgba(255,255,255,0.5)", border: sel ? `1px solid ${color}` : "1px solid transparent" }}>{p.name}</button>
        )})}
      </div>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: "6px" }}>PICK 1 BOWLER</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {team.filter(p => p.role?.toLowerCase().includes("bowl") || p.role?.toLowerCase().includes("all")).map(p => (
          <button key={p.id} onClick={() => setBowler(p)} style={{ padding: "3px 8px", borderRadius: "999px", fontSize: "10px", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", background: bowler?.id === p.id ? `${color}25` : "rgba(255,255,255,0.06)", color: bowler?.id === p.id ? color : "rgba(255,255,255,0.5)", border: bowler?.id === p.id ? `1px solid ${color}` : "1px solid transparent" }}>{p.name}</button>
        ))}
      </div>
    </div>
  )
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center" }}>
      <div style={{ fontSize: "36px", marginBottom: "6px" }}>🔥</div>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "32px", color: "#fff", marginBottom: "4px" }}>SUPER OVER!</div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>Match tied! Pick 3 batters and 1 bowler per team.</div>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        {renderTeam(teamA, nameA, battersA, setBattersA, bowlerA, setBowlerA, ORANGE)}
        {renderTeam(teamB, nameB, battersB, setBattersB, bowlerB, setBowlerB, BLUE)}
      </div>
      <motion.button whileTap={{ scale: 0.96 }} disabled={!ready} onClick={() => onStart({ so_batters_a: battersA, so_bowler_a: bowlerA, so_batters_b: battersB, so_bowler_b: bowlerB })} style={{ padding: "12px 32px", borderRadius: "999px", border: "none", background: ready ? ORANGE : "rgba(255,255,255,0.1)", color: ready ? "#fff" : "rgba(255,255,255,0.3)", fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", cursor: ready ? "pointer" : "not-allowed", letterSpacing: "0.08em" }}>
        ⚡ START SUPER OVER
      </motion.button>
    </motion.div>
  )
}

function MatchResult({ result, nameA, nameB, onFinish }) {
  const dn = (n) => n === "Team A" ? nameA : n === "Team B" ? nameB : n
  const winnerColor = result.winner === "Team A" ? ORANGE : BLUE
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "2rem" }}>
      <div style={{ fontSize: "48px", marginBottom: "8px" }}>🏆</div>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(28px,5vw,48px)", color: winnerColor }}>{dn(result.winner)} WINS!</div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.6)", margin: "6px 0 12px" }}>by {result.margin}</div>
      {result.player_of_match && <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: GREEN, marginBottom: "8px" }}>⭐ Player of the Match: {result.player_of_match}</div>}
      {result.summary && <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto 1.5rem", lineHeight: 1.6 }}>{result.summary}</div>}
      <motion.button whileTap={{ scale: 0.96 }} onClick={onFinish} style={{ padding: "12px 32px", borderRadius: "999px", border: "none", background: ORANGE, color: "#fff", fontFamily: "'Bebas Neue',sans-serif", fontSize: "18px", cursor: "pointer" }}>VIEW FULL SCORECARD →</motion.button>
    </motion.div>
  )
}

export default function LiveMatch({ teamA, teamB, nameA, nameB, tacticsA: initTacticsA, tacticsB: initTacticsB, tossResult, format, sport, onComplete, onError }) {
  const [status, setStatus] = useState("loading") // loading, revealing, tactical_pause, innings_break, super_over_setup, match_result
  const [phase, setPhase] = useState("inn1_pp")
  const [matchState, setMatchState] = useState({})
  const [tacticsA, setTacticsA] = useState(initTacticsA)
  const [tacticsB, setTacticsB] = useState(initTacticsB)
  const [events, setEvents] = useState([])
  const [revealIndex, setRevealIndex] = useState(0)
  const [currentPhaseData, setCurrentPhaseData] = useState(null)
  const [inn1Score, setInn1Score] = useState(null)
  const [inn2Score, setInn2Score] = useState(null)
  const [currentInnings, setCurrentInnings] = useState(1)
  const [matchResult, setMatchResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const firstBat = (() => { const w = tossResult?.tossWinnerTeam || "A"; const d = tossResult?.decision || "bat"; return d === "bat" ? w : (w === "A" ? "B" : "A") })()

  const runPhase = async (phaseId, state) => {
    setStatus("loading")
    setPhase(phaseId)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000"
      const res = await fetch(`${apiUrl}/api/simulation/phase`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team_a: teamA, team_b: teamB, tactics_a: tacticsA, tactics_b: tacticsB, toss: tossResult, format, sport, phase: phaseId, match_state: state || matchState })
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.detail || "Phase failed")
      const phaseData = data.data
      setCurrentPhaseData(phaseData)
      // Update scoreboard immediately when phase data arrives
      if (phaseId === "super_over") {
        // Super over has its own format — don't update inn scores from generic score
      } else {
        const phaseScore = phaseData.score || { runs: 0, wickets: 0, overs: 0 }
        if (phaseId.startsWith("inn1")) setInn1Score(phaseScore)
        else if (phaseId.startsWith("inn2")) setInn2Score(phaseScore)
      }
      setEvents(phaseData.commentary_events || [])
      setRevealIndex(0)
      setStatus("revealing")
    } catch (e) { setErrorMsg(e.message); if (onError) onError(e.message) }
  }

  useEffect(() => { runPhase("inn1_pp", {}) }, [])

  useEffect(() => {
    if (status !== "revealing" || revealIndex >= events.length) return
    const delay = EVENT_DELAYS[events[revealIndex]?.type] || 1000
    const t = setTimeout(() => setRevealIndex(i => i + 1), delay)
    return () => clearTimeout(t)
  }, [status, revealIndex, events])

  useEffect(() => {
    if (status !== "revealing" || revealIndex < events.length) return
    handlePhaseComplete()
  }, [revealIndex, events, status])

  const handlePhaseComplete = () => {
    const d = currentPhaseData
    if (!d) return
    const score = d.score || { runs: 0, wickets: 0, overs: 0 }

    if (phase === "inn1_pp") {
      setInn1Score(score)
      const newState = { ...matchState, innings1_pp: { score, scorecard: d.scorecard, bowling: d.bowling } }
      setMatchState(newState)
      setStatus("tactical_pause")
    } else if (phase === "inn1_mid") {
      setInn1Score(score)
      const newState = { ...matchState, innings1_total: score.runs, innings1_mid: { score, scorecard: d.scorecard, bowling: d.bowling } }
      setMatchState(newState)
      setCurrentInnings(2)
      setStatus("innings_break")
    } else if (phase === "inn2_pp") {
      setInn2Score(score)
      const newState = { ...matchState, innings2_pp: { score, scorecard: d.scorecard, bowling: d.bowling } }
      setMatchState(newState)
      setStatus("tactical_pause")
    } else if (phase === "inn2_mid") {
      setInn2Score(score)
      const newState = { ...matchState, innings2_mid: { score, scorecard: d.scorecard, bowling: d.bowling } }
      setMatchState(newState)
      if (d.match_result) {
        setMatchResult(d.match_result)
        setStatus("match_result")
      } else if (d.match_tied) {
        setStatus("super_over_setup")
      } else {
        setMatchResult(d.match_result || { winner: "Unknown", margin: "??", summary: "" })
        setStatus("match_result")
      }
    } else if (phase === "super_over") {
      setMatchResult(d.match_result || { winner: "Unknown", margin: "super over", summary: d.phase_summary || "" })
      setStatus("match_result")
    }
  }

  const continueFromTactical = () => {
    if (phase === "inn1_pp") runPhase("inn1_mid", matchState)
    else if (phase === "inn2_pp") runPhase("inn2_mid", matchState)
  }

  const continueFromInningsBreak = () => { runPhase("inn2_pp", matchState) }

  const startSuperOver = (soData) => {
    const newState = { ...matchState, ...soData }
    setMatchState(newState)
    runPhase("super_over", newState)
  }

  const getBattingTeamInfo = () => {
    if (currentInnings === 1) return firstBat === "A" ? { name: nameA, color: ORANGE } : { name: nameB, color: BLUE }
    return firstBat === "A" ? { name: nameB, color: BLUE } : { name: nameA, color: ORANGE }
  }

  const battingInfo = getBattingTeamInfo()

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", fontFamily: "'Bebas Neue',sans-serif", padding: "2rem", backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "60px 60px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <ScoreBar innings1={inn1Score} innings2={inn2Score} currentInnings={currentInnings} nameA={nameA} nameB={nameB} firstBat={firstBat} />

        {status === "loading" && (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} style={{ fontSize: "48px", marginBottom: "1rem" }}>🏏</motion.div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "22px", color: "#fff", marginBottom: "6px" }}>AI IS SIMULATING...</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
              {phase === "inn1_pp" ? "1st Innings Powerplay" : phase === "inn1_mid" ? "1st Innings — Middle & Death Overs" : phase === "inn2_pp" ? "2nd Innings Powerplay" : phase === "inn2_mid" ? "2nd Innings — The Chase" : "Super Over"}
            </div>
          </div>
        )}

        {(status === "revealing" || status === "tactical_pause") && (
          <>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "14px", color: battingInfo.color, letterSpacing: "0.1em", marginBottom: "8px" }}>
              {currentInnings === 1 ? "1ST INNINGS" : "2ND INNINGS"} — {battingInfo.name} BATTING
            </div>
            {/* Live Commentary on Key Moments */}
            {status === "revealing" && (
              <CommentaryFeed events={events} revealIndex={revealIndex} />
            )}
            {status === "tactical_pause" && (
              <>
                <MiniScorecard scorecard={currentPhaseData?.scorecard} accentColor={battingInfo.color} />
                <QuickTacticPanel
                  tactics={currentInnings === 1 ? (firstBat === "A" ? tacticsA : tacticsB) : (firstBat === "A" ? tacticsB : tacticsA)}
                  onChange={t => currentInnings === 1 ? (firstBat === "A" ? setTacticsA(t) : setTacticsB(t)) : (firstBat === "A" ? setTacticsB(t) : setTacticsA(t))}
                  onContinue={continueFromTactical}
                  accentColor={battingInfo.color}
                  label={battingInfo.name}
                  mode="batting"
                />
              </>
            )}
          </>
        )}

        {status === "innings_break" && (
          <InningsBreak innings1Score={inn1Score} nameA={nameA} nameB={nameB} firstBat={firstBat} tacticsA={tacticsA} tacticsB={tacticsB} onChangeTacticsA={setTacticsA} onChangeTacticsB={setTacticsB} onContinue={continueFromInningsBreak} />
        )}

        {status === "super_over_setup" && (
          <SuperOverSetup teamA={teamA} teamB={teamB} nameA={nameA} nameB={nameB} onStart={startSuperOver} />
        )}

        {status === "match_result" && matchResult && (
          <MatchResult result={matchResult} nameA={nameA} nameB={nameB} onFinish={() => {
            // Build full innings data from stored phases
            const inn1Data = matchState.innings1_mid || matchState.innings1_pp || {}
            const inn2Data = matchState.innings2_mid || matchState.innings2_pp || {}
            onComplete({
              innings1: {
                batting_team: firstBat === "A" ? "Team A" : "Team B",
                total: inn1Score?.runs || 0,
                wickets: inn1Score?.wickets || 0,
                overs: inn1Score?.overs || 0,
                scorecard: inn1Data.scorecard || [],
                bowling: inn1Data.bowling || [],
                key_moments: []
              },
              innings2: {
                batting_team: firstBat === "A" ? "Team B" : "Team A",
                total: inn2Score?.runs || 0,
                wickets: inn2Score?.wickets || 0,
                overs: inn2Score?.overs || 0,
                scorecard: inn2Data.scorecard || [],
                bowling: inn2Data.bowling || [],
                key_moments: []
              },
              result: matchResult,
              toss: { winner: tossResult.tossWinner, decision: tossResult.decision },
              commentary: events.map(e => e.text)
            })
          }} />
        )}

        {errorMsg && (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <div style={{ fontSize: "36px", marginBottom: "8px" }}>❌</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "22px", color: "#EF4444", marginBottom: "8px" }}>PHASE FAILED</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>{errorMsg}</div>
            <button onClick={() => { setErrorMsg(null); runPhase(phase, matchState) }} style={{ padding: "8px 20px", borderRadius: "999px", border: "none", background: ORANGE, color: "#fff", fontFamily: "'Bebas Neue',sans-serif", fontSize: "16px", cursor: "pointer" }}>RETRY</button>
          </div>
        )}
      </div>
    </div>
  )
}
