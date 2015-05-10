Feature: Starting a public pomodoro
  As a user of Pomodoro.cc
  I want to choose a room for a public pomodoro
  So that I can pair program with a partner remotely

  Scenario: Starting a public pomodoro
    Given I go to "/"
    Then I click on "#navigate-public-choose"
    Then I should see "Public pomodoro"
    When I insert the public room "project-1"
    Then I should be on "/public/project-1"

