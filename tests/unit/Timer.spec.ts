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

    jest.advanceTimersByTime(26 * 60 * 1000);
    expect(timer.find('.time').text()).not.toMatch('-');
  });
  it("can't change mode unless time is stopped", () => {
    const timer = shallowMount(Timer);
    timer.find('.timer-button').trigger('click');

    const allTabButtons = timer.findAll('.tab-button');
    expect(allTabButtons.at(0).attributes('disabled')).toBe('disabled');
    expect(allTabButtons.at(1).attributes('disabled')).toBe('disabled');
    expect(allTabButtons.at(2).attributes('disabled')).toBe('disabled');
  });
  it('can change mode', () => {
    const timer = shallowMount(Timer);

    const allTabButtons = timer.findAll('.tab-button');
    allTabButtons.at(1).trigger('click');
    expect(timer.find('.time').text()).toBe('05:00');
    allTabButtons.at(2).trigger('click');
    expect(timer.find('.time').text()).toBe('15:00');
    allTabButtons.at(0).trigger('click');
    expect(timer.find('.time').text()).toBe('25:00');
  });
});
