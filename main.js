const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const ref = core.getInput('ref') || 'HEAD^';
    let output = '';
    
    const options = {
      listeners: {
        stdout: (data) => {
          output += data.toString();
        }
      }
    };

    await exec.exec(`git diff --name-only ${ref}`, [], options);

    const files = output
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    core.setOutput('modified_files', JSON.stringify(files));
    console.log('Modified files:', files);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
