import type { QuizQuestion } from "@/components/quiz/QuizPlayer";

export interface LessonData {
  number: string;
  title: string;
  module: { number: number; title: string };
  content: string;
  quiz: {
    questions: QuizQuestion[];
    passingScore: number;
  };
  nextLesson?: { slug: string; title: string };
  prevLesson?: { slug: string; title: string };
}

export const lessonsMap: Record<string, LessonData> = {
  "module-1/lesson-1.1": {
    number: "1.1",
    title: "What is an AI Agent?",
    module: { number: 1, title: "Introduction to AI Agents" },
    content: `## What is an AI Agent?

An **AI agent** is a system that perceives its environment through sensors, reasons about what it perceives, and takes actions through actuators to achieve specific goals.

### The Agent-Environment Interaction Loop

Every AI agent follows a fundamental cycle:

1. **Perceive** — The agent observes its environment through sensors (cameras, microphones, text input, API data, etc.)
2. **Reason** — The agent processes observations and decides what to do (using rules, ML models, or LLMs)
3. **Act** — The agent takes an action that affects the environment (sending a message, moving, calling an API)
4. **Feedback** — The environment changes, and the cycle repeats

### Agents vs. Traditional Programs

| Aspect | Traditional Program | AI Agent |
|--------|-------------------|----------|
| Input | Fixed, predefined | Dynamic, from environment |
| Decision-making | Hardcoded logic | Adaptive reasoning |
| Autonomy | None | Partial to full |
| Learning | No | Often yes |
| Environment awareness | No | Yes |

### A Simple Example

Consider a thermostat:
- **Sensor:** Temperature sensor
- **Reasoning:** If temperature < target, turn on heater
- **Actuator:** Heater switch
- **Environment:** The room

This is the simplest form of an AI agent — a **simple reflex agent**.

### Modern AI Agents

Today's AI agents are far more sophisticated. An LLM-powered agent like ChatGPT:
- **Perceives** through text input (and images, files)
- **Reasons** using a large language model
- **Acts** by generating text, calling tools, writing code
- **Adapts** through conversation context

\`\`\`python
# Conceptual structure of an AI agent
class SimpleAgent:
    def __init__(self, tools, llm):
        self.tools = tools
        self.llm = llm
        self.memory = []

    def perceive(self, input):
        self.memory.append({"role": "user", "content": input})

    def reason(self):
        response = self.llm.generate(self.memory)
        return response

    def act(self, decision):
        if decision.requires_tool:
            result = self.tools[decision.tool_name].execute(decision.args)
            return result
        return decision.text
\`\`\`

### Key Takeaways

- An AI agent is defined by its ability to **perceive**, **reason**, and **act** autonomously
- Agents exist on a spectrum from simple (thermostat) to complex (autonomous vehicles)
- Modern agents often use LLMs as their reasoning engine
- The agent-environment loop is the fundamental pattern underlying all agent architectures`,
    quiz: {
      passingScore: 60,
      questions: [
        {
          id: "1.1-q1", type: "multiple_choice",
          question: "Which of the following best describes the agent-environment interaction loop?",
          options: [
            { id: "a", text: "Input → Output → Done" },
            { id: "b", text: "Perceive → Reason → Act → Feedback" },
            { id: "c", text: "Code → Compile → Run" },
            { id: "d", text: "Train → Test → Deploy" },
          ],
          correctAnswers: ["b"],
          explanation: "The agent-environment loop consists of perceiving the environment, reasoning about what to do, acting on that decision, and receiving feedback as the environment changes.",
        },
        {
          id: "1.1-q2", type: "multiple_choice",
          question: "What best defines an AI agent?",
          options: [
            { id: "a", text: "It follows a fixed script without sensing its environment" },
            { id: "b", text: "It perceives its environment and takes actions to achieve goals" },
            { id: "c", text: "It only processes batch data offline" },
            { id: "d", text: "It requires human input for every decision" },
          ],
          correctAnswers: ["b"],
          explanation: "An AI agent is defined by its ability to autonomously perceive its environment and take actions to achieve goals.",
        },
        {
          id: "1.1-q3", type: "multiple_choice",
          question: "Which of the following is NOT a core component of an AI agent?",
          options: [
            { id: "a", text: "Sensor" },
            { id: "b", text: "Actuator" },
            { id: "c", text: "Compiler" },
            { id: "d", text: "Environment" },
          ],
          correctAnswers: ["c"],
          explanation: "The core components are sensors, actuators, environment, and performance measure. A compiler is a software development tool, not an agent component.",
        },
        {
          id: "1.1-q4", type: "multiple_choice",
          question: "A thermostat that turns on heating when temperature drops below a threshold is an example of what type of agent?",
          options: [
            { id: "a", text: "Learning agent" },
            { id: "b", text: "Simple reflex agent" },
            { id: "c", text: "Utility-based agent" },
            { id: "d", text: "Goal-based agent" },
          ],
          correctAnswers: ["b"],
          explanation: "A thermostat is a simple reflex agent because it directly maps a percept (temperature) to an action using a condition-action rule.",
        },
        {
          id: "1.1-q5", type: "multiple_choice",
          question: "Which statement about AI agents is TRUE?",
          options: [
            { id: "a", text: "An AI agent must always use machine learning" },
            { id: "b", text: "An AI agent operates autonomously in an environment" },
            { id: "c", text: "An AI agent is the same as a chatbot" },
            { id: "d", text: "An AI agent cannot make mistakes" },
          ],
          correctAnswers: ["b"],
          explanation: "The defining characteristic of an AI agent is autonomous operation within an environment.",
        },
      ],
    },
    nextLesson: { slug: "module-1/lesson-1.2", title: "Types of AI Agents" },
  },

  "module-1/lesson-1.2": {
    number: "1.2",
    title: "Types of AI Agents",
    module: { number: 1, title: "Introduction to AI Agents" },
    content: `## Types of AI Agents

AI agents can be classified into five main categories based on their complexity and capabilities.

### 1. Simple Reflex Agents

The simplest type. They act only based on the **current percept**, ignoring history.

- Use condition-action rules (if-then)
- No memory of past states
- Example: A thermostat, a basic spam filter

\`\`\`python
def simple_reflex_agent(percept):
    if percept["temperature"] < 20:
        return "turn_on_heater"
    else:
        return "turn_off_heater"
\`\`\`

### 2. Model-Based Reflex Agents

Maintain an **internal model** of the world to handle partially observable environments.

- Track how the world evolves
- Remember past states
- Example: A robot that remembers where obstacles were

### 3. Goal-Based Agents

Have explicit **goals** and choose actions that lead toward achieving them.

- Can plan ahead
- Consider future consequences of actions
- Example: A GPS navigation system finding the shortest route

### 4. Utility-Based Agents

Maximize a **utility function** — not just achieve a goal, but achieve it in the best way.

- Compare different outcomes
- Handle trade-offs between competing goals
- Example: A trading bot maximizing profit while minimizing risk

### 5. Learning Agents

Can **improve their performance** over time through experience.

- Have a learning element that modifies behavior
- Have a critic that evaluates performance
- Example: AlphaGo, recommendation systems, ChatGPT

### Comparison Table

| Type | Memory | Goals | Learning | Complexity |
|------|--------|-------|----------|------------|
| Simple Reflex | No | No | No | Low |
| Model-Based | Yes | No | No | Medium |
| Goal-Based | Yes | Yes | No | Medium-High |
| Utility-Based | Yes | Yes (optimized) | No | High |
| Learning | Yes | Yes | Yes | Highest |

### Key Takeaways

- Agent types form a hierarchy of increasing sophistication
- Most modern AI agents are learning agents or utility-based agents
- The choice of agent type depends on the problem complexity and environment`,
    quiz: {
      passingScore: 60,
      questions: [
        {
          id: "1.2-q1", type: "multiple_choice",
          question: "A vacuum cleaner robot that only reacts to dirt when it senses it is an example of a:",
          options: [
            { id: "a", text: "Learning agent" },
            { id: "b", text: "Simple reflex agent" },
            { id: "c", text: "Goal-based agent" },
            { id: "d", text: "Utility-based agent" },
          ],
          correctAnswers: ["b"],
          explanation: "A simple reflex agent acts only on current percepts using condition-action rules, without memory or planning.",
        },
        {
          id: "1.2-q2", type: "multiple_choice",
          question: "A chess-playing AI that evaluates board positions and selects the move with the highest expected outcome is best classified as:",
          options: [
            { id: "a", text: "Simple reflex agent" },
            { id: "b", text: "Model-based agent" },
            { id: "c", text: "Utility-based agent" },
            { id: "d", text: "Learning agent" },
          ],
          correctAnswers: ["c"],
          explanation: "A utility-based agent evaluates different outcomes and selects the one that maximizes its utility function.",
        },
        {
          id: "1.2-q3", type: "multiple_choice",
          question: "What distinguishes a model-based agent from a simple reflex agent?",
          options: [
            { id: "a", text: "It maintains an internal model of the world" },
            { id: "b", text: "It only responds to current percepts" },
            { id: "c", text: "It always maximizes a utility function" },
            { id: "d", text: "It learns from experience" },
          ],
          correctAnswers: ["a"],
          explanation: "Model-based agents maintain an internal state that tracks aspects of the world not directly observable.",
        },
        {
          id: "1.2-q4", type: "multiple_choice",
          question: "What is the key characteristic of a learning agent?",
          options: [
            { id: "a", text: "It has no goals" },
            { id: "b", text: "It improves its performance over time through experience" },
            { id: "c", text: "It only uses if-then rules" },
            { id: "d", text: "It cannot adapt to new situations" },
          ],
          correctAnswers: ["b"],
          explanation: "Learning agents have a learning element that modifies their behavior based on experience and feedback.",
        },
        {
          id: "1.2-q5", type: "multiple_choice",
          question: "When choosing between two routes — one faster but with tolls, one slower but free — which agent type handles this best?",
          options: [
            { id: "a", text: "Goal-based agent" },
            { id: "b", text: "Utility-based agent" },
            { id: "c", text: "Simple reflex agent" },
            { id: "d", text: "Model-based agent" },
          ],
          correctAnswers: ["b"],
          explanation: "Utility-based agents can weigh trade-offs between competing objectives (time vs. cost) using a utility function.",
        },
      ],
    },
    prevLesson: { slug: "module-1/lesson-1.1", title: "What is an AI Agent?" },
    nextLesson: { slug: "module-1/lesson-1.3", title: "Key Components of an AI Agent" },
  },

  "module-1/lesson-1.3": {
    number: "1.3",
    title: "Key Components of an AI Agent",
    module: { number: 1, title: "Introduction to AI Agents" },
    content: `## Key Components of an AI Agent

Every AI agent, regardless of complexity, is built from four fundamental components.

### 1. Sensors (Perception)

How the agent **observes** its environment.

- **Physical sensors:** Cameras, microphones, LIDAR, temperature sensors
- **Digital sensors:** API inputs, text input, database queries, web scraping
- **Perception pipeline:** Raw data → processed information the agent can reason about

### 2. Actuators (Actions)

How the agent **affects** its environment.

- **Physical actuators:** Motors, speakers, displays, robotic arms
- **Digital actuators:** Sending messages, API calls, writing files, executing code
- The set of all possible actions is called the **action space**

### 3. Environment

The **world** in which the agent operates. Environments are classified by:

| Property | Options | Example |
|----------|---------|---------|
| Observability | Fully / Partially observable | Chess (full) vs. Poker (partial) |
| Determinism | Deterministic / Stochastic | Calculator (det.) vs. Stock market (stoch.) |
| Dynamics | Static / Dynamic | Crossword (static) vs. Traffic (dynamic) |
| Agents | Single / Multi-agent | Solitaire (single) vs. Auction (multi) |
| Continuity | Discrete / Continuous | Board game (discrete) vs. Driving (continuous) |

### 4. Performance Measure

How we evaluate whether the agent is doing a **good job**.

- Must be defined externally (not by the agent itself)
- Should capture what we actually want, not just a proxy
- Examples: accuracy, response time, user satisfaction, profit

### The PEAS Framework

A useful framework for describing any agent:

| Component | Question |
|-----------|----------|
| **P**erformance | How do we measure success? |
| **E**nvironment | Where does the agent operate? |
| **A**ctuators | What actions can it take? |
| **S**ensors | What can it perceive? |

**Example — Self-driving car:**
- P: Safety, arrival time, comfort, fuel efficiency
- E: Roads, traffic, pedestrians, weather
- A: Steering, acceleration, braking, signaling
- S: Cameras, LIDAR, GPS, speedometer

### Key Takeaways

- All agents share the same four components: sensors, actuators, environment, performance measure
- The PEAS framework helps systematically design agents
- Environment properties determine which agent architecture is appropriate`,
    quiz: {
      passingScore: 60,
      questions: [
        {
          id: "1.3-q1", type: "multiple_choice",
          question: "A self-driving car operating in traffic is in what type of environment?",
          options: [
            { id: "a", text: "Fully observable, static" },
            { id: "b", text: "Partially observable, dynamic" },
            { id: "c", text: "Fully observable, deterministic" },
            { id: "d", text: "Partially observable, static" },
          ],
          correctAnswers: ["b"],
          explanation: "Traffic is partially observable (can't see around corners) and dynamic (other cars move independently).",
        },
        {
          id: "1.3-q2", type: "multiple_choice",
          question: "Which are core components of an AI agent?",
          options: [
            { id: "a", text: "Sensors" },
            { id: "b", text: "Actuators" },
            { id: "c", text: "Performance measure" },
            { id: "d", text: "All of the above" },
          ],
          correctAnswers: ["d"],
          explanation: "Sensors, actuators, environment, and performance measure are all core components.",
        },
        {
          id: "1.3-q3", type: "multiple_choice",
          question: "What does 'deterministic environment' mean?",
          options: [
            { id: "a", text: "The agent can see everything in the environment" },
            { id: "b", text: "The environment never changes" },
            { id: "c", text: "Actions have predictable outcomes" },
            { id: "d", text: "There is only one agent" },
          ],
          correctAnswers: ["c"],
          explanation: "In a deterministic environment, the next state is completely determined by the current state and the agent's action.",
        },
        {
          id: "1.3-q4", type: "multiple_choice",
          question: "What does the performance measure define?",
          options: [
            { id: "a", text: "How the agent perceives its environment" },
            { id: "b", text: "How the agent takes actions" },
            { id: "c", text: "How the agent's success is evaluated" },
            { id: "d", text: "How the agent communicates with other agents" },
          ],
          correctAnswers: ["c"],
          explanation: "The performance measure is the criterion for evaluating how well the agent is doing.",
        },
        {
          id: "1.3-q5", type: "multiple_choice",
          question: "Which of these are examples of sensors?",
          options: [
            { id: "a", text: "Camera, microphone, GPS" },
            { id: "b", text: "Wheels, speakers, display" },
            { id: "c", text: "CPU, RAM, storage" },
            { id: "d", text: "WiFi, Bluetooth, USB" },
          ],
          correctAnswers: ["a"],
          explanation: "Sensors are devices that perceive the environment. Cameras, microphones, and GPS all gather environmental data.",
        },
      ],
    },
    prevLesson: { slug: "module-1/lesson-1.2", title: "Types of AI Agents" },
    nextLesson: { slug: "module-1/lesson-1.4", title: "Applications of AI Agents" },
  },

  "module-1/lesson-1.4": {
    number: "1.4",
    title: "Applications of AI Agents",
    module: { number: 1, title: "Introduction to AI Agents" },
    content: `## Applications of AI Agents

AI agents are deployed across virtually every industry. Here are the major application areas.

### Virtual Assistants & Chatbots
- **Siri, Alexa, Google Assistant** — voice-activated personal agents
- **ChatGPT, Claude** — conversational AI agents with tool use
- **Customer support bots** — handle inquiries, route tickets, resolve issues

### Autonomous Vehicles
- Self-driving cars (Waymo, Tesla Autopilot)
- Delivery drones and robots
- Autonomous ships and aircraft

### Game AI
- NPCs (Non-Player Characters) in video games
- Chess engines (Stockfish, AlphaZero)
- Game-playing agents (OpenAI Five for Dota 2)

### Finance & Trading
- Algorithmic trading bots
- Fraud detection agents
- Portfolio management agents
- Credit scoring systems

### Healthcare
- Diagnostic agents (analyzing medical images)
- Drug discovery agents
- Patient monitoring systems
- Treatment recommendation agents

### Robotics & Manufacturing
- Industrial robots on assembly lines
- Warehouse automation (Amazon robotics)
- Agricultural robots (harvesting, monitoring)

### Software Development
- Code completion agents (GitHub Copilot)
- Automated testing agents
- DevOps agents (monitoring, auto-scaling)
- Code review agents

### Key Takeaways

- AI agents are already deployed at scale across all major industries
- The common thread: perceive environment, reason, take action autonomously
- As LLMs improve, agent capabilities are expanding rapidly
- The field is moving from narrow, single-task agents to general-purpose agents`,
    quiz: {
      passingScore: 60,
      questions: [
        {
          id: "1.4-q1", type: "multiple_choice",
          question: "Which of these is a common application of AI agents?",
          options: [
            { id: "a", text: "Traffic light control" },
            { id: "b", text: "Chatbots for customer service" },
            { id: "c", text: "Autonomous vehicles" },
            { id: "d", text: "All of the above" },
          ],
          correctAnswers: ["d"],
          explanation: "All of these are real-world applications of AI agents across different domains.",
        },
        {
          id: "1.4-q2", type: "multiple_choice",
          question: "GitHub Copilot is an example of an AI agent in which domain?",
          options: [
            { id: "a", text: "Healthcare" },
            { id: "b", text: "Software Development" },
            { id: "c", text: "Finance" },
            { id: "d", text: "Robotics" },
          ],
          correctAnswers: ["b"],
          explanation: "GitHub Copilot is a code completion agent that assists software developers.",
        },
        {
          id: "1.4-q3", type: "multiple_choice",
          question: "What do all AI agent applications have in common?",
          options: [
            { id: "a", text: "They all use neural networks" },
            { id: "b", text: "They all perceive, reason, and act autonomously" },
            { id: "c", text: "They all require internet access" },
            { id: "d", text: "They all learn from data" },
          ],
          correctAnswers: ["b"],
          explanation: "The common thread across all AI agent applications is the perceive-reason-act loop operating with some degree of autonomy.",
        },
        {
          id: "1.4-q4", type: "multiple_choice",
          question: "Which is NOT typically an AI agent application?",
          options: [
            { id: "a", text: "A static website displaying information" },
            { id: "b", text: "A fraud detection system" },
            { id: "c", text: "An autonomous drone" },
            { id: "d", text: "A recommendation engine" },
          ],
          correctAnswers: ["a"],
          explanation: "A static website doesn't perceive, reason, or act — it just displays fixed content. It's not an agent.",
        },
        {
          id: "1.4-q5", type: "multiple_choice",
          question: "AlphaZero is an AI agent that operates in which domain?",
          options: [
            { id: "a", text: "Healthcare" },
            { id: "b", text: "Game playing" },
            { id: "c", text: "Manufacturing" },
            { id: "d", text: "Customer service" },
          ],
          correctAnswers: ["b"],
          explanation: "AlphaZero is a game-playing AI agent that mastered chess, shogi, and Go through self-play.",
        },
      ],
    },
    prevLesson: { slug: "module-1/lesson-1.3", title: "Key Components of an AI Agent" },
    nextLesson: { slug: "module-2/lesson-2.1", title: "Core AI Concepts" },
  },

  "module-2/lesson-2.1": {
    number: "2.1",
    title: "Core AI Concepts",
    module: { number: 2, title: "Fundamentals of AI and Machine Learning" },
    content: `## Core AI Concepts

Before building AI agents, you need to understand the foundational concepts that power them.

### Search Algorithms

Many AI problems can be framed as **search problems** — finding a path from an initial state to a goal state.

- **Breadth-First Search (BFS):** Explores all neighbors before going deeper. Guarantees shortest path.
- **Depth-First Search (DFS):** Explores as deep as possible before backtracking. Memory efficient.
- **A* Search:** Uses a heuristic to guide search toward the goal. Optimal and efficient.

\`\`\`python
# A* search pseudocode
def a_star(start, goal, heuristic):
    open_set = PriorityQueue()
    open_set.put(start, priority=heuristic(start, goal))
    came_from = {}
    g_score = {start: 0}
    
    while not open_set.empty():
        current = open_set.get()
        if current == goal:
            return reconstruct_path(came_from, current)
        
        for neighbor in get_neighbors(current):
            tentative_g = g_score[current] + cost(current, neighbor)
            if tentative_g < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score = tentative_g + heuristic(neighbor, goal)
                open_set.put(neighbor, priority=f_score)
    
    return None  # No path found
\`\`\`

### Knowledge Representation

How agents store and organize information about the world:

- **Ontologies:** Formal definitions of concepts and relationships
- **Semantic networks:** Graph-based knowledge structures
- **Knowledge graphs:** Used by Google, Wikidata, enterprise systems

### Logical Reasoning

How agents draw conclusions from known facts:

- **Propositional logic:** Simple true/false statements
- **First-order logic:** Variables, quantifiers, predicates
- **Inference:** Deriving new facts from existing knowledge

### Planning

How agents decide on a sequence of actions to achieve a goal:

- **Classical planning:** Known initial state, deterministic actions
- **Conditional planning:** Handles uncertainty
- **Hierarchical planning:** Break complex tasks into subtasks

### Key Takeaways

- Search, knowledge representation, reasoning, and planning are the classical AI foundations
- Modern AI agents combine these with machine learning
- Understanding these concepts helps you design better agent architectures`,
    quiz: {
      passingScore: 60,
      questions: [
        {
          id: "2.1-q1", type: "multiple_choice",
          question: "Which search algorithm uses a heuristic to guide exploration toward the goal?",
          options: [
            { id: "a", text: "Breadth-First Search" },
            { id: "b", text: "Depth-First Search" },
            { id: "c", text: "A* Search" },
            { id: "d", text: "Random Search" },
          ],
          correctAnswers: ["c"],
          explanation: "A* uses a heuristic function to estimate the cost to the goal, guiding search efficiently.",
        },
        {
          id: "2.1-q2", type: "multiple_choice",
          question: "What is a knowledge graph?",
          options: [
            { id: "a", text: "A type of neural network" },
            { id: "b", text: "A graph-based structure representing entities and relationships" },
            { id: "c", text: "A visualization of training loss" },
            { id: "d", text: "A database query language" },
          ],
          correctAnswers: ["b"],
          explanation: "Knowledge graphs represent entities as nodes and relationships as edges, used for structured knowledge storage.",
        },
        {
          id: "2.1-q3", type: "multiple_choice",
          question: "Which search algorithm guarantees finding the shortest path?",
          options: [
            { id: "a", text: "Depth-First Search" },
            { id: "b", text: "Breadth-First Search" },
            { id: "c", text: "Random Search" },
            { id: "d", text: "Hill Climbing" },
          ],
          correctAnswers: ["b"],
          explanation: "BFS explores all nodes at the current depth before moving deeper, guaranteeing the shortest path in unweighted graphs.",
        },
        {
          id: "2.1-q4", type: "multiple_choice",
          question: "What is hierarchical planning?",
          options: [
            { id: "a", text: "Planning that only works for simple problems" },
            { id: "b", text: "Breaking complex tasks into smaller subtasks" },
            { id: "c", text: "Planning without any goals" },
            { id: "d", text: "A type of search algorithm" },
          ],
          correctAnswers: ["b"],
          explanation: "Hierarchical planning decomposes complex tasks into manageable subtasks, making planning tractable for real-world problems.",
        },
        {
          id: "2.1-q5", type: "multiple_choice",
          question: "First-order logic extends propositional logic by adding:",
          options: [
            { id: "a", text: "Neural networks" },
            { id: "b", text: "Variables, quantifiers, and predicates" },
            { id: "c", text: "Probability distributions" },
            { id: "d", text: "Gradient descent" },
          ],
          correctAnswers: ["b"],
          explanation: "First-order logic adds variables, quantifiers (for all, there exists), and predicates to express more complex relationships.",
        },
      ],
    },
    prevLesson: { slug: "module-1/lesson-1.4", title: "Applications of AI Agents" },
    nextLesson: { slug: "module-2/lesson-2.2", title: "Introduction to Machine Learning" },
  },

  "module-2/lesson-2.2": {
    number: "2.2",
    title: "Introduction to Machine Learning",
    module: { number: 2, title: "Fundamentals of AI and Machine Learning" },
    content: `## Introduction to Machine Learning

Machine Learning (ML) is the engine that powers most modern AI agents. It allows agents to learn from data rather than being explicitly programmed.

### Why Agents Need ML

- Environments are too complex for hand-coded rules
- Patterns in data are too subtle for humans to specify
- Agents need to adapt to changing conditions
- ML enables generalization from examples

### Supervised Learning

Learn from **labeled examples** (input → correct output).

- **Classification:** Predict a category (spam/not spam, cat/dog)
- **Regression:** Predict a number (house price, temperature)

\`\`\`python
# Simple supervised learning example
from sklearn.ensemble import RandomForestClassifier

# Training data: features → labels
X_train = [[0, 0], [1, 1], [2, 2], [3, 3]]
y_train = [0, 0, 1, 1]

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Predict
prediction = model.predict([[1.5, 1.5]])  # → 0 or 1
\`\`\`

### Unsupervised Learning

Find **patterns** in data without labels.

- **Clustering:** Group similar items (customer segments)
- **Dimensionality reduction:** Compress data while preserving structure
- **Anomaly detection:** Find unusual patterns

### Reinforcement Learning

Learn by **trial and error** with rewards and penalties.

- Agent takes actions in an environment
- Receives rewards or penalties
- Learns a policy that maximizes cumulative reward
- Most relevant to AI agent development!

\`\`\`python
# Reinforcement learning concept
# Agent learns: state → action mapping (policy)
# Goal: maximize total reward over time

# Q-learning update rule:
# Q(s, a) = Q(s, a) + α * (reward + γ * max(Q(s', a')) - Q(s, a))
\`\`\`

### When to Use Which

| Paradigm | Use When | Agent Example |
|----------|----------|---------------|
| Supervised | Have labeled data | Spam filter agent |
| Unsupervised | Need to find structure | Customer segmentation agent |
| Reinforcement | Agent interacts with environment | Game-playing agent |

### Key Takeaways

- ML enables agents to learn from experience rather than following fixed rules
- Supervised learning needs labeled data; unsupervised finds patterns; RL learns from rewards
- Reinforcement learning is the most natural fit for agent development
- Modern agents often combine multiple ML paradigms`,
    quiz: {
      passingScore: 60,
      questions: [
        {
          id: "2.2-q1", type: "multiple_choice",
          question: "Given a dataset of labeled emails (spam/not spam), which ML approach would you use?",
          options: [
            { id: "a", text: "Unsupervised learning" },
            { id: "b", text: "Supervised learning" },
            { id: "c", text: "Reinforcement learning" },
            { id: "d", text: "Transfer learning" },
          ],
          correctAnswers: ["b"],
          explanation: "Supervised learning is used when you have labeled examples (input-output pairs) to learn from.",
        },
        {
          id: "2.2-q2", type: "multiple_choice",
          question: "Which ML paradigm is most natural for AI agent development?",
          options: [
            { id: "a", text: "Supervised learning" },
            { id: "b", text: "Unsupervised learning" },
            { id: "c", text: "Reinforcement learning" },
            { id: "d", text: "Semi-supervised learning" },
          ],
          correctAnswers: ["c"],
          explanation: "Reinforcement learning naturally models the agent-environment interaction: take actions, receive rewards, learn a policy.",
        },
        {
          id: "2.2-q3", type: "multiple_choice",
          question: "What is clustering?",
          options: [
            { id: "a", text: "Predicting a continuous value" },
            { id: "b", text: "Grouping similar items without labels" },
            { id: "c", text: "Learning from rewards" },
            { id: "d", text: "Classifying labeled data" },
          ],
          correctAnswers: ["b"],
          explanation: "Clustering is an unsupervised learning technique that groups similar data points together without predefined labels.",
        },
        {
          id: "2.2-q4", type: "multiple_choice",
          question: "In reinforcement learning, what does the agent try to maximize?",
          options: [
            { id: "a", text: "Training data size" },
            { id: "b", text: "Cumulative reward over time" },
            { id: "c", text: "Number of actions taken" },
            { id: "d", text: "Model complexity" },
          ],
          correctAnswers: ["b"],
          explanation: "RL agents learn a policy that maximizes the expected cumulative reward over time.",
        },
        {
          id: "2.2-q5", type: "multiple_choice",
          question: "Which is an example of regression?",
          options: [
            { id: "a", text: "Classifying images as cat or dog" },
            { id: "b", text: "Predicting house prices" },
            { id: "c", text: "Grouping customers into segments" },
            { id: "d", text: "Playing a video game" },
          ],
          correctAnswers: ["b"],
          explanation: "Regression predicts a continuous numerical value, like a house price.",
        },
      ],
    },
    prevLesson: { slug: "module-2/lesson-2.1", title: "Core AI Concepts" },
    nextLesson: { slug: "module-2/lesson-2.3", title: "Key Algorithms for AI Agents" },
  },
};

// Import additional lesson modules
import { module2RestLessons } from "./lessons-module2-rest";
import { modules3to6Lessons } from "./lessons-modules3to6";
import { getLessonMeta, getLessonNav, allLessonsMeta } from "./lesson-generator";

// Merge all lesson sources
const allWrittenLessons: Record<string, LessonData> = {
  ...lessonsMap,
  ...module2RestLessons,
  ...modules3to6Lessons,
};

/**
 * Generate lesson content for lessons that don't have full handwritten content yet.
 * This ensures every lesson in the course is accessible.
 */
function generateLessonContent(slug: string): LessonData | null {
  const meta = getLessonMeta(slug);
  if (!meta) return null;

  const nav = getLessonNav(slug);

  // Content templates by module
  const moduleContents: Record<number, (title: string, num: string) => string> = {
    4: (title, num) => `## ${title}\n\nThis is a hands-on implementation lesson. You'll write real code to build AI agent components.\n\n### Learning Objectives\n\n- Understand the practical aspects of ${title.toLowerCase()}\n- Write working Python code for agent development\n- Apply concepts from previous modules in real implementations\n- Test and validate your agent components\n\n### Prerequisites\n\n- Python 3.10+ installed\n- Basic understanding of AI agent concepts (Modules 1-3)\n- API keys for OpenAI or Anthropic (free tier works)\n\n### Hands-On Exercise\n\nIn this lesson, you'll build a working component step by step. Follow along in the code playground.\n\n\`\`\`python\n# Lesson ${num}: ${title}\n# This is a practical coding lesson\n\nfrom langchain.agents import AgentExecutor, create_react_agent\nfrom langchain_openai import ChatOpenAI\nfrom langchain.tools import Tool\n\n# You'll build on this foundation throughout the lesson\nllm = ChatOpenAI(model="gpt-4", temperature=0)\n\n# Step 1: Define your agent's capabilities\n# Step 2: Implement the core logic\n# Step 3: Add error handling\n# Step 4: Test with real inputs\n\`\`\`\n\n### Key Concepts\n\n- Start simple, add complexity incrementally\n- Always handle errors gracefully\n- Test with edge cases, not just happy paths\n- Log everything for debugging\n\n### Practice Exercise\n\nComplete the code playground exercise to implement the concepts from this lesson. The quiz will test both your conceptual understanding and code comprehension.`,
    5: (title, num) => `## ${title}\n\nThis advanced lesson covers production-grade concepts for AI agent systems.\n\n### Overview\n\n${title} is a critical topic for anyone building AI agents that will operate in real-world environments. This lesson covers the theory, best practices, and practical implementation patterns.\n\n### Why This Matters\n\nAs AI agents move from prototypes to production, ${title.toLowerCase()} becomes essential. Without proper attention to these concepts, agents can:\n\n- Fail unpredictably in production\n- Create security vulnerabilities\n- Generate unexpected costs\n- Produce harmful or biased outputs\n\n### Core Concepts\n\n1. **Understanding the landscape** — What challenges exist and why they matter\n2. **Design patterns** — Proven approaches to solving these challenges\n3. **Implementation** — How to code these patterns in practice\n4. **Monitoring** — How to verify things are working correctly\n\n### Best Practices\n\n- Always design for failure — agents will encounter unexpected situations\n- Implement comprehensive logging and monitoring\n- Use progressive rollouts (canary deployments)\n- Maintain human oversight for critical decisions\n- Document your design decisions and tradeoffs\n\n### Industry Examples\n\nReal companies solving these challenges:\n- OpenAI's safety layers and content filtering\n- Anthropic's Constitutional AI approach\n- Google's responsible AI principles\n- Enterprise deployment patterns from AWS/Azure\n\n### Key Takeaways\n\n- ${title} is not optional for production agents\n- Start with simple implementations and iterate\n- Learn from industry leaders and open-source projects\n- Balance safety with capability`,
    6: (title, num) => `## ${title}\n\nThis is a project-based lesson where you'll apply everything you've learned to build a real AI agent system.\n\n### Project Overview\n\n${title} challenges you to design, implement, and test a complete AI agent. This is where theory meets practice.\n\n### Requirements\n\n- Apply agent architecture patterns from Module 3\n- Implement using tools from Module 4\n- Follow production best practices from Module 5\n- Document your design decisions\n\n### Project Structure\n\n\`\`\`\nproject/\n├── src/\n│   ├── agent.py          # Main agent logic\n│   ├── tools/            # Custom tools\n│   ├── memory/           # Memory management\n│   └── config.py         # Configuration\n├── tests/\n│   ├── test_agent.py     # Unit tests\n│   └── test_tools.py     # Tool tests\n├── docs/\n│   └── design.md         # Design document\n└── README.md\n\`\`\`\n\n### Deliverables\n\n1. **Working code** — A functional agent that handles the specified use case\n2. **Tests** — Unit and integration tests demonstrating correctness\n3. **Documentation** — Design decisions, architecture diagram, setup instructions\n4. **Demo** — A short recording or live demo of the agent in action\n\n### Evaluation Criteria\n\n| Criterion | Weight |\n|-----------|--------|\n| Architecture & Design | 25% |\n| Implementation Quality | 25% |\n| Functionality | 20% |\n| Testing | 15% |\n| Documentation | 15% |\n\n### Getting Started\n\n1. Read the full requirements carefully\n2. Sketch your architecture before coding\n3. Start with the simplest working version\n4. Iterate and add features incrementally\n5. Write tests as you go\n6. Document your decisions`,
  };

  const contentGenerator = moduleContents[meta.moduleNumber] || moduleContents[5];
  const content = contentGenerator(meta.title, meta.number);

  return {
    number: meta.number,
    title: meta.title,
    module: { number: meta.moduleNumber, title: meta.moduleTitle },
    content,
    quiz: {
      passingScore: 60,
      questions: [
        { id: `${meta.number}-q1`, type: "multiple_choice", question: `What is the primary focus of "${meta.title}"?`, options: [{ id: "a", text: "Understanding theoretical concepts only" }, { id: "b", text: `Practical application of ${meta.title.toLowerCase()} in AI agent development` }, { id: "c", text: "Memorizing definitions" }, { id: "d", text: "None of the above" }], correctAnswers: ["b"], explanation: `This lesson focuses on practical application and understanding of ${meta.title.toLowerCase()}.` },
        { id: `${meta.number}-q2`, type: "multiple_choice", question: "Which module does this lesson belong to?", options: [{ id: "a", text: "Module 1: Introduction" }, { id: "b", text: "Module 2: Fundamentals" }, { id: "c", text: `Module ${meta.moduleNumber}: ${meta.moduleTitle}` }, { id: "d", text: "Module 6: Projects" }], correctAnswers: ["c"], explanation: `This lesson is part of Module ${meta.moduleNumber}: ${meta.moduleTitle}.` },
        { id: `${meta.number}-q3`, type: "multiple_choice", question: "What is essential when building production AI agents?", options: [{ id: "a", text: "Skipping testing to save time" }, { id: "b", text: "Comprehensive error handling, logging, and monitoring" }, { id: "c", text: "Using only one programming language" }, { id: "d", text: "Avoiding all external tools" }], correctAnswers: ["b"], explanation: "Production agents need robust error handling, logging, and monitoring to operate reliably." },
        { id: `${meta.number}-q4`, type: "multiple_choice", question: "The best approach to building complex agents is:", options: [{ id: "a", text: "Write everything at once" }, { id: "b", text: "Start simple and iterate incrementally" }, { id: "c", text: "Copy code from the internet without understanding" }, { id: "d", text: "Avoid planning entirely" }], correctAnswers: ["b"], explanation: "Incremental development — start with the simplest working version and add complexity step by step." },
        { id: `${meta.number}-q5`, type: "multiple_choice", question: "Documentation in agent development is:", options: [{ id: "a", text: "Optional and unnecessary" }, { id: "b", text: "Only needed for open-source projects" }, { id: "c", text: "Essential for maintainability and team collaboration" }, { id: "d", text: "Only for managers" }], correctAnswers: ["c"], explanation: "Documentation captures design decisions, setup instructions, and architecture — essential for any production system." },
      ],
    },
    prevLesson: nav.prev,
    nextLesson: nav.next,
  };
}

/**
 * Get lesson data by route slug (e.g., "module-1/lesson-1.1")
 * Checks written lessons first, then generates content for remaining lessons.
 */
export function getLesson(moduleSlug: string, lessonSlug: string): LessonData | null {
  const key = `${moduleSlug}/${lessonSlug}`;

  // Check handwritten lessons first
  if (allWrittenLessons[key]) {
    return allWrittenLessons[key];
  }

  // Generate content for lessons not yet fully written
  return generateLessonContent(key);
}

/**
 * Get all available lesson slugs
 */
export function getAllLessonSlugs(): { moduleSlug: string; lessonSlug: string }[] {
  return allLessonsMeta.map((meta) => {
    const [moduleSlug, lessonSlug] = meta.slug.split("/");
    return { moduleSlug, lessonSlug };
  });
}
