import { useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    question: "AIを使って一番やりたいことは？",
    options: [
      { label: "文章を書いたり、アイデアを整理したい", value: "claude" },
      { label: "画像や動画を作ってみたい", value: "gemini" },
      { label: "調べ物や仕事の効率化をしたい", value: "chatgpt" },
      { label: "副業や収益化に活かしたい", value: "luna" },
    ]
  },
  {
    id: 2,
    question: "AIにどんなイメージを持っていますか？",
    options: [
      { label: "難しそうで、まだよくわからない", value: "chatgpt" },
      { label: "面白そう！でも何から始めれば…", value: "gemini" },
      { label: "仕事に使えそうと思っている", value: "claude" },
      { label: "もう少し稼ぎに繋げたい", value: "luna" },
    ]
  },
  {
    id: 3,
    question: "今の自分に一番近いのは？",
    options: [
      { label: "AIはほぼ未経験・初めて触る", value: "chatgpt" },
      { label: "少し触ったことがある程度", value: "gemini" },
      { label: "ある程度使っているが深められていない", value: "claude" },
      { label: "活用しているが収益に繋がっていない", value: "luna" },
    ]
  },
  {
    id: 4,
    question: "AIで作ってみたいコンテンツは？",
    options: [
      { label: "SNS投稿・ブログ・メール文章", value: "claude" },
      { label: "動画・画像・デザイン", value: "gemini" },
      { label: "資料・レポート・まとめ", value: "chatgpt" },
      { label: "教材・コンテンツ商品", value: "luna" },
    ]
  },
  {
    id: 5,
    question: "理想の使い方に近いのは？",
    options: [
      { label: "毎日の作業をとにかく楽にしたい", value: "chatgpt" },
      { label: "クリエイティブな表現を楽しみたい", value: "gemini" },
      { label: "思考整理や企画に活かしたい", value: "claude" },
      { label: "AI×副業で収入の柱を作りたい", value: "luna" },
    ]
  },
];

// ルナCEOのサービス一覧
const LUNA_SERVICES = {
  line:    { label: "公式LINE", url: "https://lin.ee/3OVWgaJ", icon: "💬", desc: "個別相談・最新情報" },
  oc:      { label: "オープンチャット", url: "https://x.gd/udcf7", icon: "👥", desc: "無料コミュニティ・仲間と学ぶ" },
  udemy:   { label: "Udemy講座", url: "https://www.udemy.com/user/ju-di-qi-tai-42/", icon: "🎓", desc: "累計2,500名・20コース以上" },
  youtube: { label: "YouTube", url: "https://youtube.com/@luna_ceo", icon: "▶️", desc: "AI×副業・思想を語る動画" },
  guild:   { label: "収益ギルド", url: "https://mosh.jp/services/309688", icon: "⚔️", desc: "月4,980円・稼ぐ仕組みを作る" },
  x:       { label: "X（フォロー）", url: "https://x.com/luna777_ceo", icon: "𝕏", desc: "毎日AI×収益化の発信" },
  profile: { label: "プロフィール", url: "https://lunaceo.online", icon: "👤", desc: "ルナCEOってどんな人？" },
};

// ランダムサブCTA（毎回変わる）
const SUB_CTA_POOL = ["youtube", "x", "profile", "oc", "udemy"];

const RESULTS = {
  chatgpt: {
    type: "ChatGPT",
    emoji: "🤖",
    title: "万能スターター型",
    subtitle: "まずはChatGPTから始めよう",
    color: "#10a37f",
    bg: "rgba(16,163,127,0.08)",
    border: "rgba(16,163,127,0.3)",
    description: "AIを使い始めるなら、ChatGPTが一番の近道です。文章作成・調べ物・アイデア出し・翻訳など、日常のあらゆる場面で活躍します。まずは「話しかけるだけ」から始めてみましょう。",
    tips: [
      "「〇〇について教えて」と話しかけるだけでOK",
      "仕事のメールを作ってもらうと時間短縮に",
      "「小学生にもわかるように」など指示の工夫が効果的",
    ],
    mainCta: "udemy",   // メインCTA
    subPool: ["line", "oc", "youtube"], // サブCTAプール
    shareText: "私は「万能スターター型」でした！まずはChatGPTから始めます🤖",
  },
  gemini: {
    type: "Gemini",
    emoji: "🎨",
    title: "クリエイター型",
    subtitle: "画像・動画はGeminiが最強",
    color: "#4285f4",
    bg: "rgba(66,133,244,0.08)",
    border: "rgba(66,133,244,0.3)",
    description: "あなたはクリエイティブな表現に向いています！GoogleのGeminiは画像生成・動画制作に強く、数分でプロ品質のコンテンツが作れます。SNS発信やコンテンツビジネスを目指す方に最適です。",
    tips: [
      "「〇〇のシーンの動画を作って」と指示するだけ",
      "SNS用の画像も一瞬で生成できる",
      "Googleアカウントがあればすぐ使える",
    ],
    mainCta: "youtube",
    subPool: ["udemy", "oc", "line"],
    shareText: "私は「クリエイター型」でした！Geminiで動画・画像を作ります🎨",
  },
  claude: {
    type: "Claude",
    emoji: "💡",
    title: "思考整理・企画型",
    subtitle: "深い思考にはClaudeが最適",
    color: "#c9a84c",
    bg: "rgba(201,168,76,0.08)",
    border: "rgba(201,168,76,0.3)",
    description: "あなたには「考える力を拡張するAI」が向いています。Claudeは論理的思考・文章品質・企画立案が得意です。ビジネス戦略、コンテンツ設計、提案書作成など、質の高いアウトプットを求める場面で真価を発揮します。",
    tips: [
      "「この企画の問題点を指摘して」など深い質問が得意",
      "長文の要約・構造化が非常に優秀",
      "コンサル・教育コンテンツ設計に活かせる",
    ],
    mainCta: "line",
    subPool: ["guild", "oc", "udemy"],
    shareText: "私は「思考整理・企画型」でした！Claudeで企画力を上げます💡",
  },
  luna: {
    type: "AI×収益化",
    emoji: "💰",
    title: "収益化チャレンジャー型",
    subtitle: "AIで稼ぐ仕組みを作ろう",
    color: "#e74c3c",
    bg: "rgba(231,76,60,0.08)",
    border: "rgba(231,76,60,0.3)",
    description: "あなたはすでにAIの可能性を感じていて、収益化への意識が高い。ChatGPT・Gemini・Claudeを組み合わせて、教材制作・コンサル・コンテンツ販売など「AIで稼ぐ仕組み」を作るフェーズです。",
    tips: [
      "AIで作ったコンテンツをUdemyやnoteで販売",
      "占い×AIの掛け算で差別化できる",
      "月額コミュニティで実践事例を毎月吸収",
    ],
    mainCta: "guild",
    subPool: ["line", "oc", "udemy"],
    shareText: "私は「収益化チャレンジャー型」でした！AI×副業で稼ぐ仕組みを作ります💰",
  },
};

function calcResult(answers) {
  const count = { chatgpt: 0, gemini: 0, claude: 0, luna: 0 };
  answers.forEach(a => { if (a) count[a]++; });
  return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
}

function getRandomItems(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function ServiceButton({ serviceKey, primary }) {
  const s = LUNA_SERVICES[serviceKey];
  if (!s) return null;
  return (
    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: primary ? "14px 18px" : "11px 16px",
      background: primary ? "linear-gradient(135deg, #c9a84c, #a07830)" : "rgba(26,21,48,0.8)",
      border: primary ? "none" : "1px solid #2a2040",
      borderRadius: 10, textDecoration: "none",
      color: primary ? "#0d0d1a" : "#c8c0b0",
      transition: "all 0.2s", marginBottom: 8,
    }}>
      <span style={{ fontSize: 18 }}>{s.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: primary ? 700 : 600 }}>{s.label}</div>
        <div style={{ fontSize: 11, opacity: 0.7, marginTop: 1 }}>{s.desc}</div>
      </div>
      <span style={{ fontSize: 12, opacity: 0.6 }}>→</span>
    </a>
  );
}

export default function App() {
  const [step, setStep] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [subCtaKeys] = useState(() => getRandomItems(SUB_CTA_POOL, 2));
  const [copied, setCopied] = useState(false);

  function startQuiz() {
    setStep("quiz"); setCurrent(0); setAnswers([]); setSelected(null);
  }

  function next() {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnimating(true);
    setTimeout(() => {
      if (current + 1 >= QUESTIONS.length) {
        setResult(calcResult(newAnswers));
        setStep("result");
      } else {
        setCurrent(current + 1);
        setSelected(null);
      }
      setAnimating(false);
    }, 300);
    setAnswers(newAnswers);
  }

  function reset() {
    setStep("intro"); setCurrent(0); setAnswers([]);
    setSelected(null); setResult(null);
  }

  function copyShare() {
    if (!result) return;
    const res = RESULTS[result];
    const text = `${res.shareText}\n\n▼ あなたも診断してみて！\nhttps://uranai-trainer.vercel.app/\n\n#AIタイプ診断 #ルナCEO`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const res = result ? RESULTS[result] : null;
  const progress = (current / QUESTIONS.length) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a0a14 0%, #0d0d1a 60%, #110a18 100%)",
      color: "#e8e0d0",
      fontFamily: "'Georgia', 'Noto Serif JP', serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "0 16px 60px",
    }}>

      {/* ヘッダー */}
      <div style={{ width: "100%", maxWidth: 520, textAlign: "center", padding: "36px 0 20px" }}>
        <div style={{ fontSize: 34, marginBottom: 8 }}>✨</div>
        <h1 style={{
          fontSize: 20, fontWeight: 700, color: "#c9a84c",
          letterSpacing: "0.08em", margin: "0 0 6px",
          textShadow: "0 0 20px rgba(201,168,76,0.3)"
        }}>AIタイプ診断</h1>
        <p style={{ fontSize: 12, color: "#8b8070", margin: "0 0 8px" }}>
          あなたに最適なAIツールがわかる5問診断
        </p>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{
            padding: "3px 10px", background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.3)", borderRadius: 20,
            fontSize: 11, color: "#c9a84c"
          }}>🎁 セミナー参加特典</span>
          <span style={{
            padding: "3px 10px", background: "rgba(139,157,195,0.1)",
            border: "1px solid rgba(139,157,195,0.3)", borderRadius: 20,
            fontSize: 11, color: "#8b9dc3"
          }}>🔗 友人にシェアOK</span>
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: 520 }}>

        {/* ===== イントロ ===== */}
        {step === "intro" && (
          <div>
            <div style={{
              background: "linear-gradient(135deg, #1a1530, #160d20)",
              border: "1px solid #2a2040", borderRadius: 16, padding: 28,
              textAlign: "center", marginBottom: 16
            }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>🤖</div>
              <h2 style={{ fontSize: 17, color: "#e8e0d0", margin: "0 0 10px", fontWeight: 700 }}>
                あなたに合うAIがわかる！
              </h2>
              <p style={{ fontSize: 13, color: "#9a9080", lineHeight: 1.8, margin: "0 0 20px" }}>
                ChatGPT・Gemini・Claude…<br />
                どれを使えばいいか迷っていませんか？<br />
                5問に答えるだけでピッタリのAIと<br />使い方がわかります。
              </p>
              {["⏱ 所要時間：約1分", "📱 スマホでOK", "🎯 4タイプから診断"].map((t, i) => (
                <div key={i} style={{
                  background: "rgba(0,0,0,0.2)", borderRadius: 8,
                  padding: "8px 14px", fontSize: 12, color: "#c8c0b0", marginBottom: 6
                }}>{t}</div>
              ))}
              <button onClick={startQuiz} style={{
                width: "100%", padding: "15px", marginTop: 16,
                background: "linear-gradient(135deg, #c9a84c, #a07830)",
                border: "none", borderRadius: 12, color: "#0d0d1a",
                fontSize: 15, fontWeight: 700, cursor: "pointer",
                letterSpacing: "0.08em",
                boxShadow: "0 4px 20px rgba(201,168,76,0.3)"
              }}>診断スタート →</button>
            </div>

            {/* ルナCEOプロフィール */}
            <div style={{
              background: "#100d1a", border: "1px solid #2a2040",
              borderRadius: 12, padding: 18
            }}>
              <div style={{ fontSize: 12, color: "#8b9dc3", marginBottom: 10 }}>👤 このツールを作った人</div>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "linear-gradient(135deg, #c9a84c, #8b4c7a)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, flexShrink: 0
                }}>🔮</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#e8e0d0", marginBottom: 4 }}>
                    ルナCEO
                  </div>
                  <div style={{ fontSize: 12, color: "#9a9080", lineHeight: 1.7 }}>
                    合同会社ルナマーケティング代表。<br />
                    AI×占い×副業で2,500名以上を支援。<br />
                    Udemy講師・収益ギルド主宰。
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <ServiceButton serviceKey="profile" />
              </div>
            </div>
          </div>
        )}

        {/* ===== クイズ ===== */}
        {step === "quiz" && (
          <div style={{ opacity: animating ? 0 : 1, transition: "opacity 0.3s" }}>
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: "#8b8070" }}>Question {current + 1} / {QUESTIONS.length}</span>
                <span style={{ fontSize: 12, color: "#c9a84c" }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: 4, background: "#1a1a2e", borderRadius: 2, overflow: "hidden" }}>
                <div style={{
                  height: "100%", background: "linear-gradient(90deg, #c9a84c, #8b9dc3)",
                  borderRadius: 2, width: `${progress}%`, transition: "width 0.5s ease"
                }} />
              </div>
            </div>

            <div style={{
              background: "linear-gradient(135deg, #1a1530, #160d20)",
              border: "1px solid #2a2040", borderRadius: 14, padding: "20px 18px", marginBottom: 14
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#e8e0d0", lineHeight: 1.6 }}>
                Q{current + 1}. {QUESTIONS[current].question}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
              {QUESTIONS[current].options.map((opt, i) => (
                <button key={i} onClick={() => setSelected(opt.value)} style={{
                  padding: "13px 16px", textAlign: "left",
                  background: selected === opt.value ? "rgba(201,168,76,0.12)" : "rgba(26,21,48,0.8)",
                  border: `1px solid ${selected === opt.value ? "#c9a84c" : "#2a2040"}`,
                  borderRadius: 10, color: selected === opt.value ? "#c9a84c" : "#c8c0b0",
                  fontSize: 13, cursor: "pointer", lineHeight: 1.6, transition: "all 0.2s"
                }}>
                  <span style={{
                    display: "inline-block", width: 20, height: 20, lineHeight: "20px",
                    textAlign: "center", borderRadius: "50%", marginRight: 10, fontSize: 10,
                    background: selected === opt.value ? "#c9a84c" : "#2a2040",
                    color: selected === opt.value ? "#0d0d1a" : "#8b8070",
                    fontWeight: 700, verticalAlign: "middle", flexShrink: 0
                  }}>{["A","B","C","D"][i]}</span>
                  {opt.label}
                </button>
              ))}
            </div>

            <button onClick={next} disabled={!selected} style={{
              width: "100%", padding: "14px",
              background: selected ? "linear-gradient(135deg, #c9a84c, #a07830)" : "#1a1535",
              border: "none", borderRadius: 10,
              color: selected ? "#0d0d1a" : "#4a4060",
              fontSize: 14, fontWeight: 700,
              cursor: selected ? "pointer" : "not-allowed", transition: "all 0.2s"
            }}>
              {current + 1 === QUESTIONS.length ? "結果を見る ✨" : "次へ →"}
            </button>
          </div>
        )}

        {/* ===== 結果 ===== */}
        {step === "result" && res && (
          <div>
            {/* タイプ結果 */}
            <div style={{
              background: `linear-gradient(135deg, ${res.bg}, rgba(13,13,26,0.9))`,
              border: `1px solid ${res.border}`, borderRadius: 16, padding: 26,
              textAlign: "center", marginBottom: 14
            }}>
              <div style={{ fontSize: 44, marginBottom: 8 }}>{res.emoji}</div>
              <div style={{ fontSize: 11, color: res.color, letterSpacing: "0.15em", marginBottom: 4 }}>
                あなたのAIタイプ
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#e8e0d0", marginBottom: 4 }}>
                {res.title}
              </div>
              <div style={{
                display: "inline-block", padding: "3px 12px",
                background: `${res.color}20`, border: `1px solid ${res.color}50`,
                borderRadius: 20, fontSize: 12, color: res.color, marginBottom: 14
              }}>おすすめ：{res.type}</div>
              <p style={{ fontSize: 13, color: "#c8c0b0", lineHeight: 1.8, margin: 0, textAlign: "left" }}>
                {res.description}
              </p>
            </div>

            {/* Tips */}
            <div style={{
              background: "#100d1a", border: "1px solid #2a2040",
              borderRadius: 12, padding: 18, marginBottom: 14
            }}>
              <div style={{ fontSize: 12, color: "#8b9dc3", marginBottom: 10 }}>💡 今日からできる使い方</div>
              {res.tips.map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{
                    minWidth: 20, height: 20, background: res.color + "25",
                    borderRadius: "50%", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 10, color: res.color, fontWeight: 700, flexShrink: 0
                  }}>{i + 1}</span>
                  <span style={{ fontSize: 12, color: "#c8c0b0", lineHeight: 1.6 }}>{tip}</span>
                </div>
              ))}
            </div>

            {/* メインCTA */}
            <div style={{
              background: "linear-gradient(135deg, #1a1530, #160d20)",
              border: "1px solid #3a2060", borderRadius: 12, padding: 18, marginBottom: 14
            }}>
              <div style={{ fontSize: 12, color: "#8b9dc3", marginBottom: 10 }}>
                🎯 次のステップ（ルナCEOのサービス）
              </div>
              <ServiceButton serviceKey={res.mainCta} primary={true} />
              {res.subPool.slice(0, 2).map(key => (
                <ServiceButton key={key} serviceKey={key} />
              ))}
            </div>

            {/* ランダムサブCTA */}
            <div style={{
              background: "#100d1a", border: "1px solid #2a2040",
              borderRadius: 12, padding: 18, marginBottom: 14
            }}>
              <div style={{ fontSize: 12, color: "#8b8070", marginBottom: 10 }}>
                📡 ルナCEOをもっと知る
              </div>
              {subCtaKeys.map(key => (
                <ServiceButton key={key} serviceKey={key} />
              ))}
            </div>

            {/* シェア */}
            <div style={{
              background: "rgba(139,157,195,0.05)", border: "1px dashed #3a3860",
              borderRadius: 12, padding: 18, marginBottom: 14, textAlign: "center"
            }}>
              <div style={{ fontSize: 13, color: "#8b9dc3", fontWeight: 700, marginBottom: 6 }}>
                📱 このツール、シェアしてOKです！
              </div>
              <div style={{ fontSize: 12, color: "#6b6058", lineHeight: 1.7, marginBottom: 12 }}>
                AIで困っている友人・知人に<br />自由にシェアしてください🙏
              </div>
              <div style={{
                background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: 10,
                fontSize: 11, color: "#8b9dc3", marginBottom: 12, lineHeight: 1.7, textAlign: "left"
              }}>
                {res.shareText}<br />
                <span style={{ color: "#6b6058" }}>▼ あなたも診断してみて！</span>
              </div>
              <button onClick={copyShare} style={{
                width: "100%", padding: "12px",
                background: copied ? "rgba(16,163,127,0.2)" : "rgba(139,157,195,0.1)",
                border: `1px solid ${copied ? "rgba(16,163,127,0.5)" : "#3a3860"}`,
                borderRadius: 10, color: copied ? "#10a37f" : "#8b9dc3",
                fontSize: 13, cursor: "pointer", fontWeight: 700
              }}>
                {copied ? "✅ コピーしました！" : "📋 シェア文をコピーする"}
              </button>
            </div>

            <button onClick={reset} style={{
              width: "100%", padding: "12px", background: "transparent",
              border: "1px solid #2a2040", borderRadius: 10,
              color: "#6b6058", fontSize: 12, cursor: "pointer"
            }}>
              🔄 もう一度診断する
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
