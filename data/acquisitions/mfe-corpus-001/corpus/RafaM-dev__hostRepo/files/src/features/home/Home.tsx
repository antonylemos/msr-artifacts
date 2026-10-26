import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/homeImage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <img
          src="/titleHome.png"
          alt="Rick and Morty"
          className="w-[500px] max-w-full mb-8"
        />

        <h1 className="text-white text-h1 font-bold mb-2.5">
          Bienvenido a Rick and Morty
        </h1>

        <p className="text-gray-300 text-h3 mb-12 max-w-[872px] leading-relaxed">
          En esta prueba, evaluaremos su capacidad para construir la aplicación
          mediante el análisis de código y la reproducción del siguiente diseño.
        </p>

        <button
          onClick={() => navigate("/episodes")}
          className="px-[22px] py-3 bg-design-primary-500 text-design-primary-900 cursor-pointer text-sm font-bold rounded-3xl hover:bg-design-primary-600"
        >
          Comenzar
        </button>
      </div>
    </div>
  );
};

export default Home;
