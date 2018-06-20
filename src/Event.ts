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

export const Emitter = (c: any) => {
    return Container.emit(c)
};