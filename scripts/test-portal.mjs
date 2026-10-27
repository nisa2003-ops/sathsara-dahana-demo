import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

test("1. Portal Questions Data Structure", () => {
  const dataFilePath = path.join(root, "src", "data", "portalQuestions.ts");
  assert.ok(fs.existsSync(dataFilePath), "portalQuestions.ts should exist");

  const content = fs.readFileSync(dataFilePath, "utf8");
  assert.match(content, /01\/03/, "Should contain question 01/03");
  assert.match(content, /02\/03/, "Should contain question 02/03");
  assert.match(content, /03\/03/, "Should contain question 03/03");

  // Verify exactly 3 questions are defined in PORTAL_QUESTIONS
  const qMatches = content.match(/questionNumber:\s*"0[1-3]\/03"/g);
  assert.equal(qMatches?.length, 3, "Must have exactly 3 questions");
});

test("2. Navbar and Footer Navigation Links", () => {
  const navbarPath = path.join(root, "src", "components", "layout", "Navbar.tsx");
  const navbarContent = fs.readFileSync(navbarPath, "utf8");
  assert.match(navbarContent, /TIME PORTAL/, "Navbar should include TIME PORTAL");
  assert.match(navbarContent, /\/portal/, "Navbar should route to /portal");

  const footerPath = path.join(root, "src", "components", "layout", "Footer.tsx");
  const footerContent = fs.readFileSync(footerPath, "utf8");
  assert.match(footerContent, /Time Portal/, "Footer should include Time Portal link");
  assert.match(footerContent, /\/portal/, "Footer should route to /portal");
});

test("3. Time Portal Routes Exist", () => {
  const portalPage = path.join(root, "src", "app", "portal", "page.tsx");
  assert.ok(fs.existsSync(portalPage), "/portal route page.tsx must exist");

  const dimensionPage = path.join(root, "src", "app", "portal", "dimension", "page.tsx");
  assert.ok(fs.existsSync(dimensionPage), "/portal/dimension destination route page.tsx must exist");
});

test("4. Portal Components & Expansion Lifecycle", () => {
  const gatewayPath = path.join(root, "src", "components", "portal", "PortalGateway.tsx");
  const gatewayContent = fs.readFileSync(gatewayPath, "utf8");
  assert.match(gatewayContent, /charging/, "Gateway should have charging phase");
  assert.match(gatewayContent, /expanding/, "Gateway should have expanding phase");
  assert.match(gatewayContent, /flash/, "Gateway should have peak transition flash");

  const experiencePath = path.join(root, "src", "components", "portal", "TimePortalExperience.tsx");
  const experienceContent = fs.readFileSync(experiencePath, "utf8");
  assert.match(experienceContent, /ENTER THE PORTAL/, "TimePortalExperience should reveal ENTER THE PORTAL");

  const destinationPath = path.join(root, "src", "components", "portal", "DimensionDestination.tsx");
  const destinationContent = fs.readFileSync(destinationPath, "utf8");
  assert.match(destinationContent, /YOU HAVE ENTERED ANOTHER DIMENSION/, "Destination should display welcome message");
  assert.match(destinationContent, /RETURN TO SATHSARA DAHANA/, "Destination should have return button");
});
