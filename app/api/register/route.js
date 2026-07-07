export async function POST(request) {
  try {
    const body = await request.json();

    if (!process.env.GAS_URL) {
      throw new Error("GAS_URL environment variable is not defined");
    }

    const response = await fetch(process.env.GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return Response.json(data);
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    );
  }
}
