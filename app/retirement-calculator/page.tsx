import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RetirementCalculator from '@/components/RetirementCalculator'

export const metadata = {
  title: 'Retirement Calculator | Pankh — Free Tool for Indian Investors',
  description: 'Free retirement calculator for Indian investors. Know your corpus number, savings gap, and monthly SIP needed — in 3 minutes. No login. No spam.',
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
