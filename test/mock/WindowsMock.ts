import { Windows } from "./Windows";

export class WindowsMock extends Windows{
    public getWindows() {
        return 'Small Windows';
    }
}