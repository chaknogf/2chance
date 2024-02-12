import { Pipe, PipeTransform } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Iusuarios } from '../models/Iusers';


@Pipe({
  name: 'usuario'
})
export class UsuariosPipe implements PipeTransform {
  constructor(private userSe: UsuariosService) {}

  public users: Iusuarios | undefined;

  async transform(id: number): Promise<string> {
    console.log(id)
    const data = await this.userSe.obteneruserid(id).toPromise();
    if (data) {
      this.users = data;
      console.log(id)
      console.table(data)
      return data?.name || '';
    }
    return '';
  }

}
