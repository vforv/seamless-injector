import { Boot } from "../../src/Boot";
import { Event, Getter } from '../../src/Event';

@Event()
export class BootApp extends Boot {
    public register() {
        const house: any = Getter('House');

        house.getHouse();
    }
}
