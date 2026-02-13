import React, { useState, useMemo } from "react";
import {
  FileText,
  Calendar,
  CheckCircle,
  Upload,
  Clock,
  Star,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const PresenterDashboard = ({ conf }) => {
  const { user, papers, addPaper } = useApp();

  const [title, setTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);

  /* ================= FILTER DATA ================= */

  const confPapers = useMemo(
    () => papers.filter((p) => p.confId === conf.id),
    [papers, conf.id]
  );

  const myPaper = useMemo(
    () => confPapers.find((p) => p.authorId === user.id),
    [confPapers, user.id]
  );

  /* ================= HANDLER ================= */

  const handleSubmit = () => {
    if (!title.trim()) return;

    addPaper({
      confId: conf.id,
      title,
      authorId: user.id,
      status: "pending",
      file: "manuscript.pdf",
    });

    setSubmitted(true);
    setTitle("");
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-4xl mx-auto p-12 text-slate-200">
      <div className="bg-slate-900/50 rounded-[2.5rem] border border-white/5 p-12 relative overflow-hidden">

        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full"></div>

        <div className="mb-10 relative z-10">
          <h2 className="text-3xl font-bold text-white">
            Presenter Dashboard
          </h2>
          <p className="text-slate-500 mt-2">
            Manage your conference submission
          </p>
        </div>

        {/* ================= IF PAPER EXISTS ================= */}

        {myPaper ? (
          <div className="space-y-10 relative z-10">

            {/* Submission Card */}
            <div className="flex items-center gap-6 bg-black/40 p-8 rounded-3xl border border-white/5">

              <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
                <FileText size={28} />
              </div>

              <div>
                <h3 className="font-bold text-xl text-white mb-1">
                  {myPaper.title}
                </h3>

                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <Calendar size={14} />
                  Submitted
                </p>
              </div>

              <div className="ml-auto">
                <span
                  className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider border ${
                    myPaper.status === "accepted"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : myPaper.status === "rejected"
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}
                >
                  {myPaper.status === "pending"
                    ? "Under Review"
                    : myPaper.status}
                </span>
              </div>
            </div>

            {/* UNDER REVIEW PROGRESS */}
            {myPaper.status === "pending" && (
              <div className="bg-amber-900/30 border border-amber-500/20 p-6 rounded-2xl flex items-center gap-4">
                <Clock className="text-amber-400" />
                <div>
                  <p className="font-bold text-amber-300">
                    Review in Progress
                  </p>
                  <p className="text-sm text-amber-200/70">
                    Your paper is currently being evaluated by reviewers.
                  </p>
                </div>
              </div>
            )}

            {/* ACCEPTED STATE */}
            {myPaper.status === "accepted" && (
              <div className="bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border border-emerald-500/20 p-8 rounded-3xl text-emerald-100 space-y-6">

                <h4 className="font-bold text-xl flex items-center gap-3">
                  <CheckCircle size={22} />
                  Paper Accepted 🎉
                </h4>

                {/* Score */}
                <div className="flex items-center gap-3 text-emerald-200">
                  <Star size={18} />
                  <span className="font-bold">
                    Score: {myPaper.reviewScore}/100
                  </span>
                </div>

                {/* Feedback */}
                {myPaper.feedback && (
                  <div className="bg-emerald-950/40 p-5 rounded-xl border border-emerald-500/20">
                    <p className="text-sm text-emerald-200/80">
                      {myPaper.feedback}
                    </p>
                  </div>
                )}

                {/* Reviewed Date */}
                {myPaper.reviewedAt && (
                  <p className="text-xs text-emerald-300/60">
                    Reviewed on{" "}
                    {new Date(myPaper.reviewedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            {/* REJECTED STATE */}
            {myPaper.status === "rejected" && (
              <div className="bg-red-900/30 border border-red-500/20 p-8 rounded-3xl text-red-200 space-y-6">

                <h4 className="font-bold text-xl">
                  Submission Rejected
                </h4>

                {/* Score */}
                <div className="flex items-center gap-3">
                  <Star size={18} />
                  <span className="font-bold">
                    Score: {myPaper.reviewScore}/100
                  </span>
                </div>

                {/* Feedback */}
                {myPaper.feedback && (
                  <div className="bg-red-950/40 p-5 rounded-xl border border-red-500/20">
                    <p className="text-sm">
                      {myPaper.feedback}
                    </p>
                  </div>
                )}

                {myPaper.reviewedAt && (
                  <p className="text-xs text-red-300/60">
                    Reviewed on{" "}
                    {new Date(myPaper.reviewedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

          </div>
        ) : (
          /* ================= SUBMIT FORM ================= */
          <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-3xl bg-white/5">

            <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400">
              <Upload size={32} />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Submit Your Paper
            </h3>

            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              Enter your paper title below and submit for peer review.
            </p>

            <div className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                placeholder="Paper Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
              />

              <button
                onClick={handleSubmit}
                disabled={!title.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold disabled:opacity-40 transition"
              >
                Submit Manuscript
              </button>
            </div>

            {submitted && (
              <p className="text-emerald-400 mt-4 text-sm">
                Submission successful!
              </p>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default PresenterDashboard;
