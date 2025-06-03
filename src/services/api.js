// services/api.js

const API_BASE_URL =
  "https://publicityposterbackend.onrender.com/api/templates";

// Fetch all templates
export async function fetchTemplates() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch templates");
  return response.json();
}

// Submit a new template
export async function submitTemplate(templateData) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(templateData),
  });

  if (!response.ok) throw new Error("Failed to submit template");
  return response.json();
}
