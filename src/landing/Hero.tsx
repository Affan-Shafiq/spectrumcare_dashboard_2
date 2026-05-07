import { HiOutlineSparkles } from "react-icons/hi2";
import { FiDownload } from "react-icons/fi";

export const Hero = () => {
  return (
    <section id="about" className="relative py-16 lg:py-24 overflow-hidden bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Left Text Section */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full w-fit" style={{ backgroundColor: '#88BDDE20' }}>
              <HiOutlineSparkles className="w-4 h-4" style={{ color: '#88BDDE' }} />
              <span className="font-semibold text-sm" style={{ color: '#355070' }}>Built for families, backed by experts</span>
            </div>

            <h1 style={{ fontFamily: "'Nunito', sans-serif", color: '#355070' }} className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-tight">
              Helping your child grow, learn, and thrive
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
              SpectrumCare gives parents simple, fun tools to support their child's development - from early screening to personalized learning activities, all in one friendly app.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a 
                href="https://github.com/Affan-Shafiq/spectrumcare_dashboard_2/releases/download/v1.0.0/SpectrumCare.apk" 
                className="h-14 px-8 rounded-full text-white text-base font-bold shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
                style={{ backgroundColor: '#355070' }}
              >
                <FiDownload className="w-5 h-5" />
                Get the App
              </a>
            </div>

            <p className="text-sm text-gray-400 mt-2 italic">
              Not a replacement for diagnosis - a first step toward early support.
            </p>
          </div>

          {/* Right Image Section */}
          <div className="lg:w-1/2 relative flex justify-center">
            <img
              src="/landing-phones.png"
              alt="SpectrumCare App showing learning activities on phones"
              className="max-w-full h-auto animate-fade-in"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
