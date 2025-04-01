import React, { useEffect, useState } from "react";
import FirewallForm from "./FirewallForm";

function FirewallTable() {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);

  useEffect(() => {
    fetch("/firewall/rules")
      .then((response) => response.json())
      .then((data) => setRules(data));
  }, []);

  const handleEdit = (rule) => {
    setSelectedRule(rule);
  };

  const handleSubmit = (rule) => {
    const method = selectedRule ? "PUT" : "POST";
    const url = selectedRule ? `/firewall/rule` : `/firewall/manage`;

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rule),
    })
      .then((response) => response.json())
      .then(() => {
        setSelectedRule(null);
        // Refresh the rules list
        fetch("/firewall/rules")
          .then((response) => response.json())
          .then((data) => setRules(data));
      });
  };

  return (
    <div>
      <h2>Firewall Rules</h2>
      <table>
        <thead>
          <tr>
            <th>Port</th>
            <th>Action</th>
            <th>Protocol</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.port}>
              <td>{rule.port}</td>
              <td>{rule.action}</td>
              <td>{rule.protocol}</td>
              <td>
                <button onClick={() => handleEdit(rule)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FirewallForm existingRule={selectedRule} onSubmit={handleSubmit} />
    </div>
  );
}

export default FirewallTable;
