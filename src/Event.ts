import { IGenericClass, IType } from './Model';
import { Container } from './Container';

export interface IAction {
    event: string
}

export const Event = (type?: string): IGenericClass<IType<any>> => {
    return (target: IType<any>) => {
        Container.set(target, type);
    };
};

export const Getter = <T>(event: string): T => {
    const c = Container.emit(event);
    return c.message;
};
