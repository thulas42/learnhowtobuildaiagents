require("dotenv").config();

const article = {
  title: "MCP (Model Context Protocol) Explained — The Universal AI Tool Standard",
  tags: ["ai", "mcp", "claude", "python"],
  canonical_url: "https://learnhowtobuildaiagents.com/blog/mcp-model-context-protocol",
  body_markdown: [
    "Model Context Protocol (MCP) is an open standard by Anthropic that standardizes how AI models connect to external tools. Think of it as USB for AI.",
    "",
    "## The Problem MCP Solves",
    "",
    "Before MCP, every AI tool integration was custom code. MCP provides one standard protocol for all tools.",
    "",
    "## Building an MCP Server",
    "",
    "```python",
    "from mcp.server import Server",
    "import json",
    "",
    "server = Server('my-tools')",
    "",
    "@server.tool()",
    "async def search_database(query: str) -> str:",
    "    \"\"\"Search the product database.\"\"\"",
    "    results = db.search(query)",
    "    return json.dumps(results)",
    "",
    "@server.tool()",
    "async def send_email(to: str, subject: str, body: str) -> str:",
    "    \"\"\"Send an email.\"\"\"",
    "    send(to, subject, body)",
    "    return f'Email sent to {to}'",
    "",
    "if __name__ == '__main__':",
    "    server.run()",
    "```",
    "",
    "## Why MCP Matters",
    "",
    "- **Reusability** — Build once, use with any MCP-compatible AI",
    "- **Ecosystem** — Growing library of pre-built MCP servers",
    "- **Security** — Built-in permission model and sandboxing",
    "- **Composability** — Mix tools from different servers",
    "",
    "## MCP Architecture",
    "",
    "```",
    "AI Model (Client) <--MCP Protocol--> MCP Server (Tools)",
    "                                           |",
    "                                    Database / API / Files",
    "```",
    "",
    "## Using MCP with Claude Desktop",
    "",
    "Configure in your Claude Desktop settings:",
    "",
    "```json",
    "{",
    "  \"mcpServers\": {",
    "    \"my-tools\": {",
    "      \"command\": \"python\",",
    "      \"args\": [\"my_mcp_server.py\"]",
    "    }",
    "  }",
    "}",
    "```",
    "",
    "## Learn More",
    "",
    "Full lesson on Claude + MCP in our AI agent course:",
    "",
    "Start free (no signup needed): [learnhowtobuildaiagents.com](https://learnhowtobuildaiagents.com/courses/module-1/lesson-1.1)",
  ].join("\n"),
};

fetch("https://dev.to/api/articles", {
  method: "POST",
  headers: {
    "api-key": process.env.DEVTO_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    article: {
      title: article.title,
      body_markdown: article.body_markdown,
      published: true,
      tags: article.tags,
      canonical_url: article.canonical_url,
      series: "AI Agent Development",
    },
  }),
})
  .then((r) => r.json())
  .then((d) => {
    if (d.path) {
      console.log("Published: https://dev.to" + d.path);
    } else {
      console.log("Error:", JSON.stringify(d));
    }
  })
  .catch((e) => console.error(e.message));
