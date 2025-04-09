import { Bookingdto } from './bookingdto';
import { Userdto } from './userdto';
import { FlightDTO } from './flight-dto';

export class Bookingdetailsdto {
    booking!: Bookingdto;
    user!: Userdto;
    flight!: FlightDTO;
}
