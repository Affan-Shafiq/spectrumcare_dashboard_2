import { FiTwitter, FiLinkedin, FiFacebook, FiInstagram } from "react-icons/fi";

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#355070' }} className="text-white py-16">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.jpeg" alt="SpectrumCare" className="h-10 w-auto rounded-lg" />
            </div>
            <p className="text-white/60 max-w-sm mb-6">
              Helping families understand, support, and empower their children through compassionate technology and expert guidance.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#about" className="hover:text-[#88BDDE] transition-colors">About</a></li>
              <li><a href="#features" className="hover:text-[#88BDDE] transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-[#88BDDE] transition-colors">How It Works</a></li>
              <li><a href="#contact" className="hover:text-[#88BDDE] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-[#88BDDE] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#88BDDE] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#88BDDE] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} SpectrumCare. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-white/40 hover:text-[#88BDDE] transition-colors"><FiTwitter className="w-5 h-5" /></a>
            <a href="#" className="text-white/40 hover:text-[#88BDDE] transition-colors"><FiLinkedin className="w-5 h-5" /></a>
            <a href="#" className="text-white/40 hover:text-[#88BDDE] transition-colors"><FiFacebook className="w-5 h-5" /></a>
            <a href="#" className="text-white/40 hover:text-[#88BDDE] transition-colors"><FiInstagram className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
