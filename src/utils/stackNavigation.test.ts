import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_STACK,
  pushView,
  popView,
  resetToHome,
  canGoBack,
  getActiveView
} from './stackNavigation';

test('initial stack has root View 1', () => {
  assert.equal(INITIAL_STACK.length, 1);
  assert.equal(INITIAL_STACK[0].viewNumber, 1);
  assert.equal(canGoBack(INITIAL_STACK), false);
});

test('pushView adds a new view to stack', () => {
  const stackAfterSearch = pushView(INITIAL_STACK, 2);
  assert.equal(stackAfterSearch.length, 2);
  assert.equal(getActiveView(stackAfterSearch).viewNumber, 2);
  assert.equal(canGoBack(stackAfterSearch), true);

  const stackAfterKitchen = pushView(stackAfterSearch, 3);
  assert.equal(stackAfterKitchen.length, 3);
  assert.equal(getActiveView(stackAfterKitchen).viewNumber, 3);
});

test('pushView does not push duplicate top view', () => {
  const stack = pushView(INITIAL_STACK, 2);
  const duplicate = pushView(stack, 2);
  assert.equal(duplicate.length, 2);
});

test('popView removes the top view from stack', () => {
  let stack = pushView(INITIAL_STACK, 2);
  stack = pushView(stack, 4);
  assert.equal(stack.length, 3);

  stack = popView(stack);
  assert.equal(stack.length, 2);
  assert.equal(getActiveView(stack).viewNumber, 2);

  stack = popView(stack);
  assert.equal(stack.length, 1);
  assert.equal(getActiveView(stack).viewNumber, 1);

  // Calling pop on root view does not empty the stack
  stack = popView(stack);
  assert.equal(stack.length, 1);
  assert.equal(getActiveView(stack).viewNumber, 1);
});

test('resetToHome clears the stack back to View 1', () => {
  let stack = pushView(INITIAL_STACK, 2);
  stack = pushView(stack, 5);
  stack = pushView(stack, 8);
  assert.equal(stack.length, 4);

  const resetStack = resetToHome();
  assert.equal(resetStack.length, 1);
  assert.equal(resetStack[0].viewNumber, 1);
});
