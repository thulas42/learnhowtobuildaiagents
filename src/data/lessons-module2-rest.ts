import type { LessonData } from "./lessons";

export const module2RestLessons: Record<string, LessonData> = {
  "module-2/lesson-2.3": {
    number: "2.3",
    title: "Key Algorithms for AI Agents",
    module: { number: 2, title: "Fundamentals of AI and Machine Learning" },
    content: `## Key Algorithms for AI Agents

The algorithms that power AI agents span from classical decision-making to modern deep learning.

### Decision Trees and Random Forests

Decision trees split data based on feature values to make predictions.

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

# Train a random forest for agent decision-making
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Agent uses model to decide action
action = model.predict([current_state])[0]
\`\`\`

- **Decision Trees:** Simple, interpretable, but prone to overfitting
- **Random Forests:** Ensemble of trees, more robust, better generalization
- **Use case:** Classification tasks in agent perception (spam detection, intent classification)

### Neural Networks Fundamentals

Neural networks learn complex patterns through layers of connected neurons.

- **Input layer:** Receives raw data (percepts)
- **Hidden layers:** Extract features and patterns
- **Output layer:** Produces predictions (actions)
- **Training:** Backpropagation adjusts weights to minimize error

### Q-Learning and Policy Gradients

Core reinforcement learning algorithms for agent training:

**Q-Learning:** Learn the value of state-action pairs

\`\`\`python
# Q-learning update rule
# Q(s, a) = Q(s, a) + alpha * (reward + gamma * max(Q(s', a')) - Q(s, a))

import numpy as np

Q = np.zeros((num_states, num_actions))
alpha = 0.1  # learning rate
gamma = 0.99  # discount factor

def update_q(state, action, reward, next_state):
    best_next = np.max(Q[next_state])
    Q[state, action] += alpha * (reward + gamma * best_next - Q[state, action])
\`\`\`

**Policy Gradients:** Directly learn a policy (state → action mapping)
- More suitable for continuous action spaces
- Used in robotics, game playing

### Natural Language Processing Basics

NLP enables agents to understand and generate human language:

- **Tokenization:** Breaking text into tokens
- **Word embeddings:** Dense vector representations (Word2Vec, GloVe)
- **Transformers:** Attention-based architecture (GPT, BERT)
- **Key for:** Chatbots, virtual assistants, text-based agents

### Embeddings and Vector Representations

Embeddings convert discrete items into continuous vector spaces:

\`\`\`python
from openai import OpenAI
client = OpenAI()

# Generate embedding for text
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="What is an AI agent?"
)
vector = response.data[0].embedding  # 1536-dimensional vector
\`\`\`

- **Text embeddings:** Represent meaning as vectors
- **Similarity search:** Find related content via cosine similarity
- **RAG foundation:** Retrieve relevant context for agent responses

### Key Takeaways

- Decision trees/forests for structured decision-making
- Neural networks for complex pattern recognition
- Q-learning for reward-based agent training
- NLP and embeddings for language understanding
- These algorithms combine to create intelligent agents`,
    quiz: {
      passingScore: 60,
      questions: [
        { id: "2.3-q1", type: "multiple_choice", question: "What is the Q-learning update rule used for?", options: [{ id: "a", text: "Generating text" }, { id: "b", text: "Learning the value of state-action pairs" }, { id: "c", text: "Classifying images" }, { id: "d", text: "Sorting data" }], correctAnswers: ["b"], explanation: "Q-learning updates the estimated value of taking an action in a state based on the reward received and future expected rewards." },
        { id: "2.3-q2", type: "multiple_choice", question: "What are embeddings?", options: [{ id: "a", text: "Physical hardware components" }, { id: "b", text: "Dense vector representations of discrete items" }, { id: "c", text: "Database indexes" }, { id: "d", text: "File compression algorithms" }], correctAnswers: ["b"], explanation: "Embeddings convert discrete items (words, sentences, images) into continuous vector spaces where similar items are close together." },
        { id: "2.3-q3", type: "multiple_choice", question: "Random Forests improve on Decision Trees by:", options: [{ id: "a", text: "Using fewer features" }, { id: "b", text: "Combining multiple trees for better generalization" }, { id: "c", text: "Being simpler to understand" }, { id: "d", text: "Requiring less data" }], correctAnswers: ["b"], explanation: "Random Forests are ensembles of decision trees that reduce overfitting and improve generalization through averaging." },
        { id: "2.3-q4", type: "multiple_choice", question: "Which architecture powers modern LLMs like GPT?", options: [{ id: "a", text: "Recurrent Neural Networks" }, { id: "b", text: "Convolutional Neural Networks" }, { id: "c", text: "Transformers" }, { id: "d", text: "Decision Trees" }], correctAnswers: ["c"], explanation: "Transformers use self-attention mechanisms and are the foundation of modern LLMs like GPT, BERT, and Claude." },
        { id: "2.3-q5", type: "multiple_choice", question: "Policy gradient methods are preferred over Q-learning when:", options: [{ id: "a", text: "The action space is continuous" }, { id: "b", text: "The state space is very small" }, { id: "c", text: "No rewards are available" }, { id: "d", text: "The environment is fully deterministic" }], correctAnswers: ["a"], explanation: "Policy gradients work well with continuous action spaces (like robot joint angles) where Q-learning struggles with infinite possible actions." },
      ],
    },
    prevLesson: { slug: "module-2/lesson-2.2", title: "Introduction to Machine Learning" },
    nextLesson: { slug: "module-2/lesson-2.4", title: "Large Language Models (LLMs)" },
  },

  "module-2/lesson-2.4": {
    number: "2.4",
    title: "Large Language Models (LLMs)",
    module: { number: 2, title: "Fundamentals of AI and Machine Learning" },
    content: `## Large Language Models (LLMs) as Agent Brains

LLMs are the reasoning engine behind modern AI agents. Understanding how they work is essential for building effective agents.

### What Are LLMs?

Large Language Models are neural networks trained on massive text datasets to predict the next token in a sequence.

- **Scale:** Billions of parameters (GPT-4: ~1.7 trillion, Claude: undisclosed)
- **Training:** Self-supervised on internet text, then fine-tuned with RLHF
- **Capability:** Generate text, reason, follow instructions, use tools

### How LLMs Work (High-Level)

\`\`\`
Input text → Tokenize → Embeddings → Transformer layers → Next token prediction
                                          ↓
                              Self-attention mechanism
                              (relates every token to every other token)
\`\`\`

1. **Tokenization:** Text split into subword tokens (~4 chars per token)
2. **Embedding:** Tokens converted to vectors
3. **Attention:** Each token attends to all others (context understanding)
4. **Generation:** Predict next token, append, repeat (autoregressive)

### Prompt Engineering Fundamentals

How you communicate with an LLM determines agent behavior:

\`\`\`python
system_prompt = """You are a helpful customer support agent for TechCorp.
Rules:
- Be polite and professional
- If you don't know the answer, say so
- Never make up information
- Escalate billing issues to human agents"""

messages = [
    {"role": "system", "content": system_prompt},
    {"role": "user", "content": "I can't log into my account"}
]
\`\`\`

**Key techniques:**
- **System prompts:** Define agent persona and rules
- **Few-shot examples:** Show desired behavior
- **Chain-of-thought:** Ask the model to reason step by step
- **Output formatting:** Request structured responses (JSON, lists)

### Token Limits and Context Windows

- **Context window:** Maximum tokens the model can process at once
- **GPT-4:** 128K tokens (~300 pages)
- **Claude:** 200K tokens (~500 pages)
- **Implication for agents:** Must manage context carefully

### API-Based vs. Local Models

| Aspect | API-Based (OpenAI, Anthropic) | Local (Llama, Mistral) |
|--------|-------------------------------|------------------------|
| Quality | Highest | Good, improving fast |
| Cost | Per-token pricing | Hardware cost only |
| Privacy | Data sent to provider | Stays on your machine |
| Latency | Network dependent | Can be faster |
| Control | Limited | Full control |

### Key Takeaways

- LLMs predict next tokens using transformer architecture
- Prompt engineering is how you program agent behavior
- Context windows limit how much information an agent can process at once
- Choose between API models (quality) and local models (privacy/cost)
- Understanding these tradeoffs is critical for agent design`,
    quiz: {
      passingScore: 60,
      questions: [
        { id: "2.4-q1", type: "multiple_choice", question: "How do LLMs generate text?", options: [{ id: "a", text: "By searching a database of pre-written responses" }, { id: "b", text: "By predicting the next token autoregressively" }, { id: "c", text: "By copying from training data" }, { id: "d", text: "By running if-then rules" }], correctAnswers: ["b"], explanation: "LLMs generate text by predicting the most likely next token, appending it, and repeating — this is autoregressive generation." },
        { id: "2.4-q2", type: "multiple_choice", question: "What is a system prompt used for?", options: [{ id: "a", text: "Training the model" }, { id: "b", text: "Defining the agent's persona, rules, and behavior" }, { id: "c", text: "Measuring performance" }, { id: "d", text: "Storing user data" }], correctAnswers: ["b"], explanation: "System prompts set the agent's identity, constraints, and behavioral guidelines before any user interaction." },
        { id: "2.4-q3", type: "multiple_choice", question: "What is a context window?", options: [{ id: "a", text: "A GUI element" }, { id: "b", text: "The maximum tokens the model can process at once" }, { id: "c", text: "A type of neural network layer" }, { id: "d", text: "A debugging tool" }], correctAnswers: ["b"], explanation: "The context window is the maximum number of tokens (input + output) that a model can handle in a single request." },
        { id: "2.4-q4", type: "multiple_choice", question: "Chain-of-thought prompting means:", options: [{ id: "a", text: "Connecting multiple models together" }, { id: "b", text: "Asking the model to reason step by step before answering" }, { id: "c", text: "Using multiple API calls" }, { id: "d", text: "Training on chain data" }], correctAnswers: ["b"], explanation: "Chain-of-thought prompting asks the model to show its reasoning process, which improves accuracy on complex tasks." },
        { id: "2.4-q5", type: "multiple_choice", question: "When would you choose a local model over an API model?", options: [{ id: "a", text: "When you need the highest possible quality" }, { id: "b", text: "When data privacy is critical and you can't send data externally" }, { id: "c", text: "When you have no hardware" }, { id: "d", text: "When cost doesn't matter" }], correctAnswers: ["b"], explanation: "Local models keep all data on your infrastructure, making them ideal when privacy regulations or sensitivity prevent sending data to third-party APIs." },
      ],
    },
    prevLesson: { slug: "module-2/lesson-2.3", title: "Key Algorithms for AI Agents" },
    nextLesson: { slug: "module-2/lesson-2.5", title: "Tools, APIs, and the Agent Ecosystem" },
  },

  "module-2/lesson-2.5": {
    number: "2.5",
    title: "Tools, APIs, and the Agent Ecosystem",
    module: { number: 2, title: "Fundamentals of AI and Machine Learning" },
    content: `## Tools, APIs, and the Agent Ecosystem

Modern AI agents don't just generate text — they use tools to interact with the world. This lesson covers the ecosystem that makes agents powerful.

### Function Calling and Tool Use

LLMs can decide when and how to call external functions:

\`\`\`python
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "City name"},
                "units": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["location"]
        }
    }
}]

# The LLM decides whether to call the tool based on the user's question
response = client.chat.completions.create(
    model="gpt-4",
    messages=messages,
    tools=tools
)
\`\`\`

### RAG (Retrieval-Augmented Generation)

RAG gives agents access to external knowledge:

1. **Index:** Convert documents into embeddings, store in vector database
2. **Retrieve:** When user asks a question, find relevant document chunks
3. **Generate:** Pass retrieved context to LLM along with the question

\`\`\`python
# Simplified RAG pipeline
query_embedding = embed(user_question)
relevant_docs = vector_db.similarity_search(query_embedding, k=5)
context = "\\n".join([doc.content for doc in relevant_docs])

response = llm.generate(
    f"Context: {context}\\n\\nQuestion: {user_question}\\nAnswer:"
)
\`\`\`

### Vector Databases

Specialized databases for storing and searching embeddings:

| Database | Type | Best For |
|----------|------|----------|
| Pinecone | Cloud | Production, managed |
| Weaviate | Self-hosted/Cloud | Flexible, open-source |
| ChromaDB | Local | Prototyping, small scale |
| Qdrant | Self-hosted/Cloud | High performance |
| pgvector | PostgreSQL extension | Existing Postgres users |

### Agent Frameworks Overview

Frameworks that simplify building agents:

- **LangChain:** Most popular, chains + agents + tools + memory
- **LlamaIndex:** Focused on data indexing and retrieval (RAG)
- **CrewAI:** Multi-agent collaboration framework
- **AutoGen:** Microsoft's multi-agent conversation framework
- **LangGraph:** Graph-based agent workflows (from LangChain team)

### The Agent Stack

\`\`\`
┌─────────────────────────────────────┐
│         Your Application            │
├─────────────────────────────────────┤
│    Agent Framework (LangChain)      │
├─────────────────────────────────────┤
│  LLM Provider  │  Vector DB  │ Tools│
│  (OpenAI/etc)  │  (Pinecone) │(APIs)│
└─────────────────────────────────────┘
\`\`\`

### Key Takeaways

- Tool use transforms LLMs from text generators into action-taking agents
- RAG gives agents access to up-to-date, domain-specific knowledge
- Vector databases enable semantic search over large document collections
- Frameworks like LangChain and LlamaIndex accelerate agent development
- The modern agent stack combines LLMs + tools + memory + retrieval`,
    quiz: {
      passingScore: 60,
      questions: [
        { id: "2.5-q1", type: "multiple_choice", question: "What does RAG stand for?", options: [{ id: "a", text: "Random Agent Generation" }, { id: "b", text: "Retrieval-Augmented Generation" }, { id: "c", text: "Recursive Algorithm Graph" }, { id: "d", text: "Real-time Agent Gateway" }], correctAnswers: ["b"], explanation: "RAG (Retrieval-Augmented Generation) retrieves relevant documents and provides them as context to the LLM for more accurate, grounded responses." },
        { id: "2.5-q2", type: "multiple_choice", question: "What is the primary purpose of a vector database?", options: [{ id: "a", text: "Storing SQL tables" }, { id: "b", text: "Storing and searching embeddings via similarity" }, { id: "c", text: "Running machine learning training" }, { id: "d", text: "Hosting websites" }], correctAnswers: ["b"], explanation: "Vector databases are optimized for storing high-dimensional embeddings and performing fast similarity searches." },
        { id: "2.5-q3", type: "multiple_choice", question: "LangChain is best described as:", options: [{ id: "a", text: "A programming language" }, { id: "b", text: "A framework for building LLM-powered applications and agents" }, { id: "c", text: "A vector database" }, { id: "d", text: "An LLM model" }], correctAnswers: ["b"], explanation: "LangChain is a framework that provides abstractions for chains, agents, tools, and memory to build LLM-powered applications." },
        { id: "2.5-q4", type: "multiple_choice", question: "In function calling, who decides whether to call a tool?", options: [{ id: "a", text: "The user explicitly" }, { id: "b", text: "The LLM based on the conversation context" }, { id: "c", text: "A random number generator" }, { id: "d", text: "The database" }], correctAnswers: ["b"], explanation: "The LLM analyzes the user's request and available tools, then decides whether calling a tool would help answer the question." },
        { id: "2.5-q5", type: "multiple_choice", question: "Which framework is specifically designed for multi-agent collaboration?", options: [{ id: "a", text: "ChromaDB" }, { id: "b", text: "CrewAI" }, { id: "c", text: "pgvector" }, { id: "d", text: "Pinecone" }], correctAnswers: ["b"], explanation: "CrewAI is specifically designed for orchestrating multiple AI agents working together on complex tasks." },
      ],
    },
    prevLesson: { slug: "module-2/lesson-2.4", title: "Large Language Models (LLMs)" },
    nextLesson: { slug: "module-3/lesson-3.1", title: "Agent Architecture Patterns" },
  },
};
