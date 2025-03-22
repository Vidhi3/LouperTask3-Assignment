describe("Review Links", () => {
  it("Louper Review Link test", () => {

    cy.visit("https://app.louper.io/"); //url

    //Login
    cy.get("#signup-email").type("vidhigautam559@gmail.com");  //email
    cy.get("#page-1-button").click(); //Next Button
    cy.get("#signup-password").type("Devikama12##"); //password
    cy.get("#page-1-button").click(); 

    //Review Link page
    cy.wait(5000);
    cy.visit("https://app.louper.io/review-links#");
    cy.wait(2000);
    cy.get("div.pt-6 > div > button").click();  //Create Review Link button

    //Select files
    cy.get("#headlessui-portal-root div.flex-1 div:nth-of-type(4) > div").dblclick();  //click on demo
    cy.get("#\\36 7d5366fdc393f65bed1aa47 input").click();  //file checkbox
    cy.get("#\\36 7d5366edc393f65bed1aa12 input").click();  //file checkbox

    //Assertion to check 2 files
    cy.get('[class="flex items-center bg-gray-800 rounded-md p-2"]').should('have.length', 2); 

    //complete the review link setup
    cy.get("#headlessui-portal-root button.bg-blue-btn").click(); //Next buttton
    cy.get("div.px-4 input").click();
    cy.get("div.px-4 input").type("Test Link");
    cy.get("div.h-screen > div.px-4 button.bg-blue-btn").click(); //Done button

    //Copy review link
    cy.get("#headlessui-portal-root svg").click();  //copy button
    cy.get("#headlessui-portal-root button.bg-gray-btn").click(); //ok button
    
    //Read clipboard text
    cy.window().then((win) => {
    return win.navigator.clipboard.readText(); // Read clipboard text
    }).then((clipboardText) => {
     
        //sign out
        cy.get("#headlessui-menu-button-11 > p").click();
        cy.contains("Sign Out").click();
          
        //join the link
        cy.visit(clipboardText); 

          //File Actions
          cy.get("#root > div > div.flex > div.flex > div > div > div:nth-of-type(1) img").first().click();  //Click on File
          cy.get("#comment").type("Testing file"); //comment
          cy.get("div.my-2 span").click();  //post button
              
              //guest name approval
              let guestName= "fff";
              cy.get("div.fixed input").type(guestName);  //guest name
              cy.get("div.fixed button.bg-blue-btn").click(); //ok 
              cy.get("div.my-2 span").click();  //confirm comment posted
              
          
          //Edit comment for guest user
          cy.get("[id$='_comment']").contains("p", guestName).parents("[id$='_comment']").within(() => { 
            cy.get("#buttons > button:nth-child(1) > svg").click(); //edit comment
          });
            cy.get("form.relative #comment").clear().type("Testing file final");
            cy.get("div.my-2 span").click();  //post button

          //Reply to the comment
          cy.get("[id$='_comment']").contains("p", guestName).parents("[id$='_comment']").within(() => {
            cy.wait(10000);
            cy.get("#buttons > button").contains("Reply").click(); 
          });
            cy.wait(10000);
            cy.get("form.relative #comment").type("Keep going");
            cy.wait(5000);
            cy.get("div.my-2 span").click(); //post button

          //nested reply assertion
          cy.get("[id$='_comment']").contains("p", guestName).closest("[id$='_comment']").within(() => {

            cy.wait(10000);
            cy.get("div:nth-of-type(4) > div > div > div:nth-of-type(2)")
            .trigger("mouseover")
            .first()
            .click();

            cy.wait(5000);
            cy.get("div:nth-of-type(4) > div > div > div:nth-of-type(2) > div")
            .should("exist")
            .should("have.css", "opacity", "1") 
            .click();

            //edit reply
              cy.wait(5000);
              cy.get("div.flex.items-center.justify-end.text-3xs.text-gray-350 > div > button:nth-of-type(1) > svg")
             .should("exist")
             .should("be.visible").first()
             .click({ force: true });  
          });

            cy.wait(5000);
            cy.get("textarea#comment").clear().type("Keep going buddy");
            cy.get("div.my-2 span").click(); //post button
          
          //Delete the comment
          cy.wait(5000);
          cy.get("[id$='_comment']").contains("p", guestName).parents("[id$='_comment']").within(() => {
            cy.get("#buttons > button:nth-child(2) > svg").click();  //delete 
          });
            cy.get("button.bg-red-btn").click();

          //Back to all files
          cy.wait(5000);
          cy.get("#controls > div.flex-shrink-0").click();

          //close tab
          cy.window().then((win) => {
          win.close(); // Closes the current tab
        });
          cy.visit("about:blank");

    });

  }); 
})


