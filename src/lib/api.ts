async function fetchApi(path: string) {
  try {
    const response = await fetch(
      `${BASE_URL}${path}`,
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      return response;
    }
  } catch {
    // Primary API failed.
  }

  return fetch(
    `${FALLBACK_URL}${path}`,
    {
      cache: "no-store",
    }
  );
}