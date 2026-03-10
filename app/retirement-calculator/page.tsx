import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RetirementCalculator from '@/components/RetirementCalculator'

export const metadata = {
  title: 'Retirement Calculator | Pankh — Free Tool for Indian Investors',
  description: 'Free retirement calculator for Indian investors. Know your corpus number, savings gap, and monthly SIP needed — in 3 minutes. No login. No spam.',
  openGraph: {
    title: 'How much do you actually need to retire? Find out in 3 minutes.',
    description: 'Free retirement calculator for Indian investors. Corpus number, savings gap, monthly SIP needed — all in one place.',
    url: 'https://pankh.tech/retirement-calculator',
    siteName: 'Pankh',
    type: 'website',
    images: [
      {
        url: 'https://pankh.tech/og-retirement-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Pankh Retirement Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How much do you actually need to retire?',
    description: 'Free retirement calculator for Indian investors. 3 minutes. No login.',
    images: ['https://pankh.tech/og-retirement-calculator.jpg'],
  },
}

export default function RetirementCalculatorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-pankh-navy to-pankh-navy-light">
        <RetirementCalculator />
      </main>
      <Footer />
    </>
  )
}
