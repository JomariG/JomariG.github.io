"use client";

import { useEffect, useRef, useState } from "react";

/* ================= DATA ================= */

const NAV_ITEMS = ["Home", "Work", "About", "Contact"];

const PROJECTS = [
  {
    id: 1,
    title: "Pay Parking",
    desc: "Parking payment system for vehicles.",
  },
  {
    id: 2,
    title: "Van Manifest",
    desc: "Real-time passenger and cargo tracking.",
  },
  {
    id: 3,
    title: "Nesa BO App & Web",
    desc: "Tracking and Monitoring the Bad Orders ect.",
  },
];

const SKILLS = [
  { name: "CodeIgniter", level: 95 },
  { name: "Laravel", level: 90 },
  { name: "PHP", level: 88 },
  { name: "JavaScript", level: 80 },
];

/* ================= REUSABLE ================= */

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="px-6 md:px-12 py-24 md:py-32 max-w-6xl mx-auto">
    {children}
  </section>
);

const labelClass = "text-xs tracking-[0.12em] uppercase text-white font-medium";

/* ================= TYPING ================= */

function TypingText({
  text,
  speed = 80,
  loop = false,
}: {
  text: string;
  speed?: number;
  loop?: boolean;
}) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!deleting && idx < text.length) {
      const t = setTimeout(() => {
        setDisplayed(text.slice(0, idx + 1));
        setIdx(idx + 1);
      }, speed);
      return () => clearTimeout(t);
    } else if (!deleting && idx === text.length && loop) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    } else if (deleting && idx > 0) {
      const t = setTimeout(() => {
        setDisplayed(text.slice(0, idx - 1));
        setIdx(idx - 1);
      }, speed / 2);
      return () => clearTimeout(t);
    } else if (deleting && idx === 0) {
      setDeleting(false);
    }
  }, [idx, deleting, text, speed, loop]);

  return (
    <span>
      {displayed}
      <span
        style={{
          opacity: Math.sin(Date.now() / 500) > 0 ? 1 : 0,
          transition: "opacity 0.1s",
        }}
      >
        |
      </span>
    </span>
  );
}

/* ================= METEOR ================= */

function Meteor() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const meteors = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * -window.innerHeight,
      speed: 4 + Math.random() * 4,
      len: 80 + Math.random() * 120,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      meteors.forEach((m) => {
        m.x += m.speed;
        m.y += m.speed;

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.len, m.y - m.len);
        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 1;
        ctx.stroke();

        if (m.y > canvas.height) {
          m.x = Math.random() * window.innerWidth;
          m.y = -50;
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
      ref={ref}
    />
  );
}

/* ================= MAIN ================= */

export default function Home() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf: number;

    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setCursor({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen antialiased overflow-x-hidden">
      <Meteor />

      {/* CURSOR GLOW */}
      <div
        className="fixed z-0 pointer-events-none"
        style={{
          left: cursor.x - 150,
          top: cursor.y - 150,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08), transparent)",
        }}
      />

      {/* NAV */}
      <nav className="fixed top-0 w-full flex justify-between px-6 md:px-12 py-4 z-50 bg-black/60 backdrop-blur mb-12 border-b border-white/10 pb-6">
        <h1 className="font-semibold tracking-wide">JG</h1>
        <div className="flex gap-6 text-sm text-white/80">
          {NAV_ITEMS.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="h-screen flex flex-col justify-center items-center text-center px-6 relative z-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <img
            src="http://172.16.161.34:8080/hrms/images/users/03701-2023=2024-01-25=Profile=14-27-57-PM.jpg"
            alt="Jomari"
            className="w-20 h-20 rounded-full border border-white/30 object-cover"
          />

          <p className="text-lg md:text-xl font-medium">
            <TypingText text="Hi! I'm Jomari Galleros " speed={80} loop />
          </p>
        </div>

        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            I build
            <br />
            <span className="text-red-500/70">digital experiences.</span>
          </h1>

          <p className="mt-5 text-gray-400 text-base md:text-lg">
            Full-stack developer focused on building clean, fast, and modern web
            applications.
          </p>

          <div className="flex gap-4 mt-8 justify-center">
            <a
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition"
              href="#work"
            >
              View work ↓
            </a>
            <a
              className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 transition"
              href="#contact"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="fade-in stagger-6 mt-10">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              height: 52,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "0 12px",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* GitHub */}
            <a
              href="https://github.com/JomariG"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 38,
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 438.549 438.549"
                width="20"
                height="20"
                fill="rgba(255,255,255,0.65)"
              >
                <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              style={{
                width: 38,
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20"
                height="20"
                fill="rgba(255,255,255,0.65)"
              >
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56c3.97,0,7.19,2.73,7.19,8.26V39z" />
              </svg>
            </a>
            {/* X */}
            <a
              href="#"
              style={{
                width: 38,
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20"
                height="20"
                fill="rgba(255,255,255,0.65)"
              >
                <path d="M5.9199 6L20.582 27.375L6.2304 44H9.4101L21.9863 29.4219L31.9863 44H44L28.6816 21.6699L42.1992 6H39.0293L27.2754 19.6172L17.9336 6H5.9199Z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="#"
              style={{
                width: 38,
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20"
                height="20"
                fill="rgba(255,255,255,0.65)"
              >
                <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              style={{
                width: 38,
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20"
                height="20"
                fill="rgba(255,255,255,0.65)"
              >
                <path d="M16 3C8.83 3 3 8.83 3 16v18c0 7.17 5.83 13 13 13h18c7.17 0 13-5.83 13-13V16C47 8.83 41.17 3 34 3H16zm9 11c6.06 0 11 4.94 11 11s-4.94 11-11 11-11-4.94-11-11 4.94-11 11-11zm0 2c-4.98 0-9 4.02-9 9s4.02 9 9 9 9-4.02 9-9-4.02-9-9-9zm12-3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden py-5 border-y border-white/10">
        <div className="flex gap-8 animate-marquee whitespace-nowrap text-white/40 text-sm tracking-wider uppercase">
          {[...Array(2)]
            .flatMap(() => [
              "UI Design",
              "●",
              "Full-Stack Dev",
              "●",
              "Branding",
              "●",
              "Motion Design",
              "●",
              "Design Systems",
              "●",
              "Product Strategy",
              "●",
            ])
            .map((item, i) => (
              <span key={i} className={item === "●" ? "text-white/20" : ""}>
                {item}
              </span>
            ))}
        </div>
      </div>

      {/* WORK */}
      <Section>
        <div
          id="work"
          className="flex justify-between mb-12 border-b border-white/10 pb-6"
        >
          <h2 className="font-serif text-4xl md:text-5xl">Projects</h2>
          <span className="text-xs text-white tracking-widest uppercase">
            2022 – Present
          </span>
        </div>

        {PROJECTS.map((p) => (
          <div key={p.id} className="group mb-10 pb-6 border-b border-white/10">
            <h3 className="text-xl group-hover:opacity-70 transition">
              {p.title}
            </h3>
            <p className="text-gray-400 mt-2">{p.desc}</p>
          </div>
        ))}
      </Section>

      {/* ABOUT */}
      <Section>
        <div id="about" className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <p className={labelClass}>About</p>

            <h2 className="font-serif text-4xl md:text-6xl leading-tight mt-6 mb-6">
              Crafting interfaces
              <br />
              <em className="text-red-500/70">that feel inevitable.</em>
            </h2>

            <p className="text-white/50 leading-relaxed mb-4">
              I'm a designer and developer turning complex problems into
              elegant, functional products.
            </p>

            <p className="text-white/50 leading-relaxed">
              I design intuitive and user-friendly interfaces that empower
              businesses to harness the full potential of their data. Our
              platform provides real-time insights, analytics, and
              visualizations to help you make informed decisions and drive
              operational efficiency.
            </p>
          </div>

          <div>
            <p className={labelClass}>Skills</p>

            <div className="flex flex-col gap-6 mt-6">
              {SKILLS.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm text-white/70 mb-2">
                    <span>{s.name}</span>
                    <span className="text-white/30">{s.level}%</span>
                  </div>

                  <div className="h-[2px] bg-white/10">
                    <div
                      className="h-full bg-white transition-all duration-700"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <section
        id="contact"
        className="text-center py-24 border-t border-white/10"
      >
        <p className={labelClass}>Contact</p>

        <h2 className="font-serif text-5xl md:text-8xl mt-6 mb-10 leading-tight">
          Lets build
          <br />
          <em className="text-red-500/70">something great.</em>
        </h2>

        <a
          href="mailto:jomarigalleros98@gmail.com"
          className="inline-block bg-white text-black px-10 py-4 rounded-full font-medium hover:scale-105 transition"
        >
          jomarigalleros98@gmail.com ↗
        </a>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2026 Jomari Galleros
      </footer>
    </div>
  );
}
