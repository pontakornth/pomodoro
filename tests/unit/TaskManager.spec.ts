import { shallowMount } from '@vue/test-utils';
import TaskManager from '../../src/components/TaskManager.vue';

describe('TaskManager', () => {
  it('allow task to be added', () => {
    const taskManager = shallowMount(TaskManager);
    taskManager.find('input[type="text"]').trigger('change', { target: { value: 'Dummy' } });
    taskManager.find('input[type="number"]').trigger('change', { target: { value: 2 } });
    taskManager.find('input[type="submit"]').trigger('click');
    expect(taskManager.find('task-list')).toBeTruthy();
  });
});
