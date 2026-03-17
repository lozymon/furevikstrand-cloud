import { ImageResponse } from 'next/og'
import { profile } from '@/data/profile'
import type { Locale } from '@/types'

export const runtime = 'edge'
export const alt = 'Kim Andrè Furevikstrand — Senior Full-Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const role = profile.role[(locale as Locale) ?? 'en']

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0d0d10',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Status badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#34d399',
            }}
          />
          <span style={{ color: '#34d399', fontSize: '14px', fontFamily: 'monospace' }}>
            available for hire
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: '#e2e2f0',
            lineHeight: 1.1,
            marginBottom: '16px',
            letterSpacing: '-1px',
          }}
        >
          {profile.name}
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: '28px',
            color: '#a78bfa',
            marginBottom: '40px',
            fontFamily: 'monospace',
          }}
        >
          {role}
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '40px' }}>
          {[
            { value: profile.stats.experience, label: 'experience' },
            { value: profile.stats.projects, label: 'projects' },
            { value: `${profile.stats.languages}`, label: 'languages' },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ color: '#a78bfa', fontSize: '28px', fontWeight: 700 }}>{s.value}</span>
              <span style={{ color: '#8888a8', fontSize: '13px', fontFamily: 'monospace' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Domain watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '80px',
            color: '#252535',
            fontSize: '18px',
            fontFamily: 'monospace',
          }}
        >
          furevikstrand.cloud
        </div>
      </div>
    ),
    { ...size }
  )
}
