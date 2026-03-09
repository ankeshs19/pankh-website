import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pankh-navy to-pankh-navy-light text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-pankh-gold">Pankh Technology</span>
            </h1>
            <p className="text-xl text-gray-200">
              Democratizing financial awareness across India — one person at a time
            </p>
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Pankh Technology Pvt Limited is a startup recognized by Department for Promotion of Industry and Internal Trade (DIPP83254) with a mission to democratize financial awareness and literacy
                across India — particularly in underserved Tier 2, Tier 3 cities and rural markets. We 
                believe every Indian deserves access to quality financial information, transparent education, 
                and the confidence to take informed financial decisions.
              </p>
            </div>

            <div className="bg-pankh-gold/10 border-l-4 border-pankh-gold p-6 rounded-r-lg my-8">
              <h3 className="text-2xl font-bold text-pankh-navy mb-3">Our Name, Our Promise</h3>
              <p className="text-gray-700 leading-relaxed">
                "Pankh" means wings in Hindi. We exist to give every Indian — regardless of income level, 
                geography, or financial literacy — the wings to rise and grow their wealth. Just as wings 
                enable flight regardless of where you start, Pankh enables financial growth regardless of 
                where you begin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">🎯</div>
                <h2 className="text-2xl font-bold text-pankh-navy mb-4">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed">
                  To become India's most trusted financial education platform for the next 100 million first-time investors — 
                  people who have never had access to financial guidance but deserve to.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">🚀</div>
                <h2 className="text-2xl font-bold text-pankh-navy mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  To simplify financial education for everyday Indians by providing accessible, jargon-free financial 
                  literacy resources, and connections to licensed professionals — especially in 
                  markets that have been traditionally overlooked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-pankh-navy mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">🤝</div>
              <div>
                <h3 className="text-xl font-bold text-pankh-navy mb-2">Trust First</h3>
                <p className="text-gray-700">
                  We earn trust through transparency and honest communication, not sales pressure.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">📚</div>
              <div>
                <h3 className="text-xl font-bold text-pankh-navy mb-2">Education</h3>
                <p className="text-gray-700">
                  We educate before anything else. An informed person makes better financial decisions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">🌍</div>
              <div>
                <h3 className="text-xl font-bold text-pankh-navy mb-2">Inclusion</h3>
                <p className="text-gray-700">
                  We serve Tier 2/3 India, not just metros. Everyone deserves wealth growth.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-4xl flex-shrink-0">💡</div>
              <div>
                <h3 className="text-xl font-bold text-pankh-navy mb-2">Simplicity</h3>
                <p className="text-gray-700">
                  We strip away the jargon and make investing feel possible for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-16 bg-gradient-to-br from-pankh-navy to-pankh-navy-light text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            The Market Opportunity
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-200 text-center mb-12 leading-relaxed">
              India's mutual fund industry is at a historic inflection point. Despite significant AUM growth 
              in recent years, penetration remains remarkably low — especially outside major metropolitan 
              areas. This gap represents a generational opportunity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-pankh-gold mb-2">~5%</div>
                <div className="text-sm text-gray-200">Mutual Fund Penetration of Indian households</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-pankh-gold mb-2">95%+</div>
                <div className="text-sm text-gray-200">Tier 2/3 Under-served of non-metro India</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-pankh-gold mb-2">300M+</div>
                <div className="text-sm text-gray-200">Potential First-Time Investors in India</div>
              </div>
            </div>

            <div className="mt-12 bg-white/5 backdrop-blur-sm p-5 md:p-6 rounded-xl">
              <h3 className="text-xl font-bold text-pankh-gold mb-4">Target Geographies</h3>
              <ul className="space-y-2 text-gray-200 text-sm md:text-base">
                <li>• Tier 2 cities: Lucknow, Indore, Jaipur, Bhopal, Varanasi, Ranchi, Jamshedpur</li>
                <li>• Tier 3 cities and semi-urban towns across UP, MP, Rajasthan, Jharkhand, Bihar</li>
                <li>• Young working professionals in IT/services sector outside metros</li>
                <li>• Small business owners and self-employed individuals aged 28–50</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Positioning */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-pankh-navy mb-12">
            How We're Different
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-pankh-gold/10 border-2 border-pankh-gold p-8 rounded-xl mb-8">
              <h3 className="text-2xl font-bold text-pankh-navy mb-4">Our Positioning</h3>
              <p className="text-lg text-gray-700 italic">
                "For first-generation investors and underserved Indian households who are ready to grow 
                their wealth but don't know where to start, Pankh Technology makes understanding finances feel simple, 
                safe, and personally meaningful — unlike large AMC platforms or metro-focused advisors who 
                are built for already-informed investors."
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-pankh-navy mb-4">Traditional Advisors</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Product-first: "We offer 5,000+ funds"</li>
                  <li>• Returns-first: "12-15% CAGR historically"</li>
                  <li>• Technology-first: "AI-powered portfolio"</li>
                  <li>• Metro-first: English-only, urban-centric</li>
                  <li>• Transactional: No post-onboarding support</li>
                </ul>
              </div>

              <div className="bg-pankh-navy text-white p-6 rounded-xl">
                <h4 className="font-bold text-pankh-gold mb-4">Pankh's Approach</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Trust-first: "We educate before we sell"</li>
                  <li>• Goal-first: "What do you want to achieve?"</li>
                  <li>• Human-first: "Your guide is a real person"</li>
                  <li>• Bharat-first: Hindi/regional, Tier 2/3 focus</li>
                  <li>• Relationship-first: Ongoing guidance & support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
