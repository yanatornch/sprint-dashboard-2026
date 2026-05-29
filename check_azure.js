import 'dotenv/config';

const AZURE_ORG = process.env.ADO_ORG || 'morestudio';
const AZURE_PROJECT = process.env.ADO_PROJECT || 'M';
const AZURE_PAT = process.env.ADO_PAT;
const cleanPat = AZURE_PAT.replace(/^"|"$|'/g, '');

const azureHeaders = {
  'Authorization': `Basic ${Buffer.from(`:${cleanPat}`).toString('base64')}`,
  'Content-Type': 'application/json'
};

async function check() {
  const batchUrl = `https://dev.azure.com/${AZURE_ORG}/${AZURE_PROJECT}/_apis/wit/workitems/32397?api-version=7.1`;
  const res = await fetch(batchUrl, { headers: azureHeaders });
  const data = await res.json();
  console.log("AreaPath:", data.fields["System.AreaPath"]);
  process.exit(0);
}

check();
