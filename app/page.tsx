import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { BenefitsSection } from '@/components/benefits-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { ProductsShowcase } from '@/components/products-showcase';
import { NewsletterSection } from '@/components/newsletter-section';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <ProductsShowcase />
      <TestimonialsSection />
      <NewsletterSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
