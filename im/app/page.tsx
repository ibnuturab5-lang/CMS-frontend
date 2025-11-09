import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-purple-50 to-purple-100">
      <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Inventory Management
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius amet quae voluptatem, veniam debitis fuga ullam aut, earum magni laborum animi?</p>
        <div className="flex gap-4 justify-center">
          <Link href={'/sign-in'} className="bg-purple-600 hover:bg-purple-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">Sign In</Link>
          <Link href={''} className="text-purple-600 bg-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-100 border-2 border-purple-600 transition-colors ">Learn More</Link>
        </div>
      </div>
      </div>      
    </div>
  );
}
