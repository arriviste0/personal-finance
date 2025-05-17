export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row w-full min-h-[70vh]">
      {/* Left: Text */}
      <div className="flex-1 bg-pink-400 flex flex-col justify-center p-12">
        <h1 className="text-6xl font-bold mb-6">Go from zero to $1</h1>
        <p className="text-xl mb-8">
          With Gumroad, anyone can earn their first dollar online. Just start with what you know, see what sticks, and get paid. It's that easy.
        </p>
        <button className="bg-black text-white text-lg px-8 py-4 rounded hover:bg-gray-900 w-fit">
          Start selling
        </button>
      </div>
      {/* Right: Image/Illustration */}
      <div className="flex-1 bg-yellow-400 flex items-center justify-center relative overflow-hidden">
        {/* Decorative pink shape */}
        <div className="absolute w-80 h-80 bg-pink-300 rounded-full top-16 left-16 -z-10"></div>
        {/* Placeholder for image */}
        <div className="w-80 h-80 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold border-8 border-white">
          Image
        </div>
      </div>
    </section>
  );
} 