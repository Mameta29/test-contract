const path = require('path');
const fs = require('fs');
const solc = require('solc');

function findImports(importPath) {
  if (importPath.startsWith('@openzeppelin')) {
    let filePath = path.resolve('./node_modules', importPath);
    return {
      contents: fs.readFileSync(filePath, 'utf8'),
    };
  } else {
    return { error: 'File not found' };
  }
}

async function main() {
  // Load the contract source code
  const sourceCode = await fs.promises.readFile('Erc20.sol', 'utf8');
  // Compile the source code and retrieve the ABI and bytecode
  const { abi, bytecode } = compile(sourceCode, 'MyToken');
  // Store the ABI and bytecode into a JSON file
  const artifact = JSON.stringify({ abi, bytecode }, null, 2);
  await fs.promises.writeFile('Erc20.json', artifact);
}

function compile(sourceCode, contractName) {
  // Create the Solidity Compiler Standard Input and Output JSON
  const input = {
    language: 'Solidity',
    sources: { 'Erc20.sol': { content: sourceCode } },
    settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode'] } } },
  };
  // Parse the compiler output to retrieve the ABI and bytecode
  const output = solc.compile(JSON.stringify(input), { import: findImports });
  const artifact = JSON.parse(output).contracts['Erc20.sol'][contractName];
  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  };
}

main().then(() => process.exit(0));
