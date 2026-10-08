// Tavern 正文下方：每轮一张「场景卡」（导演整理结果的缩影 + 进入剧场），以及插画（版本切换 / 重画 / 改词）。
import React from 'react'
import { api, assetUrl, openTheater, rememberGame, toast, useConfig } from '../api.js'
import { igsBackground, TIME_LABEL, WEATHER_LABEL, MOOD_LABEL } from '../theater/playback.js'
import { nameColor } from '../../../lib/cast.js'
const CLOCK = { dawn: '05:40', morning: '07:30', noon: '12:00', afternoon: '15:20', dusk: '17:50', evening: '19:30', night: '22:10', midnight: '00:40' }
const TIME_TINT = { dawn: '#9a5c8f', morning: '#5aa6e8', noon: '#3e8fe0', afternoon: '#c58b4a', dusk: '#b14f6e', evening: '#4f2f78', night: '#121a44', midnight: '#070b24' }

export function SceneCardInline({ item, gameId, turn }) {
  rememberGame(gameId)
  const config = useConfig()
  const [busy, setBusy] = React.useState(false)
  const data = (item && item.data) || {}
  const t = data.turn ?? turn
  const pending = item && item.status === 'pending'
  const scene = { location: data.location, time: data.time }
  const bg = config && config.config.ui.igsBackgrounds && data.location ? igsBackground(scene, config.config.ui.assetBase) : ''
  const retry = async () => {
    setBusy(true)
    try { await api.direct(gameId, t, true); toast('已重新整理') } catch (e) { toast(String(e.message || e), 'error') } finally { setBusy(false) }
  }
  return (
    <div className="igsd-chat">
      <div className={`igsd-scene${pending ? ' is-pending' : ''}`}>
        <div className="igsd-scene-bg" style={{ backgroundImage: bg ? `url("${bg}")` : `linear-gradient(135deg, ${TIME_TINT[data.time] || '#2a2350'}, #0d0b1c)` }} />
        <div className="igsd-scene-clock"><b>{CLOCK[data.time] || '--:--'}</b><span>{data.time ? (TIME_LABEL[data.time] || data.time) : 'scene'}</span></div>
        <div className="igsd-scene-main">
          {pending ? (
            <>
              <div className="igsd-scene-loc"><span className="igsd-dots">导演正在整理这一幕</span></div>
              <div className="igsd-scene-sum">正文已经可以读了。说话人、表情、站位、镜头和插画在后台排，整理好后剧场里会自动更新。</div>
              <div className="igsd-scene-actions"><button type="button" className="igsd-play" onClick={() => openTheater(gameId, { turn: t })}>先看起来</button></div>
            </>
          ) : data.error ? (
            <>
              <div className="igsd-scene-loc">这一幕没整理好</div>
              <div className="igsd-scene-err">{String(data.error).slice(0, 160)}</div>
              <div className="igsd-scene-actions">
                <button type="button" className="igsd-play" onClick={() => openTheater(gameId, { turn: t })}>照原文演</button>
                <button type="button" className="igsd-ghost" disabled={busy} onClick={retry}>{busy ? '整理中…' : '重试'}</button>
              </div>
            </>
          ) : (
            <>
              <div className="igsd-scene-loc">{data.location || `第 ${t} 轮`}</div>
              <div className="igsd-scene-chips">
                {data.weather && data.weather !== 'clear' && <span className="igsd-chip">{WEATHER_LABEL[data.weather] || data.weather}</span>}
                {data.mood && <span className="igsd-chip">♪ {MOOD_LABEL[data.mood] || data.mood}</span>}
                {(data.cast || []).map(n => <span key={n} className="igsd-chip" style={{ '--c': nameColor(n) }}><i />{n}</span>)}
                {data.choices > 0 && <span className="igsd-chip">◆ {data.choices} 个选项</span>}
              </div>
              {data.summary && <div className="igsd-scene-sum">{data.summary}</div>}
              <div className="igsd-scene-actions">
                <button type="button" className="igsd-play" onClick={() => openTheater(gameId, { turn: t })}>进入剧场</button>
                <button type="button" className="igsd-ghost" onClick={() => openTheater(gameId, { panel: 'cast' })}>人物志</button>
                <button type="button" className="igsd-ghost" disabled={busy} onClick={retry}>{busy ? '整理中…' : '重新整理'}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const RATIO = { landscape: '1216 / 832', portrait: '832 / 1216', square: '1 / 1' }

export function CgCardInline({ item, gameId }) {
  rememberGame(gameId)
  const data = (item && item.data) || {}
  const [zoom, setZoom] = React.useState(false)
  const [busy, setBusy] = React.useState('')
  const src = data.assetId ? assetUrl(data.assetId) : item && item.url
  const versions = Number(data.v) || 0
  const current = Number.isInteger(data.current) ? data.current : versions - 1
  const act = async (id, fn, ok) => {
    setBusy(id)
    try { await fn(); if (ok) toast(ok) } catch (e) { toast(String(e.message || e), 'error') } finally { setBusy('') }
  }
  const redraw = () => act('r', () => api.render(gameId, data.imageId, {}), '已加入出图队列')
  if (item && item.status === 'failed' && !src) {
    return (
      <div className="igsd-chat"><div className="igsd-cgcard"><div className="igsd-cgcard-fail">
        <span>🎨 插画没画成：{String(item.error || '未知原因').slice(0, 140)}</span>
        <button type="button" className="igsd-ghost" disabled={busy === 'r'} onClick={redraw}>重画</button>
        <button type="button" className="igsd-ghost" onClick={() => openTheater(gameId, { panel: 'gallery', panelArg: data.imageId })}>改词</button>
      </div></div></div>
    )
  }
  if (!src || (item && item.status === 'pending' && !src)) {
    return (
      <div className="igsd-chat"><div className="igsd-cgcard"><div className="igsd-cgcard-wait" style={{ aspectRatio: RATIO[data.shape] || RATIO.landscape }}>
        <span>正在绘制{item && item.caption ? `「${item.caption}」` : '插画'}</span>
      </div></div></div>
    )
  }
  return (
    <div className="igsd-chat">
      <div className="igsd-cgcard">
        <img key={src} src={src} alt={(item && item.caption) || '插画'} loading="lazy" onClick={() => setZoom(true)} />
        <div className="igsd-cgcard-bar">
          <span className="igsd-cap">{(item && item.caption) || 'CG'}{versions > 1 ? ` · ${current + 1}/${versions}` : ''}{item && item.status === 'pending' ? ' · 重画中…' : ''}</span>
          {versions > 1 && <button type="button" disabled={current <= 0 || busy === 'v'} onClick={() => act('v', () => api.version(gameId, data.imageId, current - 1))}>‹</button>}
          {versions > 1 && <button type="button" disabled={current >= versions - 1 || busy === 'v'} onClick={() => act('v', () => api.version(gameId, data.imageId, current + 1))}>›</button>}
          <button type="button" disabled={busy === 'r' || (item && item.status === 'pending')} onClick={redraw}>重画</button>
          <button type="button" onClick={() => openTheater(gameId, { panel: 'gallery', panelArg: data.imageId })}>改词</button>
        </div>
      </div>
      {zoom && <div className="igsd-chat-lightbox" onClick={() => setZoom(false)}><img src={src} alt="" /></div>}
    </div>
  )
}
