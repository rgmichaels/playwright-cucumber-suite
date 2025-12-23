
Feature: A/B Testing page

  Scenario: User navigates to A/B Testing page
    Given I am on the home page
    When I click the A/B Testing link
    Then I should see the A/B Test Control text
    And I should see the Elemental Selenium link
