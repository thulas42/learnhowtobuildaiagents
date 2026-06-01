describe("API Endpoints", () => {
  describe("Auth", () => {
    it("GET /api/auth/providers returns providers", () => {
      cy.request("/api/auth/providers").then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property("credentials");
      });
    });

    it("POST /api/auth/register creates a user", () => {
      const email = `api-test-${Date.now()}@test.com`;
      cy.request("POST", "/api/auth/register", {
        name: "API Test",
        email,
        password: "testpass123",
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.user).to.have.property("id");
        expect(res.body.user.email).to.eq(email);
      });
    });

    it("POST /api/auth/register rejects duplicate email", () => {
      const email = `dup-${Date.now()}@test.com`;
      cy.request("POST", "/api/auth/register", {
        name: "Dup",
        email,
        password: "pass1234",
      });
      cy.request({
        method: "POST",
        url: "/api/auth/register",
        body: { name: "Dup", email, password: "pass1234" },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(409);
      });
    });
  });

  describe("Progress (authenticated)", () => {
    const email = `progress-${Date.now()}@test.com`;
    const password = "testpass123";

    before(() => {
      cy.request("POST", "/api/auth/register", {
        name: "Progress User",
        email,
        password,
      });
      cy.loginByApi(email, password);
    });

    it("POST /api/progress saves progress", () => {
      cy.request({
        method: "POST",
        url: "/api/progress",
        body: {
          lessonId: "module-1/lesson-1.1",
          status: "COMPLETED",
        },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.progress.status).to.eq("COMPLETED");
      });
    });

    it("GET /api/progress returns progress", () => {
      cy.request("/api/progress").then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property("overallProgress");
        expect(res.body).to.have.property("totalLessons");
      });
    });

    it("GET /api/progress returns 401 when not authenticated", () => {
      cy.clearCookies();
      cy.request({ url: "/api/progress", failOnStatusCode: false }).then(
        (res) => {
          expect(res.status).to.eq(401);
        }
      );
      cy.loginByApi(email, password);
    });
  });

  describe("Questions", () => {
    it("GET /api/questions returns randomized questions without answers", () => {
      cy.request("/api/questions?lessonId=module-1/lesson-1.1&count=5").then(
        (res) => {
          expect(res.status).to.eq(200);
          expect(res.body.questionsServed).to.eq(5);
          expect(res.body.questions[0]).not.to.have.property("correctAnswers");
        }
      );
    });

    it("POST /api/questions grades answers server-side", () => {
      cy.request("/api/questions?lessonId=module-1/lesson-1.1&count=1").then(
        (getRes) => {
          const q = getRes.body.questions[0];
          cy.request("POST", "/api/questions", {
            lessonId: "module-1/lesson-1.1",
            answers: [{ questionId: q.id, selectedOptions: [q.options[0].id] }],
          }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property("score");
            expect(res.body.gradedAnswers[0]).not.to.have.property(
              "correctAnswers"
            );
          });
        }
      );
    });
  });

  describe("Subscription (authenticated)", () => {
    it("GET /api/subscription returns free for new user", () => {
      const email = `sub-${Date.now()}@test.com`;
      cy.request("POST", "/api/auth/register", {
        name: "Sub User",
        email,
        password: "testpass123",
      });
      cy.loginByApi(email, "testpass123");
      cy.request("/api/subscription").then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.plan).to.eq("free");
        expect(res.body.hasSubscription).to.eq(false);
      });
    });
  });

  describe("SEO", () => {
    it("GET /sitemap.xml returns valid sitemap", () => {
      cy.request("/sitemap.xml").then((res) => {
        expect(res.status).to.eq(200);
        expect(res.headers["content-type"]).to.include("xml");
        expect(res.body).to.include("<urlset");
      });
    });

    it("GET /robots.txt returns valid robots", () => {
      cy.request("/robots.txt").then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.include("User-Agent");
      });
    });
  });
});
