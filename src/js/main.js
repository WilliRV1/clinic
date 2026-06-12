import '../styles/main.css'

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  // FOUT Fix: Remove cloak once styles are applied
  document.body.removeAttribute('data-cloak');

  const menuBtn = document.getElementById('mobile-menu-btn')
  const mobileMenu = document.getElementById('mobile-menu')

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden')
    })
  }

  // Active nav link highlighting (Clean URLs compatible)
  const currentPath = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/'
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href')
    if (href) {
      const cleanHref = href.replace(/\.html$/, '').replace(/\/$/, '') || '/'
      if (cleanHref === currentPath || (currentPath === '/' && cleanHref === '/index')) {
        link.classList.add('active')
      }
    }
  })

  // Highlight dropdown trigger when viewing doctor profiles
  if (currentPath.includes('doctor')) {
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.textContent.trim().toLowerCase().includes('doctor')) {
        link.classList.add('active')
      }
    })
  }

  // Scroll-based fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'))
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })
})
