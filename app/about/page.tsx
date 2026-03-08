import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pankh-navy to-pankh-navy-light text-white py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-5 md:mb-6 leading-snug">
              <span className="text-pankh-gold">Har ummeed ko Pankh,</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              har nivesh mein vishwas!
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-200">
              Wings to Financial Freedom
            </p>
            <p className="text-base md:text-lg mb-8 md:mb-10 text-gray-300 max-w-2xl mx-auto px-2">
              Democratizing wealth creation for every Indian. Simple, safe, and meaningful investing — especially for Tier 2/3 India.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link
                href="/contact"
                className="bg-pankh-gold hover:bg-pankh-gold-light text-pankh-navy font-semibold px-8 py-4 rounded-full transition text-base md:text-lg text-center"
              >
                Start Your Journey
              </Link>
              <Link
                href="/retirement-calculator"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition text-base md:text-lg border-2 border-white/30 text-center"
              >
                Retirement Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
            <div className="p-5 md:p-6">
              <div className="text-3xl md:text-4xl font-bold text-pankh-navy mb-2">300M+</div>
              <div className="text-pankh-gold font-semibold mb-2">Potential First-Time Investors</div>
              <p className="text-gray-600 text-sm">in India waiting to start their investment journey</p>
            </div>
            <div className="p-5 md:p-6">
              <div className="text-3xl md:text-4xl font-bold text-pankh-navy mb-2">95%+</div>
              <div className="text-pankh-gold font-semibold mb-2">Tier 2/3 Under-served</div>
              <p className="text-gray-600 text-sm">of non-metro India needs accessible financial guidance</p>
            </div>
            <div className="p-5 md:p-6">
              <div className="text-3xl md:text-4xl font-bold text-pankh-navy mb-2">~5%</div>
              <div className="text-pankh-gold font-semibold mb-2">Mutual Fund Penetration</div>
              <p className="text-gray-600 text-sm">massive opportunity for financial inclusion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-pankh-navy mb-12">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 text-center mb-12 leading-relaxed">
              To simplify investing for everyday Indians by providing accessible, jargon-free financial education, 
              personalized guidance, and technology-enabled distribution — especially in markets that have been 
              traditionally overlooked.
            </p>

            <div className="bg-gradient-to-r from-pankh-navy to-pankh-navy-light text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-pankh-gold">Why "Pankh"?</h3>
              <p className="text-lg leading-relaxed">
                "Pankh" means wings in Hindi. We exist to give every Indian — regardless of income level, 
                geography, or financial literacy — the wings to rise and grow their wealth. Just as wings 
                enable flight regardless of where you start, Pankh enables financial growth regardless of 
                where you begin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-pankh-navy mb-16">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Trust First */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-pankh-navy mb-3">Trust First</h3>
              <p className="text-gray-600">
                We earn trust through transparency and honest advice, not sales pressure.
              </p>
            </div>

            {/* Education */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-pankh-navy mb-3">Education</h3>
              <p className="text-gray-600">
                We educate before we sell. An informed investor is our best customer.
              </p>
            </div>

            {/* Inclusion */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-pankh-navy mb-3">Inclusion</h3>
              <p className="text-gray-600">
                We serve Tier 2/3 India, not just metros. Everyone deserves wealth growth.
              </p>
            </div>

            {/* Simplicity */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-pankh-navy mb-3">Simplicity</h3>
              <p className="text-gray-600">
                We strip away the jargon and make investing feel possible for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-pankh-navy mb-16">
            Who We Serve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Aspiring Professionals */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border-2 border-pankh-navy/10">
              <h3 className="text-xl font-bold text-pankh-navy mb-4">Aspiring Professionals</h3>
              <ul className="space-y-2 text-gray-700 text-sm mb-4">
                <li>• Age 24-35, salaried employees</li>
                <li>• Tier 2/3 city residents</li>
                <li>• Monthly income ₹25K-₹80K</li>
                <li>• Ready to start SIPs</li>
              </ul>
              <p className="text-xs text-gray-500 italic">
                We provide simple, jargon-free explanations and hand-holding support.
              </p>
            </div>

            {/* Small Business Owners */}
            <div className="bg-gradient-to-br from-yellow-50 to-white p-8 rounded-xl border-2 border-pankh-gold/10">
              <h3 className="text-xl font-bold text-pankh-navy mb-4">Small Business Owners</h3>
              <ul className="space-y-2 text-gray-700 text-sm mb-4">
                <li>• Age 35-55, entrepreneurs</li>
                <li>• Irregular income patterns</li>
                <li>• Tax efficiency needs</li>
                <li>• Retirement planning focus</li>
              </ul>
              <p className="text-xs text-gray-500 italic">
                Personalized, relationship-based service with regional language support.
              </p>
            </div>

            {/* Literate Homemakers & Workers */}
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl border-2 border-green-500/10">
              <h3 className="text-xl font-bold text-pankh-navy mb-4">Homemakers & Workers</h3>
              <ul className="space-y-2 text-gray-700 text-sm mb-4">
                <li>• Age 25-45, literate individuals</li>
                <li>• Small monthly surplus</li>
                <li>• Hindi-first communication</li>
                <li>• Goals: education, security</li>
              </ul>
              <p className="text-xs text-gray-500 italic">
                Zero jargon, WhatsApp-friendly, SIPs from ₹100-₹500 to build the habit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pankh-navy to-pankh-navy-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl mb-10 text-gray-200 max-w-2xl mx-auto">
            Join thousands of Indians who are taking their first steps toward financial freedom.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link
              href="/contact"
              className="bg-pankh-gold hover:bg-pankh-gold-light text-pankh-navy font-semibold px-8 py-4 rounded-full transition text-base md:text-lg text-center inline-block"
            >
              Get Started Today
            </Link>
            <a
              href="https://wa.me/919746207344"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full transition text-base md:text-lg inline-flex items-center justify-center space-x-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
