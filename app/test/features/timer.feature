Feature: Starting a timer
  As a user of Pomodoro.cc
  I should be able to start a timer
  So that I can track time

  Scenario: Start 25:00
    Given I go to "/"
    Then I click on ".start-pomodoro"
    Then I should see "24:59"
    Then I should be able to stop the timer ".start-pomodoro"

  Scenario: Start 5:00
    Given I go to "/"
    Then I click on ".break-5"
    Then I should see "05:00"
    Then I should be able to stop the timer ".break-5"

  Scenario: Start 15:00
    Given I go to "/"
    Then I click on ".break-15"
    Then I should see "15:00"
    Then I should be able to stop the timer ".break-15"
