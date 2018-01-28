import { IdeaStateFilterPipe } from './idea-state-filter.pipe';
import { Idea } from './com.trivadis.greenfield';

describe('ideaStateFilter', () => {
  it('create an instance', () => {
    const pipe = new IdeaStateFilterPipe();
    expect(pipe).toBeTruthy();
  });
  it('filters an list of ideas by state', () => {
    const ideas = [
      {
        ideaId: 1,
        state: 'FRESH'
      },
      {
        ideaId: 2,
        state: 'FRESH'
      },
      {
        ideaId: 3,
        state: 'INWORK'
      },
      {
        ideaId: 3,
        state: 'INWORK'
      },
      {
        ideaId: 4,
        state: 'INWORK'
      },
      {
        ideaId: 5,
        state: 'FINISHED'
      }
    ];

    const pipe = new IdeaStateFilterPipe();
    let filteredIdeas = pipe.transform(ideas, 'FRESH');
    expect(filteredIdeas.length).toBe(2);
  });
});
