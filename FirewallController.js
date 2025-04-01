const express = require('express');
const FirewallService = require('./FirewallService');
const FirewallRule = require('./FirewallRule');

const router = express.Router();
const firewallService = new FirewallService();

router.get('/firewall/rules', (req, res) => {
    const rules = firewallService.getAllRules();
    res.json(rules);
});

router.post('/firewall/manage', (req, res) => {
    const ruleData = req.body;
    const rule = new FirewallRule(ruleData.id, ruleData.ruleName, ruleData.action, ruleData.sourceIp, ruleData.destinationIp, ruleData.port, ruleData.chain, ruleData.protocol);
    
    // Log the action of managing a firewall rule
    console.log(`Managing rule for port: ${rule.port}`);
    
    const addedRule = firewallService.addRule(rule);
    res.status(201).json(addedRule);
});

router.put('/firewall/rule', (req, res) => {
    const ruleData = req.body;
    const rule = new FirewallRule(ruleData.id, ruleData.ruleName, ruleData.action, ruleData.sourceIp, ruleData.destinationIp, ruleData.port, ruleData.chain, ruleData.protocol);
    const editedRule = firewallService.editRule(rule);
    res.json(editedRule);
});

router.delete('/firewall/rule/:port', (req, res) => {
    const port = parseInt(req.params.port, 10);
    firewallService.deleteRule(port);
    res.status(204).send();
});

module.exports = router;
