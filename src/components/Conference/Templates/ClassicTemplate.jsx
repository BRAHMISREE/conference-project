import React from "react";

const ClassicTemplate = ({ conf }) => {
  const {
    name,
    theme,
    location,
    date,
    description,
    banner,
  } = conf;

  return (
    <div className="bg-[#f0ece3] min-h-screen text-[#1a1a1a] font-serif">

      {/* ================= HEADER ================= */}

      <header className="border-b border-[#d8d0c0] bg-[#fdfbf7] py-20 text-center px-6">
        <div className="uppercase tracking-[0.3em] text-[#8c8c8c] text-xs font-sans mb-6">
          {date || "Conference Date"} • {location || "Location"}
        </div>

        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-[#2b2b2b] leading-tight">
          {name || "Conference Name"}
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 font-sans max-w-2xl mx-auto">
          {theme || "Theme of the Conference"}
        </p>

        <div className="w-16 h-1 bg-[#2b2b2b] mx-auto mt-10"></div>
      </header>

      {/* ================= MAIN CONTENT ================= */}

      <div className="max-w-6xl mx-auto py-24 px-6 md:px-10">

        {/* Banner Section */}
        {banner && (
          <div className="relative mb-32">
            <img
              src={banner}
              alt="Conference Banner"
              className="w-full h-[500px] object-cover shadow-2xl grayscale contrast-125"
            />

            <div className="absolute -bottom-16 right-10 bg-[#2b2b2b] p-10 max-w-xl shadow-2xl hidden md:block text-white">
              <p className="text-xl leading-relaxed italic opacity-90">
                {description || "An academic gathering of leading minds."}
              </p>
            </div>
          </div>
        )}

        {/* If no banner show description centered */}
        {!banner && (
          <div className="text-center max-w-3xl mx-auto mb-24">
            <p className="text-xl leading-relaxed text-gray-700 font-sans">
              {description}
            </p>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-16">

          {/* Call for Papers */}
          <div>
            <h2 className="text-3xl border-b-2 border-[#2b2b2b] pb-6 mb-8 font-medium">
              Call for Papers
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-gray-700 font-sans">
              We invite scholars and practitioners to submit work related to{" "}
              <span className="font-bold">{theme}</span>. 
              Selected papers will be published in our official proceedings.
            </p>

            <button className="text-white bg-[#2b2b2b] px-10 py-4 hover:bg-black transition duration-300 text-sm tracking-widest uppercase font-sans font-bold shadow-md">
              Submit Abstract
            </button>
          </div>

          {/* Registration */}
          <div>
            <h2 className="text-3xl border-b-2 border-[#2b2b2b] pb-6 mb-8 font-medium">
              Registration
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-gray-700 font-sans">
              Registration is now open for attendees. Early bird discounts apply for a limited time.
            </p>

            <div className="space-y-4 font-sans text-lg">
              <div className="flex justify-between border-b border-[#d8d0c0] pb-2">
                <span>General Admission</span>
                <span className="font-bold">$200</span>
              </div>

              <div className="flex justify-between border-b border-[#d8d0c0] pb-2">
                <span>Student</span>
                <span className="font-bold">$100</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-[#d8d0c0] py-12 text-center text-sm text-gray-600 font-sans bg-[#fdfbf7]">
        © {new Date().getFullYear()} {name}. All rights reserved.
      </footer>

    </div>
  );
};

export default ClassicTemplate;
