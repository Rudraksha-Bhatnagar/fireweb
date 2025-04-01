import React from "react";
import FirewallForm from "./FirewallForm";
import FirewallTable from "./FirewallTable";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the IPTables Web Manager</h1>
      <FirewallForm />
      
    </div>
  );
}

export default App;
