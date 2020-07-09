export interface MensajeInterface {
  contenido: string;
  fechaEnvio?: Date;
  emisor: string;
  destinatario?: string;
  respuesta?: boolean;
}
