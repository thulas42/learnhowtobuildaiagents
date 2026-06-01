/**
 * Publish articles to Dev.to via their API.
 * Get your API key: https://dev.to/settings/extensions → "DEV Community API Keys"
 * Run: node scripts/publish-devto.js
 *
 * Set env var: DEVTO_API_KEY=your_key_here
 */

require("dotenv").config();

const DEVTO_API_KEY = process.env.DEVTO_API_KEY;
const SITE_URL = "https://learnhowtobuildaiagents.com";

if (!DEVTO_API_KEY) {
  console.error("❌ DEVTO_API_KEY not set in .env");
  process.exit(1);
}

const articles = [
  {
    title: "What Are AI Agents? A Complete Beginner's Guide (2026)",
    tags: ["ai", "python", "machinelearning", "beginners"],
    canonical_url: `${SITE_URL}/blog/what-are-ai-agents`,
    body_markdown: `
An **AI agent** is a software system that can perceive its environment, reason about what it observes, and take autonomous actions to achieve specific goals.

## The Agent Loop

Every AI agent follows: **Perceive → Reason → Act → Learn**

## Types of AI Agents

- **Simple Reflex Agents** — React to current input only (like a thermostat)
- **Model-Based Agents** — Maintain internal state about the world
- **Goal-Based Agents** — Plan actions to achieve specific objectives
- **Learning Agents** — Improve performance over time (most modern agents)

## Building Your First Agent

\`\`\`python
import anthropic

client = anthropic.Anthropic(api_key="your-key")

def simple_agent(task: str) -> str:
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2048,
        system="You are a helpful assistant. Think step by step.",
        messages=[{"role": "user", "content": task}]
    )
    return response.content[0].text

result = simple_agent("What are the 3 most important things to know about RAG?")
print(result)
\`\`\`

## Real-World Applications

AI agents power: GitHub Copilot, ChatGPT, Claude, autonomous vehicles, trading bots, customer support systems, and DevOps automation.

## Learn More

I built a full structured course covering 34 lessons on AI agent development with Claude, LangChain, LlamaIndex, and CrewAI.

👉 **Start free (no signup needed for Module 1):** [learnhowtobuildaiagents.com](${SITE_URL}/courses/module-1/lesson-1.1)
    `.trim(),
  },
  {
    title: "Build Your First AI Agent with Claude (Anthropic) — Python Tutorial",
    tags: ["ai", "python", "claude", "tutorial"],
    canonical_url: `${SITE_URL}/blog/build-first-agent-python`,
    body_markdown: `
Claude is Anthropic's AI model with a 200K token context window and native tool use. Here's how to build an agent with it.

## Setup

\`\`\`bash
pip install anthropic
\`\`\`

## Basic Agent

\`\`\`python
import anthropic
import json

client = anthropic.Anthropic(api_key="your-key")

tools = [{
    "name": "calculate",
    "description": "Perform mathematical calculations",
    "input_schema": {
        "type": "object",
        "properties": {
            "expression": {"type": "string"}
        },
        "required": ["expression"]
    }
}]

def agent_with_tools(task: str) -> str:
    messages = [{"role": "user", "content": task}]
    
    while True:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2048,
            tools=tools,
            messages=messages
        )
        
        if response.stop_reason == "tool_use":
            tool_block = next(b for b in response.content if b.type == "tool_use")
            result = {"result": eval(tool_block.input["expression"])}
            
            messages.append({"role": "assistant", "content": response.content})
            messages.append({"role": "user", "content": [{
                "type": "tool_result",
                "tool_use_id": tool_block.id,
                "content": json.dumps(result)
            }]})
        else:
            return response.content[0].text

print(agent_with_tools("What is 1547 * 382 + 99?"))
\`\`\`

## Why Claude for Agents?

- 200K token context window
- Native tool use (no workarounds)
- Extended thinking for complex reasoning
- Constitutional AI for safety

## Learn More

Full course covering Claude, LangChain, LlamaIndex, CrewAI, and MCP:

👉 [learnhowtobuildaiagents.com](${SITE_URL}/courses/module-1/lesson-1.1) — Module 1 free, no signup needed
    `.trim(),
  },
  {
    title: "MCP (Model Context Protocol) Explained — The Universal AI Tool Standard",
    tags: ["ai", "mcp", "claude", "python"],
    canonical_url: `${SITE_URL}/blog/mcp-model-context-protocol`,
    body_markdown: `
**Model Context Protocol (MCP)** is an open standard by Anthropic that standardizes how AI models connect to external tools. Think of it as USB for AI.

## The Problem MCP Solves

Before MCP, every AI tool integration was custom code. MCP provides one standard protocol for all tools.

## Building an MCP Server

\`\`\`python
# pip install mcp
from mcp.server import Server
import json

server = Server("my-tools")

@server.tool()
async def search_database(query: str) -> str:
    """Search the product database."""
    results = db.search(query)
    return json.dumps(results)

@server.tool()
async def send_email(to: str, subject: str, body: str) -> str:
    """Send an email."""
    send(to, subject, body)
    return f"Email sent to {to}"

if __name__ == "__main__":
    server.run()
\`\`\`

## Why MCP Matters

- **Reusability** — Build once, use with any MCP-compatible AI
- **Ecosystem** — Growing library of pre-built servers
- **Security** — Built-in permission model
- **Composability** — Mix tools from different servers

## Learn More

Full lesson on Claude + MCP in our AI agent course:

👉 [learnhowtobuildaiagents.com](${SITE_URL}/courses/module-1/lesson-1.1) — Start free
    `.trim(),
  },
];

async function publishArticle(article) {
  const response = await fetch("https://dev.to/api/articles", {
    method: "POST",
    headers: {
      "api-key": DEVTO_API_KEY,
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
  });

  const data = await response.json();

  if (response.ok) {
    console.log(`✓ Published: "${article.title}"`);
    console.log(`  URL: https://dev.to${data.path}`);
    return data;
  } else {
    console.error(`✗ Failed: "${article.title}"`);
    console.error(`  Error: ${JSON.stringify(data)}`);
    return null;
  }
}

async function main() {
  console.log(`Publishing ${articles.length} articles to Dev.to...\n`);

  for (const article of articles) {
    await publishArticle(article);
    // Rate limit: wait 2 seconds between posts
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log("\nDone! Articles will appear on Dev.to and get indexed by Google.");
  console.log("Each article links back to your course = backlinks from DA 93 domain.");
}

main().catch(console.error);
