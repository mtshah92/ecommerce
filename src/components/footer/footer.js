import "./footer.css";
export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container-one footer-container">
        <h2>CustoFriend</h2>
        <p>
          Fill your house with stacks of books, in all the crannies and all the
          nooks.
        </p>
        <p>Privacy Policy</p>
        <p>Terms of Use</p>
        <p>© CustoFriend 2023</p>
      </div>
      <div className="footer-container-two footer-container">
        <p>Connect</p>
        <a
          href="https://github.com/mtshah92"
          target="_blank"
          className="social-links"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/mtshah98/"
          target="_blank"
          className="social-links"
        >
          LinkedIn
        </a>
        <a
          href="https://twitter.com/mtshah92"
          target="_blank"
          className="social-links"
        >
          Twitter
        </a>
      </div>
      <div className="footer-container-three footer-container">
        <p>Resources</p>
        <a href="/signup" className="social-links">
          Sign Up
        </a>
        <a href="/login" className="social-links">
          Sign In
        </a>
      </div>
    </div>
  );
};
