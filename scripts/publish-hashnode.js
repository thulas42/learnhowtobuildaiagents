/**
 * Publish articles to Hashnode via their GraphQL API.
 * Get your API key: https://hashnode.com/settings/developer
 * Get your publication ID: Go to your blog → Settings → General → Publication ID
 * Run: node scripts/publish-hashnode.js
 *
 * Set env vars:
 *   HASHNODE_API_KEY=your_key
 *   HASHNODE_PUBLICATION_ID=your_publication_id
 */

require("dotenv").config();

const HASHNODE_API_KEY = process.env.HASHNODE_API_KEY;
const PUBLICATION_ID = process.env.HASHNODE_PUBLICATION_ID;
const SITE_URL = "https://learnhowtobuildaiagents.com";

if (!HASHNODE_API_KEY || !PUBLICATION_ID) {
  console.error("❌ Set HASHNODE_API_KEY and HASHNODE_PUBLICATION_ID in .env");
  process.exit(1);
}

const articles = [
  {
    title: "LangChain vs LlamaIndex vs CrewAI — Which AI Framework to Choose?",
    slug: "langchain-vs-llamaindex-vs-crewai",
    tags: ["ai", "langchain", "python", "machinelearning"],
    originalArticleURL: `${SITE_URL}/blog/langchain-vs-llamaindex-vs-crewai`,
    content: `
Choosing the right framework for your AI agent project can be confusing. Here's a practical comparison.

## LangChain — The Swiss Army Knife

**Best for:** General-purpose agent development, chains, and orchestration.

- Largest ecosystem and community
- Supports 50+ LLM providers
- Flexible chain/agent composition
- Great for prototyping and production

\`\`\`python
from langchain.agents import initialize_agent, Tool
from langchain_openai import ChatOpenAI

tools = [Tool(name="Search", func=search, description="Search the web")]
agent = initialize_agent(tools, ChatOpenAI(), agent="zero-shot-react-description")
result = agent.run("What is the latest news about AI agents?")
\`\`\`

## LlamaIndex — The Data Expert

**Best for:** RAG (Retrieval Augmented Generation) and data-connected agents.

\`\`\`python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader("./docs").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
response = query_engine.query("What is our refund policy?")
\`\`\`

## CrewAI — The Team Builder

**Best for:** Multi-agent systems where agents collaborate.

\`\`\`python
from crewai import Agent, Task, Crew

researcher = Agent(role="Researcher", goal="Find information", backstory="Expert researcher")
writer = Agent(role="Writer", goal="Write content", backstory="Expert writer")

research_task = Task(description="Research AI agents", agent=researcher)
write_task = Task(description="Write a report", agent=writer)

crew = Crew(agents=[researcher, writer], tasks=[research_task, write_task])
result = crew.kickoff()
\`\`\`

## When to Use Each

| Use Case | Best Choice |
|----------|-------------|
| Simple chatbot with tools | LangChain or Claude API |
| Q&A over documents | LlamaIndex |
| Team of specialized agents | CrewAI |
| Production deployment | LangChain (most mature) |

## Learn All Three

Our course covers all frameworks in depth:

👉 [learnhowtobuildaiagents.com](${SITE_URL}/courses/module-1/lesson-1.1) — Start free, no signup needed
    `.trim(),
  },
  {
    title: "RAG for AI Agents — Give Your Agent a Knowledge Base",
    slug: "rag-for-ai-agents",
    tags: ["ai", "rag", "python", "llm"],
    originalArticleURL: `${SITE_URL}/blog/rag-retrieval-augmented-generation`,
    content: `
**Retrieval Augmented Generation (RAG)** lets AI agents access external knowledge beyond their training data. Instead of hallucinating answers, agents look up accurate information.

## How RAG Works

1. **Index** — Split documents into chunks, generate embeddings, store in vector DB
2. **Retrieve** — Find the most relevant chunks for a query
3. **Generate** — Pass retrieved context to the LLM with the question

## Building a RAG Pipeline

\`\`\`python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.node_parser import SentenceSplitter

# 1. Load documents
documents = SimpleDirectoryReader("./knowledge-base").load_data()

# 2. Parse into chunks (500 tokens, 100 overlap)
parser = SentenceSplitter(chunk_size=500, chunk_overlap=100)
nodes = parser.get_nodes_from_documents(documents)

# 3. Create index
index = VectorStoreIndex(nodes)

# 4. Query
query_engine = index.as_query_engine(similarity_top_k=3)
response = query_engine.query("What are the key features of our product?")
print(response)
\`\`\`

## RAG Best Practices

- Chunk at 500-800 tokens with 100-token overlap
- Use hybrid search (keyword + semantic) for better retrieval
- Re-rank results before passing to the LLM
- Include metadata (source, date) with each chunk

## When to Use RAG

Use RAG when your agent needs to answer questions about specific documents, company knowledge, or frequently updated information.

## Learn More

Full RAG course module at:

👉 [learnhowtobuildaiagents.com](${SITE_URL}/courses/module-1/lesson-1.1) — Module 1 free
    `.trim(),
  },
];

async function publishArticle(article) {
  const mutation = `
    mutation PublishPost($input: PublishPostInput!) {
      publishPost(input: $input) {
        post {
          id
          title
          url
        }
      }
    }
  `;

  const response = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: HASHNODE_API_KEY,
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        input: {
          title: article.title,
          slug: article.slug,
          contentMarkdown: article.content,
          tags: article.tags.map((t) => ({ slug: t, name: t })),
          publicationId: PUBLICATION_ID,
          originalArticleURL: article.originalArticleURL,
        },
      },
    }),
  });

  const data = await response.json();

  if (data.data?.publishPost?.post) {
    const post = data.data.publishPost.post;
    console.log(`✓ Published: "${article.title}"`);
    console.log(`  URL: ${post.url}`);
    return post;
  } else {
    console.error(`✗ Failed: "${article.title}"`);
    console.error(`  Error: ${JSON.stringify(data.errors || data)}`);
    return null;
  }
}

async function main() {
  console.log(`Publishing ${articles.length} articles to Hashnode...\n`);

  for (const article of articles) {
    await publishArticle(article);
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log("\nDone! Hashnode articles link back to your course = DA 82 backlinks.");
}

main().catch(console.error);
