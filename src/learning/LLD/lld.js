const lldContent = [
  {
    slug: "parking-lot",
    type: "Low-level design",
    title: "Parking Lot",
    summary:
      "Model a multi-floor parking facility with vehicle fit, spot allocation, tickets, and payment.",
    updatedAt: "2026-10-18",
    visible: true,
    sections: [
      {
        heading: "Requirements and assumptions",
        body:
          "Functional: support multiple floors and spot types; admit motorcycles, cars, and buses; choose a compatible available spot; issue an entry ticket; calculate a fee at exit; accept payment; release the spot only after successful payment; and show availability.\n\nNon-functional: prevent double allocation under concurrent entry, keep entry/exit operations auditable, and make payment retries idempotent.\n\nAssumptions: one vehicle occupies one spot; a bus requires five contiguous large spots on the same floor; a car fits compact or large spots; a motorcycle fits motorcycle, compact, or large spots. Pricing is hourly with a configurable minimum charge and rate table. Reservations, EV charging, lost tickets, and dynamic pricing are out of scope.",
      },
      {
        heading: "Core object model",
        body:
          "ParkingLot owns floors and the entry/exit services. Each ParkingFloor owns spots and an availability index by SpotType. ParkingSpot has an identifier, type, and occupancy state. Vehicle is an abstract type with Motorcycle, Car, and Bus specializations. ParkingSession binds a ticket to a vehicle, allocated spot IDs, entry time, exit time, and payment status. SpotAssignmentService selects and atomically claims compatible spots; FeeCalculator computes the amount; PaymentGateway is an external interface.\n\nThe allocation invariant is that a spot may belong to at most one active ParkingSession. For a bus, the entire contiguous set must be claimed atomically or none of it is.",
      },
      {
        heading: "UML class diagram",
        body:
          "The following Mermaid class diagram captures the main relationships. A renderer can turn it into a visual UML diagram; the text remains source-controlled and easy to revise.",
      },
      {
        heading: "Database design",
        body:
          "Relational storage is a reasonable starting point because ticket, spot assignment, and payment state require transactions. Keep the active-spot claim and session creation in one transaction. The schema sketch uses a PostgreSQL partial unique index to prevent more than one active assignment per spot even if an application-level check races; other databases can enforce the same invariant with a generated active key or a separate current-assignment table.\n\nFor high-volume availability reads, cache per-floor counts and rebuild them from durable spot/session state. Treat those counts as a projection, not the source of truth.",
      },
      {
        heading: "Back-of-the-envelope sizing",
        body:
          "Illustrative facility assumptions: 10 floors × 500 spots = 5,000 spot rows. If the average stay is 4 hours and utilization averages 70%, expected active sessions are about 3,500. At 2,000 entries/exits per hour during a busy window, the transactional allocation rate is modest for a single facility; contention is concentrated on a floor/spot type, not the whole database. Persisting 20,000 session records/day at roughly 1 KB each is about 20 MB/day before indexes and audit/payment records. Multi-city scale multiplies these estimates by the number of facilities; validate actual peak arrivals and burst behavior before sizing.",
      },
      {
        heading: "Key flows and concurrency",
        body:
          "Entry: identify vehicle type; rank candidate floors/spots; in a short transaction lock or conditionally update candidate spots; for a bus, claim all contiguous spots or roll back; create the session and ticket; return a confirmation. Do not hold database locks while calling external services.\n\nExit: load the active session; calculate the fee from entry/exit timestamps and the configured rate version; create an idempotent payment attempt; on confirmed payment, transactionally mark the session paid/closed and release all assigned spots. A payment timeout is pending, not failed: query/reconcile by idempotency key before retrying. Emit an outbox event for receipts and availability projections.",
      },
      {
        heading: "Extensibility and trade-offs",
        body:
          "Use a SpotFitPolicy per vehicle type rather than scattering compatibility conditionals. Inject FeeCalculator and PaymentGateway so pricing and payment providers can evolve independently. Keep spot selection policy separate from atomic persistence; nearest-entry, EV charging, accessible spots, and reservation priority can be added as policies.\n\nA single relational database favors clear transactions and constraints for one facility or moderate multi-site scale. If allocation volume grows, partition by facility_id while preserving transactional ownership of a facility’s spots. Avoid splitting one bus assignment across independent partitions.",
      },
    ],
    codeSamples: [
      {
        title: "Mermaid UML class diagram",
        language: "mermaid",
        code: `classDiagram
  class ParkingLot {
    +id: String
    +floors: List~ParkingFloor~
  }
  class ParkingFloor {
    +id: String
    +spots: List~ParkingSpot~
  }
  class ParkingSpot {
    +id: String
    +type: SpotType
    +status: SpotStatus
  }
  class Vehicle {
    <<abstract>>
    +licensePlate: String
    +requiredSpots(): int
  }
  class Motorcycle
  class Car
  class Bus
  class ParkingSession {
    +id: String
    +entryTime: Instant
    +exitTime: Instant
    +status: SessionStatus
  }
  class SpotAssignmentService
  class FeeCalculator
  class PaymentGateway

  ParkingLot *-- ParkingFloor
  ParkingFloor *-- ParkingSpot
  Vehicle <|-- Motorcycle
  Vehicle <|-- Car
  Vehicle <|-- Bus
  ParkingSession --> Vehicle
  ParkingSession "1" --> "1..*" ParkingSpot
  SpotAssignmentService --> ParkingFloor
  ParkingSession --> FeeCalculator
  ParkingSession --> PaymentGateway`,
      },
      {
        title: "Relational schema sketch",
        language: "sql",
        code: `CREATE TABLE parking_floor (
  facility_id VARCHAR(64) NOT NULL,
  floor_id VARCHAR(64) NOT NULL,
  floor_number INTEGER NOT NULL,
  PRIMARY KEY (facility_id, floor_id)
);

CREATE TABLE parking_spot (
  facility_id VARCHAR(64) NOT NULL,
  spot_id VARCHAR(64) NOT NULL,
  floor_id VARCHAR(64) NOT NULL,
  spot_type VARCHAR(24) NOT NULL,
  status VARCHAR(16) NOT NULL,
  PRIMARY KEY (facility_id, spot_id),
  FOREIGN KEY (facility_id, floor_id)
    REFERENCES parking_floor (facility_id, floor_id)
);

CREATE TABLE parking_session (
  session_id VARCHAR(64) PRIMARY KEY,
  facility_id VARCHAR(64) NOT NULL,
  license_plate VARCHAR(32) NOT NULL,
  vehicle_type VARCHAR(24) NOT NULL,
  entry_time TIMESTAMP NOT NULL,
  exit_time TIMESTAMP,
  status VARCHAR(16) NOT NULL,
  rate_version VARCHAR(32) NOT NULL
);

CREATE TABLE session_spot (
  session_id VARCHAR(64) NOT NULL REFERENCES parking_session(session_id),
  facility_id VARCHAR(64) NOT NULL,
  spot_id VARCHAR(64) NOT NULL,
  released_at TIMESTAMP,
  PRIMARY KEY (session_id, spot_id),
  FOREIGN KEY (facility_id, spot_id)
    REFERENCES parking_spot (facility_id, spot_id)
);

CREATE UNIQUE INDEX one_active_session_per_spot
  ON session_spot (facility_id, spot_id)
  WHERE released_at IS NULL;

CREATE TABLE payment (
  payment_id VARCHAR(64) PRIMARY KEY,
  session_id VARCHAR(64) NOT NULL REFERENCES parking_session(session_id),
  idempotency_key VARCHAR(128) NOT NULL UNIQUE,
  amount_minor BIGINT NOT NULL,
  currency CHAR(3) NOT NULL,
  status VARCHAR(16) NOT NULL,
  provider_reference VARCHAR(128),
  created_at TIMESTAMP NOT NULL
);`,
      },
      {
        title: "Java-oriented design skeleton",
        language: "java",
        code: `enum SpotType { MOTORCYCLE, COMPACT, LARGE }
enum VehicleType { MOTORCYCLE, CAR, BUS }

record Vehicle(String licensePlate, VehicleType type) {}
record ParkingTicket(String sessionId, List<String> spotIds, Instant entryTime) {}

interface SpotFitPolicy {
    boolean canFit(Vehicle vehicle, ParkingSpot spot);
    int requiredSpotCount(Vehicle vehicle);
}

interface FeeCalculator {
    long amountInMinorUnits(Instant entry, Instant exit, String rateVersion);
}

interface PaymentGateway {
    PaymentResult charge(String idempotencyKey, long amountMinor, String currency);
}

interface SpotAssignmentService {
    ParkingTicket park(Vehicle vehicle);
    void releaseAfterPayment(String sessionId, PaymentResult payment);
}

// Repository implementation must claim all selected spots atomically.
// Never release a spot for a pending or declined payment.`,
      },
    ],
  },
];

export default lldContent;
