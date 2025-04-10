import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  color: #fff;
  background-color: #121212;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  font-family: "Arial", sans-serif;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
  color: #4caf50;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #ff9800;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;

const InstructionList = styled.ul`
  list-style: disc;
  margin-left: 20px;
  font-size: 16px;
  line-height: 1.6;
`;

const InstructionPage: React.FC = () => {
  return (
  <Container>
    <Title>OraclDrone Protocol Interaction Instructions</Title>

    <Section>
      <SectionTitle>Introduction</SectionTitle>
      <Paragraph>
        The OraclDrone Protocol enables capsule-linked AI drones to execute off-chain logic, commit randomness, and verify data on-chain. This guide covers drone registration, task execution, swarm consensus, and AI prediction flows.
      </Paragraph>
    </Section>

    <Section>
      <SectionTitle>1️⃣ Registering Your Drone</SectionTitle>
      <InstructionList>
        <li>Open the <strong>Drone Control</strong> panel.</li>
        <li>Enter your <code>capsuleId</code> and stake the required ETH.</li>
        <li>Click <strong>Register Drone</strong> to deploy your OraclDrone capsule.</li>
      </InstructionList>
    </Section>

    <Section>
      <SectionTitle>2️⃣ Executing Assigned Tasks</SectionTitle>
      <InstructionList>
        <li>Navigate to <strong>Drone Tasks</strong>.</li>
        <li>Select task type (e.g., <code>priceCheck</code>, <code>eventVerify</code>, etc.).</li>
        <li>Enter <code>taskId</code>, parameters, and confirm task dispatch.</li>
      </InstructionList>
    </Section>

    <Section>
      <SectionTitle>3️⃣ Submitting Randomness Commitments</SectionTitle>
      <InstructionList>
        <li>Go to <strong>Randomness Engine</strong>.</li>
        <li>Input a secure commitment hash using <code>bytes32 _commitment</code>.</li>
        <li>Submit. Wait for the reveal phase to unlock.</li>
      </InstructionList>
    </Section>

    <Section>
      <SectionTitle>4️⃣ Revealing Random Number</SectionTitle>
      <InstructionList>
        <li>Return during the reveal window.</li>
        <li>Enter the original <code>_randomNumber</code> and matching <code>_nonce</code>.</li>
        <li>Click <strong>Reveal</strong> to finalize randomness injection.</li>
      </InstructionList>
    </Section>

    <Section>
      <SectionTitle>5️⃣ Reporting Task Results</SectionTitle>
      <InstructionList>
        <li>Under <strong>Report Result</strong>, input your <code>taskId</code>.</li>
        <li>Submit your computed <code>uint256 result</code>.</li>
        <li>If quorum is reached, your report will finalize the consensus.</li>
      </InstructionList>
    </Section>

    <Section>
      <SectionTitle>6️⃣ Managing Roles and Permissions</SectionTitle>
      <InstructionList>
        <li>In the <strong>Swarm Permissions</strong> tab, use <code>grantRole</code> or <code>revokeRole</code>.</li>
        <li>Provide the <code>bytes32 role</code> and target <code>account</code>.</li>
        <li>Use <code>hasRole</code> to verify any operator or controller.</li>
      </InstructionList>
    </Section>

    <Section>
      <SectionTitle>7️⃣ Quantum Drone Mesh (Advanced)</SectionTitle>
      <InstructionList>
        <li>Access mesh via <strong>Quantum Mesh</strong> panel.</li>
        <li>Use <code>safeTransferFrom</code> to move capsules between nodes.</li>
        <li>Mesh logic routes tasks to nearest performant swarm node.</li>
      </InstructionList>
    </Section>

    <Section>
      <SectionTitle>8️⃣ AI Prediction + Commitment Flows</SectionTitle>
      <InstructionList>
        <li>Use <strong>AI Capsule</strong> mode from <code>CapsuleAdvancedAIPredictionProtocol</code>.</li>
        <li>Call <code>commitPrediction(capsuleId, hash)</code>.</li>
        <li>Reveal with <code>revealPrediction(capsuleId, prediction, nonce)</code>.</li>
      </InstructionList>
    </Section>

    <Section>
      <SectionTitle>9️⃣ Updating AI Performance</SectionTitle>
      <InstructionList>
        <li>DAO or Swarm Admins can update via <code>updateReputation()</code>.</li>
        <li>Provide <code>capsuleId</code>, <code>newReputation</code>, and <code>newCognitiveScore</code>.</li>
      </InstructionList>
    </Section>

    <Section>
      <SectionTitle>📞 Need Help?</SectionTitle>
      <InstructionList>
        <li>Ensure your capsule is linked and registered.</li>
        <li>Verify drone roles or registration status.</li>
        <li>Join our Discord, Telegram, or visit the docs for walkthroughs.</li>
      </InstructionList>
    </Section>
  </Container>
  );
}



export default InstructionPage;