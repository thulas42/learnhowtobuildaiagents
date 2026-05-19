import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ─── Module 1: Introduction to AI Agents ────────────────────────────────
  const module1 = await prisma.module.create({
    data: {
      number: 1,
      titleKey: "modules.1.title",
      descKey: "modules.1.description",
      duration: "Week 1",
      order: 1,
      objectives: {
        create: [
          { textKey: "modules.1.objectives.1", order: 1 },
          { textKey: "modules.1.objectives.2", order: 2 },
          { textKey: "modules.1.objectives.3", order: 3 },
          { textKey: "modules.1.objectives.4", order: 4 },
        ],
      },
    },
  });

  // Lesson 1.1
  const lesson1_1 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      number: "1.1",
      titleKey: "lessons.1_1.title",
      contentKey: "lessons.1_1.content",
      order: 1,
    },
  });

  await prisma.quiz.create({
    data: {
      lessonId: lesson1_1.id,
      passingScore: 0.6,
      questions: {
        create: [
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_1.q1",
            explanationKey: "quiz.1_1.q1.explanation",
            options: [
              { id: "a", text: "Input → Output → Done" },
              { id: "b", text: "Perceive → Reason → Act → Feedback" },
              { id: "c", text: "Code → Compile → Run" },
              { id: "d", text: "Train → Test → Deploy" },
            ],
            correctAnswer: ["b"],
            difficulty: 1,
            order: 1,
          },
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_1.q2",
            explanationKey: "quiz.1_1.q2.explanation",
            options: [
              { id: "a", text: "It follows a fixed script without sensing its environment" },
              { id: "b", text: "It perceives its environment and takes actions to achieve goals" },
              { id: "c", text: "It only processes batch data offline" },
              { id: "d", text: "It requires human input for every decision" },
            ],
            correctAnswer: ["b"],
            difficulty: 1,
            order: 2,
          },
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_1.q3",
            explanationKey: "quiz.1_1.q3.explanation",
            options: [
              { id: "a", text: "Sensor" },
              { id: "b", text: "Actuator" },
              { id: "c", text: "Compiler" },
              { id: "d", text: "Environment" },
            ],
            correctAnswer: ["c"],
            difficulty: 1,
            order: 3,
          },
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_1.q4",
            explanationKey: "quiz.1_1.q4.explanation",
            options: [
              { id: "a", text: "1950s" },
              { id: "b", text: "1980s" },
              { id: "c", text: "2000s" },
              { id: "d", text: "2020s" },
            ],
            correctAnswer: ["a"],
            difficulty: 1,
            order: 4,
          },
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_1.q5",
            explanationKey: "quiz.1_1.q5.explanation",
            options: [
              { id: "a", text: "An AI agent must always use machine learning" },
              { id: "b", text: "An AI agent operates autonomously in an environment" },
              { id: "c", text: "An AI agent is the same as a chatbot" },
              { id: "d", text: "An AI agent cannot make mistakes" },
            ],
            correctAnswer: ["b"],
            difficulty: 1,
            order: 5,
          },
        ],
      },
    },
  });

  // Lesson 1.2
  const lesson1_2 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      number: "1.2",
      titleKey: "lessons.1_2.title",
      contentKey: "lessons.1_2.content",
      order: 2,
    },
  });

  await prisma.quiz.create({
    data: {
      lessonId: lesson1_2.id,
      passingScore: 0.6,
      questions: {
        create: [
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_2.q1",
            explanationKey: "quiz.1_2.q1.explanation",
            options: [
              { id: "a", text: "Learning agent" },
              { id: "b", text: "Simple reflex agent" },
              { id: "c", text: "Goal-based agent" },
              { id: "d", text: "Utility-based agent" },
            ],
            correctAnswer: ["b"],
            difficulty: 1,
            order: 1,
          },
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_2.q2",
            explanationKey: "quiz.1_2.q2.explanation",
            options: [
              { id: "a", text: "Simple reflex agent" },
              { id: "b", text: "Model-based agent" },
              { id: "c", text: "Utility-based agent" },
              { id: "d", text: "Learning agent" },
            ],
            correctAnswer: ["c"],
            difficulty: 1,
            order: 2,
          },
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_2.q3",
            explanationKey: "quiz.1_2.q3.explanation",
            options: [
              { id: "a", text: "It maintains an internal model of the world" },
              { id: "b", text: "It only responds to current percepts" },
              { id: "c", text: "It always maximizes a utility function" },
              { id: "d", text: "It learns from experience" },
            ],
            correctAnswer: ["a"],
            difficulty: 1,
            order: 3,
          },
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_2.q4",
            explanationKey: "quiz.1_2.q4.explanation",
            options: [
              { id: "a", text: "It has no goals" },
              { id: "b", text: "It improves its performance over time through experience" },
              { id: "c", text: "It only uses if-then rules" },
              { id: "d", text: "It cannot adapt to new situations" },
            ],
            correctAnswer: ["b"],
            difficulty: 1,
            order: 4,
          },
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_2.q5",
            explanationKey: "quiz.1_2.q5.explanation",
            options: [
              { id: "a", text: "Goal-based agent" },
              { id: "b", text: "Utility-based agent" },
              { id: "c", text: "Simple reflex agent" },
              { id: "d", text: "Model-based agent" },
            ],
            correctAnswer: ["b"],
            difficulty: 2,
            order: 5,
          },
        ],
      },
    },
  });

  // Lesson 1.3
  const lesson1_3 = await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      number: "1.3",
      titleKey: "lessons.1_3.title",
      contentKey: "lessons.1_3.content",
      order: 3,
    },
  });

  await prisma.quiz.create({
    data: {
      lessonId: lesson1_3.id,
      passingScore: 0.6,
      questions: {
        create: [
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_3.q1",
            explanationKey: "quiz.1_3.q1.explanation",
            options: [
              { id: "a", text: "Fully observable, static" },
              { id: "b", text: "Partially observable, dynamic" },
              { id: "c", text: "Fully observable, deterministic" },
              { id: "d", text: "Partially observable, static" },
            ],
            correctAnswer: ["b"],
            difficulty: 1,
            order: 1,
          },
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_3.q2",
            explanationKey: "quiz.1_3.q2.explanation",
            options: [
              { id: "a", text: "Sensors" },
              { id: "b", text: "Actuators" },
              { id: "c", text: "Performance measure" },
              { id: "d", text: "All of the above" },
            ],
            correctAnswer: ["d"],
            difficulty: 1,
            order: 2,
          },
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_3.q3",
            explanationKey: "quiz.1_3.q3.explanation",
            options: [
              { id: "a", text: "The agent can see everything in the environment" },
              { id: "b", text: "The environment never changes" },
              { id: "c", text: "Actions have predictable outcomes" },
              { id: "d", text: "There is only one agent" },
            ],
            correctAnswer: ["c"],
            difficulty: 2,
            order: 3,
          },
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_3.q4",
            explanationKey: "quiz.1_3.q4.explanation",
            options: [
              { id: "a", text: "How the agent perceives its environment" },
              { id: "b", text: "How the agent takes actions in the environment" },
              { id: "c", text: "How the agent's success is evaluated" },
              { id: "d", text: "How the agent communicates with other agents" },
            ],
            correctAnswer: ["c"],
            difficulty: 1,
            order: 4,
          },
          {
            type: "MULTIPLE_CHOICE",
            questionKey: "quiz.1_3.q5",
            explanationKey: "quiz.1_3.q5.explanation",
            options: [
              { id: "a", text: "Camera, microphone, GPS" },
              { id: "b", text: "Wheels, speakers, display" },
              { id: "c", text: "CPU, RAM, storage" },
              { id: "d", text: "WiFi, Bluetooth, USB" },
            ],
            correctAnswer: ["a"],
            difficulty: 1,
            order: 5,
          },
        ],
      },
    },
  });

  // Lesson 1.4
  await prisma.lesson.create({
    data: {
      moduleId: module1.id,
      number: "1.4",
      titleKey: "lessons.1_4.title",
      contentKey: "lessons.1_4.content",
      order: 4,
    },
  });

  // ─── Module 2: Fundamentals ─────────────────────────────────────────────
  const module2 = await prisma.module.create({
    data: {
      number: 2,
      titleKey: "modules.2.title",
      descKey: "modules.2.description",
      duration: "Weeks 2-3",
      order: 2,
      objectives: {
        create: [
          { textKey: "modules.2.objectives.1", order: 1 },
          { textKey: "modules.2.objectives.2", order: 2 },
          { textKey: "modules.2.objectives.3", order: 3 },
          { textKey: "modules.2.objectives.4", order: 4 },
        ],
      },
    },
  });

  const lesson2_1 = await prisma.lesson.create({
    data: { moduleId: module2.id, number: "2.1", titleKey: "lessons.2_1.title", contentKey: "lessons.2_1.content", order: 1 },
  });
  await prisma.lesson.create({
    data: { moduleId: module2.id, number: "2.2", titleKey: "lessons.2_2.title", contentKey: "lessons.2_2.content", order: 2 },
  });
  await prisma.lesson.create({
    data: { moduleId: module2.id, number: "2.3", titleKey: "lessons.2_3.title", contentKey: "lessons.2_3.content", order: 3 },
  });
  await prisma.lesson.create({
    data: { moduleId: module2.id, number: "2.4", titleKey: "lessons.2_4.title", contentKey: "lessons.2_4.content", order: 4 },
  });
  await prisma.lesson.create({
    data: { moduleId: module2.id, number: "2.5", titleKey: "lessons.2_5.title", contentKey: "lessons.2_5.content", order: 5 },
  });

  // ─── Modules 3-6 (structure) ────────────────────────────────────────────
  const module3 = await prisma.module.create({
    data: {
      number: 3,
      titleKey: "modules.3.title",
      descKey: "modules.3.description",
      duration: "Weeks 4-5",
      order: 3,
    },
  });
  for (let i = 1; i <= 5; i++) {
    await prisma.lesson.create({
      data: { moduleId: module3.id, number: `3.${i}`, titleKey: `lessons.3_${i}.title`, contentKey: `lessons.3_${i}.content`, order: i },
    });
  }

  const module4 = await prisma.module.create({
    data: {
      number: 4,
      titleKey: "modules.4.title",
      descKey: "modules.4.description",
      duration: "Weeks 6-8",
      order: 4,
    },
  });
  for (let i = 1; i <= 8; i++) {
    await prisma.lesson.create({
      data: { moduleId: module4.id, number: `4.${i}`, titleKey: `lessons.4_${i}.title`, contentKey: `lessons.4_${i}.content`, order: i },
    });
  }

  const module5 = await prisma.module.create({
    data: {
      number: 5,
      titleKey: "modules.5.title",
      descKey: "modules.5.description",
      duration: "Weeks 9-10",
      order: 5,
    },
  });
  for (let i = 1; i <= 6; i++) {
    await prisma.lesson.create({
      data: { moduleId: module5.id, number: `5.${i}`, titleKey: `lessons.5_${i}.title`, contentKey: `lessons.5_${i}.content`, order: i },
    });
  }

  const module6 = await prisma.module.create({
    data: {
      number: 6,
      titleKey: "modules.6.title",
      descKey: "modules.6.description",
      duration: "Weeks 11-12",
      order: 6,
    },
  });
  for (let i = 1; i <= 4; i++) {
    await prisma.lesson.create({
      data: { moduleId: module6.id, number: `6.${i}`, titleKey: `lessons.6_${i}.title`, contentKey: `lessons.6_${i}.content`, order: i },
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
