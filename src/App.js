import './App.css';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import mermaid from 'mermaid';
import './FeaturesList.css';

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'dark',
  fontFamily: '"Space Grotesk", "Inter", "Segoe UI", sans-serif',
  themeVariables: {
    primaryColor: '#07142b',
    primaryBorderColor: '#8ec5ff',
    primaryTextColor: '#f7fbff',
    lineColor: '#5ad8ff',
    secondaryColor: '#101a3a',
    tertiaryColor: '#0f1c3c',
    noteBkgColor: '#152445',
    noteTextColor: '#e4f0ff',
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    padding: 16,
    diagramPadding: 24,
    nodeSpacing: 66,
    rankSpacing: 48,
    fontSize: '13px',
  },
});

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
    alt: 'Orbit‑X live playback workspace showing synchronized audio, video, and projection cue list',
    caption: 'Live playback workspace with synchronized audio, video, and lighting cues.',
  },
  {
    id: 'cue-builder',
    src: '/screencap1.png',
    alt: 'Orbit‑X cue builder interface layering lighting focus presets and MIDI triggers',
    caption: 'Build layered cue sequences with drag-and-drop precision and instant previews.',
  },
  {
    id: 'stage-atmosphere',
    src: '/orbitbg.gif',
    alt: 'Orbit‑X stage visual atmosphere with theatrical automation lighting looks',
    caption: 'Immersive stage looks rendered in real-time to match your show energy.',
  },
  {
    id: 'sound-craft',
    src: '/soundb.jpeg',
    alt: 'Sound board connected to Orbit‑X handling sound design cue list playback',
    caption: 'Orbit‑X working alongside FOH consoles for flawless sound transitions.',
  },
];

const roadmapFlowChart = `
flowchart TD
  phase1([Phase 1 • Systems Foundation])
  phase2([Phase 2 • Live Sync and Collaboration])
  phase3([Phase 3 • Automation and Extensions])
  release([Release])

  phase1 -.-> p1_item1[Per-action visual customization: color and styling]
  p1_item1 -.-> p1_item2[Integrated EQ and mixer]
  p1_item2 -.-> p1_item3[Gain control automation]
  p1_item3 -.-> p1_item4[File-based streaming]
  p1_item4 -.-> p1_item5[Context menu — right-click actions]
  p1_item5 -.-> p1_item6[Advanced focus settings]
  p1_item6 -.-> p1_item7[Multi-selection and batch actions]
  p1_item7 -.-> p1_item8[Built-in updater]

  phase1 --> phase2
  phase2 -.-> p2_item1[Custom MIDI signal routing]
  p2_item1 -.-> p2_item2[VST and AU plugin hosting]
  p2_item2 -.-> p2_item3[Video playback and timeline support]
  p2_item3 -.-> p2_item4[DMX lighting control]
  p2_item4 -.-> p2_item5[Image assets and projection support]
  p2_item5 -.-> p2_item6[Group management for assets and actions]
  p2_item6 -.-> p2_item7[Scheduled triggers and plugin framework]

  phase2 --> phase3
  phase3 -.-> p3_item1[Show Mode — focus and edit lock]
  p3_item1 -.-> p3_item2[Custom thumbnails for media]
  p3_item2 -.-> p3_item3[Integrated video and image editor]
  p3_item3 -.-> p3_item4[DMX programming editor]

  phase3 --> release
  

  class phase1,phase2,phase3 phaseCard;
  class release releaseCard;
  classDef phaseCard fill:#060c1f,stroke:#8C00FF,stroke-width:2px,color:#f7fbff;
  classDef releaseCard fill:#1a0a0a,stroke:#DC2626,stroke-width:2px,color:#f7fbff;
`;

const NAV_HEIGHT = 96;

function MermaidChart({ chart }) {
  const [diagram, setDiagram] = useState('');
  const [error, setError] = useState('');
  const chartIdRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 10)}`);
  const containerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      try {
        const { svg } = await mermaid.render(chartIdRef.current, chart);
        if (isMounted) {
          // Parse the SVG and increase the rect height for phase nodes to avoid label clipping
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(svg, 'image/svg+xml');
            const phaseGroups = doc.querySelectorAll('g.phaseCard');
            phaseGroups.forEach((g) => {
              const rect = g.querySelector('rect');
              if (rect) {
                const origH = parseFloat(rect.getAttribute('height') || '0');
                const origY = parseFloat(rect.getAttribute('y') || '0');
                if (origH > 0) {
                  const newH = Math.round(origH * 2);
                  const newY = origY - (newH - origH) / 2;
                  rect.setAttribute('height', String(newH));
                  rect.setAttribute('y', String(newY));
                }
              }
              // adjust other rects inside child label containers (sometimes separate in Mermaid output)
              const labelContainers = g.querySelectorAll('[class*="label-container"] rect');
              labelContainers.forEach((labelRect) => {
                const origH2 = parseFloat(labelRect.getAttribute('height') || '0');
                const origY2 = parseFloat(labelRect.getAttribute('y') || '0');
                if (origH2 > 0) {
                  const newH2 = Math.round(origH2 * 2);
                  const newY2 = origY2 - (newH2 - origH2) / 2;
                  labelRect.setAttribute('height', String(newH2));
                  labelRect.setAttribute('y', String(newY2));
                }
              });
              // adjust foreignObject heights when htmlLabels: true
              const foreignObjects = g.querySelectorAll('foreignObject');
              foreignObjects.forEach((fo) => {
                const origHf = parseFloat(fo.getAttribute('height') || '0');
                const origYf = parseFloat(fo.getAttribute('y') || '0');
                if (origHf > 0) {
                  const newHf = Math.round(origHf * 2);
                  // center the foreignObject inside the rect rather than keep the negative y
                  let bestY = origYf - (newHf - origHf) / 2;
                  try {
                    const rectYAttr = rect.getAttribute('y');
                    const rectHAttr = rect.getAttribute('height');
                    if (rectYAttr != null && rectHAttr != null) {
                      const rectYVal = parseFloat(rectYAttr || '0');
                      const rectHVal = parseFloat(rectHAttr || '0');
                      const centeredY = rectYVal + (rectHVal - newHf) / 2;
                      if (Number.isFinite(centeredY)) bestY = centeredY;
                    }
                  } catch (e) {
                    // fallback to previous behavior
                  }
                  fo.setAttribute('height', String(newHf));
                  fo.setAttribute('y', String(Math.round(bestY)));
                }
                // ensure inner HTML elements in foreignObject don't clip
                try {
                  const inner = fo.querySelector('div, span');
                  if (inner) {
                    // Use flexbox so inner paragraphs are centered vertically/horizontally
                    inner.style.display = 'flex';
                    inner.style.flexDirection = 'column';
                    inner.style.justifyContent = 'center';
                    inner.style.alignItems = 'center';
                    inner.style.whiteSpace = 'pre-wrap';
                    inner.style.overflow = 'visible';
                    inner.style.lineHeight = '1.15em';
                    inner.style.padding = '6px 8px 4px 8px';
                    inner.style.margin = '0';
                    // remove default p margins inside label HTML which push content vertically
                    const p = inner.querySelector('p');
                    if (p) p.style.margin = '0';
                    // also ensure span elements don't add extra top/bottom margins
                    const spans = inner.querySelectorAll('span, .nodeLabel');
                    spans.forEach((s) => { s.style.margin = '0'; s.style.padding = '0'; });
                  }
                } catch (e) {
                  // ignore if cross-origin or parsing fails
                }
              });
              // ensure label containers are visible (no clipping)
              const labelGroups = g.querySelectorAll('g[class*="label-container"], g[class*="label"]');
              labelGroups.forEach((lg) => {
                // remove overflow clipping if present
                lg.removeAttribute('clip-path');
                lg.setAttribute('overflow', 'visible');
                // Normalize translate Y component to 0 so labels are not shifted vertically
                try {
                  const tf = lg.getAttribute('transform') || '';
                  if (tf && tf.indexOf('translate(') >= 0) {
                    const newTf = tf.replace(/translate\(\s*([-\d.]+)[\s,]+([-\d.]+)\s*\)/, 'translate($1, 0)');
                    lg.setAttribute('transform', newTf);
                  }
                } catch (e) {
                  // ignore
                }
              });
              // remove clip paths or mask references at group level to avoid label clipping
              const clipChildren = g.querySelectorAll('[clip-path], [mask]');
              clipChildren.forEach((el) => {
                el.removeAttribute('clip-path');
                el.removeAttribute('mask');
              });
            });

            const serializer = new XMLSerializer();
            const fixedSvg = serializer.serializeToString(doc);
            setDiagram(fixedSvg);
          } catch (errInner) {
            // If altering the svg fails, fall back to the original svg string
            // eslint-disable-next-line no-console
            console.warn('SVG post-processing failed', errInner);
            setDiagram(svg);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to render the roadmap chart right now.');
        }
        // eslint-disable-next-line no-console
        console.error('Mermaid render error', err);
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  // Rely on Mermaid's own HTML layout for text positioning inside phase nodes
  useEffect(() => {
    // Intentionally left blank: we no longer adjust label positions here.
  }, [diagram]);

  if (error) {
    return <div className="mermaid-chart mermaid-chart-error" ref={containerRef}>{error}</div>;
  }

  if (!diagram) {
    return <div className="mermaid-chart mermaid-chart-loading" ref={containerRef}>Rendering flow chart…</div>;
  }

  return <div ref={containerRef} className="mermaid-chart" dangerouslySetInnerHTML={{ __html: diagram }} />;
}

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  // Ensure reload/page show resets to top so the roadmap and other tabs don't persist scroll
  useEffect(() => {
    // prefer manual so the browser doesn't re-use previous scroll positions
    const prev = (window.history && window.history.scrollRestoration) || 'auto';
    try {
      if (window.history && 'scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    } catch (e) {
      // ignore
    }

    // On pageshow or load, reset scroll to top
    const onShow = () => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      } catch (err) {
        // ignore
      }
    };

    window.addEventListener('pageshow', onShow);
    // fallback if pageshow not available
    window.addEventListener('load', onShow);

    // Also ensure scroll reset when the app mounts (for dev HMR or client-side reloads)
    onShow();

    return () => {
      try {
        if (window.history && 'scrollRestoration' in window.history) window.history.scrollRestoration = prev;
      } catch (e) {
        // ignore
      }
      window.removeEventListener('pageshow', onShow);
      window.removeEventListener('load', onShow);
    };
  }, []);
  const changeTab = (tab) => {
    setActiveTab(tab);
    try {
      // scroll to top of page (both body and documentElement supports)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = activeTab === 'overview' ? '#000' : '#050505';
    return () => {
      document.body.style.backgroundColor = '#000';
    };
  }, [activeTab]);

  const containerStyle = useMemo(
    () => ({
      backgroundColor: '#000',
      paddingTop: `${NAV_HEIGHT/2}px`,
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

  const featureHighlights = [
    {
      id: 'cue-engine',
      title: 'Integrated Cue Engine for Audio, Video, and Projection',
      description:
        'Build a sound design cue list that links audio stems, timecode-synced video, and projection looks in a single timeline. Orbit-X keeps fades, visual transitions, and safety pauses in sync so stage managers can call the show with confidence.',
    },
    {
      id: 'midi-show-control',
      title: 'MIDI Show Control & Theatrical Automation',
      description:
        'Route MIDI show control messages, OSC cues, and automation triggers to motion rigs and lighting consoles without writing custom scripts. Orbit-X acts as the theatrical automation software layer that keeps rigging, lifts, and effects aligned with spoken dialogue and musical beats.',
    },
    {
      id: 'mac-alternative',
      title: 'Mac & Windows Friendly Show Control Alternative',
      description:
        'Whether you need a Mac show control alternative or a Windows workstation, Orbit-X ships with optimized builds for both Apple Silicon and Intel hardware. Designers can install it on rehearsal laptops, redundancy machines, or traveling flypacks with identical performance.',
    },
    {
      id: 'touring-resilience',
      title: 'Touring-Grade Reliability for Live Production Tools',
      description:
        'Redundant cue stacks, checksum-protected media, and offline editing mean productions keep rolling even when the network hiccups. Touring programmers can rehearse scenes on the bus, then push updates that remain perfectly in sync once the rig powers up.',
    },
    {
      id: 'creative-workbench',
      title: 'Creative Workbench with Extensible Plugins',
      description:
        'Extend Orbit-X with custom plugins that talk to DMX gateways, laser controllers, or immersive audio processors. Designers can sketch new workflows, expose them to assistants, and version-control cues just like code—so experimentation never blocks a live cueing session.',
    },
  ];

  const currentYear = new Date().getFullYear();
  const promoVideoRef = useRef(null);

  const renderContent = () => {
    if (activeTab === 'overview') {
      return (
        <div style={containerStyle} className="container">
          {/* First Section */}
          <section style={{ ...heroSectionStyle, backgroundColor: '#000' }}>
            <img
              src={'https://i.postimg.cc/Z5jxmf2m/orbitbgro.gif'}
              alt="Orbit-X animated galaxy-style background representing live production data"
              style={{ ...backgroundStyle, filter: 'blur(20px)' }}
            />
            <div style={overlayStyle} />
            <h1 className="hero-headline">Orbit‑X</h1>
            <h2 className="hero-subline">Orchestrating your production made easy</h2>
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
              alt="Orbit-X dark mode interface preview with lighting, sound, and video cue sheets"
              style={{ ...backgroundStyle, filter: 'blur(10px)' }}
            />
            <div className="features-showcase">
              <h2 className="section-title">A revolutionary platform for production management</h2>
              <p className="features-lede">
                Orbit‑X keeps every department in sync—so your lighting, sound, video, and automation teams
                deliver one polished performance after another with the precision of a fully-orchestrated cueing system.
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
              <div className="feature-details">
                <h3 className="feature-details-heading">Detailed features for production leads</h3>
                <p className="feature-details-subtext">
                  Google, stage managers, and prospective partners can now understand how Orbit‑X handles MIDI show control, theatrical automation software workflows, and live production tools in depth.
                </p>
                <div className="feature-detail-grid">
                  {featureHighlights.map((highlight) => (
                    <article key={highlight.id} className="feature-detail-card">
                      <h4>{highlight.title}</h4>
                      <p>{highlight.description}</p>
                    </article>
                  ))}
                </div>
                <div className="feature-longform">
                  <h3 className="feature-longform-heading">How Orbit‑X orchestrates modern shows</h3>
                  <p>
                    Orbit‑X is a unified show control platform designed to consolidate lighting, sound, video, and
                    automation into a single coordinated environment. As a theater‑grade cue engine, it enables
                    programmers to build deterministic cue sequences that tie audio stems to timecode-synchronized
                    video and projection cues while maintaining consistent fade curves and fail-safes for live
                    performance. This streamlined approach reduces the cognitive load on operators and allows
                    production teams to iterate quickly during rehearsals without risking out-of-sync transitions.
                  </p>
                  <p>
                    MIDI Show Control (MSC) and OSC are first-class citizens in Orbit‑X. From complex cueing chains
                    that trigger motion rigs and projection displays to simple MIDI note events that launch backup
                    audio, Orbit‑X can act as a central routing and timing layer for distributed show hardware. This
                    is particularly useful for touring productions and school theaters where technical setups can vary
                    but the show needs to behave the same across venues.
                  </p>
                  <p>
                    For designers and sound engineers who require precision, Orbit‑X supports redundancy, versioned
                    cue stacks, and strong error handling for media playback. The platform supports platform‑specific
                    binaries for Apple Silicon, Intel Macs, and Windows, offering a Mac‑friendly show control
                    alternative while also keeping the system familiar for engineers who prefer Windows-based
                    production setups. Extensible plugins allow integration with DMX gateways, custom hardware, and
                    third-party DSPs, which means creative workflows no longer require low-level scripting to run
                    reliably during a show.
                  </p>
                  <p>
                    From a workflow perspective, Orbit‑X is built for live performance scenarios where safety, timing,
                    and repeatability are crucial. Its cue groups, safety checks, and step-through tools are
                    designed for stage managers and technical directors who need predictable, traceable show
                    execution during live events. Educators and theaters can adopt Orbit‑X as a teaching tool for
                    cueing best practices that bridge the gap between artistic intention and technical execution.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Third Section */}
          <section style={{ ...sectionStyle, backgroundColor: '#121212', color: '#eee' }}>
            <img
              src="/soundb.jpeg"
              alt="Close-up of a sound board background with Orbit-X controlling FOH transitions"
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
              <h2>Let me know</h2>
              <p>
                <a className="contact-link" href="mailto:info@orbit-x.app">
                  info@orbit-x.app
                </a>
              </p>
              <p>Dedicated support for stage managers, designers, educators, and touring companies. We also take all sorts of feedback on the function and direction of features!</p>
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

    if (activeTab === 'roadmap') {
      return (
        <section className="roadmap-section">
          <div className="roadmap-sheen" aria-hidden="true" />
          <div className="roadmap-content">
            <span className="eyebrow">Roadmap</span>
            <h1>Orbit‑X release map</h1>
            <p>
              A quick glance at upcoming feature flights, integrations, and creative experiments. Treat these nodes as
              placeholders—swap in real milestones whenever priorities shift.
            </p>
            <MermaidChart chart={roadmapFlowChart} />
            <p className="roadmap-note">
              Update this Mermaid flow chart anytime your backlog changes—the nodes support decisions, iterations, and
              launch gates so you can represent true production flow.
            </p>
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
        <div className="promo-wrapper">
          <video
            ref={promoVideoRef}
            className="promo-video"
            playsInline
            muted
            autoPlay
            // No controls to prevent time timeline display, user can fullscreen with button
            controls={false}
            // We'll implement custom loop control so it restarts at 60s instead of 0
            onLoadedMetadata={(e) => {
              const video = e.currentTarget;
              try {
                if (video.duration > 60) {
                  video.currentTime = 60;
                  // Attempt to play after seeking
                  video.play().catch(() => {});
                }
              } catch (err) {
                // ignore
              }
            }}
            onEnded={(e) => {
              const video = e.currentTarget;
              try {
                video.currentTime = 60;
                video.play().catch(() => {});
              } catch (err) {
                // ignore
              }
            }}
            aria-label="Orbit-X promo video"
            loop={false}
          >
            <source
              src="https://rvcfjohfhblhvpnshzbd.supabase.co/storage/v1/object/public/orbitx-application-download/promo/promo0.0.13a.mov"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <button
            className="promo-fullscreen-btn"
            onClick={() => {
              const vid = promoVideoRef.current;
              if (!vid) return;
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else if (vid.requestFullscreen) {
                vid.requestFullscreen().catch(() => {});
              } else if (vid.webkitRequestFullscreen) {
                // Safari
                vid.webkitRequestFullscreen();
              }
            }}
            type="button"
            aria-label="Full screen video"
          >
            Full screen
          </button>
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
            onClick={() => changeTab('overview')}
            type="button"
          >
            Overview
          </button>
          <button
            className={`nav-tab ${activeTab === 'downloads' ? 'nav-tab-active' : ''}`}
            onClick={() => changeTab('downloads')}
            type="button"
          >
            Downloads
          </button>
          <button
            className={`nav-tab ${activeTab === 'media' ? 'nav-tab-active' : ''}`}
            onClick={() => changeTab('media')}
            type="button"
          >
            Media
          </button>
          <button
            className={`nav-tab ${activeTab === 'roadmap' ? 'nav-tab-active' : ''}`}
            onClick={() => changeTab('roadmap')}
            type="button"
          >
            Roadmap
          </button>
          <button
            className={`nav-tab ${activeTab === 'contact' ? 'nav-tab-active' : ''}`}
            onClick={() => changeTab('contact')}
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