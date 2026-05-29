export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.GITHUB_ACTIONS_TOKEN;
  if (!token) {
    return response.status(500).json({ error: "GITHUB_ACTIONS_TOKEN not configured" });
  }

  const owner = "yanatornch";
  const repo = "sprint-dashboard-2026";
  const workflow = "azure-sync.yml";

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ ref: "main" }),
    }
  );

  if (res.status === 204) {
    return response.status(200).json({ success: true, message: "Sync triggered" });
  }

  const text = await res.text();
  return response.status(res.status).json({ error: text || "GitHub API error" });
}
