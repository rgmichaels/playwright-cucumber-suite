
Feature: A/B Testing page

@smoke @ui
  Scenario: User navigates to A/B Testing page
    Given I am on the home page
    When I click the A/B Testing link
    Then I should see the A/B Test Control text
    And I should see the Elemental Selenium link

@regression @ui
  Scenario: User adds and removes an element
    Given I am on the home page
    When I click the Add Remove Elements link
    Then I should see the Add Remove Elements page text
    When I add an element
    Then I should see a Delete button
    When I delete the element
    Then I should not see a Delete button

@smoke @auth
  Scenario: User logs in using Basic Auth
  Given I navigate to the Basic Auth page with valid credentials
  Then I should see the Basic Auth success message

@ui @regression @images
Scenario: Detect broken images on Broken Images page
  Given I am on the home page
  When I click the Broken Images link
  Then I should detect broken images

@ui @smoke
Scenario: User views the Checkboxes page
  Given I am on the home page
  When I click the Checkboxes link
  Then I should see 2 checkboxes on the page

@smoke @ui
  Scenario: User triggers context menu alert
    Given I am on the home page
    When I click the Context Menu link
    And I right click on the context menu box
    Then I should see a context menu alert

