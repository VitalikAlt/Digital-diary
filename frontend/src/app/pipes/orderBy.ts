import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "orderBy", pure: false})
export class ArraySortPipe implements PipeTransform {
  transform(array: Array<string>, sortBy: [string, boolean]): Array<string> {
    array.sort((a: any, b: any) => {
      const sortIndex = (sortBy[1])? -1 : 1;
      return (a[sortBy[0]] > b[sortBy[0]])? sortIndex : -sortIndex;
    });

    return array;
  }
}
