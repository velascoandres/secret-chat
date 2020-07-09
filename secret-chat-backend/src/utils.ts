export class Utils {
  static get obtenerFechaActual() {
    return new Date().toISOString();
  }

  static existeUsuario(
    listaUsuarios: string[],
    nickName: string,
  ): boolean {
    const indice = listaUsuarios.findIndex(
      usuario => usuario === nickName,
    );
    return indice > -1;
  }
}