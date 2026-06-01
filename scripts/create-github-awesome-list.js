/**
 * Creates an "awesome-ai-agents" GitHub repository with a curated README
 * that links back to your course. Awesome lists get starred, forked, and
 * linked to constantly — high-quality backlinks from github.com (DA 96).
 *
 * Run: node scripts/create-github-awesome-list.js
 * Requires: gh CLI authenticated (already set up)
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const REPO_NAME = "awesome-ai-agents";
const SITE_URL = "https://learnhowtobuildaiagents.com";

const README = `# Awesome AI Agents [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of awesome AI agent frameworks, tools, tutorials, and resources.

AI agents are autonomous systems that perceive, reason, and act to achieve goals. This list covers everything you need to build production-ready AI agents.

## Contents

- [Learning Resources](#learning-resources)
- [Frameworks](#frameworks)
- [LLM Providers](#llm-providers)
- [Tools & Protocols](#tools--protocols)
- [Multi-Agent Systems](#multi-agent-systems)
- [RAG & Memory](#rag--memory)
- [Deployment](#deployment)
- [Papers](#papers)
- [Communities](#communities)

---

## Learning Resources

- **[AI Agent Academy](${SITE_URL})** — Comprehensive course: 34 lessons covering Claude, LangChain, LlamaIndex, CrewAI, MCP. Free Module 1, no signup required.
- [LangChain Documentation](https://docs.langchain.com) — Official LangChain docs
- [LlamaIndex Documentation](https://docs.llamaindex.ai) — Official LlamaIndex docs
- [Anthropic Claude Documentation](https://docs.anthropic.com) — Claude API docs
- [OpenAI Cookbook](https://cookbook.openai.com) — OpenAI examples and guides

## Frameworks

### Orchestration
- [LangChain](https://github.com/langchain-ai/langchain) — The most popular agent orchestration framework
- [LlamaIndex](https://github.com/run-llama/llama_index) — Data framework for LLM applications
- [AutoGen](https://github.com/microsoft/autogen) — Microsoft's multi-agent framework
- [CrewAI](https://github.com/joaomdmoura/crewAI) — Role-based multi-agent framework
- [Haystack](https://github.com/deepset-ai/haystack) — NLP framework for agents

### Low-Level
- [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-python) — Official Claude Python SDK
- [OpenAI SDK](https://github.com/openai/openai-python) — Official OpenAI Python SDK

## LLM Providers

- [Claude (Anthropic)](https://anthropic.com) — 200K context, native tool use, extended thinking
- [GPT-4 (OpenAI)](https://openai.com) — Industry standard, vision, function calling
- [Gemini (Google)](https://deepmind.google/technologies/gemini/) — Multimodal, long context
- [Llama (Meta)](https://llama.meta.com) — Open-source, self-hostable
- [Mistral](https://mistral.ai) — Efficient open-source models

## Tools & Protocols

- [MCP (Model Context Protocol)](https://modelcontextprotocol.io) — Anthropic's open standard for AI tool connectivity
- [LangChain Tools](https://python.langchain.com/docs/integrations/tools/) — 100+ pre-built tools
- [Composio](https://composio.dev) — 150+ tool integrations for agents
- [E2B](https://e2b.dev) — Secure code execution sandbox for agents

## Multi-Agent Systems

- [CrewAI](https://crewai.com) — Role-based agent teams
- [AutoGen](https://microsoft.github.io/autogen/) — Conversational multi-agent framework
- [LangGraph](https://langchain-ai.github.io/langgraph/) — Graph-based agent workflows
- [AgentScope](https://github.com/modelscope/agentscope) — Multi-agent platform

## RAG & Memory

- [LlamaIndex](https://llamaindex.ai) — Best-in-class RAG framework
- [Chroma](https://www.trychroma.com) — Open-source vector database
- [Pinecone](https://pinecone.io) — Managed vector database
- [Weaviate](https://weaviate.io) — Open-source vector search engine
- [Mem0](https://mem0.ai) — Memory layer for AI agents

## Deployment

- [LangServe](https://python.langchain.com/docs/langserve) — Deploy LangChain agents as APIs
- [Modal](https://modal.com) — Serverless GPU compute for agents
- [Replicate](https://replicate.com) — Run ML models in the cloud
- [Vercel AI SDK](https://sdk.vercel.ai) — Deploy AI apps on Vercel

## Papers

- [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
- [Toolformer: Language Models Can Teach Themselves to Use Tools](https://arxiv.org/abs/2302.04761)
- [AutoGPT: An Autonomous GPT-4 Experiment](https://github.com/Significant-Gravitas/AutoGPT)
- [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442)

## Communities

- [LangChain Discord](https://discord.gg/langchain)
- [LlamaIndex Discord](https://discord.gg/llamaindex)
- [r/LangChain](https://reddit.com/r/LangChain)
- [r/artificial](https://reddit.com/r/artificial)
- [Hugging Face Forums](https://discuss.huggingface.co)

---

## Contributing

Contributions welcome! Please read the [contribution guidelines](CONTRIBUTING.md) first.

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)
`;

const CONTRIBUTING = `# Contribution Guidelines

Please ensure your pull request adheres to the following guidelines:

- Search previous suggestions before making a new one to avoid duplicates.
- Make sure the resource is useful before submitting.
- Make an individual pull request for each suggestion.
- Use the following format: \`[Resource Name](link) — Description\`
- Keep descriptions short and simple, but descriptive.
- Start the description with a capital and end with a full stop.
- Check your spelling and grammar.
- New categories or improvements to the existing categorization are welcome.

Thank you for your suggestions!
`;

async function main() {
  console.log("Creating awesome-ai-agents GitHub repository...\n");

  // Create temp directory
  const tmpDir = path.join(os.tmpdir(), REPO_NAME);
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true });
  }
  fs.mkdirSync(tmpDir);

  // Write files
  fs.writeFileSync(path.join(tmpDir, "README.md"), README);
  fs.writeFileSync(path.join(tmpDir, "CONTRIBUTING.md"), CONTRIBUTING);

  // Init git and create repo
  try {
    execSync("git init", { cwd: tmpDir, stdio: "pipe" });
    execSync("git add .", { cwd: tmpDir, stdio: "pipe" });
    execSync('git commit -m "Initial commit: awesome-ai-agents list"', {
      cwd: tmpDir,
      stdio: "pipe",
    });

    // Create GitHub repo
    execSync(
      `gh repo create ${REPO_NAME} --public --description "A curated list of awesome AI agent frameworks, tools, tutorials, and resources" --push --source .`,
      { cwd: tmpDir, stdio: "inherit" }
    );

    // Add topics for discoverability
    execSync(
      `gh repo edit ${REPO_NAME} --add-topic ai-agents --add-topic langchain --add-topic llm --add-topic claude --add-topic python --add-topic machine-learning`,
      { cwd: tmpDir, stdio: "pipe" }
    );

    console.log(`\n✓ Repository created: https://github.com/thulas42/${REPO_NAME}`);
    console.log("✓ Topics added for discoverability");
    console.log("\nThis gives you:");
    console.log("  - A backlink from github.com (DA 96)");
    console.log("  - Discoverability via GitHub search");
    console.log("  - Potential stars and forks = more backlinks");
    console.log(`\nNext: Submit a PR to add your repo to https://github.com/sindresorhus/awesome`);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    fs.rmSync(tmpDir, { recursive: true });
  }
}

main();
