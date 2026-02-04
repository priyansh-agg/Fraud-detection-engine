## Project Title

Real-Time Fraud Detection Engine

## Project Status (Development Mode)

This project is **under active development**.  
Only **Phase 1 (foundational transaction service)** is currently implemented.  
The system is **not production-ready** and should not be used in live financial environments.

## Project Vision

The Real-Time Fraud Detection Engine is intended to be a **production-grade, low-latency risk engine** for financial transactions across banks, fintechs, and payment gateways.

The long-term goal is to provide:

- **Real-time fraud risk scoring** for card, account, and wallet transactions.
- **Pluggable rule-based and machine-learning models**, allowing risk teams to iterate quickly.
- **Event-driven, horizontally scalable architecture** that can integrate with existing core banking and payment systems.
- **Auditability and governance** features suitable for regulated environments (e.g., clear decision trails, change management, and monitoring).
- **Vendor-agnostic integration** with upstream (transaction sources) and downstream (case management, alerting) systems.

## Why This Project Exists

Fraud teams often struggle with:

- **Monolithic legacy systems** that are slow to update and hard to integrate.
- **Black-box vendor solutions** with limited transparency and operational control.
- **Latency-sensitive use cases** where decisions must be made in milliseconds.

This project explores how to design and implement a **modern, transparent, and extensible fraud detection engine** that:

- Can be embedded into existing transaction processing flows.
- Allows risk/rules teams and data scientists to collaborate on a single engine.
- Provides a clear separation between **transaction ingestion**, **feature computation**, **decision logic**, and **observability**.

## Current Implementation (Phase 1)

Phase 1 focuses on the **foundational transaction service**. The current implementation includes:

- **Transaction API (backend service)**
  - Node.js service that exposes endpoints to:
    - Ingest transaction payloads (e.g., authorization events).
    - Persist transaction data for downstream analysis and future scoring.
  - Basic request validation and schema definition for transaction objects.

- **Persistence Layer**
  - MongoDB integration for storing raw transaction records.
  - Simple schema that captures core transaction attributes (amount, currency, timestamps, parties, etc.).
  - Designed to be extended later with derived features and risk annotations.

- **Service Infrastructure (Development Mode)**
  - Dockerfile and Docker Compose definition for running the transaction service and database locally.
  - Environment-based configuration for connecting to MongoDB and controlling basic runtime settings.
  - Minimal logging to support development and debugging.

**What Phase 1 intentionally does not do:**

- It does **not** perform fraud scoring or risk decisions.
- It does **not** execute rules or machine-learning models.
- It does **not** publish events to streams or queues.
- It does **not** provide SLAs, multi-region redundancy, or operational runbooks.

At this stage, the focus is on building a **clean, testable foundation** that future phases can extend.

## Tech Stack

- **Runtime**: Node.js (JavaScript)
- **Framework**: Express (HTTP API for transaction service)
- **Database**: MongoDB (transaction storage)
- **Containerization**: Docker
- **Orchestration (local/dev)**: Docker Compose
- **Configuration**: Environment-based configuration module

The stack is intentionally simple in Phase 1, with room to evolve into a more distributed, event-driven design in later phases.

## Planned Architecture (High-Level)

The planned end-state architecture is a **modular, event-driven fraud detection platform** composed of:

- **Transaction Ingestion Service (current focus)**
  - Receives and validates incoming transaction events.
  - Persists raw and normalized forms of transaction data.
  - Publishes events into a streaming backbone (e.g., Kafka) for downstream consumers.  
  *(Event publishing is planned, not yet implemented.)*

- **Real-Time Scoring Engine (planned)**
  - Stateless services that:
    - Consume transaction events.
    - Enrich with features (device, behavioral, historical spend, merchant risk, etc.).
    - Execute rule sets and model inference.
  - Return a **risk score and decision** (approve, decline, challenge) to upstream systems.

- **Rules Management & Policy Service (planned)**
  - Central source of truth for:
    - Rule definitions and configurations.
    - Thresholds, block/allow lists, watchlists.
  - Safe deployment workflows (e.g., canary rules, A/B testing) for new fraud strategies.

- **Feature & Model Services (planned)**
  - Feature store and feature computation pipelines.
  - Model-serving layer for machine-learning–based risk scoring.
  - Versioned models to support rollbacks and regulatory audits.

- **Observability & Governance (planned)**
  - Detailed logging and metrics for:
    - Latency, throughput, and error rates.
    - Rule/model hit rates and drift indicators.
  - Audit trails for decisions and configuration changes.

All of the above beyond the transaction ingestion service are **design goals**, not yet built.

## Roadmap (Phases 2–5)

The roadmap is subject to change as the design evolves, but the current high-level plan is:

### Phase 2 – Real-Time Scoring & Rules Engine (Planned)

- Implement a **stateless scoring service** that:
  - Listens to transaction events (from the ingestion service).
  - Evaluates configurable rules (e.g., velocity checks, geolocation anomalies).
  - Returns a risk outcome and reason codes.
- Introduce a **simple configuration store** for rules (file-based or DB-backed).
- Add **basic event streaming integration** (e.g., Kafka or similar) between ingestion and scoring.

### Phase 3 – Feature Engineering & ML Integration (Planned)

- Build a **feature computation layer** for:
  - Customer behavior (spend patterns, device patterns).
  - Merchant risk attributes.
  - Historical fraud labels.
- Introduce a **model-serving component** for:
  - Machine-learning models (e.g., gradient boosting, tree-based models).
  - Versioned deployment of models and feature pipelines.
- Enable **hybrid decisions** combining rules and models.

### Phase 4 – Governance, Analytics & Risk Operations (Planned)

- Add **auditability and governance**:
  - Full decision trace (inputs, features, rules/models activated).
  - Change history for rules and models.
- Introduce **analytics and reporting** for:
  - Fraud detection performance.
  - False positive/negative monitoring.
- Integrate with downstream systems (e.g., case management, notifications) via **APIs and events**.

### Phase 5 – Hardening, Scale & Multi-Tenancy (Planned)

- Focus on **production hardening**:
  - Performance optimization and horizontal scaling.
  - Circuit breakers, rate limiting, and backpressure.
  - Security hardening and compliance-aware practices.
- Introduce **multi-tenant capabilities** for different business units or clients.
- Establish **SRE practices** (SLIs/SLOs, runbooks, incident workflows).

## How to Run (basic)

The current project is configured for **local development only**.

### Prerequisites

- Docker and Docker Compose installed.
- Node.js and npm installed (if you want to run the service outside Docker).
- Local access to run containers and bind ports.

### Option 1: Run via Docker Compose (Recommended for Development)

From the project root:

```bash
cd /Users/priyanshagarwal/NODEscrimba/fraud-detection-engine

# Start services in development mode
docker-compose up --build
```

This will:

- Build and run the **transaction service**.
- Start the required **MongoDB** instance for development.

Refer to the `docker-compose.yml` for ports and environment variables.

### Option 2: Run the Transaction Service Directly

From the transaction service directory:

```bash
cd /Users/priyanshagarwal/NODEscrimba/fraud-detection-engine/services/transaction-service

# Install dependencies
npm install

# Start the service (see package.json for the exact script)
npm start
```

You can then send requests to the exposed HTTP endpoints for transaction ingestion (see the controller and route definitions for the current API surface).

## Disclaimer (not production-ready yet)

This repository is a **work in progress** and is currently suitable only for:

- Architectural exploration.
- Code review and discussion.
- Local experimentation.

It is **not production-ready** and currently lacks:

- Comprehensive test coverage and performance testing.
- High availability and resilience guarantees.
- Security hardening and compliance validation.
- Full fraud-scoring capabilities, rules engine, or ML integration.

Any references to scoring, rules, models, or streaming integrations in this README describe **future intentions**, not present functionality.
