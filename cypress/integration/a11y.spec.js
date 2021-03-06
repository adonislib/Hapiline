const DASHBOARD_URL = "/dashboard";
const HABITS_URL = "/habits";
const PROFILE_URL = "/profile";
const JOURNALS_URL = "/journals";
const LOGIN_URL = "/login";
const REGISTER_URL = "/register";

describe("a11y", () => {
	// INFO: I'm using `cy.findByText("Skip to content").click({force: true});` here
	// in case when I want to press "Enter" to trigger the "Skip to content" link.
	// Cypress doesn't seem to work well for keyboard a11y testing.

	// INFO: Using regular function as `it callback`
	// because of lack of the access to `this` in arrow function.

	before(() => {
		cy.request("POST", "/test/db/seed");
	});

	it("skip nav for all main authenticated views", function() {
		if (Cypress.env("device") === "mobile") {
			this.skip();
		}
		cy.login("pam");
		cy.visit(DASHBOARD_URL);

		cy.wait(500);

		// Not skipping navigation
		cy.get("body").tab();

		cy.findByText("Skip to content").should("have.focus");
		cy.findByText("Skip to content")
			.tab()
			.tab();

		if (Cypress.env("device") === "desktop") {
			cy.findByText("Dashboard").should("have.focus");
		}
		if (Cypress.env("device") === "mobile") {
			cy.findByLabelText("Notifications dropdown").should("have.focus");
		}

		// Skipping navigation, and getting straight to the content
		// of the dashboard window
		cy.reload();
		cy.wait(500);

		cy.get("body").tab();

		cy.findByText("Skip to content").click({force: true});

		cy.get("main").tab();

		cy.findByText("View today").should("have.focus");

		// Skipping navigation, and getting straight to the content
		// of the habits window
		cy.visit(HABITS_URL);
		cy.wait(500);

		cy.get("body").tab();

		cy.findByText("Skip to content").click({force: true});

		cy.get("main").tab();

		if (Cypress.env("device") === "desktop") {
			cy.findByText("Show filters").should("have.focus");
		}
		if (Cypress.env("device") === "mobile") {
			cy.findByText("New habit").should("have.focus");
		}

		// Not testing /calendar URL, because the first enabled button depends
		// on the current date.

		// Skipping navigation, and getting straight to the content
		// of the profile window
		cy.visit(PROFILE_URL);
		cy.wait(500);

		cy.get("body").tab();

		cy.findByText("Skip to content").click({force: true});

		cy.get("main").tab();

		cy.findByLabelText("New email").should("have.focus");

		// Skipping navigation, and getting straight to the content
		// of the journals window
		cy.visit(JOURNALS_URL);
		cy.wait(500);

		cy.get("body").tab();

		cy.findByText("Skip to content").click({force: true});

		cy.get("main").tab();

		cy.findByLabelText("Sort by").should("have.focus");
	});

	it("skip nav for all main unauthenticated views", function() {
		if (Cypress.env("device") === "mobile") {
			this.skip();
		}
		cy.visit(LOGIN_URL);
		cy.wait(500);

		// Not skipping navigation
		cy.get("body").tab();

		cy.findByText("Skip to content").should("have.focus");
		cy.findByText("Skip to content")
			.tab()
			.tab();

		cy.findByText("Register").should("have.focus");

		// Skipping navigation, and getting straight to the content
		// of the login window
		cy.reload();
		cy.wait(500);

		cy.get("body").tab();

		cy.findByText("Skip to content").click({force: true});

		cy.get("main").tab();

		cy.findByLabelText("Email").should("have.focus");

		// Skipping navigation, and getting straight to the content
		// of the register window
		cy.visit(REGISTER_URL);
		cy.wait(500);

		cy.get("body").tab();

		cy.findByText("Skip to content").click({force: true});

		cy.get("main").tab();

		cy.findByLabelText("Email").should("have.focus");
	});

	it("changing habit name - keyboard", function() {
		if (Cypress.env("device") === "mobile") {
			this.skip();
		}

		cy.login("dwight");
		cy.visit(HABITS_URL);
		cy.wait(500);

		cy.get("main")
			.tab()
			.tab()
			.tab()
			.tab()
			.tab()
			.tab()
			.click({force: true});

		cy.wait(500);

		cy.focused().tab();

		cy.findByRole("dialog").within(() => {
			cy.findByLabelText("Habit name")
				.should("have.focus")
				.clear()
				.type("fs")
				.type("{enter}");
		});

		cy.findByText("Name updated successfully!");
	});

	it("changing habit description - keyboard", function() {
		if (Cypress.env("device") === "mobile") {
			this.skip();
		}
		cy.login("dwight");
		cy.visit(HABITS_URL);
		cy.wait(500);

		cy.get("main")
			.tab()
			.tab()
			.tab()
			.tab()
			.tab()
			.tab()
			.click({force: true});

		cy.wait(500);

		cy.focused()
			.tab()
			.tab()
			.tab()
			.tab()
			.tab()
			.tab()
			.tab()
			.tab()
			.tab()
			.tab()
			.tab()
			.tab();

		cy.findByRole("dialog").within(() => {
			cy.findByLabelText("Description")
				.should("have.focus")
				.clear()
				.type("fs")
				.tab()
				.click({force: true});
		});

		cy.findByText("Comment added successfully!");
	});
});
