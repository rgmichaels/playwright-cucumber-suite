@ui @smoke
Feature: Entry Ad Modal

  Scenario: User sees and closes the entry ad modal
    Given I am on the home page
    When I click the Entry Ad link
    Then I should see the entry ad modal with expected text
    And I close the entry ad modal
