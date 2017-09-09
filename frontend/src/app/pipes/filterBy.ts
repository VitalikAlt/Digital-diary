import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "filterBy", pure: false})
export class ArrayFilterPipe implements PipeTransform {
  transform(array: Array<string>, filters: Object): Array<string> {
    return array.filter((element: any) => {
      for (const filterName in filters) {
        if (String(element[filterName]).indexOf(filters[filterName]) === -1)
          return false;
      }

      return true;
    });
  }
}
