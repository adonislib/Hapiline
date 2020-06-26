/* eslint-disable sonarjs/no-identical-functions */

const DASHBOARD_URL = "/dashboard";

describe("Journal", () => {
	beforeEach(() => {
		cy.request("POST", "/test/db/seed");
	});

	it("upper part", () => {
		cy.login("dwight");
		cy.visit(DASHBOARD_URL);

		cy.findByText("View today").click();
		cy.findAllByText("Journal")
			.first()
			.click();
		cy.findAllByLabelText("Journal")
			.first()
			.should("have.value", "10 lorem ipsumlorem ipsum")
			.type(" xd");
		cy.findByText("Save").click();
		cy.findByText("Daily journal successfully updated!");

		cy.findAllByLabelText("Journal")
			.first()
			.should("have.value", "10 lorem ipsumlorem ipsum xd");
		cy.reload();
		cy.findAllByText("Journal")
			.first()
			.click();
		cy.findAllByLabelText("Journal")
			.first()
			.should("have.value", "10 lorem ipsumlorem ipsum xd");
	});
});