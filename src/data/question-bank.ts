/**
 * Question Bank — 10 questions per lesson stored as structured data.
 * 
 * Each quiz attempt randomly selects 5 questions from the pool of 10,
 * and randomizes the answer positions.
 * 
 * Diagrams are stored as JSON objects that describe shapes, arrows, and labels.
 * The DiagramRenderer component interprets these to draw SVG diagrams.
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export type QuestionType = 
  | "multiple_choice" 
  | "multiple_select" 
  | "code_comprehension";

export interface DiagramNode {
  id: string;
  type: "box" | "circle" | "diamond" | "ellipse";
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
}

export interface DiagramArrow {
  from: string;
  to: string;
  label?: string;
  style?: "solid" | "dashed";
}

export interface DiagramData {
  width: number;
  height: number;
  title?: string;
  nodes: DiagramNode[];
  arrows: DiagramArrow[];
}

export interface BankQuestion {
  id: string;
  lessonId: string;
  type: QuestionType;
  question: string;
  codeSnippet?: string;
  diagram?: DiagramData;
  options: { id: string; text: string }[];
  correctAnswers: string[];
  explanation: string;
  difficulty: number; // 1-5
}

// ─── Question Bank Data ─────────────────────────────────────────────────────

export const questionBank: BankQuestion[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSON 1.1: What is an AI Agent? (10 questions)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "1.1-01",
    lessonId: "module-1/lesson-1.1",
    type: "multiple_choice",
    question: "Which of the following best describes the agent-environment interaction loop?",
    diagram: {
      width: 500,
      height: 200,
      title: "Agent-Environment Loop",
      nodes: [
        { id: "perceive", type: "box", label: "Perceive", x: 50, y: 80, width: 100, height: 40, color: "#3b82f6" },
        { id: "reason", type: "box", label: "Reason", x: 200, y: 80, width: 100, height: 40, color: "#8b5cf6" },
        { id: "act", type: "box", label: "Act", x: 350, y: 80, width: 100, height: 40, color: "#10b981" },
        { id: "feedback", type: "ellipse", label: "Feedback", x: 200, y: 160, width: 100, height: 35, color: "#f59e0b" },
      ],
      arrows: [
        { from: "perceive", to: "reason", label: "" },
        { from: "reason", to: "act", label: "" },
        { from: "act", to: "feedback", label: "" },
        { from: "feedback", to: "perceive", label: "", style: "dashed" },
      ],
    },
    options: [
      { id: "a", text: "Input → Output → Done" },
      { id: "b", text: "Perceive → Reason → Act → Feedback" },
      { id: "c", text: "Code → Compile → Run" },
      { id: "d", text: "Train → Test → Deploy" },
    ],
    correctAnswers: ["b"],
    explanation: "The agent-environment loop consists of perceiving the environment, reasoning about what to do, acting on that decision, and receiving feedback as the environment changes. The diagram shows this continuous cycle.",
    difficulty: 1,
  },
  {
    id: "1.1-02",
    lessonId: "module-1/lesson-1.1",
    type: "multiple_choice",
    question: "What best defines an AI agent?",
    options: [
      { id: "a", text: "A program that follows a fixed script without sensing its environment" },
      { id: "b", text: "A system that perceives its environment and takes actions to achieve goals" },
      { id: "c", text: "A system that only processes batch data offline" },
      { id: "d", text: "A program that requires human input for every decision" },
    ],
    correctAnswers: ["b"],
    explanation: "An AI agent is defined by its ability to autonomously perceive its environment and take actions to achieve goals, without requiring human input for every decision.",
    difficulty: 1,
  },
  {
    id: "1.1-03",
    lessonId: "module-1/lesson-1.1",
    type: "multiple_choice",
    question: "Which of the following is NOT a core component of an AI agent?",
    diagram: {
      width: 400,
      height: 250,
      title: "Core Agent Components",
      nodes: [
        { id: "agent", type: "circle", label: "Agent", x: 175, y: 100, width: 80, height: 80, color: "#3b82f6" },
        { id: "sensors", type: "box", label: "Sensors", x: 30, y: 30, width: 90, height: 35, color: "#10b981" },
        { id: "actuators", type: "box", label: "Actuators", x: 280, y: 30, width: 90, height: 35, color: "#f59e0b" },
        { id: "env", type: "box", label: "Environment", x: 140, y: 200, width: 120, height: 35, color: "#6366f1" },
      ],
      arrows: [
        { from: "sensors", to: "agent", label: "percepts" },
        { from: "agent", to: "actuators", label: "actions" },
        { from: "env", to: "sensors", style: "dashed" },
        { from: "actuators", to: "env", style: "dashed" },
      ],
    },
    options: [
      { id: "a", text: "Sensor" },
      { id: "b", text: "Actuator" },
      { id: "c", text: "Compiler" },
      { id: "d", text: "Environment" },
    ],
    correctAnswers: ["c"],
    explanation: "The core components are sensors (perception), actuators (action), environment, and performance measure. A compiler is a software development tool, not an agent component.",
    difficulty: 1,
  },
  {
    id: "1.1-04",
    lessonId: "module-1/lesson-1.1",
    type: "multiple_choice",
    question: "A thermostat that turns on heating when temperature drops below a threshold is an example of what type of agent?",
    options: [
      { id: "a", text: "Learning agent" },
      { id: "b", text: "Simple reflex agent" },
      { id: "c", text: "Utility-based agent" },
      { id: "d", text: "Goal-based agent" },
    ],
    correctAnswers: ["b"],
    explanation: "A thermostat is a simple reflex agent because it directly maps a percept (temperature reading) to an action (turn heater on/off) using a simple condition-action rule.",
    difficulty: 1,
  },
  {
    id: "1.1-05",
    lessonId: "module-1/lesson-1.1",
    type: "multiple_choice",
    question: "Which statement about AI agents is TRUE?",
    options: [
      { id: "a", text: "An AI agent must always use machine learning" },
      { id: "b", text: "An AI agent operates autonomously in an environment" },
      { id: "c", text: "An AI agent is the same as a chatbot" },
      { id: "d", text: "An AI agent cannot make mistakes" },
    ],
    correctAnswers: ["b"],
    explanation: "The defining characteristic of an AI agent is autonomous operation within an environment. Not all agents use ML, agents are broader than chatbots, and agents can certainly make mistakes.",
    difficulty: 1,
  },
  {
    id: "1.1-06",
    lessonId: "module-1/lesson-1.1",
    type: "multiple_choice",
    question: "In the context of AI agents, what is a 'percept'?",
    options: [
      { id: "a", text: "An action the agent takes" },
      { id: "b", text: "The agent's internal state" },
      { id: "c", text: "The input the agent receives from its sensors at a given moment" },
      { id: "d", text: "The reward signal from the environment" },
    ],
    correctAnswers: ["c"],
    explanation: "A percept is the input that an agent's sensors provide at any given instant — it's what the agent 'perceives' from the environment.",
    difficulty: 2,
  },
  {
    id: "1.1-07",
    lessonId: "module-1/lesson-1.1",
    type: "multiple_choice",
    question: "What distinguishes an AI agent from a traditional software program?",
    diagram: {
      width: 500,
      height: 150,
      title: "Agent vs Traditional Program",
      nodes: [
        { id: "trad", type: "box", label: "Traditional:\nInput → Fixed Logic → Output", x: 30, y: 50, width: 200, height: 50, color: "#94a3b8" },
        { id: "agent", type: "box", label: "Agent:\nPerceive → Reason → Act → Adapt", x: 270, y: 50, width: 200, height: 50, color: "#3b82f6" },
      ],
      arrows: [],
    },
    options: [
      { id: "a", text: "Agents are always written in Python" },
      { id: "b", text: "Agents can perceive, reason, and act autonomously in dynamic environments" },
      { id: "c", text: "Traditional programs are faster than agents" },
      { id: "d", text: "Agents don't use algorithms" },
    ],
    correctAnswers: ["b"],
    explanation: "The key distinction is that agents operate autonomously in dynamic environments, perceiving changes and adapting their behavior, while traditional programs follow fixed input-output logic.",
    difficulty: 2,
  },
  {
    id: "1.1-08",
    lessonId: "module-1/lesson-1.1",
    type: "code_comprehension",
    question: "What does this code represent conceptually?",
    codeSnippet: `class Agent:
    def __init__(self, sensors, actuators):
        self.sensors = sensors
        self.actuators = actuators
        self.memory = []

    def step(self, environment):
        percept = self.sensors.read(environment)
        self.memory.append(percept)
        action = self.decide(self.memory)
        self.actuators.execute(action, environment)`,
    options: [
      { id: "a", text: "A database connection handler" },
      { id: "b", text: "A basic AI agent with the perceive-reason-act loop" },
      { id: "c", text: "A web server request handler" },
      { id: "d", text: "A machine learning training loop" },
    ],
    correctAnswers: ["b"],
    explanation: "This code implements the fundamental agent loop: perceive (sensors.read), maintain state (memory), reason (decide), and act (actuators.execute).",
    difficulty: 2,
  },
  {
    id: "1.1-09",
    lessonId: "module-1/lesson-1.1",
    type: "multiple_choice",
    question: "Which of the following is the BEST example of an AI agent?",
    options: [
      { id: "a", text: "A calculator app that computes 2+2" },
      { id: "b", text: "A static HTML webpage" },
      { id: "c", text: "A self-driving car navigating traffic" },
      { id: "d", text: "A CSV file containing data" },
    ],
    correctAnswers: ["c"],
    explanation: "A self-driving car perceives its environment (cameras, LIDAR), reasons about the situation, and takes actions (steering, braking) autonomously — the hallmark of an AI agent.",
    difficulty: 1,
  },
  {
    id: "1.1-10",
    lessonId: "module-1/lesson-1.1",
    type: "multiple_choice",
    question: "The 'performance measure' of an AI agent refers to:",
    options: [
      { id: "a", text: "How fast the agent's code executes" },
      { id: "b", text: "The criteria used to evaluate how well the agent achieves its objectives" },
      { id: "c", text: "The amount of memory the agent uses" },
      { id: "d", text: "The number of sensors the agent has" },
    ],
    correctAnswers: ["b"],
    explanation: "The performance measure is an external criterion that evaluates how successfully the agent is achieving its intended objectives in the environment.",
    difficulty: 2,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSON 1.2: Types of AI Agents (10 questions)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "1.2-01",
    lessonId: "module-1/lesson-1.2",
    type: "multiple_choice",
    question: "A vacuum cleaner robot that only reacts to dirt when it senses it is an example of a:",
    options: [
      { id: "a", text: "Learning agent" },
      { id: "b", text: "Simple reflex agent" },
      { id: "c", text: "Goal-based agent" },
      { id: "d", text: "Utility-based agent" },
    ],
    correctAnswers: ["b"],
    explanation: "A simple reflex agent acts only on current percepts using condition-action rules, without memory or planning.",
    difficulty: 1,
  },
  {
    id: "1.2-02",
    lessonId: "module-1/lesson-1.2",
    type: "multiple_choice",
    question: "A chess-playing AI that evaluates board positions and selects the move with the highest expected outcome is best classified as:",
    options: [
      { id: "a", text: "Simple reflex agent" },
      { id: "b", text: "Model-based agent" },
      { id: "c", text: "Utility-based agent" },
      { id: "d", text: "Simple reflex agent" },
    ],
    correctAnswers: ["c"],
    explanation: "A utility-based agent evaluates different outcomes using a utility function and selects the action that maximizes expected utility.",
    difficulty: 2,
  },
  {
    id: "1.2-03",
    lessonId: "module-1/lesson-1.2",
    type: "multiple_choice",
    question: "What distinguishes a model-based agent from a simple reflex agent?",
    diagram: {
      width: 500,
      height: 200,
      title: "Model-Based vs Simple Reflex",
      nodes: [
        { id: "simple", type: "box", label: "Simple Reflex:\nPercept → Rule → Action", x: 30, y: 70, width: 200, height: 60, color: "#94a3b8" },
        { id: "model", type: "box", label: "Model-Based:\nPercept + Internal State\n→ Rule → Action", x: 270, y: 60, width: 200, height: 80, color: "#3b82f6" },
      ],
      arrows: [],
    },
    options: [
      { id: "a", text: "It maintains an internal model of the world" },
      { id: "b", text: "It only responds to current percepts" },
      { id: "c", text: "It always maximizes a utility function" },
      { id: "d", text: "It learns from experience" },
    ],
    correctAnswers: ["a"],
    explanation: "Model-based agents maintain an internal state that tracks aspects of the world not directly observable, allowing them to handle partially observable environments.",
    difficulty: 2,
  },
  {
    id: "1.2-04",
    lessonId: "module-1/lesson-1.2",
    type: "multiple_choice",
    question: "What is the key characteristic of a learning agent?",
    options: [
      { id: "a", text: "It has no goals" },
      { id: "b", text: "It improves its performance over time through experience" },
      { id: "c", text: "It only uses if-then rules" },
      { id: "d", text: "It cannot adapt to new situations" },
    ],
    correctAnswers: ["b"],
    explanation: "Learning agents have a learning element that modifies their behavior based on experience and feedback from a critic.",
    difficulty: 1,
  },
  {
    id: "1.2-05",
    lessonId: "module-1/lesson-1.2",
    type: "multiple_choice",
    question: "When choosing between two routes — one faster but with tolls, one slower but free — which agent type handles this best?",
    options: [
      { id: "a", text: "Goal-based agent" },
      { id: "b", text: "Utility-based agent" },
      { id: "c", text: "Simple reflex agent" },
      { id: "d", text: "Model-based agent" },
    ],
    correctAnswers: ["b"],
    explanation: "Utility-based agents can weigh trade-offs between competing objectives (time vs. cost) using a utility function that quantifies preferences.",
    difficulty: 2,
  },
  {
    id: "1.2-06",
    lessonId: "module-1/lesson-1.2",
    type: "multiple_choice",
    question: "Which agent type is the MOST complex?",
    diagram: {
      width: 500,
      height: 120,
      title: "Agent Complexity Hierarchy",
      nodes: [
        { id: "s", type: "box", label: "Simple\nReflex", x: 10, y: 40, width: 80, height: 50, color: "#94a3b8" },
        { id: "m", type: "box", label: "Model-\nBased", x: 110, y: 40, width: 80, height: 50, color: "#60a5fa" },
        { id: "g", type: "box", label: "Goal-\nBased", x: 210, y: 40, width: 80, height: 50, color: "#3b82f6" },
        { id: "u", type: "box", label: "Utility-\nBased", x: 310, y: 40, width: 80, height: 50, color: "#2563eb" },
        { id: "l", type: "box", label: "Learning", x: 410, y: 40, width: 80, height: 50, color: "#1d4ed8" },
      ],
      arrows: [
        { from: "s", to: "m" },
        { from: "m", to: "g" },
        { from: "g", to: "u" },
        { from: "u", to: "l" },
      ],
    },
    options: [
      { id: "a", text: "Simple reflex agent" },
      { id: "b", text: "Goal-based agent" },
      { id: "c", text: "Learning agent" },
      { id: "d", text: "Model-based agent" },
    ],
    correctAnswers: ["c"],
    explanation: "Learning agents are the most complex — they incorporate all capabilities of other agent types plus the ability to improve through experience.",
    difficulty: 1,
  },
  {
    id: "1.2-07",
    lessonId: "module-1/lesson-1.2",
    type: "multiple_choice",
    question: "A GPS navigation system that finds the shortest route to a destination is best classified as a:",
    options: [
      { id: "a", text: "Simple reflex agent" },
      { id: "b", text: "Model-based agent" },
      { id: "c", text: "Goal-based agent" },
      { id: "d", text: "Learning agent" },
    ],
    correctAnswers: ["c"],
    explanation: "A GPS system has an explicit goal (reach destination) and plans a sequence of actions (route) to achieve it, making it a goal-based agent.",
    difficulty: 2,
  },
  {
    id: "1.2-08",
    lessonId: "module-1/lesson-1.2",
    type: "multiple_choice",
    question: "Which component does a learning agent have that other agent types lack?",
    options: [
      { id: "a", text: "Sensors" },
      { id: "b", text: "A critic that provides feedback on performance" },
      { id: "c", text: "Actuators" },
      { id: "d", text: "An environment" },
    ],
    correctAnswers: ["b"],
    explanation: "Learning agents uniquely have a critic (or performance element) that evaluates how well the agent is doing, enabling it to improve over time.",
    difficulty: 2,
  },
  {
    id: "1.2-09",
    lessonId: "module-1/lesson-1.2",
    type: "multiple_choice",
    question: "A spam filter that uses fixed rules like 'if email contains WINNER, mark as spam' is a:",
    options: [
      { id: "a", text: "Learning agent" },
      { id: "b", text: "Utility-based agent" },
      { id: "c", text: "Simple reflex agent" },
      { id: "d", text: "Goal-based agent" },
    ],
    correctAnswers: ["c"],
    explanation: "Fixed condition-action rules without learning or internal state make this a simple reflex agent.",
    difficulty: 1,
  },
  {
    id: "1.2-10",
    lessonId: "module-1/lesson-1.2",
    type: "multiple_choice",
    question: "Netflix's recommendation system that improves suggestions based on your viewing history is a:",
    options: [
      { id: "a", text: "Simple reflex agent" },
      { id: "b", text: "Model-based agent" },
      { id: "c", text: "Goal-based agent" },
      { id: "d", text: "Learning agent" },
    ],
    correctAnswers: ["d"],
    explanation: "Netflix's system learns from user behavior over time, continuously improving its recommendations — the hallmark of a learning agent.",
    difficulty: 1,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSON 1.3: Key Components of an AI Agent (10 questions)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "1.3-01",
    lessonId: "module-1/lesson-1.3",
    type: "multiple_choice",
    question: "A self-driving car operating in traffic is in what type of environment?",
    options: [
      { id: "a", text: "Fully observable, static" },
      { id: "b", text: "Partially observable, dynamic" },
      { id: "c", text: "Fully observable, deterministic" },
      { id: "d", text: "Partially observable, static" },
    ],
    correctAnswers: ["b"],
    explanation: "Traffic is partially observable (can't see around corners or predict other drivers) and dynamic (other vehicles move independently).",
    difficulty: 1,
  },
  {
    id: "1.3-02",
    lessonId: "module-1/lesson-1.3",
    type: "multiple_choice",
    question: "In the PEAS framework, what does the 'E' stand for?",
    diagram: {
      width: 400,
      height: 120,
      title: "PEAS Framework",
      nodes: [
        { id: "p", type: "box", label: "P\nPerformance", x: 10, y: 40, width: 90, height: 50, color: "#3b82f6" },
        { id: "e", type: "box", label: "E\nEnvironment", x: 110, y: 40, width: 90, height: 50, color: "#10b981" },
        { id: "a", type: "box", label: "A\nActuators", x: 210, y: 40, width: 90, height: 50, color: "#f59e0b" },
        { id: "s", type: "box", label: "S\nSensors", x: 310, y: 40, width: 90, height: 50, color: "#ef4444" },
      ],
      arrows: [],
    },
    options: [
      { id: "a", text: "Execution" },
      { id: "b", text: "Environment" },
      { id: "c", text: "Evaluation" },
      { id: "d", text: "Efficiency" },
    ],
    correctAnswers: ["b"],
    explanation: "PEAS stands for Performance measure, Environment, Actuators, and Sensors — the four key aspects to define when designing an agent.",
    difficulty: 1,
  },
  {
    id: "1.3-03",
    lessonId: "module-1/lesson-1.3",
    type: "multiple_choice",
    question: "What does 'deterministic environment' mean?",
    options: [
      { id: "a", text: "The agent can see everything in the environment" },
      { id: "b", text: "The environment never changes" },
      { id: "c", text: "The next state is completely determined by the current state and action" },
      { id: "d", text: "There is only one agent" },
    ],
    correctAnswers: ["c"],
    explanation: "In a deterministic environment, given the current state and an action, the next state is completely predictable with no randomness.",
    difficulty: 2,
  },
  {
    id: "1.3-04",
    lessonId: "module-1/lesson-1.3",
    type: "multiple_choice",
    question: "What does the performance measure define?",
    options: [
      { id: "a", text: "How the agent perceives its environment" },
      { id: "b", text: "How the agent takes actions" },
      { id: "c", text: "The criteria for evaluating how well the agent achieves its objectives" },
      { id: "d", text: "How the agent communicates with other agents" },
    ],
    correctAnswers: ["c"],
    explanation: "The performance measure is the criterion for evaluating how well the agent is doing — it defines what 'success' means.",
    difficulty: 1,
  },
  {
    id: "1.3-05",
    lessonId: "module-1/lesson-1.3",
    type: "multiple_choice",
    question: "Which of these are examples of sensors?",
    options: [
      { id: "a", text: "Camera, microphone, GPS" },
      { id: "b", text: "Wheels, speakers, display" },
      { id: "c", text: "CPU, RAM, storage" },
      { id: "d", text: "WiFi, Bluetooth, USB" },
    ],
    correctAnswers: ["a"],
    explanation: "Sensors are devices that perceive the environment. Cameras, microphones, and GPS all gather environmental data.",
    difficulty: 1,
  },
  {
    id: "1.3-06",
    lessonId: "module-1/lesson-1.3",
    type: "multiple_choice",
    question: "A chess game is what type of environment?",
    options: [
      { id: "a", text: "Partially observable, continuous" },
      { id: "b", text: "Fully observable, discrete, deterministic" },
      { id: "c", text: "Partially observable, dynamic" },
      { id: "d", text: "Fully observable, continuous, stochastic" },
    ],
    correctAnswers: ["b"],
    explanation: "Chess is fully observable (both players see the entire board), discrete (finite states and moves), and deterministic (moves have predictable outcomes).",
    difficulty: 2,
  },
  {
    id: "1.3-07",
    lessonId: "module-1/lesson-1.3",
    type: "multiple_choice",
    question: "Which is an example of an actuator for a chatbot agent?",
    options: [
      { id: "a", text: "A keyboard (for receiving input)" },
      { id: "b", text: "The text output it sends to the user" },
      { id: "c", text: "The user's screen" },
      { id: "d", text: "The internet connection" },
    ],
    correctAnswers: ["b"],
    explanation: "An actuator is how the agent affects its environment. For a chatbot, sending text responses is its primary action/actuator.",
    difficulty: 2,
  },
  {
    id: "1.3-08",
    lessonId: "module-1/lesson-1.3",
    type: "multiple_choice",
    question: "A poker game is what type of environment compared to chess?",
    options: [
      { id: "a", text: "More observable" },
      { id: "b", text: "Partially observable and stochastic" },
      { id: "c", text: "Fully deterministic" },
      { id: "d", text: "Static" },
    ],
    correctAnswers: ["b"],
    explanation: "Poker is partially observable (you can't see other players' cards) and stochastic (card deals are random), unlike chess which is fully observable and deterministic.",
    difficulty: 2,
  },
  {
    id: "1.3-09",
    lessonId: "module-1/lesson-1.3",
    type: "multiple_choice",
    question: "In a multi-agent environment:",
    options: [
      { id: "a", text: "Only one agent can act at a time" },
      { id: "b", text: "Multiple agents operate and may interact or compete" },
      { id: "c", text: "Agents cannot communicate" },
      { id: "d", text: "The environment is always static" },
    ],
    correctAnswers: ["b"],
    explanation: "Multi-agent environments have multiple agents that may cooperate, compete, or simply coexist, each affecting the environment.",
    difficulty: 1,
  },
  {
    id: "1.3-10",
    lessonId: "module-1/lesson-1.3",
    type: "multiple_choice",
    question: "Why should the performance measure be defined externally (not by the agent itself)?",
    options: [
      { id: "a", text: "Because agents can't do math" },
      { id: "b", text: "To prevent the agent from gaming its own metric or defining trivial goals" },
      { id: "c", text: "Because agents don't have memory" },
      { id: "d", text: "It doesn't matter who defines it" },
    ],
    correctAnswers: ["b"],
    explanation: "If an agent defines its own success criteria, it might choose trivially easy goals or game the metric. External definition ensures the measure captures what we actually want.",
    difficulty: 3,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LESSON 1.4: Applications of AI Agents (10 questions)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "1.4-01",
    lessonId: "module-1/lesson-1.4",
    type: "multiple_choice",
    question: "Which of these is a common application of AI agents?",
    options: [
      { id: "a", text: "Traffic light control" },
      { id: "b", text: "Chatbots for customer service" },
      { id: "c", text: "Autonomous vehicles" },
      { id: "d", text: "All of the above" },
    ],
    correctAnswers: ["d"],
    explanation: "All of these are real-world applications of AI agents across different domains.",
    difficulty: 1,
  },
  {
    id: "1.4-02",
    lessonId: "module-1/lesson-1.4",
    type: "multiple_choice",
    question: "GitHub Copilot is an example of an AI agent in which domain?",
    options: [
      { id: "a", text: "Healthcare" },
      { id: "b", text: "Software Development" },
      { id: "c", text: "Finance" },
      { id: "d", text: "Robotics" },
    ],
    correctAnswers: ["b"],
    explanation: "GitHub Copilot is a code completion agent that assists software developers by suggesting code.",
    difficulty: 1,
  },
  {
    id: "1.4-03",
    lessonId: "module-1/lesson-1.4",
    type: "multiple_choice",
    question: "What do all AI agent applications have in common?",
    options: [
      { id: "a", text: "They all use neural networks" },
      { id: "b", text: "They all perceive, reason, and act autonomously" },
      { id: "c", text: "They all require internet access" },
      { id: "d", text: "They all learn from data" },
    ],
    correctAnswers: ["b"],
    explanation: "The common thread is the perceive-reason-act loop operating with some degree of autonomy.",
    difficulty: 1,
  },
  {
    id: "1.4-04",
    lessonId: "module-1/lesson-1.4",
    type: "multiple_choice",
    question: "Which is NOT typically an AI agent application?",
    options: [
      { id: "a", text: "A static website displaying information" },
      { id: "b", text: "A fraud detection system" },
      { id: "c", text: "An autonomous drone" },
      { id: "d", text: "A recommendation engine" },
    ],
    correctAnswers: ["a"],
    explanation: "A static website doesn't perceive, reason, or act — it just displays fixed content. It's not an agent.",
    difficulty: 1,
  },
  {
    id: "1.4-05",
    lessonId: "module-1/lesson-1.4",
    type: "multiple_choice",
    question: "AlphaZero is an AI agent that operates in which domain?",
    options: [
      { id: "a", text: "Healthcare" },
      { id: "b", text: "Game playing" },
      { id: "c", text: "Manufacturing" },
      { id: "d", text: "Customer service" },
    ],
    correctAnswers: ["b"],
    explanation: "AlphaZero is a game-playing AI agent that mastered chess, shogi, and Go through self-play.",
    difficulty: 1,
  },
  {
    id: "1.4-06",
    lessonId: "module-1/lesson-1.4",
    type: "multiple_choice",
    question: "In healthcare, AI agents are used for:",
    options: [
      { id: "a", text: "Diagnosing diseases from medical images" },
      { id: "b", text: "Drug discovery" },
      { id: "c", text: "Patient monitoring" },
      { id: "d", text: "All of the above" },
    ],
    correctAnswers: ["d"],
    explanation: "AI agents are used across healthcare for diagnostics, drug discovery, patient monitoring, and treatment recommendations.",
    difficulty: 1,
  },
  {
    id: "1.4-07",
    lessonId: "module-1/lesson-1.4",
    type: "multiple_choice",
    question: "What type of AI agent is an algorithmic trading bot?",
    options: [
      { id: "a", text: "Simple reflex agent" },
      { id: "b", text: "Utility-based or learning agent" },
      { id: "c", text: "It's not an agent" },
      { id: "d", text: "Model-based only" },
    ],
    correctAnswers: ["b"],
    explanation: "Trading bots typically maximize a utility function (profit) and often learn from market data, making them utility-based or learning agents.",
    difficulty: 2,
  },
  {
    id: "1.4-08",
    lessonId: "module-1/lesson-1.4",
    type: "multiple_choice",
    question: "The trend in AI agents is moving from:",
    options: [
      { id: "a", text: "General-purpose to narrow, single-task agents" },
      { id: "b", text: "Narrow, single-task agents to general-purpose agents" },
      { id: "c", text: "Software agents to hardware-only agents" },
      { id: "d", text: "Cloud-based to paper-based systems" },
    ],
    correctAnswers: ["b"],
    explanation: "With advances in LLMs, the field is moving from narrow single-task agents toward more general-purpose agents that can handle diverse tasks.",
    difficulty: 2,
  },
  {
    id: "1.4-09",
    lessonId: "module-1/lesson-1.4",
    type: "multiple_choice",
    question: "Amazon's warehouse robots are an example of AI agents in:",
    options: [
      { id: "a", text: "Customer service" },
      { id: "b", text: "Finance" },
      { id: "c", text: "Robotics and manufacturing" },
      { id: "d", text: "Healthcare" },
    ],
    correctAnswers: ["c"],
    explanation: "Amazon's warehouse robots autonomously navigate, pick items, and coordinate with other robots — a robotics/manufacturing application.",
    difficulty: 1,
  },
  {
    id: "1.4-10",
    lessonId: "module-1/lesson-1.4",
    type: "multiple_choice",
    question: "Which capability makes LLM-based agents (like ChatGPT) different from earlier AI agents?",
    options: [
      { id: "a", text: "They can only play games" },
      { id: "b", text: "They can understand and generate natural language, use tools, and handle diverse tasks" },
      { id: "c", text: "They don't need any input" },
      { id: "d", text: "They only work offline" },
    ],
    correctAnswers: ["b"],
    explanation: "LLM-based agents can understand natural language, generate responses, call tools/APIs, and handle a wide variety of tasks — making them far more versatile than earlier specialized agents.",
    difficulty: 2,
  },
];

// ─── Helper Functions ───────────────────────────────────────────────────────

/**
 * Get all questions for a specific lesson
 */
export function getQuestionsForLesson(lessonId: string): BankQuestion[] {
  return questionBank.filter((q) => q.lessonId === lessonId);
}

/**
 * Randomly select N questions from a lesson's pool and shuffle answer positions.
 * Returns a different set each time it's called.
 */
export function getRandomizedQuiz(lessonId: string, count: number = 5) {
  const pool = getQuestionsForLesson(lessonId);
  
  // Fisher-Yates shuffle
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Select N questions
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  // Shuffle answer options for each question
  const displayLabels = ["A", "B", "C", "D", "E", "F"];
  return selected.map((q) => {
    const shuffledOptions = [...q.options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    return {
      ...q,
      options: shuffledOptions.map((opt, idx) => ({
        ...opt,
        displayLabel: displayLabels[idx],
      })),
    };
  });
}

/**
 * Get total question count per lesson (for admin/stats)
 */
export function getQuestionCountByLesson(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const q of questionBank) {
    counts[q.lessonId] = (counts[q.lessonId] || 0) + 1;
  }
  return counts;
}
