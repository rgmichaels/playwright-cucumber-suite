@ui @smoke
Feature: Dynamic Content

  Scenario: User views dynamic content with multiple paragraphs
    Given I am on the home page
    When I click the Dynamic Content link
    Then I should see 3 dynamic content paragraphs with text
