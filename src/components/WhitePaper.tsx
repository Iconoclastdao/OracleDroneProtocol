import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-family: "Bradley DJR Variable", sans-serif;
  background-image: url('/logo1.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: white;
  text-shadow: 2px 2px 4px black;
  width: 100%;
  max-width: 900px;
  margin: 24px auto;
  padding: var(--padding);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 2rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const List = styled.ul`
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  list-style: disc;

  li {
    margin-bottom: 0.5rem;
  }
`;

const WhitePaper: React.FC = () => (
  <Container>
    <Title>OraclDrone Protocol: Autonomous Swarms for Modular Oracle Coordination</Title>

    <Section>
      <SectionTitle>Abstract</SectionTitle>
      <Paragraph>
        The <strong>OraclDrone Protocol</strong> introduces a modular framework for deploying autonomous oracle agents—"drones"—as part of a swarm-based price and data consensus network. Each drone is linked to a Coincapsule and tasked with executing off-chain computations, verifying API data, and reporting back with verifiable results to a decentralized manager.
      </Paragraph>
      <Paragraph>
        This paper outlines the architecture, deployment, and governance of the OraclDrone Protocol, and its integration into the broader Capsule ecosystem. It enables scalable, decentralized, and secure task execution for price feeds, condition checks, or event triggers.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>1. Introduction</SectionTitle>
      <Paragraph>
        Existing oracles are monolithic and static. The OraclDrone Protocol proposes dynamic oracle agents deployed per Capsule. These agents—lightweight Capsules themselves—act semi-autonomously, computing, submitting, and validating results based on mission parameters.
      </Paragraph>
      <List>
        <li>Deploy agent capsules that register as active oracle drones.</li>
        <li>Each drone executes off-chain tasks and submits proof-bound responses.</li>
        <li>Consensus is achieved through multi-agent verification and staking incentives.</li>
        <li>Slashing and reputation systems enforce trustless integrity.</li>
      </List>
    </Section>

    <Section>
      <SectionTitle>2. Architecture</SectionTitle>

      <SectionTitle>2.1 Capsule-Linked Agents</SectionTitle>
      <Paragraph>
        Each OraclDrone is a smart contract capsule linked to its deployer. The drone executes tasks, signs outputs, and communicates with the <em>PriceOracleTaskManager</em>.
      </Paragraph>

      <SectionTitle>2.2 Task Management</SectionTitle>
      <Paragraph>
        Tasks are assigned via a manager (task governor), each with a deadline, assigned drones, and required quorum. Upon receiving enough matching responses, consensus is finalized and the result is posted on-chain.
      </Paragraph>

      <SectionTitle>2.3 Swarm Execution</SectionTitle>
      <Paragraph>
        Drones operate in swarms. Multiple drones receive the same task. Results are hashed and compared on-chain. Matching results are finalized as canonical truth. Outliers can be penalized or slashed.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>3. Drone Lifecycle</SectionTitle>
      <List>
        <li><strong>Registration:</strong> Agents stake and register via `registerAgent()` with their capsule ID.</li>
        <li><strong>Task Execution:</strong> Drones compute based on off-chain triggers and submit hashes.</li>
        <li><strong>Consensus Vote:</strong> Matching submissions reach quorum; the result is posted.</li>
        <li><strong>Reward/Slash:</strong> Drones are rewarded or slashed based on alignment with consensus.</li>
      </List>
    </Section>

    <Section>
      <SectionTitle>4. Use Cases</SectionTitle>
      <List>
        <li>Cross-platform price feeds (DEXs, L2s, stablecoins).</li>
        <li>Off-chain event triggers for DAOs or lending protocols.</li>
        <li>Modular oracle extensions inside custom capsules (e.g., IOT, climate, proof-of-humanity).</li>
      </List>
    </Section>

    <Section>
      <SectionTitle>5. Security & Integrity</SectionTitle>
      <Paragraph>
        Each drone signs its output. Duplicated results from distinct drones are hashed for quorum validation. Tasks are deadline-bound, with slashing enforced for non-compliance or malicious disagreement.
      </Paragraph>
      <List>
        <li>Agent slashing via DAO or governance controller.</li>
        <li>Reputation scores managed on-chain via RewardDistributor.</li>
        <li>Proof-of-Result enabled through future ZK task execution.</li>
      </List>
    </Section>

    <Section>
      <SectionTitle>6. Governance & Modularity</SectionTitle>
      <Paragraph>
        Drones can be deployed via the CapsuleFactory or via DAO proposals. The `SwarmDAO` can propose slashing, mint rewards, or reassign task priorities. ModularExecutors allow AI integration or data fusion layers for agent enhancement.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>7. Roadmap</SectionTitle>
      <List>
        <li><strong>Phase 1:</strong> Register and stake drones with `registerAgent`</li>
        <li><strong>Phase 2:</strong> Multi-agent task execution, result hashing, and consensus reporting</li>
        <li><strong>Phase 3:</strong> ZK-based verification, multi-domain mission logic, autonomous agent clusters</li>
      </List>
    </Section>
  </Container>
);

export default WhitePaper;