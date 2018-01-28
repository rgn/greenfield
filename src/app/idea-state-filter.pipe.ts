import { Pipe, PipeTransform } from '@angular/core';
import { Idea } from './com.trivadis.greenfield';

@Pipe({
  name: 'ideaStateFilter'
})
export class IdeaStateFilterPipe implements PipeTransform {

  transform(ideas: any, state: string): Idea[] {
    if (ideas === undefined || state === undefined) {
      return [];
    }
    return ideas.filter(idea => idea.state === state);
  }
}
