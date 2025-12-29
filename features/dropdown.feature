@ui @smoke
Feature: Dropdown interactions

  Scenario: User selects options from the dropdown
    Given I am on the home page
    When I click the Dropdown link
    And I select option 2 from the dropdown
    And I select option 1 from the dropdown
    Then option 1 should be selected
