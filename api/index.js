export default {
  async fetch(request) {
    if (request.method === "POST") {
      try {
        const { ip, port } = await request.json();
        const url = `https://api-proxy-checker.vercel.app/api/v1?ip=${ip}&port=${port}`;
        const res = await fetch(url);
        const data = await res.json();

        return new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: err.message }), {
          headers: { "Content-Type": "application/json" },
          status: 500,
        });
      }
    }

    return new Response("Gunakan metode POST dengan JSON { ip, port }", {
      status: 405,
      headers: { "Content-Type": "text/plain" },
    });
  },
};
