Feature: Navigation on the page
  As a user of Pomodoro.cc
  I should be able to navigate through the site
  So that I can interact with it

  Scenario: Clicking on dashboard
    Given I click on "#navigate-dashboard"
    Then I should be on "/"

  Scenario: Clicking on login
    Given I click on "#navigate-login button"
