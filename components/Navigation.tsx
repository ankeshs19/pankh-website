'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-primary-blue/95 backdrop-blur-sm shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image
                src="/images/logo.png"
                alt="Pankh Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-primary-gold font-bold text-2xl">PANKH</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-primary-gold transition-colors duration-300">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-primary-gold transition-colors duration-300">
              About
            </Link>
            <Link href="/services" className="text-white hover:text-primary-gold transition-colors duration-300">
              Services
            </Link>
            <Link href="/blog" className="text-white hover:text-primary-gold transition-colors duration-300">
              Blog
            </Link>
            <Link href="/contact" className="text-white hover:text-primary-gold transition-colors duration-300">
              Contact
            </Link>
            <Link 
              href="/calculator" 
              className="bg-primary-gold text-primary-blue px-6 py-2 rounded-lg font-semibold hover:bg-accent-darkGold transition-colors duration-300"
            >
              Calculator
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-white hover:text-primary-gold transition-colors duration-300 py-2">
                Home
              </Link>
              <Link href="/about" className="text-white hover:text-primary-gold transition-colors duration-300 py-2">
                About
              </Link>
              <Link href="/services" className="text-white hover:text-primary-gold transition-colors duration-300 py-2">
                Services
              </Link>
              <Link href="/blog" className="text-white hover:text-primary-gold transition-colors duration-300 py-2">
                Blog
              </Link>
              <Link href="/contact" className="text-white hover:text-primary-gold transition-colors duration-300 py-2">
                Contact
              </Link>
              <Link 
                href="/calculator" 
                className="bg-primary-gold text-primary-blue px-6 py-2 rounded-lg font-semibold hover:bg-accent-darkGold transition-colors duration-300 text-center"
              >
                Calculator
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
