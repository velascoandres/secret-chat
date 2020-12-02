import {
    EventSubscriber,
    EntitySubscriberInterface,
    InsertEvent,
    Connection,
} from 'typeorm';
import { UsuarioEntity } from "./usuario.entity";
import * as bcrypt from 'bcrypt';
import { InjectConnection } from "@nestjs/typeorm";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UsuarioEntity> {

    constructor(
        @InjectConnection('conexion_mongo')
        private connection: Connection) {
        connection.subscribers.push(this);
    }

    listenTo(): typeof UsuarioEntity {
        return UsuarioEntity;
    }

    beforeInsert(event: InsertEvent<UsuarioEntity>): void {
        const salt = bcrypt.genSaltSync();
        event.entity.password = bcrypt.hashSync(event.entity.password, salt);
    }

}