import { IGenericClass, IType } from './Model';
import { Register } from './Register';

export interface IAction {
    event: string;
}

export const Event = (type?: string): IGenericClass<IType<any>> => {
    return (target: IType<any>) => {
        Register.set(target, type);
    };
};

export const Getter = <T>(event: string): T => {
    const c = Register.emit(event);
    return c.message;
};
