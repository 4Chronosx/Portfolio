import { renderNavbar } from "./components/navbar.js";
import { renderWelcomeSection } from "./components/welcome.js";
import { renderProjectsSection } from "./components/projects.js";
import { renderTechStackSection } from "./components/techStack.js";
import { renderAchievementsSection } from "./components/achievements.js";
import { renderContactSection } from "./components/contact.js";

const DATA_PATH = "./src/data/portfolio.json";

async function loadPortfolioData() {
  const response = await fetch(DATA_PATH, { cache: "no-cache" });

  if (!response.ok) {
    throw new Error(`Failed to load portfolio data: ${response.status}`);
  }

  return response.json();
}

function getRequiredElement(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Missing required element: ${selector}`);
  }

  return element;
}

function renderPortfolio(data) {
  if (data.site?.title) {
    document.title = data.site.title;
  }

  const navbar = getRequiredElement("#navbar");
  const welcomeSection = getRequiredElement("#welcome-section");
  const projectsSection = getRequiredElement("#projects");
  const techStackSection = getRequiredElement("#tech-stack-section");
  const achievementsSection = getRequiredElement("#achievements-section");
  const contactSection = getRequiredElement("#contact-section");

  renderNavbar(navbar, data.navbar);
  renderWelcomeSection(welcomeSection, data.welcome);
  renderProjectsSection(projectsSection, data.projects);
  renderTechStackSection(techStackSection, data.techStack);
  renderAchievementsSection(achievementsSection, data.achievements);
  renderContactSection(contactSection, data.contact);
}

async function bootstrap() {
  try {
    const portfolioData = await loadPortfolioData();
    renderPortfolio(portfolioData);
  } catch (error) {
    console.error("Unable to render portfolio from JSON data.", error);
  }
}

bootstrap();
