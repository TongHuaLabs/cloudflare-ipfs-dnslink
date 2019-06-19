var cloudflare = require('cloudflare');

var cloudflareDnslink = function(email ,key, zoneId, domain) {
  var cf = cloudflare({
    email,
    key
  });

  return {
    findDnsLinkRecord: function() {
      return cf.dnsRecords.browse(zoneId).then(function (resp) {
        let records = resp.result;
        for(let i=0; i<records.length; i++) {
          if(records[i].content.startsWith("dnslink=")) {
            return records[i];
          }
        }
        return null;
      });
    },
    create: function(cid) {
      var newRecord = {
        type: "TXT",
        name: domain,
        content: "dnslink=/ipfs/" + cid
      }

      return cf.dnsRecords.add(zoneId, newRecord).then(function (resp) {
        return resp.result;
      });
    },
    update: function(record, cid) {
      var newRecord = {
        type: "TXT",
        name: record.name,
        content: "dnslink=/ipfs/" + cid
      }

      return cf.dnsRecords.edit(zoneId, record.id, newRecord).then(function (resp) {
        return resp.result;
      }); 
    }
  }
};

module.exports = cloudflareDnslink;