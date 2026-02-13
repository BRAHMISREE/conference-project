import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Image,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const CreateConference = ({ onCancel, onSuccess }) => {
  const { createConference } = useApp();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    theme: "",
    location: "",
    date: "",
    description: "",
    template: "modern",
    banner: "",
  });

  /* ================= VALIDATION ================= */

  const validateStepOne = () => {
    return (
      data.name.trim() &&
      data.theme.trim() &&
      data.location.trim() &&
      data.date
    );
  };

  const handleNext = () => {
    if (!validateStepOne()) return;
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      createConference(data);
      setLoading(false);
      onSuccess();
    }, 600);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[650px]">

        {/* ================= SIDEBAR ================= */}

        <div className="bg-slate-950/60 p-10 border-r border-white/5 md:w-1/3 flex flex-col justify-between relative">

          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <span className="font-bold text-white tracking-wide text-lg">
                Conference Studio
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-3">
              Build Your Event
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed">
              Craft a premium conference experience with a modern,
              professional design.
            </p>

            {/* Progress */}
            <div className="mt-12 space-y-8">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition ${
                      step >= s
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {s}
                  </div>
                  <span
                    className={`font-medium ${
                      step >= s ? "text-white" : "text-slate-500"
                    }`}
                  >
                    {s === 1 ? "Basic Details" : "Visual Identity"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white text-sm flex items-center gap-2 transition"
          >
            <ArrowRight className="rotate-180" size={16} />
            Cancel & Exit
          </button>
        </div>

        {/* ================= FORM AREA ================= */}

        <div className="p-12 md:w-2/3 bg-slate-900/30 flex flex-col">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">

            {/* ================= STEP 1 ================= */}

            {step === 1 && (
              <div className="space-y-6 flex-1 animate-fadeIn">
                <h3 className="text-2xl font-bold text-white">
                  Conference Essentials
                </h3>

                <input
                  required
                  placeholder="Conference Name"
                  value={data.name}
                  onChange={(e) =>
                    setData({ ...data, name: e.target.value })
                  }
                  className="w-full p-4 bg-black/20 border border-white/10 focus:border-indigo-500 rounded-xl outline-none text-white"
                />

                <div className="grid grid-cols-2 gap-5">
                  <input
                    required
                    placeholder="Topic"
                    value={data.theme}
                    onChange={(e) =>
                      setData({ ...data, theme: e.target.value })
                    }
                    className="p-4 bg-black/20 border border-white/10 focus:border-indigo-500 rounded-xl outline-none text-white"
                  />

                  <input
                    required
                    type="date"
                    value={data.date}
                    onChange={(e) =>
                      setData({ ...data, date: e.target.value })
                    }
                    className="p-4 bg-black/20 border border-white/10 focus:border-indigo-500 rounded-xl outline-none text-white [color-scheme:dark]"
                  />
                </div>

                <input
                  required
                  placeholder="Location"
                  value={data.location}
                  onChange={(e) =>
                    setData({ ...data, location: e.target.value })
                  }
                  className="w-full p-4 bg-black/20 border border-white/10 focus:border-indigo-500 rounded-xl outline-none text-white"
                />

                <textarea
                  placeholder="Event Description"
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  className="w-full p-4 bg-black/20 border border-white/10 focus:border-indigo-500 rounded-xl h-28 outline-none resize-none text-white"
                />

                <div className="flex justify-end pt-6">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!validateStepOne()}
                    className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-40"
                  >
                    Next <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 2 ================= */}

            {step === 2 && (
              <div className="flex-1 flex flex-col space-y-8 animate-fadeIn">

                <h3 className="text-2xl font-bold text-white">
                  Visual Identity
                </h3>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">
                    Banner Image URL
                  </label>
                  <div className="flex items-center gap-3">
                    <Image size={18} className="text-slate-500" />
                    <input
                      placeholder="https://..."
                      value={data.banner}
                      onChange={(e) =>
                        setData({ ...data, banner: e.target.value })
                      }
                      className="flex-1 p-4 bg-black/20 border border-white/10 focus:border-indigo-500 rounded-xl outline-none text-white"
                    />
                  </div>
                </div>

                {/* Template Selection */}
                <div className="grid grid-cols-3 gap-4">
                  {["modern", "classic", "minimal"].map((t) => (
                    <div
                      key={t}
                      onClick={() => setData({ ...data, template: t })}
                      className={`cursor-pointer p-5 rounded-2xl border transition ${
                        data.template === t
                          ? "border-indigo-500 bg-indigo-500/10"
                          : "border-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <div className="h-20 mb-4 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 opacity-80"></div>
                      <h4 className="font-semibold text-white capitalize">
                        {t}
                      </h4>
                    </div>
                  ))}
                </div>

                {/* Preview */}
                <div className="bg-black/30 border border-white/10 rounded-xl p-6">
                  <h4 className="text-white font-bold mb-2">
                    Live Preview
                  </h4>
                  <p className="text-sm text-slate-400">
                    {data.name || "Your Conference Name"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {data.location || "Location"} •{" "}
                    {data.date || "Date"}
                  </p>
                </div>

                <div className="mt-auto flex justify-between pt-8 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-slate-400 hover:text-white"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
                  >
                    <CheckCircle size={18} />
                    {loading ? "Launching..." : "Launch Event"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateConference;
