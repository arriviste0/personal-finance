import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex w-full h-20 bg-black text-white items-center justify-between">
      {/* Left: Logo and links */}
      <div className="flex items-center h-full">
        <span className="text-3xl font-bold px-6">Gumroad</span>
        <ul className="flex space-x-8 ml-8">
          <li><Link href="#"><span className="hover:underline">Discover</span></Link></li>
          <li><Link href="#"><span className="hover:underline">About</span></Link></li>
          <li><Link href="#"><span className="hover:underline">Features</span></Link></li>
          <li><Link href="#"><span className="hover:underline">Pricing</span></Link></li>
        </ul>
      </div>
      {/* Right: Log in and Start selling */}
      <div className="flex h-full">
        <Link href="#" className="flex items-center px-6 hover:underline">Log in</Link>
        <Link
          href="#"
          className="flex items-center px-8 h-full bg-pink-400 text-black font-semibold hover:bg-pink-300 transition"
        >
          Start selling
        </Link>
      </div>
    </nav>
  );
} 