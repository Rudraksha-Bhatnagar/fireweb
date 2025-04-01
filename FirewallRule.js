class FirewallRule {
    constructor(id, ruleName, action, sourceIp, destinationIp, port, chain, protocol) {
        this.id = id;
        this.ruleName = ruleName;
        this.action = action; // e.g., allow or deny
        this.sourceIp = sourceIp;
        this.destinationIp = destinationIp;
        this.port = port;
        this.chain = chain; // Chain for the rule (e.g., INPUT, OUTPUT)
        this.protocol = protocol; // Protocol for the rule (e.g., TCP, UDP)
    }
}

module.exports = FirewallRule;
