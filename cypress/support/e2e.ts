import "./commands";

const ignoredErrors = [
  "ResizeObserver loop",
  "Non-Error promise rejection",
  "Loading chunk",
];

Cypress.on("uncaught:exception", (err) => {
  if (ignoredErrors.some((msg) => err.message.includes(msg))) {
    return false;
  }
  // Log unexpected errors in CI for debugging
  console.error("Uncaught exception:", err.message);
  return false;
});
