const { exec } = require('child_process');
const FirewallRule = require('./FirewallRule');
const { log } = require('console');

class FirewallService {
    constructor() {
        this.rules = []; // In-memory storage for firewall rules
    }

    getAllRules() {
        return this.rules;
    }

    async addRule(rule) {
        const existingRuleIndex = this.rules.findIndex(r => r.port === rule.port && r.chain === rule.chain);
        
        if (existingRuleIndex !== -1) {
            const existingRule = this.rules[existingRuleIndex];
            if (
                existingRule.protocol === rule.protocol &&
                existingRule.action === rule.action
            ) {
                console.log(`Rule for port ${rule.port} already exists with the same properties.`);
                return existingRule;
            }
            await this.deleteRule(rule.port, rule.chain,existingRule.action,rule);
        }

        const command = `iptables -A ${rule.chain} -p ${rule.protocol} --dport ${rule.port} -s ${rule.sourceIp} -d ${rule.destinationIp} -j ${rule.action}`;
        console.log(`Executing: ${command}`);

        const success = await this.executeCommand(command);
        if (success) {
            this.rules.push(rule);
            console.log(this.rules);
            
        }
        return rule;
    }

    async editRule(rule) {
        await this.deleteRule(rule.port, rule.chain);
        return this.addRule(rule);
    }

    async deleteRule(port, chain = 'INPUT',action,rule) {
        const existingRuleIndex = this.rules.findIndex(r => r.port === port && r.chain === chain);
        if (existingRuleIndex === -1) {
            console.log(`No rule found for port ${port} in chain ${chain}`);
            return false;
        }

        const command = `iptables -D ${chain} -p tcp --dport ${port} -s ${rule.sourceIp} -d ${rule.destinationIp} -j ${action}`;
        console.log(`Executing: ${command}`);

        const success = await this.executeCommand(command);
        if (success) {
            this.rules = this.rules.filter(rule => !(rule.port === port && rule.chain === chain));
        }
        return success;
    }

    executeCommand(command) {
        return new Promise((resolve) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Execution error: ${error.message}`);
                    resolve(false);
                    return;
                }
                if (stderr) {
                    console.error(`Command stderr: ${stderr}`);
                    resolve(false);
                    return;
                }
                console.log(stdout);
                resolve(true);
            });
        });
    }
}

module.exports = FirewallService;
