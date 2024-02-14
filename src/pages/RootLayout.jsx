import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export function RootLayout() {
    return (
        <>
           <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}