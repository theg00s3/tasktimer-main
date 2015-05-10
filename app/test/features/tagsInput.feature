Feature: Adding tags
  As a user of Pomodoro.cc
  I should be able to add a tag to a pomodoro
  So that I can organize my work

  Scenario: Adding a tag
    Given I go to "/"
    Then I click on ".start-pomodoro"
    Then I should be able to insert a tag
    When I insert the tag "project-1"
    Then I should be able to stop the timer ".start-pomodoro"
