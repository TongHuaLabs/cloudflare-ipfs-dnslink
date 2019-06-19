# cloudflare-ipfs-dnslink
Currently, IPNS takes too long to resolve. DNSLink is alot faster and uses more readable names. This Node.js script programmatically update dnslink on Cloudflare. 

## Installation
```
npm install cloudflare-ipfs-dnslink
```

## Usage
```
// Constants
let email = 'test@gmail.com';
let apiKey = 'global-api-key';
let zoneId = 'zone-id';
let domain = 'hashpire.com';

// Initialize
let cloudflareDnslink = require('cloudflare-ipfs-dnslink')(email, apiKey, zoneId, domain);

(async ()=> {
  let cid = 'QmR8bfCkYQkGJyA8W4s1wQs8dqorfNCGMCMWhpNiSsbS5m'; // Content Identifier here
  let dnsRecord = await cloudflareDnslink.findDnsLinkRecord();
  if(dnsRecord) {
    // Update dnslink record
    let res = await cloudflareDnslink.update(record, cid);
    console.log(res);
  } else {
    // Create new dnslink record
    let res = await cloudflareDnslink.create(cid);
    console.log(res);
  }
})();
```

