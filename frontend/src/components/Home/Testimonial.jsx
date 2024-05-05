import { Link } from "react-router-dom";

import avatarAnisha from "../../assets/images/avatar-anisha.png";
import avatarAli from "../../assets/images/avatar-ali.png";
import avatarRichard from "../../assets/images/avatar-richard.png";

const Testimonial = () => {
  return (
    <section id="testimonials">
      {/* Container to heading and testm blocks */}
      <div className="max-w-6xl px-5 mx-auto mt-32 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center">
        Some user opinions
        </h2>
        {/* Testimonials Container */}
        <div className="flex flex-col mt-24 md:flex-row md:space-x-6">
          {/* Testimonial 1 */}
          <div className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:w-1/3">
            <img src={avatarAnisha} className="w-16 -mt-14" alt="" />
            <h5 className="text-lg font-bold">Anisha Li</h5>
            <p className="text-sm text-darkGrayishBlue">
              “Infinite Analysis has revolutionized how I visualize my data. I can import 
              my own data and get customized analyses in just a few clicks. It has really 
              helped me make more informed decisions for my business.”
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:flex md:w-1/3">
            <img src={avatarAli} className="w-16 -mt-14" alt="" />
            <h5 className="text-lg font-bold">Ali Bravo</h5>
            <p className="text-sm text-darkGrayishBlue">
              “Je suis impressionné par la précision des prévisions fournies par Infinite Analysis. En utilisant l'historique de mes données, 
              j'ai pu anticiper les tendances futures et ajuster ma stratégie en conséquence. 
              C'est un outil puissant pour la planification stratégique.”
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:flex md:w-1/3">
            <img src={avatarRichard} className="w-16 -mt-14" alt="" />
            <h5 className="text-lg font-bold">Richard Watts</h5>
            <p className="text-sm text-darkGrayishBlue">
              “L'interface conviviale d'Infinite Analysis en fait un plaisir à utiliser. Même sans compétences techniques avancées,
               j'ai pu importer mes données et générer des analyses en un rien de temps. 
               C'est un outil essentiel pour toute équipe souhaitant optimiser sa productivité”
            </p>
          </div>
        </div>
        {/* Button */}
        <div className="my-16">
          <Link
            to="#"
            className="p-3 px-6 pt-2 text-white bg-[#F25E3D] rounded-full baseline hover:bg-[#f07c62]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
