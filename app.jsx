/* eslint-disable */
/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback } = React;

/* ============================ TWEAK DEFAULTS ============================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "editorial",
  "heroPhoto": "harbour",
  "plansLayout": "magazine",
  "showFlourish": true,
  "accentTone": "estate"
}/*EDITMODE-END*/;

/* ============================ DATA ============================ */
const REELS = [
  {
    url: "https://www.instagram.com/howardthomson/reel/DXs8_UoCG4-/",
    handle: "@howardthomson",
    caption: "After You 🖤",
    fullCaption: "After You 🖤",
    cover: "uploads/DXs8_UoCG4-.jpg",
    video: "uploads/DXs8_UoCG4--h264.mp4?v=1",
    comments: [
      { author: "thisisjules",          text: "Gosh this stopped me in my tracks ❤️" },
      { author: "paulwordsmith",        text: "Wow this reminds me of Synechdoche, New York. Really emotive" },
      { author: "freeformimages.co.uk", text: "Stunning and lots of our beautiful North Devon especially Clovelly 💖🙌🏻" },
      { author: "suzannefieldart",      text: "Powerful❤️ 😢" },
      { author: "kizzylou71",           text: "Not sure what brought this to my feed, but it's beautiful 💔❤️" },
    ],
  },
  {
    url: "https://www.instagram.com/reel/Cs_ssdZOiE4/",
    handle: "@howardthomson",
    caption: "Mermaid watching in Clovelly 🧜🏼‍♀️",
    fullCaption: `Mermaid watching in Clovelly 🧜🏼‍♀️(@bysha_k)

#clovelly #northdevon #devon #wildswimming`,
    cover: "uploads/Cs_ssdZOiE4.jpg",
    video: "uploads/Cs_ssdZOiE4.mp4",
    comments: [],
  },
  {
    url: "https://www.instagram.com/howardthomson/reel/C_VqOnnskgM/",
    handle: "@howardthomson",
    caption: "Happiness ⛵️",
    fullCaption: "Happiness ⛵️",
    cover: "uploads/C_VqOnnskgM.jpg",
    video: "uploads/C_VqOnnskgM.mp4",
    comments: [
      { author: "redlionclovelly", text: "Nowhere better 🙌" },
    ],
  },
  {
    url: "https://www.instagram.com/howardthomson/reel/C5VnMxQsYJY/",
    handle: "@howardthomson",
    caption: "#2: The Guernsey Literary & Potato Peel Pie Society",
    fullCaption: `#2: The Guernsey Literary & Potato Peel Pie Society

The second in a series of reels exploring locations used for film and TV in Devon and Cornwall.

The name might have you believe this film was shot on Guernsey, but the majority was actually filmed in North Devon. Clovelly was used for the scenes of St Peter Port, with CGI and the nearby town of Bideford being used to give the illusion of a much larger scene.

The coast at Hartland (one of my favourite walks 🤩) also features prominently, with some beautiful cinematography looking down towards Cornwall.

Where to watch: Netflix (UK) 📺

#devoncornwall #cinematography #clovelly #hartland #bideford #filminglocations #netflix #northdevon`,
    cover: "uploads/C5VnMxQsYJY.jpg",
    video: "uploads/C5VnMxQsYJY.mp4",
    comments: [
      { author: "j_white_2021",   text: "Guernsey is so stunning. Shame it was not filmed there" },
      { author: "rollergirl.23",  text: "😍😍😍👏👏👏🙌🙌🙌" },
    ],
  },
  {
    url: "https://www.instagram.com/howardthomson/reel/Cz61GdwML-A/",
    handle: "@howardthomson",
    caption: "Hartland, North Devon",
    fullCaption: `Hartland, North Devon

One of my favourite stretches of coastline, just North of the border between Devon and Cornwall. Home to shipwrecks, waterfalls, epic views, and not forgetting the lighthouse 🫠

#hartland #hartlandquay #spekesmill #northdevon #devon #visitdevon #southwestengland #hiking #djimavic3 #sonya7iv`,
    cover: "uploads/Cz61GdwML-A.jpg",
    video: "uploads/Cz61GdwML-A.mp4",
    comments: [
      { author: "smurf9130",                  text: "One of my favourite places. We used to stay in Hartland as a family years ago. So many happy memories ❤️" },
      { author: "keeping_a_lighthouse",        text: "That's epic mate! Awesome editing" },
      { author: "exploring_with_em_and_milo",  text: "It's a great stretch of coast path! 😍" },
      { author: "gabbygoesexploring",          text: "Love this!!!!" },
    ],
  },
  {
    url: "https://www.instagram.com/howardthomson/reel/Csx0KvRNSaq/",
    handle: "@howardthomson",
    caption: "North Devon — how many spots do you recognise?",
    fullCaption: `From rugged coastlines to sandy beaches, national parks and now a World Surfing Reserve, North Devon has plenty to offer! How many of these spots do you recognise?

1. Saunton Sands
2. Valley of Rocks
3. Instow / Appledore
4. Abbotsham
5. Watermouth Cove
6. Clovelly
7. Hartland Point
8. Speke's Mill
9. Blackchurch Rock
10. Ilfracombe`,
    cover: "uploads/Csx0KvRNSaq.jpg",
    video: "uploads/Csx0KvRNSaq.mp4",
    comments: [
      { author: "olive_lodge_",                text: "I am lucky to live here 💕" },
      { author: "katherinebarberjewellery",     text: "So beautiful 😍 aren't we lucky to call it home" },
      { author: "stevehernamanart",             text: "yes it bleddy does, who needs jet setting!" },
      { author: "thetwitfortwoo",               text: "Love this 🔥" },
      { author: "guyharrop",                   text: "Looks great!" },
    ],
  },
];

const PLANS = [
  {
    tag: "Digital Refresh",
    title: "A measured refresh of the websites.",
    body: [
      "The Clovelly and Red Lion sites are several years old. Working at Panoptic, I've already maintained them — so a refresh in-house, in a phased rollout, is well within reach. No agency contract, no rebuild from scratch.",
      "The aim is editorial pacing, full-bleed photography, faster booking flows, and a content layer that finally puts the village's own storytelling at the centre. Built once, kept current quarterly."
    ],
  },
  {
    tag: "Membership",
    title: "Memberships that earn frequent visits.",
    body: [
      "Annual membership today gets unlimited entry. There's room to do more for the people who actually return. Behind-the-scenes evenings with the gardeners, exclusive webcam feeds (already integrated), printed seasonal newsletters from the estate.",
      "The goal is fewer one-time tickets and more long-term advocates — visitors who see Clovelly as theirs, and bring people."
    ],
  },
  {
    tag: "Content & Social",
    title: "A weekly rhythm of village content.",
    body: [
      "I'm already producing reels at sunrise. The next step is treating that as a programme — a publishing rhythm, a small library of evergreen pieces, and seasonal campaigns timed to gardens, festivals, and weather. Reels remain the lead format, but with newsletter, blog and printed counterparts.",
      "Most importantly: shot in the village, by someone who is in the village, with no stock photography between the audience and the place."
    ],
  }
];

/* ============================ NAV ============================ */
function NavBar() {
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState("about");
  useEffect(() => {
    const onScroll = () => setPinned(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const ids = ["about", "work", "ticketing", "plans", "contact"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  const link = (id, label) => (
    <a key={id} href={`#${id}`} className={active === id ? "is-active" : ""}>{label}</a>
  );
  return (
    <nav className={`app-nav ${pinned ? "is-pinned" : ""}`}>
      <a href="#top" className="app-nav__brand">
        <span className="name">Howard Thomson</span>
      </a>
      <div className="app-nav__links">
        {link("about", "About")}
        {link("work", "Current Work")}
        {link("ticketing", "Ticketing")}
        {link("plans", "Plans")}
        {link("contact", "Contact")}
      </div>
      <a href="#contact" className="app-nav__cta">Get in touch</a>
    </nav>
  );
}

/* ============================ HERO ============================ */
function Hero({ variant, photo }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      const bg = el.querySelector(".hero__bg-track");
      if (bg) bg.style.transform = `translateY(${y * 0.25}px) scale(1.05)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  if (variant === "letter") {
    return (
      <section ref={ref} className="hero hero--letter" id="top">
        <div className="hero__inner">
          <div className="hero__eyebrow">A note to Clovelly Estate · May 2026</div>
          <h1>
            Dear Clovelly,<br/>
            I'd like to <span className="accent">do more</span> than maintain your websites.
          </h1>
          <p className="hero__lede">
            I'm Howard Thomson — a web developer and filmmaker at Panoptic. I already build and look after your sites, and I visit the village often (usually before sunrise) to make content for your social. I'd like to apply for the Marketing Coordinator role.
          </p>
          <div className="hero__sig">— Howard</div>
          <div className="hero__meta-rail">
            <div><div className="label">Role</div><div className="value">Marketing &amp; Events Co-ordinator</div></div>
            <div><div className="label">Based</div><div className="value">Devon</div></div>
            <div><div className="label">Available</div><div className="value">Immediately</div></div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "quiet") {
    return (
      <section ref={ref} className="hero hero--quiet" id="top">
        <div className="hero__inner">
          <div className="hero__copy">
            <div className="hero__eyebrow">Application · Marketing &amp; Events Co-ordinator</div>
            <h1>
              Howard <span className="accent">Thomson</span>
              <br/>for Clovelly.
            </h1>
            <div className="hero__ctas">
              <a href="#about" className="btn btn--primary">Read the application</a>
              <a href="#work" className="btn btn--ghost-light">See the work</a>
            </div>
          </div>
          <div className="hero__meta">
            <div className="hero__meta-row">
              <span className="label">Role</span>
              <span className="value">Marketing &amp; Events Co-ordinator</span>
            </div>
            <div className="hero__meta-row">
              <span className="label">From</span>
              <span className="value">Howard Thomson</span>
            </div>
            <div className="hero__meta-row">
              <span className="label">Currently</span>
              <span className="value">Filmmaker & web dev, Panoptic</span>
            </div>
            <div className="hero__meta-row">
              <span className="label">Date</span>
              <span className="value">May 2026</span>
            </div>
          </div>
        </div>
        <div className="hero__cue">Scroll<span className="line"></span></div>
      </section>
    );
  }

  // default editorial
  return (
    <section ref={ref} className="hero" id="top" data-photo={photo}>
      <div className="hero__bg-track" style={{ position: "absolute", inset: 0, zIndex: 0 }} aria-hidden="true">
        <video className="hero__bg-video" src="assets/clovelly-header.mp4" autoPlay muted loop playsInline />
      </div>
      <div className="hero__inner">
        <div className="hero__copy">
          <div className="hero__eyebrow">Application · Marketing &amp; Events Co-ordinator</div>
          <h1>
            Howard Thomson
          </h1>
          <div className="hero__ctas">
            <a href="#about" className="btn btn--primary">Read the application</a>
            <a href="#work" className="btn btn--ghost-light">See the work</a>
          </div>
        </div>
        <div className="hero__meta">
          <div className="hero__meta-row">
            <span className="label">Role</span>
            <span className="value">Marketing Coordinator</span>
          </div>
          <div className="hero__meta-row">
            <span className="label">Currently</span>
            <span className="value">Panoptic — web & film</span>
          </div>
          <div className="hero__meta-row">
            <span className="label">Date</span>
            <span className="value">May 2026</span>
          </div>
        </div>
      </div>
      <div className="hero__cue">Scroll<span className="line"></span></div>
    </section>
  );
}

/* ============================ ABOUT ============================ */
function About() {
  return (
    <section className="section" id="about" data-screen-label="01 About">
      <div className="section__head reveal">
        <div className="label"><span className="num">01</span>About me</div>
        <h2>Content, socials, web and event experience.</h2>
      </div>
      <div className="about__grid">
        <div className="about__col reveal">
          <div className="about__body">
            <p>
              When a friend sent me the link to your marketing role, they said "this is a bit of you". I wasn't looking for a new role, but they were right. They knew I built the current Clovelly and Red Lion websites, how I make my way back to the village every few weeks to film social content, and the experience I have working with events.
            </p>
            <p>
              Many of the estate team will know me from my work at Panoptic, the agency that looks after your websites, integrates your memberships with Donkey webcams and produces the film and photo content from your event calendar. Equally, many in the village know me from my personal Instagram, to the point that I get DMs when a drone is flying in the village, because they assume it'll be me.
            </p>
            <p>
              When I saw the role, I simply had to find out more. This page is a brief overview of some of the content that I've personally produced in and around the village, along with some ideas for how the estate can better leverage digital platforms to increase visitor numbers and revenue.
            </p>
          </div>
          <div className="about__credits">
            <div className="about__credit">
              <div className="label">Currently</div>
              <div className="value">Panoptic</div>
              <div className="meta">Web developer · Filmmaker</div>
            </div>
            <div className="about__credit">
              <div className="label">Working with Clovelly</div>
              <div className="value">3+ years</div>
              <div className="meta">Site, social, events</div>
            </div>
          </div>
        </div>

        <div className="about__col about__col--photo reveal">
          <img className="about__photo" src="uploads/boats.jpg" alt="Clovelly harbour at dawn" />
        </div>
      </div>
    </section>
  );
}

/* ============================ BEHIND THE SCENES ============================ */
function BehindTheScenes() {
  return (
    <section className="section section--bts">
      <div className="section__head reveal">
        <div className="label">Behind the lens</div>
        <h2>Early mornings <em>in the village.</em></h2>
      </div>
      <div className="bts__grid reveal-child">
        <img className="bts__photo" src="uploads/bts-1.jpg" alt="Camera set up at Clovelly harbour" />
        <img className="bts__photo" src="uploads/bts-2.jpg" alt="Filming through the cobbled archway" />
        <img className="bts__photo" src="uploads/bts-3.jpg" alt="On location in the village" />
      </div>
    </section>
  );
}

/* ============================ REEL MODAL ============================ */
function ReelModal({ reel, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="reel-modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className="reel-modal__inner" onClick={e => e.stopPropagation()}>
        <button className="reel-modal__close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <video
          className="reel-modal__video"
          src={reel.video}
          controls
          autoPlay
          playsInline
        />
        <div className="reel-modal__info">
          <p className="reel-modal__handle">{reel.handle}</p>
          <p className="reel-modal__caption">{reel.fullCaption}</p>
          {reel.comments && reel.comments.length > 0 && (
            <div className="reel-modal__comments">
              <p className="reel-modal__comments-label">Comments</p>
              {reel.comments.map((c, i) => (
                <div key={i} className="reel-modal__comment">
                  <span className="reel-modal__comment-author">@{c.author}</span>
                  <span className="reel-modal__comment-text">{c.text}</span>
                </div>
              ))}
            </div>
          )}
          <a
            href={reel.url}
            target="_blank"
            rel="noopener"
            className="btn btn--white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            View on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}

/* ============================ REELS CAROUSEL ============================ */
function ReelsCarousel() {
  const [index, setIndex] = useState(0);
  const [openReel, setOpenReel] = useState(null);
  const total = REELS.length;
  const next = useCallback(() => setIndex(i => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex(i => (i - 1 + total) % total), [total]);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    // only listen when reels in view
    const el = document.getElementById("work");
    if (!el) return;
    let active = false;
    const obs = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; }, { threshold: 0.3 });
    obs.observe(el);
    const handler = (e) => { if (active) onKey(e); };
    window.addEventListener("keydown", handler);
    return () => { window.removeEventListener("keydown", handler); obs.disconnect(); };
  }, [next, prev]);

  // touch swipe
  const stageRef = useRef(null);
  useEffect(() => {
    const el = stageRef.current; if (!el) return;
    let startX = 0;
    const onStart = (e) => { startX = e.touches[0].clientX; };
    const onEnd = (e) => {
      const dx = (e.changedTouches[0].clientX - startX);
      if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd);
    return () => { el.removeEventListener("touchstart", onStart); el.removeEventListener("touchend", onEnd); };
  }, [next, prev]);

  const phoneStyle = (i) => {
    const offset = i - index;
    const total = REELS.length;
    let normalized = offset;
    if (normalized > total / 2) normalized -= total;
    if (normalized < -total / 2) normalized += total;
    const abs = Math.abs(normalized);
    const x = normalized * 130;
    const z = -abs * 200;
    const rotY = normalized * -18;
    const opacity = abs > 2 ? 0 : (abs === 0 ? 1 : 0.55 - (abs * 0.12));
    const scale = abs === 0 ? 1 : 0.85 - (abs * 0.05);
    const zIndex = 10 - abs;
    return {
      transform: `translate3d(${x}px, 0, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
      opacity,
      zIndex,
      pointerEvents: abs === 0 ? "auto" : (abs <= 1 ? "auto" : "none")
    };
  };

  return (
    <section className="section section--inverse" id="work" data-screen-label="02 Current Work">
      <div className="section__inner">
        <div className="section__head reveal">
          <div className="label"><span className="num">02</span>Current work</div>
          <h2>Examples of previous social posts</h2>
        </div>
        <div className="reels">
          <div className="reels__copy reveal">
            <p className="lede">
              I'm often in Clovelly before the village wakes — quiet light, no crowds, the donkeys still in their stable.
            </p>
            <p>
              These are five recent reels I've shot, edited and posted for my personal Instagram. The thumbnails here link out to the originals.
            </p>
            <p>
              I treat content as a programme, not a one-off — a regular, low-fuss rhythm of pieces shot in the village by someone who is in the village.
            </p>
            <a href="https://www.instagram.com/howardthomson/" target="_blank" rel="noopener" className="reels__handle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
              See more on @howardthomson
            </a>
            <div className="reels__stats">
              <div className="reels__stat">
                <div className="num">58k+</div>
                <div className="lbl">Combined plays</div>
              </div>
              <div className="reels__stat">
                <div className="num">06:14</div>
                <div className="lbl">Avg start time</div>
              </div>
              <div className="reels__stat">
                <div className="num">6</div>
                <div className="lbl">Reels shown</div>
              </div>
            </div>
          </div>
          <div className="reels__stage" ref={stageRef}>
            {REELS.map((reel, i) => (
              <button
                key={reel.url}
                className="phone"
                style={phoneStyle(i)}
                onClick={() => { if (i !== index) { setIndex(i); } else { setOpenReel(reel); } }}
                aria-label={`Open reel: ${reel.caption}`}
              >
                <div className="phone__screen" data-i={i}>
                  <div className="phone__notch"></div>
                  <img className="phone__cover" src={reel.cover} alt="" />
                  <div className="phone__overlay">
                    <div className="phone__handle">{reel.handle}</div>
                    <div className="phone__caption">{reel.caption}</div>
                  </div>
                  <div className="phone__sidebar">
                    <div className="phone__action">
                      <div className="phone__action-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>
                      </div>
                    </div>
                    <div className="phone__action">
                      <div className="phone__action-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="phone__play">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </button>
            ))}
            <div className="reels__controls">
              <button className="reels__btn" onClick={prev} aria-label="Previous reel">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 6l-6 6 6 6"/></svg>
              </button>
              <div className="reels__dots">
                {REELS.map((_, i) => (
                  <button
                    key={i}
                    className={`reels__dot ${i === index ? "is-active" : ""}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Reel ${i + 1}`}
                  />
                ))}
              </div>
              <button className="reels__btn" onClick={next} aria-label="Next reel">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 6l6 6-6 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {openReel && <ReelModal reel={openReel} onClose={() => setOpenReel(null)} />}
    </section>
  );
}

/* Decorative SVG art layered into each phone "frame" — placeholder for the
   real reel poster frames the user will upload. */
function PhoneArt({ tone }) {
  const palettes = {
    harbour: { sky: "#3a4a4a", mid: "#5a6e6c", land: "#1d2d2e" },
    cobble:  { sky: "#7a6c54", mid: "#5a4d3a", land: "#1a140d" },
    garden:  { sky: "#5a7a55", mid: "#3a5a3a", land: "#0a1f12" },
    wood:    { sky: "#6a4a3a", mid: "#3e2a1f", land: "#1a0f0a" },
    sea:     { sky: "#8aa6c0", mid: "#4a6680", land: "#1f3340" }
  };
  const p = palettes[tone] || palettes.harbour;
  return (
    <svg viewBox="0 0 280 580" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id={`g-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.sky} />
          <stop offset="60%" stopColor={p.mid} />
          <stop offset="100%" stopColor={p.land} />
        </linearGradient>
      </defs>
      <rect width="280" height="580" fill={`url(#g-${tone})`} />
      {/* horizon and texture */}
      <path d="M0 380 Q70 360 140 372 T280 368 L280 580 L0 580 Z" fill={p.land} opacity="0.7" />
      <path d="M0 430 Q90 410 180 425 T280 420 L280 580 L0 580 Z" fill="#000" opacity="0.35" />
      {/* subtle silhouette of cobble/roofs */}
      <g opacity="0.65" fill={p.land}>
        <rect x="40" y="340" width="34" height="46" />
        <polygon points="40,340 57,322 74,340" />
        <rect x="84" y="346" width="28" height="40" />
        <polygon points="84,346 98,330 112,346" />
        <rect x="160" y="334" width="36" height="52" />
        <polygon points="160,334 178,316 196,334" />
        <rect x="208" y="350" width="24" height="36" />
      </g>
      {/* sun/moon */}
      <circle cx="220" cy="160" r="28" fill="#FBF8F1" opacity="0.18" />
      <circle cx="220" cy="160" r="18" fill="#FBF8F1" opacity="0.25" />
    </svg>
  );
}

/* ============================ TICKETING ============================ */
function Ticketing() {
  return (
    <section className="section section--parchment" id="ticketing" data-screen-label="03 Ticketing">
      <div className="section__inner">
        <div className="section__head reveal">
          <div className="label"><span className="num">03</span>Membership &amp; ticketing</div>
          <h2>Turning visitors into <em>long-term members.</em></h2>
        </div>
        <p className="ticketing__lede reveal">
          At Panoptic, we built our own ticketing platform and used it across festivals and events nationwide. For Clovelly, I've worked closely with your existing provider — and I understand the infrastructure well enough to know where membership programmes win or lose people.
        </p>
        <div className="ticketing__body">
          <div className="ticketing__copy reveal">
            <p>
              Annual membership is currently a single-tier pass. There's room to do considerably more — layering in perks that reward return visits and give members a genuine sense of belonging to the estate, not just access to it.
            </p>
            <p>
              The technical groundwork is already there. I've built integrations between your ticket provider and member-only digital features, and I know how to extend that pattern without adding friction for visitors.
            </p>
            <ul className="ticketing__list">
              <li>Built the Panoptic ticketing platform — used at events and festivals across the country.</li>
              <li>Designed and shipped Clovelly's ticket-provider integration for exclusive member digital perks.</li>
              <li>Experienced with the full operations layer: onboarding flows, renewals, capacity management, on-the-day support.</li>
            </ul>
          </div>
          <div className="diagram reveal">
            <div className="diagram__title">Membership — opportunity areas</div>
            <div className="diagram__flow">
              <div className="diagram__arrow diagram__arrow--1" aria-hidden="true"></div>
              <div className="diagram__arrow diagram__arrow--2" aria-hidden="true"></div>

              <div className="diagram__step">
                <div className="diagram__step-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h18l-2 12H5L3 8z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></svg>
                </div>
                <div className="role">Access</div>
                <div className="name">Tiered membership</div>
                <p className="desc">Move beyond a single pass — offer tiers that give returning visitors a reason to upgrade and stay.</p>
              </div>

              <div className="diagram__step">
                <div className="diagram__step-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 14h4"/></svg>
                </div>
                <div className="role">Perks</div>
                <div className="name">Member-only experiences</div>
                <p className="desc">Behind-the-scenes evenings, printed seasonal newsletters, exclusive live feeds — perks that feel earned.</p>
              </div>

              <div className="diagram__step">
                <div className="diagram__step-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div className="role">Advocacy</div>
                <div className="name">Members who bring people</div>
                <p className="desc">The goal is fewer one-time tickets and more long-term advocates — people who think of Clovelly as theirs.</p>
              </div>
            </div>

            <div className="diagram__detail">
              <span className="diagram__detail-tag">Approach</span>
              <p className="diagram__detail-text">
                <strong>Single-click access</strong> to digital perks, persisted across sessions, expiring cleanly with the membership. No extra accounts for visitors. The same pattern can power <strong>any future member benefit</strong> — archive video, a gardener's diary, seasonal newsletters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ PLANS ============================ */
function Plans({ layout }) {
  if (layout === "journal") return <PlansJournal />;
  return (
    <section className="section" id="plans" data-screen-label="04 Future Plans">
      <div className="section__head reveal">
        <div className="label"><span className="num">04</span>Future marketing plans</div>
        <h2>If I had the brief, <em>here's where I'd start.</em></h2>
      </div>
      <div className={`plans ${layout === "cards" ? "plans--cards" : ""} ${layout === "essay" ? "plans--essay" : ""}`}>
        {PLANS.map((p, i) => (
          <article className="plan reveal" key={p.tag}>
            <div className="plan__num">{String(i + 1).padStart(2, "0")}</div>
            <header className="plan__head">
              <div className="plan__tag">{p.tag}</div>
              <h3 className="plan__title">{p.title}</h3>
            </header>
            <div className="plan__body">
              {p.body.map((para, j) => <p key={j}>{para}</p>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============================ PLANS — JOURNAL ============================ */
function PlansJournal() {
  const [page, setPage] = useState(0);
  const total = PLANS.length;
  const pages = [{ kind: "cover" }, ...PLANS.map(p => ({ kind: "plan", ...p })), { kind: "back" }];
  const max = pages.length - 1;
  const goNext = () => setPage(p => Math.min(p + 1, max));
  const goPrev = () => setPage(p => Math.max(p - 1, 0));

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      const el = document.getElementById("plans");
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.7 || r.bottom < window.innerHeight * 0.3) return;
      if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [max]);

  return (
    <section className="section section--parchment journal-section" id="plans" data-screen-label="04 Future Plans">
      <div className="section__inner">
        <div className="section__head reveal">
          <div className="label"><span className="num">04</span>Future marketing plans</div>
          <h2>From the <em>field notes.</em></h2>
        </div>
        <p className="journal-intro reveal">
          A pocket notebook I've been keeping on Clovelly. Four ideas, scribbled at the harbour, in the gardens, on the cobbles. Flip through.
        </p>

        <div className="journal reveal">
          <div className="journal__stage">
            <div className="journal__book" data-page={page}>
              {pages.map((p, i) => (
                <JournalPage key={i} index={i} current={page} total={pages.length} data={p} />
              ))}
              <div className="journal__spine" aria-hidden="true"></div>
              <div className="journal__shadow" aria-hidden="true"></div>
            </div>
          </div>

          <div className="journal__controls">
            <button className="journal__btn" onClick={goPrev} disabled={page === 0} aria-label="Previous page">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 6l-6 6 6 6"/></svg>
            </button>
            <div className="journal__counter">
              <span className="n">{String(page + 1).padStart(2, "0")}</span>
              <span className="sep">/</span>
              <span className="d">{String(pages.length).padStart(2, "0")}</span>
            </div>
            <button className="journal__btn" onClick={goNext} disabled={page === max} aria-label="Next page">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 6l6 6-6 6"/></svg>
            </button>
          </div>
          <div className="journal__hint">Use ← → or click the corners</div>
        </div>
      </div>
    </section>
  );
}

function JournalPage({ index, current, total, data }) {
  let state = "closed";
  if (index < current) state = "flipped";
  else if (index === current) state = "open";
  else if (index === current + 1) state = "next";
  else state = "queued";

  const z = total - Math.abs(index - current);
  const rot = state === "flipped" ? -172 : 0;
  const lift = state === "open" ? -2 : (state === "next" ? -1 : 0);

  if (data.kind === "cover") {
    return (
      <div
        className={`journal__page journal__page--cover is-${state}`}
        style={{ zIndex: z, transform: `rotateY(${rot}deg) translateZ(${lift}px)` }}
        onClick={() => state === "open" && document.querySelector('.journal__btn:last-of-type')?.click()}
      >
        <div className="journal__page-front cover">
          <div className="cover__rule cover__rule--top"></div>
          <div className="cover__rule cover__rule--bottom"></div>
          <div className="cover__wm">
            <span>FIELD</span>
            <span>NOTES</span>
            <span className="reg">®</span>
          </div>
          <div className="cover__sub">
            48-Page Pocket Brief<br/>
            Devon Edition / Made in Clovelly
          </div>
          <div className="cover__corner">
            <span>No.</span>
            <span>04</span>
          </div>
          <div className="cover__seal">CLOVELLY · 2026</div>
        </div>
        <div className="journal__page-back"></div>
      </div>
    );
  }
  if (data.kind === "back") {
    return (
      <div
        className={`journal__page journal__page--back is-${state}`}
        style={{ zIndex: z, transform: `rotateY(${rot}deg) translateZ(${lift}px)` }}
      >
        <div className="journal__page-front paper paper--end">
          <div className="paper__lines" aria-hidden="true"></div>
          <div className="paper__handwritten paper__handwritten--end">
            <p>That's the brief.</p>
            <p>Happy to come down to the Estate office and walk through any of it — I'm probably already in the village.</p>
            <p className="sig">— H.T.</p>
          </div>
          <div className="paper__page-num">— end —</div>
        </div>
        <div className="journal__page-back paper-back"></div>
      </div>
    );
  }

  // plan page
  const planIndex = index; // 1..N
  return (
    <div
      className={`journal__page is-${state}`}
      style={{ zIndex: z, transform: `rotateY(${rot}deg) translateZ(${lift}px)` }}
    >
      <div className="journal__page-front paper">
        <div className="paper__lines" aria-hidden="true"></div>
        <div className="paper__head">
          <span className="paper__date">Note {String(planIndex).padStart(2, "0")}</span>
          <span className="paper__loc">{data.tag}</span>
        </div>
        <h3 className="paper__title">{data.title}</h3>
        <div className="paper__body">
          {data.body.map((para, j) => <p key={j}>{para}</p>)}
        </div>
        <div className="paper__page-num">p. {planIndex * 12}</div>
      </div>
      <div className="journal__page-back paper-back"></div>
    </div>
  );
}

/* ============================ CONTACT ============================ */
function Contact() {
  return (
    <section className="contact" id="contact" data-screen-label="05 Contact">
      <div className="contact__inner">
        <div className="contact__copy">
          <h2>I'd love to talk it <em>through</em>.</h2>
          <p className="contact__lede">
            Happy to come to the Estate office, the Red Lion, or somewhere in the village — pick a morning.
          </p>
        </div>
        <div className="contact__channels">
          <a className="contact__channel" href="mailto:howard@howardthomson.co.uk">
            <span className="label">Email</span>
            <span className="value">howard@howardthomson.co.uk</span>
          </a>
          <a className="contact__channel" href="tel:+447000000000">
            <span className="label">Phone</span>
            <span className="value">Available on request</span>
          </a>
          <a className="contact__channel" href="https://www.linkedin.com/in/howardthomson/" target="_blank" rel="noopener">
            <span className="label">LinkedIn</span>
            <span className="value">linkedin.com/in/howardthomson</span>
          </a>
        </div>
      </div>
      <div className="contact__inner contact__sig">
        <span>Howard Thomson · Devon · 2026</span>
      </div>
    </section>
  );
}

/* ============================ APP ============================ */
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-child");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [t.heroVariant, t.plansLayout]);

  // smooth anchor scroll
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest("a[href^='#']");
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <NavBar />
      <Hero variant={t.heroVariant} photo={t.heroPhoto} />
      <About />
      <ReelsCarousel />
      <BehindTheScenes />
      <Ticketing />
      <Plans layout={t.plansLayout} />
      <Contact />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero">
          <TweakRadio
            label="Style"
            value={t.heroVariant}
            onChange={(v) => setTweak("heroVariant", v)}
            options={[
              { value: "editorial", label: "Editorial" },
              { value: "quiet", label: "Quiet" },
              { value: "letter", label: "Letter" }
            ]}
          />
          {t.heroVariant === "editorial" && (
            <TweakRadio
              label="Mood"
              value={t.heroPhoto}
              onChange={(v) => setTweak("heroPhoto", v)}
              options={[
                { value: "harbour", label: "Harbour" },
                { value: "cobble",  label: "Cobble" },
                { value: "garden",  label: "Garden" }
              ]}
            />
          )}
        </TweakSection>
        <TweakSection label="Future plans">
          <TweakSelect
            label="Layout"
            value={t.plansLayout}
            onChange={(v) => setTweak("plansLayout", v)}
            options={[
              { value: "journal", label: "Field Notes journal" },
              { value: "magazine", label: "Magazine" },
              { value: "cards", label: "Cards" },
              { value: "essay", label: "Essay" }
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
