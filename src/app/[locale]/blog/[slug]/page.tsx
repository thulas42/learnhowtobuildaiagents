import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { blogPostsMeta } from "@/data/blog-posts-meta";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import { pageMetadata } from "@/lib/seo";

const blogPosts: Record<string, { title: string; content: string; category: string; date: string }> = {
  "what-are-ai-agents": {
    title: "What Are AI Agents? A Complete Beginner's Guide (2026)",
    category: "Fundamentals",
    date: "2026-05-28",
    content: `
<h2>What is an AI Agent?</h2>
<p>An AI agent is a software system that can perceive its environment, reason about what it observes, and take autonomous actions to achieve specific goals. Unlike traditional programs that follow fixed scripts, agents adapt their behavior based on context.</p>

<h3>The Agent Loop</h3>
<p>Every AI agent follows a fundamental cycle: <strong>Perceive → Reason → Act → Learn</strong>. The agent observes its environment (text input, API data, sensor readings), decides what to do (using an LLM, rules, or ML model), takes an action (API call, message, code execution), and incorporates feedback.</p>

<h3>Types of AI Agents</h3>
<ul>
<li><strong>Simple Reflex Agents</strong> — React to current input only (like a thermostat)</li>
<li><strong>Model-Based Agents</strong> — Maintain internal state about the world</li>
<li><strong>Goal-Based Agents</strong> — Plan actions to achieve specific objectives</li>
<li><strong>Utility-Based Agents</strong> — Optimize for the best possible outcome</li>
<li><strong>Learning Agents</strong> — Improve performance over time (most modern agents)</li>
</ul>

<h3>Real-World Examples</h3>
<p>AI agents are everywhere: GitHub Copilot (code completion), ChatGPT and Claude (conversational agents with tool use), autonomous vehicles, trading bots, customer support systems, and DevOps automation.</p>

<h3>Why Learn Agent Development?</h3>
<p>The demand for AI agent developers is exploding. Companies need engineers who can build autonomous systems that go beyond simple chatbots — agents that can use tools, maintain memory, collaborate with other agents, and operate reliably in production.</p>

<h3>Getting Started</h3>
<p>The best way to learn is by building. Start with a simple agent that uses an LLM (like Claude or GPT-4) to reason, give it one or two tools, and gradually add complexity. Our free Module 1 covers all these fundamentals with hands-on exercises.</p>
`,
  },
  "build-first-agent-python": {
    title: "Build Your First AI Agent in Python (Step-by-Step)",
    category: "Tutorial",
    date: "2026-05-29",
    content: `
<h2>Build Your First AI Agent in Python</h2>
<p>In this tutorial, you'll build a working AI agent from scratch using Python and the Anthropic Claude API. By the end, you'll have an agent that can reason about tasks and use tools to accomplish goals.</p>

<h3>Prerequisites</h3>
<ul>
<li>Python 3.10+ installed</li>
<li>Basic Python knowledge (variables, functions, loops)</li>
<li>An Anthropic API key (free tier available at console.anthropic.com)</li>
</ul>

<h3>Step 1: Install Dependencies</h3>
<pre><code>pip install anthropic</code></pre>

<h3>Step 2: Create Your Agent</h3>
<pre><code>import anthropic

client = anthropic.Anthropic(api_key="your-key-here")

def simple_agent(task: str) -> str:
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2048,
        system="You are a helpful assistant. Think step by step.",
        messages=[{"role": "user", "content": task}]
    )
    return response.content[0].text

# Test it
result = simple_agent("What are the 3 most important things to know about RAG?")
print(result)</code></pre>

<h3>Step 3: Add Tool Use</h3>
<p>A real agent needs tools. Let's add a calculator tool:</p>
<pre><code>import json

tools = [{
    "name": "calculate",
    "description": "Perform mathematical calculations",
    "input_schema": {
        "type": "object",
        "properties": {
            "expression": {"type": "string", "description": "Math expression to evaluate"}
        },
        "required": ["expression"]
    }
}]

def execute_tool(name, inputs):
    if name == "calculate":
        return {"result": eval(inputs["expression"])}

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
            result = execute_tool(tool_block.name, tool_block.input)
            
            messages.append({"role": "assistant", "content": response.content})
            messages.append({"role": "user", "content": [{
                "type": "tool_result",
                "tool_use_id": tool_block.id,
                "content": json.dumps(result)
            }]})
        else:
            return response.content[0].text</code></pre>

<h3>Step 4: Test Your Agent</h3>
<pre><code>print(agent_with_tools("What is 1547 * 382 + 99?"))
# The agent will use the calculator tool and return the correct answer</code></pre>

<h3>Next Steps</h3>
<p>You've built a working agent! To go further, add more tools (web search, file operations, database queries), implement memory (conversation history), and add error handling. Our full course covers all of this in depth across 30+ lessons.</p>
`,
  },
  "langchain-vs-llamaindex-vs-crewai": {
    title: "LangChain vs LlamaIndex vs CrewAI — Which Framework to Choose?",
    category: "Comparison",
    date: "2026-05-30",
    content: `
<h2>LangChain vs LlamaIndex vs CrewAI</h2>
<p>Choosing the right framework for your AI agent project can be confusing. Here's a practical comparison based on real-world usage.</p>

<h3>LangChain — The Swiss Army Knife</h3>
<p><strong>Best for:</strong> General-purpose agent development, chains, and orchestration.</p>
<ul>
<li>Largest ecosystem and community</li>
<li>Supports 50+ LLM providers</li>
<li>Flexible chain/agent composition</li>
<li>Great for prototyping and production</li>
<li>Can be complex for simple use cases</li>
</ul>

<h3>LlamaIndex — The Data Expert</h3>
<p><strong>Best for:</strong> RAG (Retrieval Augmented Generation) and data-connected agents.</p>
<ul>
<li>Best-in-class document ingestion and indexing</li>
<li>Optimized for knowledge-base agents</li>
<li>Excellent vector store integrations</li>
<li>Simpler API for data-focused tasks</li>
<li>Less flexible for non-RAG use cases</li>
</ul>

<h3>CrewAI — The Team Builder</h3>
<p><strong>Best for:</strong> Multi-agent systems where agents collaborate on tasks.</p>
<ul>
<li>Define agents with roles, goals, and backstories</li>
<li>Agents delegate tasks to each other</li>
<li>Built-in task management and workflows</li>
<li>Great for complex, multi-step processes</li>
<li>Newer, smaller ecosystem</li>
</ul>

<h3>When to Use Each</h3>
<table>
<tr><td><strong>Use Case</strong></td><td><strong>Best Choice</strong></td></tr>
<tr><td>Simple chatbot with tools</td><td>LangChain or Claude API directly</td></tr>
<tr><td>Q&A over documents</td><td>LlamaIndex</td></tr>
<tr><td>Multi-step research</td><td>LangChain or CrewAI</td></tr>
<tr><td>Team of specialized agents</td><td>CrewAI</td></tr>
<tr><td>Production deployment</td><td>LangChain (most mature)</td></tr>
<tr><td>Quick prototype</td><td>Claude API directly</td></tr>
</table>

<h3>Our Recommendation</h3>
<p>Start with the Claude API directly to understand fundamentals. Then learn LangChain for orchestration, LlamaIndex for RAG, and CrewAI for multi-agent systems. Our course covers all four approaches with hands-on projects.</p>
`,
  },
  "claude-tool-use-tutorial": {
    title: "Claude Tool Use Tutorial — Build Agents That Take Actions",
    category: "Tutorial",
    date: "2026-05-30",
    content: `
<h2>Claude Tool Use — Build Agents That Take Actions</h2>
<p>Claude's native tool use (function calling) lets you build agents that don't just generate text — they take real actions in the world. This tutorial shows you how.</p>

<h3>How Tool Use Works</h3>
<p>You define tools (functions) with descriptions and input schemas. Claude decides when to call them based on the user's request. You execute the tool and return the result. Claude incorporates the result into its response.</p>

<h3>Defining Tools</h3>
<pre><code>tools = [
    {
        "name": "search_products",
        "description": "Search the product catalog by keyword",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string"},
                "max_results": {"type": "integer", "default": 5}
            },
            "required": ["query"]
        }
    },
    {
        "name": "get_order_status",
        "description": "Check the status of a customer order",
        "input_schema": {
            "type": "object",
            "properties": {
                "order_id": {"type": "string"}
            },
            "required": ["order_id"]
        }
    }
]</code></pre>

<h3>The Agent Loop</h3>
<p>The key pattern is a loop: send message → check if Claude wants to use a tool → execute it → send result back → repeat until Claude gives a final answer.</p>

<h3>Best Practices</h3>
<ul>
<li>Write clear, specific tool descriptions — Claude uses these to decide when to call tools</li>
<li>Keep input schemas simple and well-documented</li>
<li>Always validate tool inputs before executing</li>
<li>Set a maximum iteration count to prevent infinite loops</li>
<li>Handle tool execution errors gracefully</li>
</ul>

<h3>Learn More</h3>
<p>Our course covers Claude tool use in depth in Lesson 4.8, including building MCP servers, multi-tool agents, and production patterns.</p>
`,
  },
  "mcp-model-context-protocol": {
    title: "MCP (Model Context Protocol) Explained — The Universal AI Tool Standard",
    category: "Deep Dive",
    date: "2026-05-30",
    content: `
<h2>MCP — The Universal AI Tool Standard</h2>
<p>Model Context Protocol (MCP) is an open standard created by Anthropic that standardizes how AI models connect to external tools and data sources. It's like USB for AI — one protocol to connect to everything.</p>

<h3>The Problem MCP Solves</h3>
<p>Before MCP, every AI tool integration was custom. Want your agent to access a database? Write custom code. Want it to search the web? Different custom code. Want it to read files? Yet another integration. MCP provides one standard protocol for all of these.</p>

<h3>How MCP Works</h3>
<p>MCP uses a client-server architecture. The AI model (client) communicates with MCP servers that expose tools. Each server can provide multiple tools, and you can connect multiple servers to one AI model.</p>

<h3>Building an MCP Server</h3>
<pre><code>from mcp.server import Server
from mcp.types import Tool, TextContent

server = Server("my-tools")

@server.tool()
async def query_database(sql: str) -> str:
    """Execute a read-only SQL query against the database."""
    results = db.execute(sql)
    return json.dumps(results)

@server.tool()
async def create_ticket(title: str, description: str, priority: str) -> str:
    """Create a support ticket in the ticketing system."""
    ticket = ticketing.create(title=title, desc=description, priority=priority)
    return f"Created ticket #{ticket.id}"</code></pre>

<h3>Why MCP Matters for Agent Developers</h3>
<ul>
<li><strong>Reusability</strong> — Build a tool once, use it with any MCP-compatible AI</li>
<li><strong>Ecosystem</strong> — Growing library of pre-built MCP servers</li>
<li><strong>Security</strong> — Built-in permission model</li>
<li><strong>Composability</strong> — Mix tools from different servers</li>
</ul>

<h3>Getting Started</h3>
<p>Our course covers MCP in detail in Lesson 4.8, including building servers from scratch, connecting to Claude Desktop, and production deployment patterns.</p>
`,
  },
  "rag-retrieval-augmented-generation": {
    title: "RAG for AI Agents — Give Your Agent a Knowledge Base",
    category: "Tutorial",
    date: "2026-05-30",
    content: `
<h2>RAG — Give Your Agent a Knowledge Base</h2>
<p>Retrieval Augmented Generation (RAG) lets AI agents access external knowledge beyond their training data. Instead of hallucinating answers, agents can look up accurate, up-to-date information.</p>

<h3>How RAG Works</h3>
<ol>
<li><strong>Index</strong> — Split documents into chunks, generate embeddings, store in a vector database</li>
<li><strong>Retrieve</strong> — When the agent gets a question, find the most relevant chunks</li>
<li><strong>Generate</strong> — Pass the retrieved context to the LLM along with the question</li>
</ol>

<h3>Building a RAG Pipeline</h3>
<pre><code>from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# 1. Load and index documents
documents = SimpleDirectoryReader("./docs").load_data()
index = VectorStoreIndex.from_documents(documents)

# 2. Create a query engine
query_engine = index.as_query_engine()

# 3. Ask questions
response = query_engine.query("What is our refund policy?")
print(response)</code></pre>

<h3>RAG Best Practices</h3>
<ul>
<li>Chunk documents at 500-800 tokens with 100-token overlap</li>
<li>Use hybrid search (keyword + semantic) for better retrieval</li>
<li>Re-rank results before passing to the LLM</li>
<li>Include metadata (source, date, section) with each chunk</li>
<li>Evaluate retrieval quality separately from generation quality</li>
</ul>

<h3>When to Use RAG</h3>
<p>Use RAG when your agent needs to answer questions about specific documents, company knowledge, or frequently updated information. It's the foundation of most enterprise AI agent deployments.</p>

<h3>Learn More</h3>
<p>Module 3 of our course covers RAG in depth, including advanced patterns like multi-hop retrieval, agentic RAG, and production optimization.</p>
`,
  },
};

interface Props {
  params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts[params.slug];
  const meta = blogPostsMeta.find((p) => p.slug === params.slug);
  if (!post || !meta) return { title: "Post Not Found", robots: { index: false } };

  const plain = post.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  return pageMetadata({
    title: post.title,
    description: meta.excerpt || plain.substring(0, 160),
    path: `/blog/${params.slug}`,
    locale: params.locale,
    keywords: [meta.category, "AI agents", "tutorial"],
    ogType: "article",
  });
}

export function generateStaticParams() {
  return blogPostsMeta.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts[params.slug];

  if (!post) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="btn-primary">← Back to Blog</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${params.slug}` },
        ]}
      />
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        <article itemScope itemType="https://schema.org/Article">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                {post.category}
              </span>
              <time className="text-xs text-gray-400" dateTime={post.date}>
                {post.date}
              </time>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {post.title}
            </h1>
          </header>

          <div
            className="lesson-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* CTA */}
        <div className="mt-12 card p-8 text-center bg-gradient-to-br from-primary-50 to-white dark:from-primary-950/20 dark:to-gray-900">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Ready to go deeper?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This topic is covered in detail in our structured course. 30+ lessons, quizzes, and projects.
          </p>
          <Link href="/courses" className="btn-primary">
            Start the Course Free →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
