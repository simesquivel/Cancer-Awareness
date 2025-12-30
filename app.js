const { useState, useEffect } = React;

function App() {
  const [quote, setQuote] = useState("Loading inspiration...");

  const cancerFacts = [
    "Early detection can significantly increase the chances of successful treatment.",
    "Healthy lifestyle choices can lower the risk of many cancers.",
    "Regular exercise helps improve overall health and recovery.",
    "Avoiding tobacco greatly reduces cancer risk.",
    "Emotional support is an important part of healing."
  ];
  
  const cartoonImages = [
    "https://cdn-icons-png.flaticon.com/512/2913/2913606.png",
    "https://cdn-icons-png.flaticon.com/512/4320/4320337.png",
    "https://cdn-icons-png.flaticon.com/512/4149/4149678.png"
  ];
  
  const [factIndex, setFactIndex] = useState(0);

  const nextFact = () => {
    setFactIndex((prev) => (prev + 1) % cancerFacts.length);
  };
  
  const prevFact = () => {
    setFactIndex((prev) =>
      prev === 0 ? cancerFacts.length - 1 : prev - 1
    );
  };  

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        setQuote(`"${data.content}" — ${data.author}`);
      })
      .catch(() => {
        setQuote("Stay strong. You are not alone.");
      });
  }, []);

  return (
    <>
      <header>
        <h1>Cancer Awareness & Support</h1>
      </header>

      <div className="container">
        <section>
          <img
            className="landing-image"
            src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb"
            alt="Support and Hope"
          />
          <p>
            Together, we raise awareness, spread hope, and support those
            affected by cancer. Every voice matters. Every action counts.
          </p>
        </section>

        <section>
          <h2>Inspirational Quote</h2>
          <div className="quote-box">
            <p>{quote}</p>
          </div>
        </section>

        <section>
           <h2>Did You Know?</h2>

            <div className="fact-card" key={factIndex}>
                <img
                src={cartoonImages[factIndex % cartoonImages.length]}
                alt="Cartoon Awareness"
                className="fact-image"
            />

            <p>{cancerFacts[factIndex]}</p>

            <div className="fact-buttons">
                <button onClick={prevFact}>⬅ Prev</button>
                <button onClick={nextFact}>Next ➡</button>
            </div>
            </div>
        </section>


        <section>
          <h2>Contact Us</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea rows="4" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
