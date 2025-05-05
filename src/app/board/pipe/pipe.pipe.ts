import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeValueFormat'
})
export class PipePipe implements PipeTransform {
  
  transform(value: string): string {
    let valueFormated = '';
    switch (value){
      case 'RO':
      case 'RO ':
      case 'SFR':
        valueFormated = 'ROMO';
        break;
      case 'TOC':
      case 'TOC ':
      case 'TO ':
          valueFormated = 'TORREON';
        break;
      case 'IR':
      case 'IR ':
      case 'IRA':
      case 'IRS':
      case 'IRP':
      case 'IRN':
      case 'IRL':
          valueFormated = 'IRAPUATO';
        break;
      case 'MX':
      case 'MX ':
          valueFormated = 'MEXICO';
        break;
      default: 
        valueFormated = '';
        break;
    }
      return valueFormated;
  }

}
