import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Services() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pankh-navy to-pankh-navy-light text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-pankh-gold">Services</span>
            </h1>
            <p className="text-xl text-gray-200">
              Simple, transparent financial education and awareness for your future
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-lg text-gray-700 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
              At Pankh, we believe understanding your finances should be simple and accessible to everyone. 
              Whether you're thinking about retirement or securing your family's future, we're here to 
              help you understand your options every step of the way.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Retirement Planning */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition border-2 border-pankh-navy/10">
                <div className="flex items-center mb-6">
                  <div className="text-4xl md:text-5xl mr-3 md:mr-4 flex-shrink-0">🏖️</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-pankh-navy">Retirement Awareness</h2>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Understand what retirement planning involves. Learn what corpus you may need and what savings options exist — so you can work with the right licensed professionals confidently.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-pankh-navy">Calculate Your Retirement Corpus</h4>
                      <p className="text-sm text-gray-600">Determine how much you need to retire comfortably</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-pankh-navy">Understanding SIPs & Savings Instruments</h4>
                      <p className="text-sm text-gray-600">Learn how systematic savings work and what options exist</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-pankh-navy">Tax-Saving Instruments Awareness</h4>
                      <p className="text-sm text-gray-600">Understand instruments like ELSS, PPF, and NPS that offer tax benefits under Indian law</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-pankh-navy">Understanding Pension & Annuity Options</h4>
                      <p className="text-sm text-gray-600">Learn about options that provide steady income after retirement</p>
                    </div>
                  </div>
                </div>

                <div className="bg-pankh-navy/5 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700">
                    <strong className="text-pankh-navy">Perfect for:</strong> Salaried professionals, 
                    business owners, and anyone 25-55 years old planning for their retirement.
                  </p>
                </div>

                <Link
                  href="/retirement-calculator"
                  className="block w-full bg-pankh-navy hover:bg-pankh-navy-light text-white font-semibold py-3 px-6 rounded-full transition text-center"
                >
                  Try Retirement Calculator →
                </Link>
              </div>

              {/* Future Planning */}
              <div className="bg-gradient-to-br from-yellow-50 to-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition border-2 border-pankh-gold/20">
                <div className="flex items-center mb-6">
                  <div className="text-4xl md:text-5xl mr-3 md:mr-4 flex-shrink-0">🎓</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-pankh-navy">Financial Goals Awareness</h2>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Understand how to think about life's important financial milestones — from children's education to buying a home. Know what to plan for, so tomorrow feels less uncertain.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-pankh-navy">Understanding Education Savings</h4>
                      <p className="text-sm text-gray-600">Learn about savings options that can help fund your children's education</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-pankh-navy">Marriage & Life Events</h4>
                      <p className="text-sm text-gray-600">Plan for weddings and important life milestones</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-pankh-navy">Home Purchase Planning</h4>
                      <p className="text-sm text-gray-600">Build a corpus for your dream home down payment</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-pankh-navy">Emergency Fund Creation</h4>
                      <p className="text-sm text-gray-600">Build a safety net for unexpected expenses</p>
                    </div>
                  </div>
                </div>

                <div className="bg-pankh-gold/10 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700">
                    <strong className="text-pankh-navy">Perfect for:</strong> Young families, parents, 
                    and anyone planning for major life goals in the next 5-20 years.
                  </p>
                </div>

                <Link 
                  href="/contact"
                  className="block w-full bg-pankh-gold hover:bg-pankh-gold-light text-pankh-navy font-semibold py-3 px-6 rounded-full transition text-center"
                >
                  Start Planning Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-pankh-navy mb-12">
            How We Work With You
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-xl shadow-md flex items-start">
                <div className="bg-pankh-gold text-pankh-navy font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pankh-navy mb-2">Understanding Your Goals</h3>
                  <p className="text-gray-700">
                    We start with a friendly conversation to understand your dreams, concerns, and financial situation. 
                    No jargon, no pressure — just honest guidance.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md flex items-start">
                <div className="bg-pankh-gold text-pankh-navy font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pankh-navy mb-2">Personalized Goal Clarity</h3>
                  <p className="text-gray-700">
                    Based on your goals, we help you understand what they mean in numbers — what kind of corpus may be needed, and what savings instruments are generally used for such goals. No jargon, no pressure.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 rounded-xl shadow-md flex items-start">
                <div className="bg-pankh-gold text-pankh-navy font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pankh-navy mb-2">Connecting You to the Right People</h3>
                  <p className="text-gray-700">
                    We connect you with SEBI-registered advisers, AMFI-registered distributors, and IRDAI-registered insurance agents — in your language, near your city. WhatsApp, video call, or in-person, whatever works for you.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white p-6 rounded-xl shadow-md flex items-start">
                <div className="bg-pankh-gold text-pankh-navy font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pankh-navy mb-2">Ongoing Guidance</h3>
                  <p className="text-gray-700">
                    Your journey doesn't end at onboarding. We stay with you, answering questions, sharing 
                    relevant financial education, and helping you stay connected to licensed professionals as your life evolves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Pankh */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-pankh-navy mb-12">
            Why Choose Pankh?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-pankh-navy mb-3">Goal-Focused</h3>
              <p className="text-gray-600">
                We don't sell products. We help you understand your options so you can make informed decisions.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-pankh-navy mb-3">Hindi-First</h3>
              <p className="text-gray-600">
                Comfortable explaining in Hindi or your regional language. No complicated English terms.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-pankh-navy mb-3">Trust & Transparency</h3>
              <p className="text-gray-600">
                No hidden charges. No mis-selling. Just transparent communication that's in your best interest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-pankh-navy to-pankh-navy-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-10 text-gray-200 max-w-2xl mx-auto">
            Whether it's retirement or your child's education, let's make sure you understand your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link
              href="/contact"
              className="bg-pankh-gold hover:bg-pankh-gold-light text-pankh-navy font-semibold px-8 py-4 rounded-full transition text-base md:text-lg text-center inline-block"
            >
              Get in Touch
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
