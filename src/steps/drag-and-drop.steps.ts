import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DragAndDropPage } from '../pages/DragAndDropPage';

When('I click the Drag and Drop link', async function () {
  const home = new HomePage(this.page);

  await Promise.all([
    this.page.waitForURL('**/drag_and_drop'),
    home.clickDragAndDrop()
  ]);
});

When('I drag box A onto box B', async function () {
  const dnd = new DragAndDropPage(this.page);

  // Save before-state so we can prove it swapped
  this.beforeHeaders = await dnd.getColumnHeaders();
  console.log('🔍 BEFORE drag:', this.beforeHeaders);

  await dnd.dragAontoB();

  // Small pause helps visually confirm in headed mode
  await this.page.waitForTimeout(500);

  // Save after-state
  this.afterHeaders = await dnd.getColumnHeaders();
  console.log('🔍 AFTER drag:', this.afterHeaders);
});

Then('box A and box B should swap positions', async function () {
  expect(this.beforeHeaders).toBeDefined();
  expect(this.afterHeaders).toBeDefined();

  console.log('✅ ASSERT before:', this.beforeHeaders);
  console.log('✅ ASSERT after:', this.afterHeaders);

  // Initially: column-a header is "A", column-b header is "B"
  expect(this.beforeHeaders.a).toBe('A');
  expect(this.beforeHeaders.b).toBe('B');

  // After swap: they should flip
  expect(this.afterHeaders.a).toBe('B');
  expect(this.afterHeaders.b).toBe('A');
});
