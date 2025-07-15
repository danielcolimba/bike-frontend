import Hero from "../components/Hero"; 
import Fotter from "../components/Footer";
import BikesSection from "../components/BikesSection";
import AccessoriesSection from "../components/AccessoriesSection";
import ServicesSection from "../components/ServicesSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <section id="best-selling-bikes">
        <BikesSection />
      </section>
      <section id="best-selling-accessories">
        <AccessoriesSection />
      </section>
      <section id="services">
        <ServicesSection />
      </section>
      
      {/* Fotter */}
      <footer className="bg-gray-800 text-white text-center">
        <section>
          <Fotter/>
        </section>
      </footer>
      {/* End Fotter */}
    </div>
  );
};

export default Home;
