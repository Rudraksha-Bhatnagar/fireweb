import React, { useState } from "react";
import axios from "axios"; // Import axios for making API calls

function FirewallForm({ existingRule, onSubmit }) {
  const [port, setPort] = useState(existingRule ? existingRule.port : "");
  const [action, setAction] = useState(existingRule ? existingRule.action : "");
  const [protocol, setProtocol] = useState(existingRule ? existingRule.protocol : "");
  const [sourceIp, setSourceIp] = useState(existingRule ? existingRule.sourceIp : "");
  const [destinationIp, setDestinationIp] = useState(existingRule ? existingRule.destinationIp : "");
  const [chain, setChain] = useState(existingRule ? existingRule.chain : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rule = { port: parseInt(port), action, protocol, sourceIp, destinationIp, chain };
    
    try {
      // Make a POST request to the backend
      const response = await axios.post('http://localhost:3000/firewall/manage', rule);
      console.log(response.data) // Call the onSubmit prop with the response data
    } catch (error) {
      console.error("Error adding/editing rule:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Source IP"
        value={sourceIp}
        onChange={(e) => setSourceIp(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination IP"
        value={destinationIp}
        onChange={(e) => setDestinationIp(e.target.value)}
      />
      <input
        type="text"
        placeholder="Chain"
        value={chain}
        onChange={(e) => setChain(e.target.value)}
      />
      <input
        type="text"
        placeholder="Port"
        value={port}
        onChange={(e) => setPort(e.target.value)}
      />
      <input
        type="text"
        placeholder="Action"
        value={action}
        onChange={(e) => setAction(e.target.value)}
      />
      <input
        type="text"
        placeholder="Protocol"
        value={protocol}
        onChange={(e) => setProtocol(e.target.value)}
      />
      <button type="submit">{existingRule ? "Edit Rule" : "Add Rule"}</button>
      <p>Fill in all fields to manage firewall rules.</p>
    </form>
  );
}

export default FirewallForm;
