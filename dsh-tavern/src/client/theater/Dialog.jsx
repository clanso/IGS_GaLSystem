// 对话框（逐字显现 + 打字音）、情境卡片（短信 / 信件 / 便签……）、选项。
import React from 'react'
import { blip, sfx } from './audio.js'
import { CARD_LABEL } from './playback.js'

const CARD_HEAD = { sms: '新消息', letter: '', note: '', news: '号外', terminal: '> SYSTEM', notice: '告示', diary: '', scroll: '' }

/** 逐字显现：返回 [是否打完, 立即打完]。 */
export function useTypewriter(beat, speed, { sound = true } = {}) {
  const [done, setDone] = React.useState(false)
  const chars = React.useMemo(() => Array.from((beat && beat.text) || ''), [beat && beat.key, beat && beat.text])
  React.useEffect(() => {
    setDone(!speed || !chars.length)
    if (!speed || !chars.length) return undefined
    const total = chars.length * speed + 220
    const finish = setTimeout(() => setDone(true), total)
    let i = 0
    const tick = sound ? setInterval(() => {
      i += 2
      if (i >= chars.length) { clearInterval(tick); return }
      if (!/[\s，。、…！？,.!?]/.test(chars[i])) blip(beat.speaker, beat.type)
    }, speed * 2) : null
    return () => { clearTimeout(finish); if (tick) clearInterval(tick) }
  }, [beat && beat.key, chars, speed, sound])
  return [done, chars, () => setDone(true)]
}

export function DialogBox({ beat, chars, done, color, quick, progress, status, hiddenText }) {
  const speaker = beat.alias || beat.speaker
  const showName = speaker && beat.type !== 'narration'
  const speed = quick.speed
  return (
    <div className="igsd-dialog" style={{ '--speaker': color || undefined }}>
      <div className="igsd-box" />
      {showName && (
        <div className="igsd-name" key={beat.speaker + beat.alias}>
          <div className="igsd-name-plate">{speaker}</div>
          {beat.emo && quick.emoLabel && <div className="igsd-name-sub">{quick.emoLabel}</div>}
        </div>
      )}
      {hiddenText && <div className="igsd-text is-cardhint">〔 {CARD_LABEL[beat.card] || '卡片'} 〕</div>}
      {!hiddenText && (
        <div className={`igsd-text is-${beat.type}${done ? ' is-done' : ''}`} key={beat.key} aria-live="polite">
          {chars.map((ch, i) => <span key={i} className="igsd-char" style={{ '--d': (i * speed) + 'ms' }}>{ch}</span>)}
        </div>
      )}
      {done && <div className="igsd-wait" aria-hidden="true" />}
      {status && <div className="igsd-status">{status}</div>}
      <div className="igsd-progress"><i style={{ width: Math.round(progress * 100) + '%' }} /></div>
      <div className="igsd-quick" onClick={e => e.stopPropagation()}>
        {quick.items.map(item => (
          <button key={item.id} type="button" className={item.on ? 'is-on' : ''} title={item.title} onClick={() => { sfx('select'); item.run() }} onMouseEnter={() => sfx('hover')}>{item.label}</button>
        ))}
      </div>
    </div>
  )
}

export function SceneCard({ beat }) {
  const kind = beat.card
  return (
    <div className="igsd-card" data-card={kind} key={beat.key}>
      {CARD_HEAD[kind] ? <div className="igsd-card-head">{CARD_HEAD[kind]}{kind === 'sms' && beat.speaker ? ` · ${beat.alias || beat.speaker}` : ''}</div> : null}
      <div className="igsd-card-body">{beat.text}</div>
    </div>
  )
}

export function Choices({ choices, onChoose, onBack, waiting }) {
  const [free, setFree] = React.useState('')
  const list = choices || []
  return (
    <div className="igsd-choices" onClick={e => e.stopPropagation()}>
      <div className="igsd-choices-title">{list.length ? 'CHOICE' : waiting ? 'TO BE CONTINUED' : 'YOUR TURN'}</div>
      {list.map((text, i) => (
        <button key={text} type="button" className="igsd-choice" data-n={String(i + 1).padStart(2, '0')} style={{ '--i': i }} onMouseEnter={() => sfx('hover')} onClick={() => { sfx('select'); onChoose(text) }}>{text}</button>
      ))}
      <form className="igsd-free" style={{ '--i': list.length }} onSubmit={e => { e.preventDefault(); if (free.trim()) { sfx('select'); onChoose(free.trim()) } }}>
        <input value={free} onChange={e => setFree(e.target.value)} placeholder={list.length ? '或者，自己写下一步……' : '写下你的下一步……'} onKeyDown={e => e.stopPropagation()} />
        <button type="submit">GO</button>
      </form>
      <button type="button" className="igsd-btn" style={{ marginTop: '1cqw' }} onClick={onBack}>回到聊天</button>
    </div>
  )
}
