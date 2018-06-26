
import { Door } from './Door';
import { Container } from '../Container';
import { Window } from './Window';
import { House } from './House';


const d = Container.resolve([Window,Door, House]);
d.register();