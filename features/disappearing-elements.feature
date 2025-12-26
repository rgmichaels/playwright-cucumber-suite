@ui @smoke
Feature: Disappearing Elements

  Scenario: User views the Disappearing Elements page
    Given I am on the home page
    When I click the Disappearing Elements link
    Then I should see the Disappearing Elements menu links
