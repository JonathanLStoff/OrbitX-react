import './App.css';
import React, { useEffect, useMemo, useState } from 'react';
import './FeaturesList.css';

const downloadsData = [
  {
    id: 'windows-installer',
    title: 'Windows Installer',
    description: 'Full installer with guided setup for Windows 10 and 11.',
    href: 'https://rvcfjohfhblhvpnshzbd.supabase.co/storage/v1/object/public/orbitx-application-download/OrbitXInstaller.exe',
    platform: 'Windows',
    icon: 'windows',
  },
  {
    id: 'windows-portable',
    title: 'Windows Portable (ZIP)',
    description: 'Unzip and run instantly—perfect for USB drives or air-gapped machines.',
    href: 'https://rvcfjohfhblhvpnshzbd.supabase.co/storage/v1/object/public/orbitx-application-download/orbitx-win-x64.zip',
    platform: 'Windows',
    icon: 'windows',
  },
  {
    id: 'macos-apple',
    title: 'macOS · Apple Silicon',
    description: 'Optimized build for M1, M2, and M3 devices running macOS 12 or later.',
    href: 'https://rvcfjohfhblhvpnshzbd.supabase.co/storage/v1/object/public/orbitx-application-download/OrbitX-macos-arm64.dmg',
    platform: 'macOS',
    icon: 'apple',
  },
  {
    id: 'macos-intel',
    title: 'macOS · Intel',
    description: 'Universal installer for Intel-based Macs (macOS 11 Big Sur or newer).',
    href: 'https://rvcfjohfhblhvpnshzbd.supabase.co/storage/v1/object/public/orbitx-application-download/OrbitX-macos-x86_64.dmg',
    platform: 'macOS',
    icon: 'apple',
  },
];

const platformIcons = {
  windows: (
    <svg
      className="platform-icon"
      viewBox="0 0 448 512"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 93.7L183.7 68.8v141.9L0 201.6V93.7zm204.8-27l243.2-34.9v189.7L204.8 216.2V66.7zM183.7 266.9v143.2L0 385.1V249.9l183.7-9.1zm21.1 1.9L448 281.6v198.4l-243.2 35.2V268.8z" />
    </svg>
  ),
  apple: (
    <svg
      className="platform-icon"
      viewBox="0 0 384 512"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M318.7 268.7c.3 66.5 58 88.5 58.3 88.6-.5 1.7-9.1 31-30.1 61.4-18.1 26.3-36.9 52.6-66.6 53.2-28.9.5-38.1-17.1-71.1-17.1-33 0-43 16.5-70.2 17.6-28.2 1.1-49.8-28.4-68-54.7-37.1-53.9-66.4-152.4-28-219.1 19.3-33.6 53.8-55 91.4-55.6 28.6-.6 55.6 19.5 71.1 19.5 15.4 0 45.4-24.1 76.6-20.6 13 0 49.6 1 73.1 37.9-2 1.2-43.6 25.5-42.5 88.9zM253.3 70.5c14.9-18.1 24.9-43.4 22.2-68.5-21.4.9-46.9 14.4-62.1 32.5-13.6 15.8-25.5 41.6-22.3 66.1 23.6 1.8 47.2-12 62.2-30.1z" />
    </svg>
  ),
};

const mediaItems = [
  {
    id: 'live-playback',
    src: '/screencap.png',
    alt: 'Orbit‑X live playback workspace',
    caption: 'Live playback workspace with synchronized audio, video, and lighting cues.',
  },
  {
    id: 'cue-builder',
    src: '/screencap1.png',
    alt: 'Orbit‑X cue builder interface',
    caption: 'Build layered cue sequences with drag-and-drop precision and instant previews.',
  },
  {
    id: 'stage-atmosphere',
    src: '/orbitbg.gif',
    alt: 'Orbit‑X stage visual atmosphere',
    caption: 'Immersive stage looks rendered in real-time to match your show energy.',
  },
  {
    id: 'sound-craft',
    src: '/soundb.jpeg',
    alt: 'Sound board connected to Orbit‑X',
    caption: 'Orbit‑X working alongside FOH consoles for flawless sound transitions.',
  },
];

const NAV_HEIGHT = 96;

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    document.body.style.backgroundColor = activeTab === 'overview' ? '#000' : '#050505';
    return () => {
      document.body.style.backgroundColor = '#000';
    };
  }, [activeTab]);

  const containerStyle = useMemo(
    () => ({
      backgroundColor: '#000',
      paddingTop: `${NAV_HEIGHT}px`,
    }),
    []
  );

  const sectionStyle = useMemo(
    () => ({
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'visible',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: '#fff',
      transition: 'background-color 0.5s ease',
    }),
    []
  );

  const heroSectionStyle = useMemo(
    () => ({
      ...sectionStyle,
      minHeight: `calc(100vh - ${NAV_HEIGHT}px)`,
      overflow: 'hidden',
    }),
    [sectionStyle]
  );
  const backgroundStyle = useMemo(
    () => ({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'blur(10px)',
      transition: 'filter 0.3s ease',
    }),
    []
  );

  const overlayStyle = useMemo(
    () => ({
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.85) 100%)',
    }),
    []
  );

  const featuresData = [
    { text: 'Design and execute precision cue sheets tailored to your production' },
    { text: 'Seamless show control with programmable MIDI integration' },
    { text: 'Intuitive interface designed for fast, reliable operation under pressure' },
    { text: 'Created by performing artists for the theatrical community' },
    { text: 'Purpose-built for the evolving demands of live performance' },
    {
      text: 'Launch version includes:',
      subFeatures: [
        'Audio playback cues',
        'Video playback cues',
        'Image projection cues',
        'MIDI control & note triggers',
        'Cue grouping & sequences',
        'Extensible plugin architecture',
      ],
    },
  ];

  const currentYear = new Date().getFullYear();

  const renderContent = () => {
    if (activeTab === 'overview') {
      return (
        <div style={containerStyle} className="container">
          {/* First Section */}
          <section style={{ ...heroSectionStyle, backgroundColor: '#000' }}>
            <img
              src={
                'https://i.postimg.cc/Z5jxmf2m/orbitbgro.gif'
              }
              alt="Orbit-X animated background"
              style={{ ...backgroundStyle, filter: 'blur(20px)' }}
            />
            <div style={overlayStyle} />
            <div className="hero-headline">Orbit‑X</div>
            <div className="hero-subline">Orchestrating your production made easy</div>
            <div className="hero-meta">Coming in 2026</div>
          </section>

          {/* Second Section */}
          <section
            style={{
              ...sectionStyle,
              backgroundColor: '#121212',
              color: '#eee',
              padding: '140px 0 160px',
            }}
          >
            <img
              src="/screencap.png"
              alt="Orbit-X interface preview"
              style={{ ...backgroundStyle, filter: 'blur(10px)' }}
            />
            <div className="features-showcase">
              <h2 className="section-title">A revolutionary platform for production management</h2>
              <p className="features-lede">
                Orbit‑X keeps every department in sync—so your lighting, sound, video, and automation teams
                deliver one polished performance after another.
              </p>
              <div className="features-container features-centered">
                <ul className="main-features-list">
                  {featuresData.map((feature) => (
                    <li key={feature.text} className="main-feature-item">
                      {feature.text}
                      {feature.subFeatures && (
                        <ul className="sub-features-list">
                          {feature.subFeatures.map((subFeature) => (
                            <li key={subFeature} className="sub-feature-item">
                              {subFeature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Third Section */}
          <section style={{ ...sectionStyle, backgroundColor: '#121212', color: '#eee' }}>
            <img
              src="/soundb.jpeg"
              alt="Sound board background"
              style={{ ...backgroundStyle, filter: 'blur(10px)' }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 className="section-title">Contact us with questions or comments</h2>
              <p className="contact-text">
                <a className="contact-link" href="mailto:info@orbit-x.app">
                  info@orbit-x.app
                </a>
              </p>
            </div>
          </section>
        </div>
      );
    }

    if (activeTab === 'downloads') {
      return (
        <section className="downloads-section">
          <div className="downloads-intro">
            <span className="eyebrow">Downloads</span>
            <h1>Get Orbit‑X for your desktop</h1>
            <p>
              Choose the build that fits your setup. Each package ships with the latest features and
              rapid-update channel.
            </p>
          </div>
          <div className="downloads-grid">
            {downloadsData.map((download) => (
              <article key={download.id} className="download-card">
                <div className="download-header">
                  {platformIcons[download.icon]}
                  <div>
                    <div className="download-platform">{download.platform}</div>
                    <h2>{download.title}</h2>
                  </div>
                </div>
                <p>{download.description}</p>
                <div className="download-actions">
                  <a className="download-button" href={download.href} target="_blank" rel="noreferrer">
                    Download
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      );
    }

    if (activeTab === 'contact') {
      return (
        <section className="contact-section">
          <div className="contact-intro">
            <span className="eyebrow">Contact</span>
            <h1>Let&rsquo;s build the show together</h1>
            <p>
              Tell us about your production, request an Orbit‑X walkthrough, or start a partnership
              conversation. We respond within one business day.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <h2>Drop us a line</h2>
              <p>
                <a className="contact-link" href="mailto:info@orbit-x.app">
                  info@orbit-x.app
                </a>
              </p>
              <p>Dedicated support for stage managers, designers, educators, and touring companies.</p>
            </div>
            <div className="contact-card">
              <h2>Follow the journey</h2>
              <div className="contact-socials">
                <a
                  className="contact-social"
                  href="https://www.instagram.com/orbitx_app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <a
                  className="contact-social"
                  href="https://www.tiktok.com/@orbitxapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  TikTok
                </a>
              </div>
              <p>
                Behind-the-scenes looks at how Orbit‑X powers rehearsal rooms, cue stacks, and touring rigs.
              </p>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="media-section">
        <div className="media-intro">
          <span className="eyebrow">Media</span>
          <h1>See Orbit‑X in action</h1>
          <p>
            Explore production stills and motion captures that highlight how Orbit‑X supports directors,
            stage managers, and designers during every step of the show.
          </p>
        </div>
        <div className="media-grid">
          {mediaItems.map((item) => (
            <figure key={item.id} className="media-card">
              <div className="media-image-wrapper">
                <img src={item.src} alt={item.alt} loading="lazy" />
              </div>
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="app-root">
      <header className="top-bar">
        <div className="brand-mark">
          <span className="brand-glow" />
          <span className="brand-name">Orbit‑X</span>
        </div>
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'overview' ? 'nav-tab-active' : ''}`}
            onClick={() => setActiveTab('overview')}
            type="button"
          >
            Overview
          </button>
          <button
            className={`nav-tab ${activeTab === 'downloads' ? 'nav-tab-active' : ''}`}
            onClick={() => setActiveTab('downloads')}
            type="button"
          >
            Downloads
          </button>
          <button
            className={`nav-tab ${activeTab === 'media' ? 'nav-tab-active' : ''}`}
            onClick={() => setActiveTab('media')}
            type="button"
          >
            Media
          </button>
          <button
            className={`nav-tab ${activeTab === 'contact' ? 'nav-tab-active' : ''}`}
            onClick={() => setActiveTab('contact')}
            type="button"
          >
            Contact
          </button>
        </nav>
      </header>
      {renderContent()}
      <footer className="site-footer">
        <div className="footer-content">
          <span>© {currentYear} Orbit‑X. All rights reserved.</span>
          <div className="footer-links">
            <a href="mailto:info@orbit-x.app">info@orbit-x.app</a>
            <a href="https://www.instagram.com/orbitx_app/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://www.tiktok.com/@orbitxapp" target="_blank" rel="noreferrer">
              TikTok
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;