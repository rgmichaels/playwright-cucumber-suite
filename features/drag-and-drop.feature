@ui @smoke
Feature: Drag and Drop

  Scenario: User drags box A onto box B
    Given I am on the home page
    When I click the Drag and Drop link
    And I drag box A onto box B
    Then box A and box B should swap positions
