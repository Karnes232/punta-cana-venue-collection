exports.handler = async (event, context) => {
  const { path, locale } = event.queryStringParameters || {}

  if (!path || !locale) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing path or locale parameter" }),
    }
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path

  // Construct the new URL with locale
  const newUrl = `/${locale}/${cleanPath}`

  return {
    statusCode: 302,
    headers: {
      Location: newUrl,
      "Cache-Control": "no-cache",
    },
    body: "",
  }
}
