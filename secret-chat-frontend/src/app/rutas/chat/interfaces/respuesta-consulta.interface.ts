export interface RespuestaConsultaInterface<T> {
  nextQuery: string;
  data: T[];
  total: number;
}
