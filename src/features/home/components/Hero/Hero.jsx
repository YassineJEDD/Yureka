import './Hero.css';

export default function Hero() {
    return (
        <section className="hero">
            <img src="/src/assets/Yureka-Assets/librarian-owl.png" alt="librarian-owl" className="librarian-owl" />
            <div className="hero-content">
                <h1 className="typing">Welcome to</h1>
                <img src="/src/assets/Yureka-Assets/yureka-m-logo.png" alt="Logo" className="logo-hero-y"/>
                <p>Adventure into the world of Chinese with stories that ignite your imagination.
                    Journey through 200+ hours of epic tales, timeless novels, and legendary history.
                    Explore freely. 🌱 </p>
            </div>
        </section>
    );
}
