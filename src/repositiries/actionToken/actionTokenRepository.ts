// import { EntityRepository, getManager, Repository } from 'typeorm';
//
// import { ActionToken, IActionToken, IActionTokenToSave } from '../../entity';
// import { IActionTokenRepository } from './actionTokenRepository.interface';
//
// @EntityRepository(ActionToken)
// class ActionTokenRepository extends Repository<ActionToken> implements IActionTokenRepository {
//     public async createActionToken(token: IActionTokenToSave): Promise<ActionToken> {
//         return getManager().getRepository(ActionToken).save(token);
//     }
//
//     async findByParams(filterObject: Partial<IActionToken>): Promise<IActionToken | undefined> {
//         return getManager().getRepository(ActionToken).findOne(filterObject);
//     }
//
//     async deleteByParams(findObject: Partial<IActionToken>) {
//         return getManager().getRepository(ActionToken).delete(findObject);
//     }
// }
//
// export const actionTokenRepository = new ActionTokenRepository();
