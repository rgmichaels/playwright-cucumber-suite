@smoke @keypress
Feature: Key Presses

  Scenario: User presses a key and sees the result
    Given I am on the home page
    When I click the Key Presses link
    And I press the "A" key
    Then I should see the key press result "You entered: A"
