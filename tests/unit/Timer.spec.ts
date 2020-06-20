import { shallowMount } from '@vue/test-utils';
import Timer from '../../src/components/Timer.vue';

jest.useFakeTimers();

describe('Timer', () => {
  it('start at work mode with 25 minutes', () => {
    const timer = shallowMount(Timer);
    const time = timer.find('.time').text();
    expect(time).toBe('25:00');
    const mode = timer.find('.timer-button').text();
    expect(mode).toBe('START');
  });
  it('can start timer', () => {
    const timer = shallowMount(Timer);
    const timerButton = timer.find('.timer-button');
    expect(timerButton.text()).toBe('START');
    timerButton.trigger('click');
    expect(timerButton.text()).toBe('STOP');

    jest.advanceTimersByTime(1000);
    expect(timer.find('.time').text()).toBe('24:59');
  });
  it("doesn't count to negative", () => {
    const timer = shallowMount(Timer);
    timer.find('.timer-button').trigger('click');

    jest.advanceTimersByTime(25 * 60 * 1000);
    expect(timer.find('.time').text()).not.toMatch('-');
  });
});
