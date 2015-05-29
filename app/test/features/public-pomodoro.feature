Feature: Starting a public pomodoro
  As a user of Pomodoro.cc
  I want to choose a room for a public pomodoro
  So that I can pair program with a partner remotely

  Scenario: Starting a public pomodoro
    Given I go to "/"
    Then I click on ".dropdown"
    Then I click on "#nav-public-pomodoro"
    Then I should see "Remote pair programming"
    When I insert the public room "project-1"
    Then I should be on "/public/project-1"

