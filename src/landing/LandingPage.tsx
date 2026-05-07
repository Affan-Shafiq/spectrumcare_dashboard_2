import { Navbar } from "./Navbar";
import { TopBanner } from "./TopBanner";
import { Hero } from "./Hero";
import { Problem } from "./Problem";
import { Solution } from "./Solution";
import { Features } from "./Features";
import { Games } from "./Games";
import { HowItWorks } from "./HowItWorks";
import { Credibility } from "./Credibility";
import { TargetUsers } from "./TargetUsers";
import { Community } from "./Community";
import { BusinessModel } from "./BusinessModel";
import { Footer } from "./Footer";
import { WhySpectrumCare } from "./WhySpectrumCare";
import "./landing.css";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <main>
        <TopBanner />
        <Hero />
        <hr />
        <WhySpectrumCare />
        <Problem />
        <Solution />
        <Features />
        <Games />
        <HowItWorks />
        <Credibility />
        <TargetUsers />
        <Community />
        <BusinessModel />

        {/* Final CTA */}
        <section id="contact" className="py-20 lg:py-28 bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-16">
            <div style={{ backgroundColor: '#355070' }} className="relative rounded-[2rem] lg:rounded-[3rem] p-10 lg:p-20 overflow-hidden text-center">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#88BDDE33' }} />

              <div className="relative z-10">
                <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  Ready to take the first step?
                </h2>
                <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                  Join thousands of families already using SpectrumCare to support their child's growth and development.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a 
                    href="https://github.com/Affan-Shafiq/spectrumcare_dashboard_2/releases/download/v1.0.0/SpectrumCare.apk" 
                    className="h-14 px-10 bg-white text-[#355070] hover:bg-gray-50 text-base font-bold rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                  >
                    Get the App
                  </a>
                  <a 
                    href="mailto:spectrumcare.app@gmail.com" 
                    className="h-14 px-10 border-2 border-white text-white hover:bg-white/10 text-base font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
