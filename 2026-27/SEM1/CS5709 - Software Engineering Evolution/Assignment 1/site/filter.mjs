import { matchesSkill } from './projects.mjs';

const filter = document.querySelector('[data-project-filter]');
if (filter) {
  const cards = [...document.querySelectorAll('[data-skills]')];
  const status = document.querySelector('[data-filter-status]');
  filter.hidden = false;
  filter.addEventListener('click', event => {
    const button = event.target.closest('button[data-skill]');
    if (!button || !filter.contains(button)) return;
    let visible = 0;
    for (const card of cards) {
      card.hidden = !matchesSkill(JSON.parse(card.dataset.skills), button.dataset.skill);
      if (!card.hidden) visible++;
    }
    for (const control of filter.querySelectorAll('button')) {
      control.setAttribute('aria-pressed', String(control === button));
    }
    status.textContent = `${visible} of ${cards.length} projects shown${button.dataset.skill === 'All' ? '' : ` for ${button.dataset.skill}`}.`;
  });
}
