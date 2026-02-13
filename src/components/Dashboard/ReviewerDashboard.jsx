import React, { useState } from 'react';
import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ReviewerDashboard = ({ conf }) => {
  const { papers, updatePaperStatus } = useApp();

  const confPapers = papers.filter(
    (p) => p.confId === conf.id && p.status === 'pending'
  );

  const [scores, setScores] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [modal, setModal] = useState(null); // { paperId, action }

  const handleConfirm = () => {
    if (!modal) return;

    const { paperId, action } = modal;
    const score = scores[paperId] || 0;
    const feedback = feedbacks[paperId] || "";

    if (score < 0 || score > 100) {
      alert("Score must be between 0 and 100");
      return;
    }

    updatePaperStatus(
      paperId,
      action === 'accept' ? 'accepted' : 'rejected',
      score,
      feedback
    );

    setModal(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-12 bg-[#0f1117] min-h-full">

      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white">Review Portal</h2>
          <p className="text-slate-500 mt-2">
            You have {confPapers.length} papers pending review.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {confPapers.map(paper => (
          <div
            key={paper.id}
            className="bg-slate-900/50 p-8 rounded-[2rem] border border-white/5 hover:border-indigo-500/30 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                Research Track
              </div>
              <FileText size={20} className="text-slate-400" />
            </div>

            <h3 className="font-bold text-2xl text-white mb-3">
              {paper.title}
            </h3>

            {/* Score Input */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Score (0–100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={scores[paper.id] || ""}
                onChange={(e) =>
                  setScores({
                    ...scores,
                    [paper.id]: Number(e.target.value),
                  })
                }
                className="w-full bg-black/30 border border-white/5 rounded-xl p-3 text-white focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Feedback */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Your Assessment
              </label>
              <textarea
                placeholder="Enter structured feedback..."
                value={feedbacks[paper.id] || ""}
                onChange={(e) =>
                  setFeedbacks({
                    ...feedbacks,
                    [paper.id]: e.target.value,
                  })
                }
                className="w-full bg-black/30 border border-white/5 rounded-xl p-4 text-sm h-28 focus:ring-1 focus:ring-indigo-500 outline-none resize-none text-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() =>
                  setModal({ paperId: paper.id, action: 'accept' })
                }
                className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 py-3 rounded-xl text-sm font-bold transition-colors"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  setModal({ paperId: paper.id, action: 'reject' })
                }
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-3 rounded-xl text-sm font-bold transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        ))}

        {confPapers.length === 0 && (
          <div className="col-span-full py-32 text-center border border-dashed border-white/5 rounded-[3rem] bg-white/[0.02]">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400 border border-emerald-500/20">
              <CheckCircle size={48} />
            </div>
            <h3 className="text-2xl font-bold text-white">
              All Caught Up!
            </h3>
            <p className="text-slate-500 mt-2">
              You have no pending reviews assigned to you.
            </p>
          </div>
        )}

      </div>

      {/* Confirmation Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 w-96 space-y-6">
            <div className="flex items-center gap-3 text-yellow-400">
              <AlertTriangle />
              <h3 className="font-bold text-white">
                Confirm Decision
              </h3>
            </div>

            <p className="text-slate-400 text-sm">
              Are you sure you want to{" "}
              <span className="font-bold text-white">
                {modal.action}
              </span>{" "}
              this paper?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModal(null)}
                className="text-slate-400 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg text-white font-bold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewerDashboard;
