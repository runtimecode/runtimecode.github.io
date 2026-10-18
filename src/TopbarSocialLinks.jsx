import { FaGithub, FaLinkedinIn } from "react-icons/fa";

function TopbarSocialLinks() {
  return (
    <div className="topbar-social-links">
      <a
        aria-label="GitHub profile (opens in a new tab)"
        href="https://github.com/runtimecode/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FaGithub aria-hidden="true" />
      </a>
      <a
        aria-label="LinkedIn profile (opens in a new tab)"
        href="https://www.linkedin.com/in/kmrprabhat"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FaLinkedinIn aria-hidden="true" />
      </a>
    </div>
  );
}

export default TopbarSocialLinks;
