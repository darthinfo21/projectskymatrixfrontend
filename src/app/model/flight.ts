export class Flight {
    id: number;
    flightNumber: string;
    airline: string;
    source: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    fare: number;
    totalSeats: number;
    availableSeats: number;
  
    constructor(
      id: number,
      flightNumber: string,
      airline: string,
      source: string,
      destination: string,
      departureTime: string,
      arrivalTime: string,
      fare: number,
      totalSeats: number,
      availableSeats: number
    ) {
      this.id = id;
      this.flightNumber = flightNumber;
      this.airline = airline;
      this.source = source;
      this.destination = destination;
      this.departureTime = departureTime;
      this.arrivalTime = arrivalTime;
      this.fare = fare;
      this.totalSeats = totalSeats;
      this.availableSeats = availableSeats;
    }
  }
  