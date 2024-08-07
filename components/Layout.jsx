import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          © 2024 Location-based Audio App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;