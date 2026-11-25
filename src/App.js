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
    description: 'Native build for Apple Silicon Macs (M1 and newer) running macOS 11 Big Sur or later.',
    href: 'https://rvcfjohfhblhvpnshzbd.supabase.co/storage/v1/object/public/orbitx-application-download/OrbitX-macos-arm64.dmg',
    platform: 'macOS',
    icon: 'apple',
  },
  {
    id: 'macos-intel',
    title: 'macOS · Intel',
    description: 'Installer for Intel-based Macs running macOS 11 Big Sur or later.',
    href: 'https://rvcfjohfhblhvpnshzbd.supabase.co/storage/v1/object/public/orbitx-application-download/OrbitX-macos-x86_64.dmg',
    platform: 'macOS',
    icon: 'apple',
  },
  {
    id: 'linux-deb',
    title: 'Linux · Debian / Ubuntu (.deb)',
    description: 'Package for 64-bit Debian, Ubuntu and derivatives. Install with sudo apt install ./orbitx-linux-amd64.deb.',
    href: 'https://rvcfjohfhblhvpnshzbd.supabase.co/storage/v1/object/public/orbitx-application-download/orbitx-linux-amd64.deb',
    platform: 'Linux',
    icon: 'linux',
  },
  {
    id: 'linux-rpm',
    title: 'Linux · Fedora / openSUSE (.rpm)',
    description: 'Package for 64-bit Fedora, RHEL, openSUSE and derivatives. Install with sudo dnf install ./orbitx-linux-x86_64.rpm.',
    href: 'https://rvcfjohfhblhvpnshzbd.supabase.co/storage/v1/object/public/orbitx-application-download/orbitx-linux-x86_64.rpm',
    platform: 'Linux',
    icon: 'linux',
  },
  {
    id: 'android-apk',
    title: 'Android (APK)',
    description: 'For Android 8 or later phones and tablets. MIDI needs Android 10 or later.',
    href: 'https://rvcfjohfhblhvpnshzbd.supabase.co/storage/v1/object/public/orbitx-application-download/orbitx-android-universal.apk',
    platform: 'Android',
    icon: 'android',
  },
];

// Official store badges, kept unaltered in public/badges/. href null = listing not live yet.
const storesData = [
  {
    id: 'microsoft-store',
    name: 'Microsoft Store',
    badge: 'microsoft-store.svg',
    platforms: 'Windows 10 and 11',
    href: 'https://apps.microsoft.com/detail/9ngfgfbssxhf',
  },
  {
    id: 'app-store',
    name: 'App Store',
    badge: 'app-store.svg',
    platforms: 'iPhone, iPad and Mac',
    href: null,
    beta: [{ label: 'Join the TestFlight beta', href: 'https://testflight.apple.com/join/gGPwjP9b' }],
  },
  {
    id: 'google-play',
    name: 'Google Play',
    badge: 'google-play.png',
    platforms: 'Android phones and tablets',
    href: null,
    // Closed test: Play only lets group members opt in, so the group comes first.
    beta: [
      { label: '1. Join the closed beta group', href: 'https://groups.google.com/g/orbit-x-testers' },
      { label: '2. Become a tester on Google Play', href: 'https://play.google.com/apps/testing/com.stoffaudio.orbitx' },
    ],
  },
];

const CLOUDSMITH = 'https://dl.cloudsmith.io/public/stoffaudio-1ai6/orbit-x';

const packageManagers = [
  {
    id: 'apt',
    name: 'APT',
    platforms: 'Debian, Ubuntu and derivatives',
    command: `curl -1sLf '${CLOUDSMITH}/setup.deb.sh' | sudo -E bash\nsudo apt install orbit-x`,
  },
  {
    id: 'dnf',
    name: 'DNF',
    platforms: 'Fedora, RHEL and derivatives',
    command: `curl -1sLf '${CLOUDSMITH}/setup.rpm.sh' | sudo -E bash\nsudo dnf install orbit-x`,
  },
  {
    id: 'winget',
    name: 'winget',
    platforms: 'Windows 10 and 11',
    command: 'winget install 9NGFGFBSSXHF',
  },
  {
    id: 'homebrew',
    name: 'Homebrew',
    platforms: 'macOS',
    command: null,
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
  linux: (
    <svg
      className="platform-icon"
      viewBox="0 0 512 512"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M64 64h384c17.7 0 32 14.3 32 32v320c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32zm40 88l96 80-96 80 24 29 126-109-126-109-24 29zm136 168v40h152v-40H240z" fill-rule="evenodd" />
    </svg>
  ),
  android: (
    <svg
      className="platform-icon"
      viewBox="0 0 512 512"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M152 140l-34-58 14-8 35 59c26-12 57-19 89-19s63 7 89 19l35-59 14 8-34 58c52 30 88 82 92 144H60c4-62 40-114 92-144zm34 76a18 18 0 1 0 0-36 18 18 0 0 0 0 36zm140 0a18 18 0 1 0 0-36 18 18 0 0 0 0 36zM60 304h392v146c0 18-14 32-32 32H92c-18 0-32-14-32-32V304z" fill-rule="evenodd" />
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
    id: 'board',
    src: '/marketing/screens/01-audio-board.png',
    alt: 'Orbit‑X cue list with songs and sound effects and the GO button',
    caption: 'One cue list, one GO button. Songs, sound effects, videos and pictures fire in order.',
  },
  {
    id: 'trim',
    src: '/marketing/screens/03-audio-edit-edit.png',
    alt: 'Orbit‑X Edit tab trimming a song on its waveform',
    caption: 'Trim the start and end on the waveform, with fades in and out.',
  },
  {
    id: 'timing',
    src: '/marketing/screens/06-audio-edit-timing.png',
    alt: 'Orbit‑X Timing tab with pre-wait, loop and auto-follow settings',
    caption: 'Pre-waits, loops and follow-ons, so cues run themselves.',
  },
  {
    id: 'mix',
    src: '/marketing/screens/05-audio-edit-mix.png',
    alt: 'Orbit‑X Mix tab with gain, pan and output routing for a cue',
    caption: 'Gain, pan, mute and solo per cue, routed to the outputs you have.',
  },
  {
    id: 'video',
    src: '/marketing/screens/07-video-board.png',
    alt: 'Orbit‑X cue list with video cues',
    caption: 'Videos and pictures are cues too, with fit, fill, fades and transitions.',
  },
];

const roadmapFlowChart = `
flowchart TD
  phase1([Phase 1 • Systems Foundation])
  phase2([Phase 2 • Basic Multimedia & MIDI Support])
  phase3([Phase 3 • Ease of Use & Advanced Features])
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

const VALID_TABS = ['overview', 'downloads', 'media', 'roadmap', 'contact', 'privacy'];

function initialTabFromLocation() {
  if (typeof window === 'undefined') return 'overview';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  const queryTab = new URLSearchParams(window.location.search).get('tab')?.toLowerCase() || '';
  for (const candidate of [path, hash, queryTab]) {
    if (candidate === 'privacy' || candidate === 'privacy-policy' || candidate === 'privacypolicy') {
      return 'privacy';
    }
    if (VALID_TABS.includes(candidate)) {
      return candidate;
    }
  }
  return 'overview';
}

function App() {
  const [activeTab, setActiveTab] = useState(initialTabFromLocation);
  const [isNavOpen, setIsNavOpen] = useState(false);
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
      const nextUrl = tab === 'overview' ? '/' : `/${tab}`;
      if (window.history && window.history.pushState && window.location.pathname !== nextUrl) {
        window.history.pushState({ tab }, '', nextUrl);
      }
      // scroll to top of page (both body and documentElement supports)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    const onPopState = () => {
      setActiveTab(initialTabFromLocation());
    };
    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onPopState);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && isNavOpen) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isNavOpen]);

  const handleTabSelect = (tab) => {
    changeTab(tab);
    setIsNavOpen(false);
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
    { text: "Build the show as a list of cues: songs, sound effects, background videos and images" },
    { text: "During the show, press GO and the next cue plays" },
    { text: "Made for school plays, community theater, churches, talent shows, bands with backing tracks and streams" },
    { text: "Cues fire on time without learning a full theater console" },
    {
      text: "Every show includes:",
      subFeatures: [
        "Audio, video and picture cues",
        "Trim, fades and loops",
        "Pre-waits, follow-ons and timed cues",
        "Per-cue mix, submixes and bus sends",
        "Built-in EQ, compressor, delay and reverb",
        "One .obx show file on every device",
      ],
    },
  ];

  const featureHighlights = [
    {
      id: "cue-list",
      title: "Cue list with GO",
      points: [
        "Cues run in order; one big GO button fires the next one, and Stop ends what is playing.",
        "Number, name, colour and group cues so the list reads at a glance in a dark booth.",
        "Lock the console during the show so a stray tap cannot change anything.",
      ],
    },
    {
      id: "timing",
      title: "Timing that runs itself",
      points: [
        "A cue can wait before it starts, start with the cue before it, or start after it ends.",
        "Loop a cue, set a pre-wait or post-wait, or schedule it for a time of day.",
        "Fire cues from keys and triggers, so whole sequences run hands-free.",
      ],
    },
    {
      id: "sound",
      title: "Sound",
      points: [
        "Trim in and out points on the waveform, and fade in and out.",
        "Gain, pan, mute and solo per cue, with submixes and bus sends for the outputs you have.",
        "Built-in effects on each cue: EQ, compressor, limiter, gate, delay and reverb.",
        "An output limiter keeps every output under a ceiling you set.",
      ],
    },
    {
      id: "video",
      title: "Video and pictures",
      points: [
        "Play videos and still images as cues, with fit, fill and stretch, fades and transitions.",
        "Colour, gamma, crop and chroma key looks per clip.",
        "A video's sound becomes its own cue, with its own level, effects and routing.",
      ],
    },
    {
      id: "every-device",
      title: "One show file, every device",
      points: [
        "A show is a single .obx file that opens on Android, iPhone, iPad, Mac, Windows and Linux.",
        "Build the show on a computer and run it from a tablet, or the other way round.",
      ],
    },
    {
      id: "show-night",
      title: "Holds up during the show",
      points: [
        "Edits save in the background, and a backup of unsaved changes is offered back after a crash.",
        "If the audio engine stops, Orbit-X restarts it and tells you, instead of going silent.",
      ],
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
              src={'https://rvcfjohfhblhvpnshzbd.supabase.co/storage/v1/object/public/orbitx-application-download/promo/orbitbgro.gif'}
              alt="Orbit-X animated galaxy-style background representing live production data"
              style={{ ...backgroundStyle, filter: 'blur(20px)' }}
            />
            <div style={overlayStyle} />
            <h1 className="hero-headline">Orbit‑X</h1>
            <h2 className="hero-subline">Run the sound, video and pictures for a live show from one cue list. Press GO.</h2>
            <div className="hero-meta">Free for Windows, Mac, Linux and Android</div>
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
              src="/marketing/ui_hero.png"
              alt="Orbit-X cue list with the GO button"
              style={{ ...backgroundStyle, filter: 'blur(10px)' }}
            />
            <div className="features-showcase">
              <h2 className="section-title">Your whole show in one cue list</h2>
              <p className="features-lede">
                Orbit‑X runs the sound, video and pictures for a live show from one cue list. Build the show as a list
                of cues, then press GO and the next cue plays, on time.
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
                <h3 className="feature-details-heading">What it does</h3>
                <div className="feature-detail-grid">
                  {featureHighlights.map((highlight) => (
                    <article key={highlight.id} className="feature-detail-card">
                      <h4>{highlight.title}</h4>
                      <ul>
                        {highlight.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
                <p className="feature-details-subtext">
                  Platform notes: MIDI needs Android 10 or later. External displays depend on what the device supports.
                </p>
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
            <h1>Get Orbit‑X</h1>
            <p>
              Install from your app store or package manager for automatic updates, or download a
              build directly below.
            </p>
          </div>
          <div className="stores-row">
            {storesData.map((store) => {
              const badge = (
                <img
                  className={`store-badge store-badge-${store.id}`}
                  src={`${process.env.PUBLIC_URL}/badges/${store.badge}`}
                  alt={store.href ? `Get Orbit-X from the ${store.name}` : `${store.name} (coming soon)`}
                />
              );
              return (
                <div key={store.id} className="store-tile">
                  {store.href ? (
                    <a href={store.href} target="_blank" rel="noreferrer">
                      {badge}
                    </a>
                  ) : (
                    badge
                  )}
                  <span className="store-platforms">{store.platforms}</span>
                  {!store.href && <span className="download-badge">Coming soon</span>}
                  {store.beta?.map((link) => (
                    <a key={link.href} className="store-beta" href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              );
            })}
          </div>
          <div className="packages-grid">
            {packageManagers.map((pm) => (
              <div key={pm.id} className="package-card">
                <div className="package-head">
                  <h2>{pm.name}</h2>
                  <span className="store-platforms">{pm.platforms}</span>
                </div>
                {pm.command ? (
                  <pre className="package-command">
                    <code>{pm.command}</code>
                  </pre>
                ) : (
                  <span className="download-badge">Coming soon</span>
                )}
              </div>
            ))}
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
                <a
                  className="contact-social contact-discord"
                  href="https://discord.gg/RP8MBW9WAT"
                  target="_blank"
                  rel="noreferrer"
                >
                  Join our Discord
                </a>
              </div>
              <p>
                Behind-the-scenes looks at how Orbit‑X powers rehearsal rooms, cue stacks, and touring rigs.
              </p>
            </div>
            <div className="contact-card meet-dev-card">
              <h2>Meet the dev</h2>
              <p>
                Orbit‑X is owned by StoffAudio, the one-person studio founded by Jonathan Stoff. Every release is
                hand-built, tested, and supported directly by the same developer who runs the company.
              </p>
              <p>
                Want to chat about features or partnerships? Reach out via email or socials and you&rsquo;ll be speaking with
                Jonathan himself.
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

    if (activeTab === 'privacy') {
      return (
        <section className="privacy-section">
          <div className="privacy-intro">
            <span className="eyebrow">Legal &amp; Privacy</span>
            <h1>Privacy Policy</h1>
            <p className="privacy-meta">
              Effective Date: November 16, 2026 &nbsp;·&nbsp; Last Updated: November 16, 2026 &nbsp;·&nbsp; StoffAudio
            </p>
            <p>
              Orbit‑X (&ldquo;Orbit‑X: Show Control&rdquo;) is a local‑first show‑control platform built by StoffAudio for
              macOS, Windows, Linux, iOS, iPadOS, and Android, alongside our website at{' '}
              <a className="contact-link" href="https://www.orbit-x.app">
                orbit-x.app
              </a>
              . Your show files, media cues, and production setups belong to you and stay on your devices.
            </p>
          </div>

          <div className="privacy-grid">
            <article className="privacy-card">
              <h2>1. Local‑First Data Handling</h2>
              <p>
                Orbit‑X processes and stores your show projects (<code>.obx</code> / <code>.orbx</code> bundles), audio
                stems, video cues, still images, lighting looks, MIDI sequences, and hardware routing configurations
                <strong> locally on your device</strong>.
              </p>
              <ul>
                <li>
                  <strong>No Cloud Upload of Show Files:</strong> Your cue lists, cue names, media assets, and show
                  timings are never uploaded to StoffAudio servers.
                </li>
                <li>
                  <strong>Files, Photos &amp; Media Pickers:</strong> On iOS, iPadOS, Android, and desktop, when you tap{' '}
                  <em>+ Add cue</em> or open/save a project, Orbit‑X uses the operating system&rsquo;s native document
                  picker (<code>UIDocumentPickerViewController</code> / Android Storage Access Framework) or photo
                  library picker (<code>PHPickerViewController</code> / Android Photo Picker). Orbit‑X only accesses
                  the specific files or photos you explicitly select and never scans your library in the background.
                </li>
                <li>
                  <strong>Hardware &amp; Local Network Access:</strong> Orbit‑X enumerates connected audio interfaces,
                  displays, MIDI ports, and DMX/OSC devices on your machine or local network solely to execute your
                  show cues and recover cleanly if a device is unplugged.
                </li>
              </ul>
            </article>

            <article className="privacy-card">
              <h2>2. Analytics &amp; Tracking</h2>
              <p>
                We do <strong>not</strong> sell, rent, or monetize your personal data, and we do <strong>not</strong>{' '}
                embed third‑party behavioral advertising SDKs or cross‑app tracking identifiers in the Orbit‑X
                application (<code>NSPrivacyTracking = false</code>).
              </p>
              <ul>
                <li>
                  <strong>Desktop &amp; Mobile App:</strong> No background telemetry, behavioral profiling, or usage
                  analytics are collected while you build or run a show.
                </li>
                <li>
                  <strong>Website (orbit-x.app):</strong> Our website may collect standard, aggregated web server logs
                  (such as browser type, referring page, and coarse request timestamps) and standard Core Web Vitals
                  metrics solely to keep the site reliable and fast.
                </li>
              </ul>
            </article>

            <article className="privacy-card">
              <h2>3. Bug Diagnostics &amp; Crash Logs</h2>
              <p>
                Live shows demand high reliability. To help diagnose hardware disconnects or media decoding issues
                without compromising your privacy:
              </p>
              <ul>
                <li>
                  <strong>On‑Device Logs:</strong> Orbit‑X writes operational and error logs to your device&rsquo;s
                  local application log directory. These logs remain strictly on your device unless you choose to attach
                  them when contacting support.
                </li>
                <li>
                  <strong>OS Crash Reports:</strong> If you opt in to sharing crash diagnostics with app developers via
                  Apple (App Store / TestFlight), Google Play, or Microsoft Store, those platforms may provide us with
                  anonymized crash stack traces and device/OS version metadata governed by your OS privacy settings.
                </li>
                <li>
                  <strong>Apple Required Reason APIs:</strong> On Apple platforms, Orbit‑X accesses file timestamps (
                  <code>C617.1</code>), system boot/monotonic clock time (<code>35F9.1</code> for deterministic cue
                  timing), and local user defaults (<code>CA92.1</code>) strictly on‑device for core show functionality.
                </li>
              </ul>
            </article>

            <article className="privacy-card">
              <h2>4. User Feedback, Support &amp; Licensing</h2>
              <ul>
                <li>
                  <strong>Support &amp; Feedback:</strong> When you email us at{' '}
                  <a className="contact-link" href="mailto:info@orbit-x.app">
                    info@orbit-x.app
                  </a>{' '}
                  or reach out on Discord or social media with bug reports, feature requests, or production questions,
                  we receive your email address or handle and any diagnostic files or notes you voluntarily share so we
                  can assist you.
                </li>
                <li>
                  <strong>License Keys:</strong> If you enter a license key in Orbit‑X Settings, your license key and
                  associated email address are stored in your local settings file to display your license tier.
                </li>
              </ul>
            </article>

            <article className="privacy-card">
              <h2>5. Third‑Party Services &amp; Integrations</h2>
              <p>
                Orbit‑X interacts only with external platforms needed to distribute releases, accept voluntary
                donations, or connect to community channels you choose to open:
              </p>
              <ul>
                <li>
                  <strong>App Stores &amp; Package Repositories:</strong> Apple App Store &amp; TestFlight, Google Play
                  Store, Microsoft Store, Cloudsmith (Linux APT &amp; DNF repositories), GitHub Releases, and Supabase
                  S3 storage (used to serve direct installer downloads on our Downloads page). Downloads from these
                  services are governed by their respective privacy policies.
                </li>
                <li>
                  <strong>Donations:</strong> Voluntary contributions via the Donate button are processed directly by
                  PayPal. StoffAudio never receives or stores your payment card or bank details.
                </li>
                <li>
                  <strong>Social &amp; Community Links:</strong> External links to Discord, Instagram, and TikTok open
                  those services only when you click them.
                </li>
              </ul>
            </article>

            <article className="privacy-card">
              <h2>6. Data Retention, Children&rsquo;s Privacy &amp; Your Rights</h2>
              <ul>
                <li>
                  <strong>Data Control &amp; Deletion:</strong> You can delete your local <code>.obx</code> show files,
                  clear recent projects, or uninstall Orbit‑X at any time to remove all local application data. To
                  request deletion of any support emails or contact records held by StoffAudio, email{' '}
                  <a className="contact-link" href="mailto:info@orbit-x.app">
                    info@orbit-x.app
                  </a>{' '}
                  and we will fulfill your request within 30 days.
                </li>
                <li>
                  <strong>Educational &amp; Children&rsquo;s Privacy:</strong> Orbit‑X is used in schools, universities,
                  and community theaters. Because the app requires no user account and collects no personal data from
                  users, students and educators can run shows without submitting personal information. We do not
                  knowingly collect personal data from children under 13.
                </li>
                <li>
                  <strong>GDPR, CCPA &amp; Global Rights:</strong> Regardless of your location, you have the right to
                  request access to, correction of, or deletion of any personal information you have shared with us.
                </li>
              </ul>
            </article>
          </div>

          <div className="privacy-footer-card">
            <h2>Questions or Privacy Requests?</h2>
            <p>
              Contact Jonathan Stoff at StoffAudio:{' '}
              <a className="contact-link" href="mailto:info@orbit-x.app">
                info@orbit-x.app
              </a>
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
            A one-minute tour: build a cue list, trim a song, loop the background music, let cues count down
            themselves, mix and add effects.
          </p>
        </div>
        <div className="promo-wrapper">
          <video
            ref={promoVideoRef}
            className="promo-video"
            playsInline
            controls
            preload="metadata"
            poster="/marketing/ui_hero.png"
            aria-label="Orbit-X tour video"
          >
            {/* mp4s are gitignored here, so the tour is served from Supabase (make market-pub uploads it) */}
            <source
              src="https://rvcfjohfhblhvpnshzbd.supabase.co/storage/v1/object/public/orbitx-application-download/run-your-whole-show-from-one-button/final_wide_16x9.mp4"
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
        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isNavOpen}
          onClick={() => setIsNavOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav-tabs ${isNavOpen ? 'nav-tabs-open' : ''}`} id="primary-navigation">
          <button
            className={`nav-tab ${activeTab === 'overview' ? 'nav-tab-active' : ''}`}
            onClick={() => handleTabSelect('overview')}
            type="button"
          >
            Overview
          </button>
          <button
            className={`nav-tab ${activeTab === 'downloads' ? 'nav-tab-active' : ''}`}
            onClick={() => handleTabSelect('downloads')}
            type="button"
          >
            Downloads
          </button>
          <button
            className={`nav-tab ${activeTab === 'media' ? 'nav-tab-active' : ''}`}
            onClick={() => handleTabSelect('media')}
            type="button"
          >
            Media
          </button>
          <button
            className={`nav-tab ${activeTab === 'roadmap' ? 'nav-tab-active' : ''}`}
            onClick={() => handleTabSelect('roadmap')}
            type="button"
          >
            Roadmap
          </button>
          <button
            className={`nav-tab ${activeTab === 'contact' ? 'nav-tab-active' : ''}`}
            onClick={() => handleTabSelect('contact')}
            type="button"
          >
            Contact
          </button>
          <button
            className={`nav-tab ${activeTab === 'privacy' ? 'nav-tab-active' : ''}`}
            onClick={() => handleTabSelect('privacy')}
            type="button"
          >
            Privacy
          </button>
          <a
            className="nav-tab nav-tab-donate"
            href="https://www.paypal.com/donate/?hosted_button_id=XEAKWNJ9ST2NW"
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsNavOpen(false)}
          >
            Donate
          </a>
        </nav>
      </header>
      {renderContent()}
      <footer className="site-footer">
        <div className="footer-content">
          <span>© {currentYear} Orbit‑X. Owned by StoffAudio. All rights reserved.</span>
          <div className="footer-links">
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                handleTabSelect('privacy');
              }}
            >
              Privacy Policy
            </a>
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