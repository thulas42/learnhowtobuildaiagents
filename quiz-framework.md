# Quiz Framework Design

## Overview

Every lesson concludes with a quiz to reinforce understanding. Quizzes are progressively more challenging and use varied question formats to assess different cognitive levels (recall, comprehension, application, analysis).

---

## Question Types

### 1. Multiple Choice (MCQ)
- 4 answer options (A–D)
- Single correct answer
- Distractor options are plausible (not obviously wrong)
- Used across all modules

### 2. Multiple Select
- 4–6 options, 2–3 correct
- Partial credit available
- Introduced from Module 2 onward

### 3. Matching
- Match items from two columns (e.g., agent type → description)
- 4–6 pairs
- Used in Modules 1–3

### 4. Short Answer
- 1–3 sentence response
- AI-graded with keyword matching + semantic similarity
- Human review for edge cases
- Introduced from Module 2 onward

### 5. Code Comprehension
- Given a code snippet, predict output or identify the error
- Multiple choice format with code block
- Introduced from Module 4 onward

### 6. Code Completion
- Fill in missing code (1–3 lines)
- Auto-graded by running tests against submission
- Introduced from Module 4 onward

### 7. Scenario-Based
- Present a real-world scenario, ask for best approach/architecture
- Multiple choice or short answer
- Introduced from Module 3 onward

### 8. Design Questions
- Open-ended: "Design an agent for X"
- Rubric-based grading (AI + peer review)
- Used in Modules 5–6 and Final Assessment

---

## Quiz Structure Per Lesson

| Component | Specification |
|-----------|--------------|
| Questions per quiz | 5 (standard), 7 (advanced modules) |
| Time limit | None (self-paced) |
| Passing score | 60% (Modules 1–2), 70% (Modules 3–5), 80% (Module 6) |
| Attempts | Unlimited (questions randomized from pool) |
| Feedback | Immediate, with explanation for each answer |
| Question pool | 3x questions per quiz (15+ per lesson) for randomization |

---

## Quiz Difficulty Progression

### Module 1: Recall & Comprehension
- Bloom's Taxonomy: Remember, Understand
- Focus: Definitions, identification, classification
- Example: "Which type of agent uses a model of the world to make decisions?"

### Module 2: Comprehension & Application
- Bloom's Taxonomy: Understand, Apply
- Focus: Explaining concepts, choosing algorithms for scenarios
- Example: "Given a dataset of labeled emails, which ML approach would you use?"

### Module 3: Application & Analysis
- Bloom's Taxonomy: Apply, Analyze
- Focus: Architecture decisions, trade-off analysis
- Example: "For a customer support agent that needs to access a knowledge base and escalate to humans, which architecture pattern is most appropriate?"

### Module 4: Application & Synthesis
- Bloom's Taxonomy: Apply, Analyze, Create
- Focus: Code reading, debugging, implementation choices
- Example: "What will the following LangChain code output when given this input?"

### Module 5: Analysis & Evaluation
- Bloom's Taxonomy: Analyze, Evaluate
- Focus: System design, ethical reasoning, trade-offs
- Example: "A multi-agent system is experiencing message loops. What design pattern would prevent this?"

### Module 6: Creation & Evaluation
- Bloom's Taxonomy: Create, Evaluate
- Focus: Project rubrics, peer evaluation, self-assessment
- Example: Capstone project evaluation criteria

---

## Adaptive Features

### Difficulty Adjustment
- If learner scores 100% on first attempt: offer bonus challenge questions
- If learner scores below 40%: suggest reviewing lesson material, offer simplified practice questions
- Track weak areas and recommend targeted review

### Spaced Repetition
- Missed questions reappear in future quizzes (spaced intervals)
- Weekly review quizzes combining questions from previous modules
- Optional daily practice mode

---

## Localization of Quizzes

- All question text, options, and explanations translated
- Code remains in English (universal standard)
- Code comments translated as inline annotations
- Cultural context adapted (e.g., examples use locally relevant scenarios)
- RTL rendering for Arabic/Hebrew/Urdu/Persian quiz interfaces

---

## Anti-Cheating Measures

- Large question pools with randomization
- Randomized option order
- Time-stamped submissions
- Plagiarism detection for short answer/code submissions
- Final exam: optional proctoring for certificate verification
- Unique question variants (parameterized questions)

---

## Sample Quiz: Module 4, Lesson 4.4 (Adding Tools and Function Calling)

**Question 1 (MCQ):**
In OpenAI's function calling API, how are available tools communicated to the model?

a) Through the system prompt only  
b) Via a `tools` parameter in the API request  
c) By fine-tuning the model on tool descriptions  
d) Through a separate tools API endpoint  

**Correct:** b  
**Explanation:** Tools are defined as JSON schemas and passed in the `tools` parameter of the chat completion request.

---

**Question 2 (Code Comprehension):**
```python
tools = [{"type": "function", "function": {"name": "get_weather", "parameters": {...}}}]
response = client.chat.completions.create(model="gpt-4", messages=messages, tools=tools)

if response.choices[0].message.tool_calls:
    tool_call = response.choices[0].message.tool_calls[0]
    print(tool_call.function.name)
```

What does this code print if the model decides to use the weather tool?

a) `{"name": "get_weather"}`  
b) `get_weather`  
c) `tool_calls[0]`  
d) `None`  

**Correct:** b  
**Explanation:** `tool_call.function.name` returns the string name of the function the model chose to call.

---

**Question 3 (Scenario):**
Your agent has a web search tool, a calculator tool, and a code execution tool. A user asks: "What is the population of Tokyo divided by the area in square kilometers?" Which tool execution sequence is most appropriate?

a) Calculator only  
b) Web search → Calculator  
c) Code execution only  
d) Web search → Code execution → Calculator  

**Correct:** b  
**Explanation:** The agent needs to search for current population and area data, then use the calculator to perform the division.

---

**Question 4 (MCQ):**
What should an agent do when a tool call returns an error?

a) Immediately return the error to the user  
b) Retry indefinitely until it succeeds  
c) Implement retry logic with a maximum attempt limit and fallback strategy  
d) Ignore the error and continue without the tool result  

**Correct:** c  
**Explanation:** Robust agents implement retry logic with limits and graceful fallbacks to handle tool failures without crashing or infinite loops.

---

**Question 5 (MCQ):**
Which of the following is NOT a best practice when defining tool schemas for an LLM agent?

a) Providing clear descriptions for each parameter  
b) Using strict typing for parameters  
c) Including every possible optional parameter to maximize flexibility  
d) Keeping tool descriptions concise and unambiguous  

**Correct:** c  
**Explanation:** Overloading tools with too many optional parameters increases confusion for the model. Keep schemas focused and minimal.
