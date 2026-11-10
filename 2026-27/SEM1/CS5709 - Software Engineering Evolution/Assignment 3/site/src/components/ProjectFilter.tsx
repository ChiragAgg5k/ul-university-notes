/**
 * @file Search box and skill buttons that drive the shared filter state.
 */
import { usePortfolio } from '../hooks/usePortfolio.ts';
import { everySkill } from '../state/PortfolioContext.ts';

export function ProjectFilter({ skills }: { skills: string[] }) {
  const { state, dispatch } = usePortfolio();
  return (
    <fieldset className="filters">
      <legend>Find a project</legend>
      <label>
        Search
        <input
          type="search"
          value={state.query}
          onChange={event => dispatch({ type: 'search', query: event.target.value })}
        />
      </label>
      <div>
        {[everySkill, ...skills].map(skill => (
          <button
            key={skill}
            type="button"
            aria-pressed={state.skill === skill}
            onClick={() => dispatch({ type: 'select', skill })}
          >
            {skill}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
