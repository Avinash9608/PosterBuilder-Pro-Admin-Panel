export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Get the content type from the response
    const contentType = response.headers.get("content-type") || "image/jpeg";

    // Set the appropriate headers
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400");

    // Stream the image data
    const imageBuffer = await response.arrayBuffer();
    res.send(Buffer.from(imageBuffer));
  } catch (error) {
    console.error("Image proxy error:", error);
    res.status(500).json({ error: "Failed to proxy image" });
  }
}
