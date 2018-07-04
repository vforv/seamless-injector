import { Boot } from "../../src/Boot";
import { Event, Getter } from '../../src/Event';

@Event('DefaultPattern')
export class BootApp extends Boot {
    public register() {
        const house: any = Getter('House');

        return house.getHouse();
    }
}
