import { useState } from "react"
import { motion } from "framer-motion"

const ORANGE = "#F97316"
const BLUE = "#3B82F6"
const GREEN = "#22C55E"

function Scorecard({ innings, accentColor, label }) {
  const [tab, setTab] = useState("batting")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px", overflow: "hidden",
        marginBottom: "1.5rem",
      }}
    >
      {/* Innings header */}
      <div style={{
        padding: "14px 18px",
        background: `${accentColor}15`,
        borderBottom: `1px solid ${accentColor}25`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "18px", color: accentColor, letterSpacing: "0.05em",
          }}>
            {label}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px", color: "rgba(255,255,255,0.4)",
          }}>
            {innings.batting_team}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "32px", color: "#fff", letterSpacing: "0.03em",
          }}>
            {innings.total}/{innings.wickets}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px", color: "rgba(255,255,255,0.4)",
          }}>
            ({innings.overs} overs)
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {["batting", "bowling"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "10px",
            background: "none", border: "none",
            borderBottom: tab === t ? `2px solid ${accentColor}` : "2px solid transparent",
            color: tab === t ? accentColor : "rgba(255,255,255,0.35)",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "13px", letterSpacing: "0.08em",
            cursor: "pointer", transition: "all 0.2s",
          }}>
            {t === "batting" ? "BATTING" : "BOWLING"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: "12px 16px" }}>
        {tab === "batting" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px", color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.05em",
              }}>
                <th style={{ textAlign: "left", padding: "4px 0", fontWeight: 500 }}>BATTER</th>
                <th style={{ textAlign: "right", padding: "4px 4px", fontWeight: 500 }}>R</th>
                <th style={{ textAlign: "right", padding: "4px 4px", fontWeight: 500 }}>B</th>
                <th style={{ textAlign: "right", padding: "4px 4px", fontWeight: 500 }}>4s</th>
                <th style={{ textAlign: "right", padding: "4px 4px", fontWeight: 500 }}>6s</th>
                <th style={{ textAlign: "right", padding: "4px 4px", fontWeight: 500 }}>SR</th>
              </tr>
            </thead>
            <tbody>
              {innings.scorecard?.map((b, i) => (
                <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "8px 0" }}>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px", color: "#fff", fontWeight: 500,
                    }}>
                      {b.name}
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px", color: "rgba(255,255,255,0.3)",
                    }}>
                      {b.out}
                    </div>
                  </td>
                  <td style={{
                    textAlign: "right", padding: "8px 4px",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "16px",
                    color: b.runs >= 50 ? GREEN : "#fff",
                  }}>
                    {b.runs}
                  </td>
                  <td style={{ textAlign: "right", padding: "8px 4px", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{b.balls}</td>
                  <td style={{ textAlign: "right", padding: "8px 4px", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{b.fours}</td>
                  <td style={{ textAlign: "right", padding: "8px 4px", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{b.sixes}</td>
                  <td style={{ textAlign: "right", padding: "8px 4px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>
                    {b.balls > 0 ? ((b.runs / b.balls) * 100).toFixed(0) : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "bowling" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
                <th style={{ textAlign: "left", padding: "4px 0", fontWeight: 500 }}>BOWLER</th>
                <th style={{ textAlign: "right", padding: "4px 4px", fontWeight: 500 }}>O</th>
                <th style={{ textAlign: "right", padding: "4px 4px", fontWeight: 500 }}>R</th>
                <th style={{ textAlign: "right", padding: "4px 4px", fontWeight: 500 }}>W</th>
                <th style={{ textAlign: "right", padding: "4px 4px", fontWeight: 500 }}>ECON</th>
              </tr>
            </thead>
            <tbody>
              {innings.bowling?.map((b, i) => (
                <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "8px 0", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#fff", fontWeight: 500 }}>
                    {b.name}
                  </td>
                  <td style={{ textAlign: "right", padding: "8px 4px", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{b.overs}</td>
                  <td style={{ textAlign: "right", padding: "8px 4px", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{b.runs}</td>
                  <td style={{ textAlign: "right", padding: "8px 4px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", color: b.wickets >= 3 ? ORANGE : "#fff" }}>
                    {b.wickets}
                  </td>
                  <td style={{ textAlign: "right", padding: "8px 4px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>
                    {b.overs > 0 ? (b.runs / b.overs).toFixed(1) : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}


      </div>
    </motion.div>
  )
}

export default function SimulationResult({ result, teamA, teamB, nameA = "TEAM A", nameB = "TEAM B", onPlayAgain }) {
  const [showCommentary, setShowCommentary] = useState(false)

  if (!result) return null

  const displayTeamName = (backendName) => {
    if (backendName === "Team A") return nameA;
    if (backendName === "Team B") return nameB;
    return backendName;
  }

  const { innings1, innings2, toss, result: matchResult, commentary } = result
  const winnerColor = matchResult.winner === "Team A" ? ORANGE : BLUE

  return (
    <div style={{
      minHeight: "100vh", background: "#0A0A0A",
      fontFamily: "'Bebas Neue', sans-serif", padding: "2rem",
      backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
      backgroundSize: "60px 60px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Winner Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: "center", marginBottom: "2.5rem",
            padding: "2.5rem", borderRadius: "20px",
            background: `${winnerColor}12`,
            border: `1px solid ${winnerColor}33`,
            position: "relative", overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <div style={{
            position: "absolute", top: "-50%", left: "50%",
            transform: "translateX(-50%)",
            width: "400px", height: "200px",
            background: winnerColor, filter: "blur(80px)",
            opacity: 0.1, pointerEvents: "none",
          }} />

          <div style={{ fontSize: "48px", marginBottom: "0.5rem" }}>🏆</div>

          <div style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            color: winnerColor, letterSpacing: "0.05em",
            marginBottom: "4px",
          }}>
            {displayTeamName(matchResult.winner)} WINS!
          </div>

          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "16px", color: "rgba(255,255,255,0.6)",
            marginBottom: "1rem",
          }}>
            by {matchResult.margin}
          </div>

          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px", color: "rgba(255,255,255,0.45)",
            maxWidth: "500px", margin: "0 auto", lineHeight: 1.6,
          }}>
            {matchResult.summary}
          </div>

          {/* Toss info */}
          <div style={{
            marginTop: "1.5rem",
            display: "inline-block",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px", color: "rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.05)",
            padding: "4px 14px", borderRadius: "999px",
          }}>
            🪙 {displayTeamName(toss.winner)} won the toss and chose to {toss.decision}
          </div>
        </motion.div>

        {/* Player of the Match */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "flex", alignItems: "center", gap: "16px",
            padding: "16px 20px", borderRadius: "14px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ fontSize: "36px" }}>⭐</div>
          <div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px", color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.1em", marginBottom: "2px",
            }}>
              PLAYER OF THE MATCH
            </div>
            <div style={{ fontSize: "24px", color: GREEN, letterSpacing: "0.05em" }}>
              {matchResult.player_of_match}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px", color: "rgba(255,255,255,0.45)",
            }}>
              {matchResult.player_of_match_reason}
            </div>
          </div>
        </motion.div>

        {/* Scorecards */}
        <Scorecard
          innings={{...innings1, batting_team: displayTeamName(innings1.batting_team)}}
          accentColor={innings1.batting_team === "Team A" ? ORANGE : BLUE}
          label="1ST INNINGS"
        />
        <Scorecard
          innings={{...innings2, batting_team: displayTeamName(innings2.batting_team)}}
          accentColor={innings2.batting_team === "Team A" ? ORANGE : BLUE}
          label="2ND INNINGS"
        />

        {/* Commentary toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => setShowCommentary(!showCommentary)}
            style={{
              width: "100%", padding: "12px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "16px", letterSpacing: "0.08em",
              cursor: "pointer", marginBottom: "1rem",
              transition: "all 0.2s",
            }}
          >
            {showCommentary ? "▲ HIDE COMMENTARY" : "▼ SHOW FULL COMMENTARY"}
          </button>

          {showCommentary && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "14px", padding: "16px",
                marginBottom: "1.5rem",
              }}
            >
              {commentary?.map((line, i) => (
                <div key={i} style={{
                  display: "flex", gap: "12px",
                  padding: "10px 0",
                  borderBottom: i < commentary.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "11px", color: ORANGE,
                    minWidth: "20px", paddingTop: "2px",
                  }}>
                    {i + 1}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px", color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.6,
                  }}>
                    {line}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Play Again */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ display: "flex", gap: "12px", justifyContent: "center" }}
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onPlayAgain}
            style={{
              padding: "14px 40px", borderRadius: "999px",
              border: "none", background: ORANGE,
              color: "#fff", fontSize: "20px",
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "0.1em", cursor: "pointer",
            }}
          >
            🔄 PLAY AGAIN
          </motion.button>
        </motion.div>

        <div style={{
          textAlign: "center", marginTop: "1.5rem",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px", color: "rgba(255,255,255,0.15)",
        }}>
          Simulated by AI • SettleIt
        </div>
      </div>
    </div>
  )
}