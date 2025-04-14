const core = require('@actions/core');
const exec = require('@actions/exec');

async function getFirstCommit() {
  try {
    const result = await exec.getExecOutput('git rev-list --max-parents=0 HEAD');
    return result.stdout.trim();
  } catch (err) {
    throw new Error(`Error fetching first commit: ${err.message}`);
  }
}

async function verifyRefExists(ref) {
  try {
    await exec.exec(`git rev-parse --verify ${ref}`, [], { silent: true });
    return true;
  } catch {
    return false;
  }
}

async function resolveValidRef() {
  let ref = core.getInput('ref') || 'HEAD^';

  const isValid = await verifyRefExists(ref);
  if (!isValid) {
    core.warning(`Ref "${ref}" is invalid or does not exist. Falling back to first commit.`);
    ref = await getFirstCommit();

    const isFirstValid = await verifyRefExists(ref);
    if (!isFirstValid) {
      throw new Error(`Fallback ref "${ref}" is also invalid. Git history may be incomplete.`);
    }
  }

  return ref;
}

async function run() {
  try {
    const ref = await resolveValidRef();

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
    console.log('🧠 Modified files:', files);

  } catch (error) {
    core.setFailed(`🔥 Action failed: ${error.message}`);
  }
}

run();
