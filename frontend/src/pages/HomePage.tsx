import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <body className="font-sans bg-gray-900 text-gray-200">
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative">
        <Header />
        <main>
          <Hero />
          <Features />
        </main>
        <Footer />
      </div>
    </div>
  </body>
  );
}

export default HomePage;
