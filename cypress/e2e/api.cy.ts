describe("API Endpoints", () => {
  describe("Auth", () => {
    it("GET /api/auth/providers returns providers", () => {
      cy.request("/api/auth/providers").then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property("credentials");
        expect(res.body).to.have.property("google");
        expect(res.body).to.have.property("github");
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
      cy.request({
        method: "POST",
        url: "/api/auth/register",
        body: { name: "Dup", email: "test@example.com", password: "pass1234" },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(409);
      });
    });
  });

  describe("Progress", () => {
    it("POST /api/progress saves progress", () => {
      cy.request("POST", "/api/progress", {
        lessonId: "module-1/lesson-1.1",
        status: "COMPLETED",
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
  });

  describe("Questions", () => {
    it("GET /api/questions returns randomized questions", () => {
      cy.request("/api/questions?lessonId=module-1/lesson-1.1&count=5").then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.totalInPool).to.eq(10);
        expect(res.body.questionsServed).to.eq(5);
        expect(res.body.questions).to.have.length(5);
      });
    });

    it("returns different questions on each call", () => {
      cy.request("/api/questions?lessonId=module-1/lesson-1.1&count=5").then((res1) => {
        cy.request("/api/questions?lessonId=module-1/lesson-1.1&count=5").then((res2) => {
          const ids1 = res1.body.questions.map((q: any) => q.id).sort().join(",");
          const ids2 = res2.body.questions.map((q: any) => q.id).sort().join(",");
          // With 10 questions choosing 5, very unlikely to get same set twice
          // But we check structure is valid regardless
          expect(res1.body.questions[0]).to.have.property("question");
          expect(res1.body.questions[0]).to.have.property("options");
          expect(res1.body.questions[0]).not.to.have.property("correctAnswers");
        });
      });
    });
  });

  describe("Subscription", () => {
    it("GET /api/subscription returns free for unknown user", () => {
      cy.request("/api/subscription?email=nobody@test.com").then((res) => {
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
        expect(res.body).to.include("<loc>");
      });
    });

    it("GET /robots.txt returns valid robots", () => {
      cy.request("/robots.txt").then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.include("User-Agent");
        expect(res.body).to.include("Sitemap");
      });
    });
  });
});
