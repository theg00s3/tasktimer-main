Feature: Navigation on the page
  As a user of Pomodoro.cc
  I should be able to navigate through the site
  So that I can interact with it

  Scenario: Clicking on Menu
    Given I click on "#nav-menu"
    Then I should see "Dashboard"
    Then I should see "Public"
    Then I should see "Statistics"
    Then I should see "Login"
