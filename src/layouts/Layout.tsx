import Footer from '../components/Footer';
import Header from '../components/Header';
import AboutApp from '../components/AboutApp';


interface LayoutProps {
 children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
 return (
   <div className="mx-auto w-full min-h-screen bg-primary">
     <Header />
     <AboutApp/>
     <Footer/>
     <main className="container mx-auto bg-gray-200">{children}</main>
   </div>
 );
};

export default Layout;



