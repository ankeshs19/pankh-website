import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RetirementCalculator from '@/components/RetirementCalculator'

export const metadata = {
  title: 'Retirement Calculator | Pankh — Wings to Financial Freedom',
  description: 'Understand your estimated retirement corpus, savings gap, and what instruments people commonly use — for financial education purposes only.',
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
