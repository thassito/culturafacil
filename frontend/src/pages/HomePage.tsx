import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="font-sans bg-gray-900 text-gray-200">
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
