import React from "react";
import { MapPin, Calendar, Users } from "lucide-react";

const ModernTemplate = ({ conf }) => {
  const {
    name,
    theme,
    location,
    date,
    description,
    banner,
  } = conf;

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="animate-in fade-in duration-500 bg-[#020617] min-h-screen text-slate-200">

      {/* ================= HERO ================= */}

      <div
        className="h-[600px] w-full bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${
            banner ||
            "https://images.unsplash.com/photo-1551817958-20204d6ab3a6?auto=format&fit=crop&q=80&w=2000"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-[#020617]" />

        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div className="max-w-4xl text-white space-y-8 animate-in slide-in-from-bottom-8 duration-700">

            <span className="bg-white/10 border border-white/20 text-indigo-200 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest backdrop-blur-md">
              {theme || "Conference"}
            </span>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400 drop-shadow-2xl">
              {name || "Conference Name"}
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
              {description || "An unforgettable conference experience."}
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
              <button
                onClick={() => scrollToSection("essentials")}
                className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/30 hover:scale-105"
              >
                Get Tickets
              </button>

              <button
                onClick={() => scrollToSection("speakers")}
                className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
              >
                View Speakers
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}

      <div className="max-w-7xl mx-auto py-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-20">

            {/* ABOUT */}
            <section id="about">
              <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4">
                <span className="text-indigo-500">01.</span> About the Event
              </h2>

              <p className="text-xl text-slate-400 leading-relaxed font-light">
                Welcome to <span className="text-white">{name}</span>. 
                Join us in {location} on {date} as we explore{" "}
                <span className="text-indigo-400">{theme}</span>.
              </p>
            </section>

            {/* SPEAKERS */}
            <section id="speakers">
              <h2 className="text-4xl font-bold text-white mb-10 flex items-center gap-4">
                <span className="text-indigo-500">02.</span> Speakers
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-5 p-5 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-20 h-20 bg-slate-800 rounded-2xl overflow-hidden">
                      <img
                        src={`https://i.pravatar.cc/150?img=${i + 20}`}
                        alt="Speaker"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-xl text-white group-hover:text-indigo-400 transition-colors">
                        Guest Speaker {i}
                      </div>
                      <div className="text-sm text-slate-500 uppercase tracking-wider mt-1">
                        Industry Expert
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">

            <div
              id="essentials"
              className="bg-gradient-to-b from-indigo-900/20 to-slate-900/40 backdrop-blur-xl p-10 rounded-[2rem] border border-white/10 sticky top-28"
            >
              <h3 className="font-bold text-2xl mb-8 text-white">
                Event Essentials
              </h3>

              <div className="space-y-8">

                <div className="flex items-start gap-5 text-slate-400">
                  <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-white text-lg mb-1">
                      Location
                    </span>
                    <span>{location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-5 text-slate-400">
                  <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-white text-lg mb-1">
                      Date
                    </span>
                    <span>{date}</span>
                  </div>
                </div>

                <div className="flex items-start gap-5 text-slate-400">
                  <div className="p-3 bg-pink-500/20 text-pink-400 rounded-2xl">
                    <Users size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-white text-lg mb-1">
                      Capacity
                    </span>
                    <span>500+ Attendees</span>
                  </div>
                </div>

              </div>

              <button className="w-full mt-10 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-slate-200 transition-all shadow-xl">
                Contact Organizer
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
