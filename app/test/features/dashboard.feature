Feature: Loading the dashboard page
  As a user of Pomodoro.cc
  I should be able to see the dashboard
  So that I can track time

  Scenario: Visiting /
    Given I go to "/"
    Then I should see "00:00"
