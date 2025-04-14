const core = require('@actions/core');
const exec = require('@actions/exec');

async function getRefInputOrFallback() {
  let ref = core.getInput('ref');
  if (!ref) {
    // fallback: get the first commit in the repo
    let firstCommit = '';
    try {
      const result = await exec.getExecOutput('git rev-list --max-parents=0 HEAD');
      firstCommit = result.stdout.trim();
      if (firstCommit) {
        ref = firstCommit;
      } else {
        throw new Error('Unable to determine the first commit.');
      }
    } catch (err) {
      core.setFailed(`Error fetching first commit: ${err.message}`);
      process.exit(1);
    }
  }
  return ref;
}

async function verifyRefExists(ref) {
  try {
    await exec.exec(`git rev-parse --verify ${ref}`, [], { silent: true });
    return true;
  } catch (err) {
    core.setFailed(`Ref "${ref}" is invalid or does not exist: ${err.message}`);
    return false;
  }
}

async function run() {
  try {
    const ref = await getRefInputOrFallback();
    const refIsValid = await verifyRefExists(ref);
    if (!refIsValid) {
      return;
    }

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
    console.log('🔍 Modified files:', files);

  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
